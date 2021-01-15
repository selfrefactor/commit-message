# Vscode-control

- Populate settings and keybingings to local VSCode instance

## Notes

  "editor.quickSuggestions": true is imporant

## Latest key binding

### Single column view - ctrl+shift+5

### Two column view - ctrl+shift+6

### Wallaby start - alt+w

### Wallaby stop - ctrl+shift+7

### copy relative path - `Shift+Caps Lock` when !editorFocus

### Pin - pin with `Alt+P`

### Collapse all with `Alt+4`

### Find all references - Caps + F

## VSCode changes

Pin tabs
You can now pin tabs either from the context menu or using the new command workbench.action.pinEditor (Ctrl+K Shift+Enter).

Smooth scrolling for lists and trees
Enabling the workbench.list.smoothScrolling setting will make scrolling in lists and trees much smoother with hardware that lacks smooth scrolling (for example, discrete mouse wheel on Windows).

New JavaScript debugger
This month we continued making progress on our new JavaScript debugger. Since mid-May, it has become the default debugger on Insiders, and is included (but not enabled by default) on VS Code Stable in this release. You can start using it with your existing launch configurations by enabling the debug.javascript.usePreview setting.

New input theme colors
We also have new color theme option for inputs. You can set the foreground color for active input options via inputOption.activeForeground. These appear in the Search view and Find widget (editor, terminal, debug console).
---

Inline diff is now editable

You can now edit inside the quick diff editor, when previewing changes in a file.
---

We introduced Focus Next Part (F6) and Focus Previous Part (Shift+F6) commands to make it easy to navigate across the workbench.

---

Collapse All list and tree command with Ctrl+LeftArrow keyboard shortcut

## Alternative fonts

```
  "editor.fontFamily": "Fantasque Sans Mono",
  "editor.fontFamily": "JetBrains Mono",
```

## On slow machines try disable GPU acceleration

Configure runtime arguments

```
"disable-hardware-acceleration": true

```