# Watch-fn

Invoke chain of multiple CLI commands and function calls upon specific file changes.

# Example

```
const watchFn = require("watch-fn")
const options = {
  commands:{
    js: [
      "eslint filepath",
      "node otherService.js filepath"
    ],
    pcss: "node postCss.js filepath",
    json: a => console.log(a)
  }
}
watchFn.start(options).then(console.log)
```

In the above example, each change of Javascript file within default directory("./src") will trigger two command line executions one after the other.
Note that **filepath** string in the commands will be replaced with the filepath of the changed file.

So if the changed file is called **foo.js**, then the first command will turn to "eslint src/foo.js"

Also note that the second command will execute only after the first command completes.

## How to use?

- **npm i watch-fn**

- Run in **async/await** compatible Node.js environment

## Options

### directory:String
The absolute path of the directory to be watched for file changes.
Recommended is this directory not to include the **node_modules** folder.

- Default value - `${__projectRoot}/src`

### commands:Object

It defines both file extensions to be watched and the commands to be executed.
The keys of **commands** declare the file extensions, while the values are the actual commands.

Those commands can be one of the following types:

- String - the command will be executed in the CLI

- Function - the function will be called with the filepath as argument.

Note that this function could be also asynchronous.

- Array - array of strings and functions

### onDelete:Function

The full filepath of the deleted file is passed on this function.

### cwd:String

Command working directory used when executing CLI commands.

- Default value - __projectRoot

### logFn:Function

Each return of a function call and each log of CLI execution are passed back as array.

This array is passed to **logFn** function.

- The default function flattens the array, maps over it and pass each value to *console.log*

### timeout:Number

After a file change, there is a time period defined by **timeout**, when no file change is accepted.
The value is in milliseconds.

- Default value - 4000

### exitFlag:Boolean

When error in execution of the commands occurs, this error is logged.

If **exitFlag** is *true*, watching files will close and the promise to be resolved with the error as argument.
if the flag is *false*, nothing happens besides logging the error.

- Default value - true

### negativeMatches:Array<String>

**Watch-fn** uses **Sane** package for file watching.

In my experience with **Sane** I noticed that negative globs are not working at all and positive globs are unreliable.

By using array of negative matches, we can filter out filepaths we don't want to react upon.

If the filepath contains at least one member of **negativeMatches**, this filepath won't enter the pipeline.

- Default value - [
    ".git",
    "temp",
    "public",
    "dist",
    "build",
    "node_modules"
]

### sane:Object

Object with options passed to **Sane** package, when initializing the file watcher.

- Default value - {dot: false, poll: true, watchman: false }

## Detailed example

```
const watchFn = require("watch-fn")
const options = {
  directory:`${__dirname}/dev`,

  // cwd is the same as the default value
  cwd:__dirname,

  // as I want everything in dev to be watched
  negativeMatches:[],

  // as I want keep watching even after errors
  exitFlag: false,

  // as I prefer longer timeout
  timeout: 10000,

  // as I don't want any logging
  logFn: ()=>{},

  // as I have watchman installed
  sane:{
    pull:true,
    dot: false,
    watchman:true
  },

  commands:{
    js: [
      "eslint --fix filepath",
      a => console.log(`JS file ${a} was linted`)
    ]
  }
}

// I don't need to put .then() after start()
// as I have exitFlag = false
watchFn.start(options)

// .catch() has no use even if exitFlag = true
// as the promise doesn't use reject
```

### Real world example

```
const watchFn = require("watch-fn")
const R = require("rambda")
const exec = require("child_process").exec

const willRunCommand = command  =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd:`${__dirname}/serp-web` })
    proc.stdout.on("end", () => {
      resolve()
    })
    proc.stdout.on("error", error => {
      reject(error)
    })
  })

async function babelFn(filePath){
  const destination = R.replace("serp-web", "serp",filePath)
  filePath = R.replace(`${__dirname}/serp-web/`, "",filePath)
  const command = `babel ${filePath} --out-file ${destination}`
  await willRunCommand(command)
}

const options = {
  directory:`${__dirname}/serp-web`,
  cwd:`${__dirname}/serp-web`,
  commands:{
    js: [
      babelFn,
      "flow filepath"
    ]
  },
}

watchFn.start(options)
```
