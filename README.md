# Your Project's Title...
Your project's description...

## Environments
- Preview: https://main--franklin-demo--ffw-phu-vo.hlx.page/
- Live: https://main--franklin-demo--ffw-phu-vo.hlx.live/

## Installation

```sh
npm i
```

## Tests

```sh
npm test
```

## Local development

1. Create a new repository based on the `helix-project-boilerplate` template and add a mountpoint in the `fstab.yaml`
1. Add the [helix-bot](https://github.com/apps/helix-bot) to the repository
1. Install the [Helix CLI](https://github.com/adobe/helix-cli): `npm install -g @adobe/helix-cli`
1. Start Franklin Proxy: `hlx up` (opens your browser at `http://localhost:3000`)
1. Open the `{repo}` directory in your favorite IDE and start coding :)

{
  "[json]": {
    "editor.quickSuggestions": {
      "strings": true
    },
    "editor.suggest.insertMode": "replace",
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "breadcrumbs.enabled": true,
  "css.validate": true,
  "editor.tabSize": 2,
  "editor.autoIndent": "full",
  "editor.insertSpaces": true,
  "editor.renderWhitespace": "boundary",
  "editor.wordWrapColumn": 80,
  "editor.wordWrap": "off",
  "editor.detectIndentation": true,
  "editor.rulers": [
    80
  ],
  "files.associations": {
    "*.inc": "php",
    "*.module": "php",
    "*.install": "php",
    "*.theme": "php",
    "*.profile": "php",
    "*.tpl.php": "php",
    "*.test": "php",
    "*.php": "php",
    "*.info": "ini"
  },
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,
  "html.format.enable": true,
  "html.format.wrapLineLength": 80,
  "telemetry.enableTelemetry": false,
  /* Empty Indent */
  "emptyIndent.removeIndent": true,
  "emptyIndent.highlightIndent": false,
  "emptyIndent.highlightColor": "rgba(246,36,89,0.6)",
  "diffEditor.ignoreTrimWhitespace": false,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[typescriptreact]": {
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "rvest.vs-code-prettier-eslint"
  },
  // Set the default
  "editor.formatOnSave": false,
  // Enable per-language
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "editor.formatOnSave": true
  },
  "php.suggest.basic": false,
  "php.validate.enable": false,
  "emmet.excludeLanguages": [
    "markdown",
    "php"
  ],
  "workbench.editor.centeredLayoutAutoResize": false,
  "importCost.vueExtensions": [

    "\\.vue$"
  ],
  "editor.tabCompletion": "onlySnippets",
  "prettier.vueIndentScriptAndStyle": true,
  "window.zoomLevel": -1,
  // "compilerOptions": {
  //   "module": "ES6",
  //   "jsx": "preserve",
  //   "checkJs": true
  // },
  // "exclude": ["node_modules", "**/node_modules/*"]
}
