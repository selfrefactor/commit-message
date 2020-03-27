# Services

## Renovate possible rules

```txt
  "packageRules": [
    {
      "depTypeList": ["devDependencies"],
      "extends": [":automergeMinor"]
    }
  ]
   "packageRules": [
    {
      "updateTypes": ["minor", "patch", "pin", "digest"],
      "automerge": true
    }
  ]
  "packageRules": [
		{
			"updateTypes": [
				"minor",
				"patch",
				"pin",
				"digest"
			],
			"automerge": true
		}
	]

  {
  "semanticCommits": true,
  "packageRules": [{
    "depTypeList": ["devDependencies"],
    "automerge": true
  }],
  "extends": [
    "config:base"
  ]
}
```