# docs-vim
## Installation (Chrome)
```
git clone https://github.com/matthewsot/docs-vim.git
cd docs-vim
git submodule init
git submodule update
```

* Go to `chrome://extensions/` in Chrome or Chromium.
* Enable "Developer Mode". (Right top of the screen)

![image](https://user-images.githubusercontent.com/49868160/118260804-09b5ff00-b4b3-11eb-820a-58339ec95f33.png)
* Click "Load unpacked". (Left top of the screen)

![image](https://user-images.githubusercontent.com/49868160/118261175-7f21cf80-b4b3-11eb-97b0-b2429a88b12c.png)
* Select the docs-vim folder and click "Open"

## Update
Apparently Google is [making significant changes to the Docs
editor](https://workspaceupdates.googleblog.com/2021/05/Google-Docs-Canvas-Based-Rendering-Update.html),
so this will likely stop working in the next few months.

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
    * Repeated motions using the number keys
    * Delete a single character with the "x" key
    * Enter visual mode with the "v" key
* Visual mode
    * Getting to normal mode with Esc
    * Moving with the home-row keys
    * Repeated motions using the number keys
    * Delete selected text with the "x" key
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
    ...
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

* Selections with shift-V (visual line mode)
* Command mode with find and replace, go to line #, etc.
* Quick find with /
