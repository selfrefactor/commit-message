"use strict";
exports.__esModule = true;
var rambda_1 = require("rambda");
var a = rambda_1.reject(function (a, c) { return a > 1; }, [1, 2, 3]);
function fn(input) {
    return input.c ? input.a : input.b;
}
var curried = rambda_1.partialCurry(fn, { a: 1, b: 'foo' });
curried; // $ExpectType (input: Pick<Input, "c">) => string | number
var result = curried({ c: false });
result; // $ExpectType string | number
// const partialInput = {a:1}
// type B = Exclude<keyof Input, keyof PartialInput>
