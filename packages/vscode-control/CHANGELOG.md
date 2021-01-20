 ===   
 add slowbug extension
 ===   
 add markdown lint extension
 ===   
Remove unpin keybinding
this makes alt+u available
 ===   
from 
  "editor.renderWhitespace": "trailing",
  "editor.cursorWidth": 0,

  to

   "editor.letterSpacing": 0.3,
  "editor.cursorWidth": 2,
  "editor.renderWhitespace": "selection",
 ===   

  "editor.suggest.showStatusBar": true,
  "editor.suggestOnTriggerCharacters": true,
  "editor.tabCompletion": "on",
  "editor.wordBasedSuggestionsMode": "allDocuments",
  "emmet.showAbbreviationSuggestions": false,
  "explorer.openEditors.sortOrder": "alphabetical",
  "explorer.sortOrder": "type",
 ===   
 from   "editor.quickSuggestions": {
    "other": false,
    "comments": false,
    "strings": false
  },
  to `false`
 ===   
    "key": "ctrl+shift+a",
    "command": "workbench.action.terminal.focusNext"
 ===   
  "editor.snippetSuggestions": "top",
  "editor.suggest.shareSuggestSelections": true,

 ===   

terminal.integrated.rendererType

fix snippets

stop semanticHighlighting

restore semanticHighlighting