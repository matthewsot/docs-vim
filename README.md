# docs-vim
## Overview
This simulates very limited versions of vim's insert and normal modes on Google
Docs.

Currently supported features:
* Insert mode:
    * Typing
    * Escaping to normal with Esc
    * Escaping to normal with a two-key combination
* Normal mode
    * Getting to insert mode with the "i" key
    * Moving with the home-row keys
* Chrome (tested on 63.0)
* (Not really) Firefox
    * It will install, but many of the features work incorrectly.
    
## How?
Glad you asked - this project is built with the [docs-plus
library](https://github.com/matthewsot/docs-plus), which enables rich
interactions with the Google Docs editor. Improvements made to the library here
(particularly those in the ``docs-plus-plus.js`` file) will probably eventually
be pushed back up to the main docs-plus library.

## Keys
Currently set up to work with my DVORAK layout, these are the default keybindings:

* Insert Mode:
    * Esc: enter normal mode
    * hn: enter normal mode
* Normal Mode:
    * i: enter insert mode
    * dhtn: move

Note that most of these can be changed in ``docs-vim.js``. For example, if you
want to use the more common QWERTY keybindings, you'd change to:

```
vim = {
    "mode": "insert",
    "keys": {
        "move": "hjkl",
        "escapeSeq": "jk",
    }
};
```

Near the top of ``docs-vim.js``.

## Future Features
I don't really use all that much of vim's shortcuts, but a few particular things I want to add
eventually:

* Selections with v/shift-V (visual/visual line mode)
* Command mode with find and replace, go to line #, etc.
* Quick find with /
