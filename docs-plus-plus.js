docs.codeFromKey = function(shifted, key) {
    var specialKeys = { "/": 191, "Escape": 27, "Shift": 16,
        "Control": 17, "Alt": 18, "Backspace": 8, " ": 32, "Enter": 13,
        "Tab": 9, "ArrowLeft": 37, "ArrowUp": 38, "ArrowRight": 39, "ArrowDown": 40,
    "Delete": 46 };
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

docs.setCursorWidth = function(width) {
    $("head").append("<style>.kix-cursor-caret { border-width: " + width + "; }</style>");
}

window.vim_pressed = 0;
docs.pressKey = function (key, keyCode, incrVimPressed) {
    function doInsertText(key, keyCode) {
        var e = docs.utils.createKeyboardEvent("keydown", {
            "keyCode": keyCode,
            "key": key
        });

        document.getElementsByClassName("docs-texteventtarget-iframe")[0].contentWindow.document.querySelector("[contenteditable=\"true\"]").dispatchEvent(e);
    }
    if (incrVimPressed) {
        window.vim_pressed++;
    }
    
    if (docs.platform !== "userscript") {
        docs.runWithCreateKeyboard(doInsertText.toString(), "doInsertText", "\"" + key + "\", " + keyCode);
    } else {
        doInsertText(key, keyCode);
    }
};
