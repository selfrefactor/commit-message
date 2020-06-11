import { formatJson } from './format-json'
const packageJson = `
{
	"jest": {
		"moduleFileExtensions": [
			"js"
		],
		"testRegex": ".+spec.js$"
	},
	"icon": "files/magic-beans.png",
	"name": "magic-beans",
	"displayName": "Magic Beans",
	"description": "Magic-like effects",
	"version": "0.22.3",
	"publisher": "selfrefactor",
	"engines": {
		"vscode": "^1.30.1"
	},
	"categories": [
		"Other"
	],
	"activationEvents": [
		"onCommand:magicBeans.start",
		"onCommand:magicBeans.orderProps",
		"onCommand:magicBeans.randomFile",
		"onCommand:magicBeans.copyTrimmed"
	],
	"main": "./src/extension",
	"contributes": {
		"commands": [
			{
				"command": "magicBeans.randomFile",
				"title": "Magic Beans random file every interval"
			},
			{
				"command": "magicBeans.createSpec",
				"title": "Create spec"
			},
			{
				"command": "magicBeans.formatJson",
				"title": "Format JSON"
			}
		],
		"keybindings": [
			{
				"command": "magicBeans.createSpec",
				"key": "ctrl+shift+x"
			},
			{
				"command": "magicBeans.randomFile",
				"key": "ctrl+f8"
			},
			{
				"command": "magicBeans.orderProps",
				"key": "f8",
				"when": "editorTextFocus"
			},
			{
				"command": "magicBeans.copyTrimmed",
				"key": "alt+c",
				"when": "editorTextFocus"
			}
		],
		"configuration": {
			"type": "object",
			"title": "MagicBeans",
			"properties": {
				"magicBeans.RANDOM_FILE_ALLOWED_EXTENSIONS": {
					"type": "array",
					"uniqueItems": true,
					"items": {
						"type": "string"
					},
					"default": [
						".js",
						".ts",
						".go"
					],
					"description": "Which file extensions are allowed in random file mode"
				},
				"magicBeans.RANDOM_FILE_SKIP_PATTERNS": {
					"type": "array",
					"items": {
						"type": "string"
					},
					"uniqueItems": true,
					"default": [
						"node_modules",
						".git",
						".spec.",
						"test.",
						"__tests__",
						"specs"
					],
					"description": "Which file extensions are allowed in random file mode"
				},
				"magicBeans.RANDOM_FILE_AUTO_SCROLL": {
					"type": "boolean",
					"default": false,
					"description": "Auto scroll down with 15 lines every RANDOM_FILE_SCROLL_INTERVAL seconds"
				},
				"magicBeans.RANDOM_FILE_INTERVAL": {
					"type": "number",
					"default": 120,
					"description": "(In seconds) Every how many seconds to open a random file"
				},
				"magicBeans.RANDOM_FILE_SCROLL_BY": {
					"type": "number",
					"default": 15,
					"description": "(In lines) how many lines to be scrolled down every RANDOM_FILE_SCROLL_INTERVAL seconds"
				},
				"magicBeans.RANDOM_FILE_SCROLL_INTERVAL": {
					"type": "number",
					"default": 12,
					"description": "(In seconds) how ofter scroll down by RANDOM_FILE_SCROLL_BY lines will be applied in random file mode"
				},
				"magicBeans.RANDOM_FILE_MINIMAL_SIZE": {
					"type": "number",
					"default": 500,
					"description": "(In bytes) smallest file size participating in random file mode"
				}
			}
		}
	},
	"scripts": {
		"postinstall": "node ./node_modules/vscode/bin/install"
	},
	"devDependencies": {
		"jest": "26.0.1",
		"@babel/core": "7.10.2",
		"@babel/plugin-proposal-object-rest-spread": "7.10.1",
		"@babel/preset-env": "7.10.2",
		"@types/jest": "25.2.3",
		"typescript": "^3.9.0-dev.20200315",
		"vscode": "^1.1.36"
	},
	"repository": {
		"type": "git",
		"url": "https://github.com/selfrefactor/services/tree/master/packages/magic-beans"
	},
	"dependencies": {
		"klaw-sync": "^6.0.0",
		"rambdax": "^3.7.0",
		"string-fn": "^2.11.0"
	}
}
`.trim()

test('happy', () => {
  expect(formatJson(packageJson)).toMatchSnapshot()
})
