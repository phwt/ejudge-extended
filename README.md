# \<e\>Judge Extended
Extend \<e\>Judge functionality for ease in coding and submitting

## Features
### Chrome Extension
#### Problem
- View code on your computer directly from the problem page.
- Enable Access to hidden `c` and `python` editor.

#### Quiz
- Highlight selected question.
- Show Case's ID.
- Option to Save and Restore answers locally.
- Option to Clear all answers field.
- Option to Import/Export answers.

### Visual Studio Code
- View Problem on \<e\>Judge.
- Submit file to \<e\>Judge.

## Prerequisite

- Google Chrome
- Visual Studio Code
  - [Terminals Manager](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals) Addon
- cURL for Windows ([Installation](https://stackoverflow.com/a/28757477/))

## Installation

### Chrome Extension
[Install \<e\>Judge Extended from Chrome Web Store](https://chrome.google.com/webstore/detail/%3Ce%3Ejudge-extended/akeabeeepogfafbolmaahdefoimmllna/)

[Install \<e\>Judge Extended - Dark Mode from Chrome Web Store](https://chrome.google.com/webstore/detail/%3Ce%3Ejudge-extended-dark-mo/jakppieempchopbjjilgiickikdkkmmk/related)

### Visual Studio Code
[Download \<e\>Judge Extended for Visual Studio Code from the releases page](https://github.com/phwt/ejudge-extended/releases)

1. Extract contents from `ejudge-extended-vscode-x.x.zip` file to your project's root folder.
   - If you have existing `.vscode/terminals.json` file. Try to merge it in order not to overwrite the old one.
2. Specify your files path by this steps. (Only for first time use)
   1. Go to any problems page `ex: https://ejudge.it.kmitl.ac.th/problem/xxxx`
   2. On the right side you will see `View on computer` and `Edit` button. Click on `Edit`.
   3. You will be prompted to enter path to your folder that contains problem files then click on `OK`
   4. Try clicking on `View on computer` button. If Visual Studio Code does not opens with you file. Maks sure you enter the correct path.
3. \<e\>Judge Extended is now ready to use!

## Usage

**Notes - All file names must be in this format `[problem_id].c` and all are located in the same directory**

### Chrome Extension
1. Install the extension from Chrome Web Store and setup the path.
2. Access any features of your choice on Problem and Quiz pages.

### Visual Studio Code
1. Run `setup_login.bat`, Enter your credentials and desired course ID.
   - Credentials are stored in cookies and can be expired. Make sure to re-enter credentials after every restart.
2. Open Visual Studio Code
3. `Ctrl` + `Shift` + `P` and enter `Terminals: Run Single` to view available options.
4. Select your desired options.
   - `Submit to <e>Judge` | Submit current problem in <e>Judge
   - `Open in <e>Judge` | Open current problem in <e>Judge

## To-do list
- [ ] Make Visual Studio Code part standalone (Does not require Terminals Manager and cURL).
- [ ] More detailed respond on login and submit.
- [X] Add other language support.
- [X] Add Dark Mode
