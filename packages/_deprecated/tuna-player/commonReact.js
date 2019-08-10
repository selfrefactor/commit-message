const R = require("ramda")
const reqwest = require("reqwest")
const winWidthIs = window.innerWidth
const winHeightIs = window.innerHeight
let emitter = new Events()
function Events(target) {
    let events = {}, empty = []
    target = target || this
    target.on = function(type, func, ctx) {
        (events[ type ] = events[ type ] || []).push([func, ctx])
    }
    target.off = function(type, func) {
        type || (events = {})
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while (i--) func == list[ i ][ 0 ] && list.splice(i, 1)
    }
    target.emit = function(type) {
        let e = events[ type ] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i = 0, j
        while (j = list[ i++ ]) j[ 0 ].apply(j[ 1 ], empty.slice.call(arguments, 1))
    }
}
function getData(url) {
    return new Promise((resolve)=>{
        reqwest({
            url:  url,
            method:  "get",
            error: err => {
                console.log(err)
                resolve(null)
            },
            success: incoming=> {
                resolve(incoming)
            }
        })
    })
}
function postData(url, data) {
    return new Promise((resolve)=>{
        reqwest({
            url,
            data,
            method:  "post",
            error: (err) => {
                console.log(err)
                resolve(null)
            },
            success: (incoming)=> {
                resolve(incoming)
            }
        })
    })
}
function getHeightPx(incomingPercent = 1) {
    return Math.floor(R.divide(winHeightIs, 100) * incomingPercent)
}
function getWidthPx(incomingPercent = 1) {
    return Math.floor(R.divide(winWidthIs, 100) * incomingPercent)
}
function getPercent(incomingPercent, whole) {
    return Math.floor(R.divide(whole, 100) * incomingPercent)
}
function getPercentRaw(incomingPercent, whole) {
    return Math.floor(R.divide(whole, 100) * incomingPercent)
}
function divide(part, whole) {
    return Math.floor(R.divide(part, whole))
}
function getPart(part, whole) {
    return Math.floor(R.divide(part, whole) * 100)
}
function randomSeed() {
    let willReturn = ""
    let data = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 3; i++) {
        willReturn += data.charAt(Math.floor(Math.random() * data.length))
    }
    return willReturn
}
function shuffle(array) {
    let counter = array.length
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--
        let temp = array[ counter ]
        array[ counter ] = array[ index ]
        array[ index ] = temp
    }
    return array
}
function isUniq(obj) {
    let arr = R.split(" ", obj[ "dePart" ])
    return R.uniq(arr).length === arr.length
}
function log(data) {
    switch (R.type(data)) {
    case "String":
        console.log(`||| ${data} |||`)
        break
    case "Object":
        console.dir(data)
        break
    default:
        console.log(data)
    }
}
function addProp(singleProp, defaultValue, arr) {
    return R.compose(R.map(val=>{
        if (val[ singleProp ] === undefined) {
            val[ singleProp ] = defaultValue
        }
        return val
    }))(arr)
}
function setProp(singleProp, value, arr) {
    return R.compose(R.map(val=>{
        val[ singleProp ] = value
        return val
    }))(arr)
}
let fontValueFn = R.cond([
    [R.gte(30), R.always(250)],
    [R.both(R.lt(30), R.gte(48)), R.always(185)],
    [R.T, R.always(125)]
])
let lineHeightFn = R.cond([
    [R.equals(250), R.always(1.5)],
    [R.equals(185), R.always(2)],
    [R.T, R.always(3)]
])
function hideTail(str) {
    return `${R.head(str)}${R.compose(R.join(""), R.repeat("."), R.length, R.tail)(str)}`
}
function easyGermanSymbol(keyIs) {
    if (keyIs === "ä") {
        return "a"
    } else if (keyIs === "ö") {
        return "o"
    } else if (keyIs === "ü") {
        return "u"
    } else if (keyIs === "ß") {
        return "s"
    } else {
        return false
    }
}
function returnEasyStyleGerman(keyIs) {
    if (keyIs === "ä") {
        return "a"
    } else if (keyIs === "ö") {
        return "o"
    } else if (keyIs === "ü") {
        return "u"
    } else if (keyIs === "ß") {
        return "s"
    } else {
        return keyIs
    }
}
function returnOldStyleGerman(keyIs) {
    if (keyIs === "ä") {
        return "ae"
    } else if (keyIs === "ö") {
        return "oe"
    } else if (keyIs === "ü") {
        return "ue"
    } else if (keyIs === "ß") {
        return "ss"
    } else {
        return keyIs
    }
}
function randomIndex(arr) {
    if (R.type(arr) === "Array" && arr.length > 0) {
        return shuffle(arr)[ 0 ]
    } else {return null}
}
function addFullstop(str) {
    let lastChar = R.last(str.trim())
    let punctuationArr = [".", "?", "!"]
    if (R.indexOf(lastChar, punctuationArr) === -1 && lastChar !== "") {
        return `${str.trim()}.`
    } else {
        return str.trim()
    }
}
function removePunctuation(str) {
    return {cleanStr: R.replace(/\.|\!|\,|\-|\?/, "", str), removedChar:  R.match(/\.|\!|\,|\-|\?/, str)}
}
function addWhitespace(str, length) {
    if (str.length < length) {
        return `${str}${R.compose(R.join(""), R.repeat("_"))(length - str.length)}|`
    } else {return str}
}
module.exports.addWhitespace = addWhitespace
module.exports.removePunctuation = removePunctuation
module.exports.addFullstop = addFullstop
module.exports.randomIndex = randomIndex
module.exports.returnEasyStyleGerman = returnEasyStyleGerman
module.exports.returnOldStyleGerman = returnOldStyleGerman
module.exports.easyGermanSymbol = easyGermanSymbol
module.exports.hideTail = hideTail
module.exports.fontValueFn = fontValueFn
module.exports.lineHeightFn = lineHeightFn
module.exports.setProp = setProp
module.exports.addProp = addProp
module.exports.log = log
module.exports.getData = getData
module.exports.postData = postData
module.exports.shuffle = shuffle
module.exports.getPercentRaw = getPercentRaw
module.exports.getPercent = getPercent
module.exports.getPart = getPart
module.exports.divide = divide
module.exports.isUniq = isUniq
module.exports.emitter = emitter
module.exports.getHeightPx = getHeightPx
module.exports.getWidthPx = getWidthPx
module.exports.randomSeed = randomSeed
module.exports.winWidthIs = winWidthIs
module.exports.winHeightIs = winHeightIs
module.exports.hapi = "http://localhost:3000"
