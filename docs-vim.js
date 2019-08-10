vim = {
    "mode": "insert",
    "keys": {
        "move": "dhtn", // QWERTY: hjkl
        "escapeSeq": "hn" // QWERTY: jk or jl
    }
};

vim.switchToNormalMode = function () {
    vim.mode = "normal";
    docs.setCursorWidth("7px");
    docs.keyboard.startBlockingKeyboard();
};

vim.switchToInsertMode = function () {
    vim.mode = "insert";
    docs.setCursorWidth("2px");
    docs.keyboard.stopBlockingKeyboard();
};

// Called in normal mode.
docs.keyboard.blockedKeydown = function (e) {
    e.preventDefault();

    if (e.key == "i") {
        vim.switchToInsertMode();
        return true;
    }

    var keyMap = { "Backspace": "ArrowLeft" };
    keyMap[vim.keys.move[0]] = "ArrowLeft";
    keyMap[vim.keys.move[1]] = "ArrowDown";
    keyMap[vim.keys.move[2]] = "ArrowUp";
    keyMap[vim.keys.move[3]] = "ArrowRight";

    if (e.key in keyMap) {
        e.key = keyMap[e.key];
    }

    if (e.key.indexOf("Arrow") == 0 || e.key == "Delete") {
        docs.keyboard.pressKey(docs.utils.codeFromKey(e.key));
    }

    if (e.key == "V" && e.shift) {
        console.log("select");
    }

    return false;
};

// This is what gets called when the user is in insert mode.
var lastChr = "";
docs.keyboard.unblockedKeydown = function (e) {
    var chr = e.key; //"a", "b", etc.
    var escapeSeq = "hn";

    if (vim.mode != "insert") {
        console.log("This shouldn't happen");
        return true;
    }

    if (chr == "Escape") {
        vim.switchToNormalMode();
    }

    if (chr == vim.keys.escapeSeq[1] && lastChr == vim.keys.escapeSeq[0]) {
        e.preventDefault();
        // We need to delete the first character already typed in the escape
        // sequence.
        docs.keyboard.backspace();
        vim.switchToNormalMode();
        return false;
    }
    lastChr = chr;
};
