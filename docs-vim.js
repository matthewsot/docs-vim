var mode = "insert"; // Default to insert mode

function codeFromKey(shifted, key) {
    var specialKeys = { "/": 191, "Escape": 27, "Shift": 16,
        "Control": 17, "Alt": 18, "Backspace": 8, " ": 32, "Enter": 13,
        "Tab": 9, "ArrowLeft": 37, "ArrowUp": 38, "ArrowRight": 39, "ArrowDown": 40 };
    var shiftedSpecialKeys = { "?": 191 };
    if (typeof specialKeys[key] !== "undefined") {
        if (shifted && typeof shiftedSpecialKeys[key] !== "undefined") {
            return shiftedSpecialKeys[key];
        }
        return specialKeys[key];
    } else {
        // TODO: none of this works correctly yet, but I don't think we use it
        var c = String.fromCharCode(key);
        if(!shifted) return c.toLowerCase();

        var shifts = { "`": "~", "1": "!", "2": "@", "3": "#", "4": "$", "5": "%", "6": "^", "7": "&", "8": "*", "9": "(", "0": ")", "-": "_", "=": "+" };
        var foundShift = shifts[c];
        if (typeof foundShift === "undefined") {
            return c.toUpperCase();
        } else {
            return shifts[c];
        }
    }
};

window.vim_pressed = false;
docs.pressKey = function (key, keyCode) {
    function doInsertText(key, keyCode) {
        var e = docs.utils.createKeyboardEvent("keydown", {
            "keyCode": keyCode,
            "key": key
        });

        document.getElementsByClassName("docs-texteventtarget-iframe")[0].contentWindow.document.querySelector("[contenteditable=\"true\"]").dispatchEvent(e);
    }
    window.vim_pressed = true;
    
    if (docs.platform !== "userscript") {
        docs.runWithCreateKeyboard(doInsertText.toString(), "doInsertText", "\"" + key + "\", " + keyCode);
    } else {
        doInsertText(key, keyCode);
    }
};

docs.keyboard.handleKeyboard = function (e) {
    if (window.vim_pressed) {
        window.vim_pressed = false;
        return true;
    }
    if (typeof e.key === "undefined") {
        e.key = docs.utils.keyFromKeyCode(e.shiftKey, e.keyCode);
    }

    if (mode == "insert") {
    }
    if (mode == "normal") {
        var keyMap = { "d": "ArrowLeft", "h": "ArrowDown", "t": "ArrowUp", "n": "ArrowRight" };
        if (e.key in keyMap) {
            e.key = keyMap[e.key];
        }
        if (e.key.indexOf("Arrow") == 0) {
            docs.pressKey(e.key, codeFromKey(false, e.key));
            e.preventDefault();
            return false;
        }
    }

    e.preventDefault();
    return false;
}

var lastChr = "";
docs.keyboard.handleKeydown = function (e) {
    var chr = e.key; //"a", "b", etc.
    var escapeSeq = "hn";
    if (mode == "insert") {
        if (chr == "Escape") {
            mode = "normal";
            docs.keyboard.startBlockingKeyboard();
        }
        if (chr == escapeSeq[1] && lastChr == escapeSeq[0]) {
            mode = "normal";
            e.preventDefault();
            docs.pressKey(e.key, codeFromKey(false, "Backspace"));
            docs.keyboard.startBlockingKeyboard();
            return false;
        }
    }
    if (mode == "normal") {
        if (chr == "i") {
            mode = "insert";
            docs.keyboard.stopBlockingKeyboard();
        }
    }
    lastChr = chr;
}
