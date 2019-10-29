num = '';
vim = {
    "mode": "insert",
    "keys": {
        "move": "dhtn", // QWERTY: hjkl
        "escapeSequence": "hn", // QWERTY: jk or jl
    }
};

vim.switchToNormalMode = function () {
    vim.mode = "normal";
    docs.setCursorWidth("7px");
};

vim.switchToInsertMode = function () {
    vim.mode = "insert";
    docs.setCursorWidth("2px");
};

// Called in normal mode.
vim.normal_keydown = function (e) {
    if (e.key.match(/F\d+/)) {
        // Pass through any function keys.
        return true;
    }

    e.preventDefault();
    e.stopPropagation();

    if (e.key == "i") {
        vim.switchToInsertMode();
        return true;
    }

    var keyMap = { "Backspace": "ArrowLeft" };
    keyMap[vim.keys.move[0]] = "ArrowLeft";
    keyMap[vim.keys.move[1]] = "ArrowDown";
    keyMap[vim.keys.move[2]] = "ArrowUp";
    keyMap[vim.keys.move[3]] = "ArrowRight";

    if (e.key.match(/\d+/)) {
        num += e.key.toString();
    }

    if (e.key in keyMap) {
        e.key = keyMap[e.key];
    }

    if (e.key.indexOf("Arrow") == 0 || e.key == "Delete") {
	if (num != '') {
	    for (var i = 0; i < Number(num); i++) {
                docs.pressKey(docs.codeFromKey(e.key));
            }
	    num = '';
        } else {
	    docs.pressKey(docs.codeFromKey(e.key));
	}
    }

    if (e.key == "V" && e.shift) {
        console.log("select");
    }

    return false;
};

// Called in insert mode.
var currentSequence = "";
vim.insert_keydown = function (e) {
    if (e.key == "Escape") {
        vim.switchToNormalMode();
    }

    currentSequence += e.key;
    if (currentSequence == vim.keys.escapeSequence) {
        e.preventDefault();
        e.stopPropagation();

        // We need to delete the first character already typed in the escape
        // sequence.
        for (var i = 0; i < (currentSequence.length - 1); i++) {
            docs.backspace();
        }

        vim.switchToNormalMode();
        return false;
    }
    if (vim.keys.escapeSequence.indexOf(currentSequence) != 0) {
        currentSequence = e.key;
    }
};

docs.keydown = function (e) {
    if (vim.mode == "insert") {
        return vim.insert_keydown(e);
    }
    if (vim.mode == "normal") {
        return vim.normal_keydown(e);
    }
};
