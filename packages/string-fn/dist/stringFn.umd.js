(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.StringFn = {}));
}(this, (function (exports) { 'use strict';

  function between(str, left, rightRaw) {
    const right = rightRaw === undefined ? left : rightRaw;
    const rightIndex = str.lastIndexOf(right);
    const leftIndex = str.indexOf(left);
    return rightIndex === -1 ? str : str.substring(leftIndex + left.length, rightIndex).trim();
  }

  function type(input) {
    const typeOf = typeof input;
    if (input === null) {
      return 'Null';
    } else if (input === undefined) {
      return 'Undefined';
    } else if (typeOf === 'boolean') {
      return 'Boolean';
    } else if (typeOf === 'number') {
      return Number.isNaN(input) ? 'NaN' : 'Number';
    } else if (typeOf === 'string') {
      return 'String';
    } else if (Array.isArray(input)) {
      return 'Array';
    } else if (input instanceof RegExp) {
      return 'RegExp';
    }
    const asStr = input && input.toString ? input.toString() : '';
    if (['true', 'false'].includes(asStr)) return 'Boolean';
    if (!Number.isNaN(Number(asStr))) return 'Number';
    if (asStr.startsWith('async')) return 'Async';
    if (asStr === '[object Promise]') return 'Promise';
    if (typeOf === 'function') return 'Function';
    if (input instanceof String) return 'String';
    return 'Object';
  }
  const FUNC_ERROR_TEXT = 'Expected a function';
  const HASH_UNDEFINED = '__lodash_hash_undefined__';
  const INFINITY = 1 / 0;
  const funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        symbolTag = '[object Symbol]';
  const reLeadingDot = /^\./,
        rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  const reEscapeChar = /\\(\\)?/g;
  const reIsHostCtor = /^\[object .+?Constructor\]$/;
  const freeGlobal = typeof global === 'object' && global && global.Object === Object && global;
  const freeSelf = typeof self === 'object' && self && self.Object === Object && self;
  const root = freeGlobal || freeSelf || Function('return this')();
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }
  function isHostObject(value) {
    let result = false;
    if (value != null && typeof value.toString !== 'function') {
      try {
        result = Boolean(String(value));
      } catch (e) {}
    }
    return result;
  }
  const arrayProto = Array.prototype,
        funcProto = Function.prototype,
        objectProto = Object.prototype;
  const coreJsData = root['__core-js_shared__'];
  const maskSrcKey = function () {
    const uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
    return uid ? 'Symbol(src)_1.' + uid : '';
  }();
  const funcToString = funcProto.toString;
  const {
    hasOwnProperty
  } = objectProto;
  const objectToString = objectProto.toString;
  const reIsNative = RegExp('^' + funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&').replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  const {
    Symbol: Symbol$1
  } = root,
        {
    splice
  } = arrayProto;
  const Map = getNative(root, 'Map'),
        nativeCreate = getNative(Object, 'create');
  const symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
        symbolToString = symbolProto ? symbolProto.toString : undefined;
  function Hash(entries) {
    let index = -1,
        length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
  }
  function hashDelete(key) {
    return this.has(key) && delete this.__data__[key];
  }
  function hashGet(key) {
    const data = this.__data__;
    if (nativeCreate) {
      const result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty.call(data, key) ? data[key] : undefined;
  }
  function hashHas(key) {
    const data = this.__data__;
    return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
  }
  function hashSet(key, value) {
    const data = this.__data__;
    data[key] = nativeCreate && value === undefined ? HASH_UNDEFINED : value;
    return this;
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype.delete = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  function ListCache(entries) {
    let index = -1;
    const length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function listCacheClear() {
    this.__data__ = [];
  }
  function listCacheDelete(key) {
    const data = this.__data__,
          index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    const lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    return true;
  }
  function listCacheGet(key) {
    const data = this.__data__,
          index = assocIndexOf(data, key);
    return index < 0 ? undefined : data[index][1];
  }
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  function listCacheSet(key, value) {
    const data = this.__data__,
          index = assocIndexOf(data, key);
    if (index < 0) {
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype.delete = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  function MapCache(entries) {
    let index = -1;
    const length = entries ? entries.length : 0;
    this.clear();
    while (++index < length) {
      const entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  function mapCacheClear() {
    this.__data__ = {
      hash: new Hash(),
      map: new (Map || ListCache)(),
      string: new Hash()
    };
  }
  function mapCacheDelete(key) {
    return getMapData(this, key).delete(key);
  }
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  function mapCacheSet(key, value) {
    getMapData(this, key).set(key, value);
    return this;
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype.delete = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  function assocIndexOf(array, key) {
    let {
      length
    } = array;
    while (length--) {
      if (eq(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }
  function baseIsNative(value) {
    if (!isObject(value) || isMasked(value)) {
      return false;
    }
    const pattern = isFunction(value) || isHostObject(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  function baseToString(value) {
    if (typeof value === 'string') {
      return value;
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : '';
    }
    const result = String(value);
    return result == '0' && 1 / value == -INFINITY ? '-0' : result;
  }
  function getMapData(map, key) {
    const data = map.__data__;
    return isKeyable(key) ? data[typeof key === 'string' ? 'string' : 'hash'] : data.map;
  }
  function getNative(object, key) {
    const value = getValue(object, key);
    return baseIsNative(value) ? value : undefined;
  }
  function isKeyable(value) {
    const type = typeof value;
    return type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean' ? value !== '__proto__' : value === null;
  }
  function isMasked(func) {
    return Boolean(maskSrcKey) && maskSrcKey in func;
  }
  var stringToPath = memoize(string => {
    string = toString(string);
    const result = [];
    if (reLeadingDot.test(string)) {
      result.push('');
    }
    string.replace(rePropName, (match, number, quote, string) => {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match);
    });
    return result;
  });
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return String(func);
      } catch (e) {}
    }
    return '';
  }
  function memoize(func, resolver) {
    if (typeof func !== 'function' || resolver && typeof resolver !== 'function') {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function () {
      const args = arguments,
            key = resolver ? resolver.apply(this, args) : args[0],
            {
        cache
      } = memoized;
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = func.apply(this, args);
      memoized.cache = cache.set(key, result);
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  function isFunction(value) {
    const tag = isObject(value) ? objectToString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }
  function isObject(value) {
    const type = typeof value;
    return Boolean(value) && (type == 'object' || type == 'function');
  }
  function isObjectLike(value) {
    return Boolean(value) && typeof value === 'object';
  }
  function isSymbol(value) {
    return typeof value === 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
  }
  function toString(value) {
    return value == null ? '' : baseToString(value);
  }
  function compose(...fns) {
    if (fns.length === 0) {
      throw new Error('compose requires at least one argument');
    }
    return (...args) => {
      const list = fns.slice();
      if (list.length > 0) {
        const fn = list.pop();
        let result = fn(...args);
        while (list.length > 0) {
          result = list.pop()(result);
        }
        return result;
      }
    };
  }
  function last(list) {
    if (typeof list === 'string') return list[list.length - 1] || '';
    return list[list.length - 1];
  }
  function baseSlice(array, start, end) {
    let index = -1;
    let {
      length
    } = array;
    end = end > length ? length : end;
    if (end < 0) {
      end += length;
    }
    length = start > end ? 0 : end - start >>> 0;
    start >>>= 0;
    const result = Array(length);
    while (++index < length) {
      result[index] = array[index + start];
    }
    return result;
  }
  function init(list) {
    if (typeof list === 'string') return list.slice(0, -1);
    return list.length ? baseSlice(list, 0, -1) : [];
  }
  function merge(obj, props) {
    if (arguments.length === 1) return _props => merge(obj, _props);
    return Object.assign({}, obj || {}, props || {});
  }
  function replace(pattern, replacer, str) {
    if (replacer === undefined) {
      return (_replacer, _str) => replace(pattern, _replacer, _str);
    } else if (str === undefined) {
      return _str => replace(pattern, replacer, _str);
    }
    return str.replace(pattern, replacer);
  }
  function range(from, to) {
    if (arguments.length === 1) return _to => range(from, _to);
    if (Number.isNaN(Number(from)) || Number.isNaN(Number(to))) {
      throw new TypeError('Both arguments to range must be numbers');
    }
    if (to < from) return [];
    const len = to - from;
    const willReturn = Array(len);
    for (let i = 0; i < len; i++) {
      willReturn[i] = from + i;
    }
    return willReturn;
  }
  function head(list) {
    if (typeof list === 'string') return list[0] || '';
    return list[0];
  }
  const charCodesString = [...range(65, 90), ...range(97, 122)];
  const charCodes = [...charCodesString, ...range(49, 57)];
  function toLower(str) {
    return str.toLowerCase();
  }
  function test(pattern, str) {
    if (arguments.length === 1) return _str => test(pattern, _str);
    if (typeof pattern === 'string') {
      throw new TypeError(`‘test’ requires a value of type RegExp as its first argument; received "${pattern}"`);
    }
    return str.search(pattern) !== -1;
  }
  function mapObject(fn, obj) {
    const willReturn = {};
    for (const prop in obj) {
      willReturn[prop] = fn(obj[prop], prop, obj);
    }
    return willReturn;
  }
  function map(fn, list) {
    if (arguments.length === 1) return _list => map(fn, _list);
    if (list === undefined) {
      return [];
    }
    if (!Array.isArray(list)) {
      return mapObject(fn, list);
    }
    let index = -1;
    const len = list.length;
    const willReturn = Array(len);
    while (++index < len) {
      willReturn[index] = fn(list[index], index);
    }
    return willReturn;
  }
  function sort(fn, list) {
    if (arguments.length === 1) return _list => sort(fn, _list);
    const arrClone = list.slice();
    return arrClone.sort(fn);
  }
  function curry(fn, args = []) {
    return (..._args) => (rest => rest.length >= fn.length ? fn(...rest) : curry(fn, rest))([...args, ..._args]);
  }
  function drop(n, listOrString) {
    if (arguments.length === 1) return _list => drop(n, _list);
    return listOrString.slice(n > 0 ? n : 0);
  }
  function dropLast(n, list) {
    if (arguments.length === 1) return _list => dropLast(n, _list);
    return n > 0 ? list.slice(0, -n) : list.slice();
  }
  function join(separator, list) {
    if (arguments.length === 1) return _list => join(separator, _list);
    return list.join(separator);
  }
  function length(list) {
    if (list == null || list.length === undefined) return NaN;
    return list.length;
  }
  function match(pattern, str) {
    if (arguments.length === 1) return _str => match(pattern, _str);
    const willReturn = str.match(pattern);
    return willReturn === null ? [] : willReturn;
  }
  function multiply(a, b) {
    if (arguments.length === 1) return _b => multiply(a, _b);
    return a * b;
  }
  function partialCurry(fn, args = {}) {
    return rest => {
      if (type(fn) === 'Async' || type(fn) === 'Promise') {
        return new Promise((resolve, reject) => {
          fn(merge(rest, args)).then(resolve).catch(reject);
        });
      }
      return fn(merge(rest, args));
    };
  }
  function reduceFn(fn, acc, list) {
    return list.reduce(fn, acc);
  }
  const reduce = curry(reduceFn);
  const product = reduce(multiply, 1);
  function split(separator, str) {
    if (arguments.length === 1) return _str => split(separator, _str);
    return str.split(separator);
  }
  function tail(list) {
    return drop(1, list);
  }
  function toUpper(str) {
    return str.toUpperCase();
  }
  function trim(str) {
    return str.trim();
  }

  const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g;
  const WORDS_EXTENDED = /[A-Z\xC0-\xD6\xD8-\xDEА-Я]?[a-z\xDF-\xF6\xF8-\xFFа-я]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])/g;
  const PUNCTUATIONSX = /[",\.\?]/g;
  const PUNCTUATIONS = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g;
  const HTML_TAGS = /<[^>]*>/g;

  function words(str) {
    return match(WORDS, str);
  }

  function wordsX(str) {
    return match(WORDS_EXTENDED, str);
  }

  function camelCase(str, extraLatin = false) {
    const method = extraLatin ? wordsX : words;
    const result = join('', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, method(str)));
    return `${toLower(head(result))}${tail(result)}`;
  }

  function count(str, substr) {
    return length(split(substr, str)) - 1;
  }

  const constantCase = (str, extraLatin = false) => {
    const method = extraLatin ? wordsX : words;
    return compose(join('_'), map(toUpper), method)(str);
  };

  function distance(a, b) {
    if (a.length === 0) {
      return b.length;
    }

    if (b.length === 0) {
      return a.length;
    }

    let i, j, prev, tmp, val;

    if (a.length > b.length) {
      tmp = a;
      a = b;
      b = tmp;
    }

    const row = Array(a.length + 1);

    for (i = 0; i <= a.length; i++) {
      row[i] = i;
    }

    for (i = 1; i <= b.length; i++) {
      prev = i;

      for (j = 1; j <= a.length; j++) {
        if (b[i - 1] === a[j - 1]) {
          val = row[j - 1];
        } else {
          val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
        }

        row[j - 1] = prev;
        prev = val;
      }

      row[a.length] = prev;
    }

    return row[a.length];
  }

  const normalizeGermanChar = char => {
    const arr = ['ä', 'ö', 'ü', 'ß'];
    const normalizedArr = ['a', 'o', 'u', 'ss'];
    const foundIndex = arr.indexOf(char);

    if (foundIndex === -1) {
      return char;
    }

    return normalizedArr[foundIndex];
  };

  const normalizeGermanWord = str => join('', map(val => normalizeGermanChar(val), split('', toLower(str))));

  function distanceGerman(a, b) {
    return distance(normalizeGermanWord(a), normalizeGermanWord(b));
  }

  function dotCase(str, extraLatin = false) {
    const method = extraLatin ? wordsX : words;
    return join('.', map(toLower, method(str)));
  }

  function glob(str, globStr) {
    const numGlobs = count(globStr, '*');

    if (numGlobs === 1) {
      if (head(globStr) === '*') {
        return str.endsWith(tail(globStr));
      } else if (last(globStr) === '*') {
        return str.startsWith(init(globStr));
      }
    } else if (numGlobs === 2 && head(globStr) === '*' && last(globStr) === '*') {
      globStr = init(tail(globStr));
      const foundIndex = str.indexOf(globStr);
      return foundIndex > 0 && foundIndex + globStr.length < str.length;
    }

    return false;
  }

  function getIndent(str) {
    const matched = str.match(/\w|\d/);
    if (matched === null) return str.length;
    return matched.index;
  }

  function indent(str, indentCount) {
    return join('\n', map(val => `${' '.repeat(indentCount)}${val}`, split('\n', str)));
  }

  function isLetter(char) {
    return test(WORDS_EXTENDED, char);
  }

  function isPunctuation(char) {
    return test(PUNCTUATIONS, char);
  }

  function kebabCase(str, extraLatin = false) {
    const method = extraLatin ? wordsX : words;
    return toLower(join('-', method(str)));
  }

  function trim$1(str) {
    return replace(/\s+/g, ' ', str).trim();
  }

  const humanLengths = {
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight'
  };
  const globs = {
    easyFive: '*123*',
    easySix: '*123**',
    easySixR: '**234*',
    easierSix: '*123**',
    easierSixR: '**234*',
    easySeven: '*1234**',
    easySevenR: '**2345*',
    easierSeven: '**234**',
    easyEight: '**2345**',
    easierEight: '**234***',
    easierEightR: '***345**',
    easyAny: len => `**${'-'.repeat(len - 5)}***`,
    easierAny: len => `***${'-'.repeat(len - 6)}***`
  };

  function chance() {
    return Math.random() > 0.49;
  }

  function getGlob(len, mode, random) {
    if (len > 8) return globs[`${mode}Any`](len);
    if (len === 5) return globs.easyFive;
    const base = `${mode}${humanLengths[len]}`;
    const maybeKey = globs[base];

    if (!random) {
      return maybeKey === undefined ? globs[`easy${humanLengths[len]}`] : maybeKey;
    }

    return globs[`${base}R`] === undefined ? maybeKey : chance() ? globs[`${base}R`] : maybeKey;
  }

  function ant(word, glob, replacer) {
    const chars = [...word];
    return chars.map((char, i) => glob[i] === '*' ? char : replacer).join('');
  }
  function maskWordHelper(word, replacer, charLimit = 4) {
    if (test(PUNCTUATIONSX, word) || word.length <= 1) {
      return word;
    }

    if (word.length < charLimit) {
      return `${head(word)}${replacer.repeat(word.length - 1)}`;
    }

    return `${head(word)}${replacer.repeat(word.length - 2)}${last(word)}`;
  }
  function maskWordHelperX({
    word,
    replacer = '_',
    easyMode = false,
    randomMode = false,
    easierMode = false,
    charLimit = 4
  }) {
    const len = word.length;
    if (!easyMode && !easierMode || len <= 4) return maskWordHelper(word, replacer, charLimit);
    const glob = getGlob(len, easyMode ? 'easy' : 'easier', randomMode);
    return ant(word, glob, replacer);
  }

  const addSpaceAroundPunctuation = sentence => sentence.replace(PUNCTUATIONSX, x => ` ${x} `);

  function maskSentence({
    charLimit = 4,
    easyMode = false,
    easierMode = false,
    randomMode = false,
    replacer = '_',
    sentence,
    words = []
  }) {
    const parsed = trim$1(addSpaceAroundPunctuation(sentence));
    const hidden = [];
    const visible = [];
    const input = {
      replacer,
      easyMode,
      randomMode,
      easierMode,
      charLimit
    };
    const easyFn = partialCurry(maskWordHelperX, input);
    const ant = easierMode || easyMode ? word => easyFn({
      word
    }) : word => maskWordHelper(word, replacer, charLimit);
    map(word => {
      const ok = words.length === 0 || words.includes(word);
      const visiblePart = ok ? ant(word) : word;
      hidden.push(word);
      visible.push(visiblePart);
    }, split(' ', parsed));
    return {
      hidden,
      visible
    };
  }

  function maskWords({
    words,
    replacer = '_',
    charLimit = 3
  }) {
    const result = map(val => maskWordHelper(val, replacer, charLimit), split(' ', words));
    return join(' ', result);
  }

  function parseInput(inputRaw) {
    if (typeof inputRaw !== 'string') throw new Error('inputRaw !== string');
    const numbers = [];
    const chars = [];
    let flag = false;
    inputRaw.split('').forEach(x => {
      if (flag && x) {
        chars.push(x);
      } else if (!flag) {
        const isNumber = Number(x) === Number(x);

        if (isNumber) {
          numbers.push(x);
        } else {
          chars.push(x);
          flag = true;
        }
      } else {
        flag = true;
      }
    });
    return {
      numbers: Number(numbers.join('')),
      chars: chars.join('')
    };
  }

  const hash = {
    1: ['s', 'seconds', 'second', 'sec'],
    60: ['m', 'minutes', 'minute', 'min'],
    3600: ['h', 'hours', 'hour'],
    86400: ['d', 'days', 'day']
  };

  function findInHash(hashKey) {
    const [found] = Object.keys(hash).filter(singleKey => hash[singleKey].includes(hashKey));
    if (!found) throw new Error('no numbers passed to `ms`');
    return found;
  }

  function ms(inputRaw) {
    const input = parseInput(inputRaw);
    const miliseconds = findInHash(input.chars);
    return Math.floor(Number(miliseconds) * 1000 * input.numbers);
  }

  function pascalCase(str, extraLatin = false) {
    const method = extraLatin ? wordsX : words;
    return join('', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, method(str)));
  }

  function removeIndent(str) {
    return join('\n', map(val => val.trimLeft(), split('\n', str)));
  }

  function reverse(str) {
    return [...str].reverse().join('');
  }

  function seoTitle(str, limit = 3) {
    const result = join(' ', map(val => {
      if (val.length >= limit) {
        return `${toUpper(head(val))}${toLower(tail(val))}`;
      }

      return val;
    }, words(str)));
    return `${toUpper(head(result))}${tail(result)}`;
  }

  const shuffleArr = arr => {
    let counter = arr.length;

    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = arr[counter];
      arr[counter] = arr[index];
      arr[index] = temp;
    }

    return arr;
  };

  function shuffle(str) {
    return join('', shuffleArr(split('', str)));
  }

  function snakeCase(str, extraLatin = false) {
    const method = extraLatin ? wordsX : words;
    return toLower(join('_', method(str)));
  }

  function splitPerLine({
    text,
    perLine = 30,
    splitChar = ' '
  }) {
    const words = text.split(splitChar);
    const toReturn = [];
    let line = '';
    words.forEach(word => {
      const newLine = line + (line === '' ? '' : ' ') + word;

      if (newLine.length >= perLine) {
        toReturn.push(line);
        line = word;
      } else {
        line = newLine;
      }
    });

    if (line !== '') {
      toReturn.push(line);
    }

    return toReturn;
  }

  const addSpaceAroundPunctuation$1 = sentence => sentence.replace(PUNCTUATIONS, match => ` ${match} `);

  function splitSentence(sentence) {
    return split(' ', trim$1(addSpaceAroundPunctuation$1(sentence)));
  }

  function stripPunctuation(str) {
    return replace(PUNCTUATIONS, '', str);
  }

  const getMaxLength = lines => {
    const [max] = sort((a, b) => a.length < b.length ? 1 : -1)(lines);
    return max.length;
  };

  const BUFFER = 3;
  function fitWithinLines({
    limit,
    perLine = 30,
    text
  }) {
    let counter = perLine;
    const len = text.length;
    let answer;

    while (counter < len) {
      counter++;
      const maybeAnswer = splitPerLine({
        text,
        perLine: counter
      });

      if (maybeAnswer.length <= limit) {
        answer = maybeAnswer;
        counter = len;
      }
    }

    if (!answer) {
      const partial = trim(dropLast(BUFFER, text));

      if (partial.length < BUFFER * 2) {
        throw new Error(`such text cannot fit within ${limit} lines`);
      }

      return fitWithinLines({
        text: partial,
        perLine,
        limit
      });
    }

    return answer;
  }

  function stripTags(str) {
    return replace(/\s+/g, ' ', replace(HTML_TAGS, ' ', str)).trim();
  }

  function mergeAll(arr) {
    let willReturn = {};
    map(val => {
      willReturn = merge(willReturn, val);
    }, arr);
    return willReturn;
  }

  function mapToObject(fn, list) {
    return mergeAll(map(fn, list));
  }

  function takeArguments(url, sep = '?', rawFlag = false) {
    const [, ...rawArguments] = url.split(sep);
    if (rawArguments.length === 0) return {};
    return mapToObject(x => {
      const [keyRaw, value] = x.split('=');
      const key = rawFlag ? keyRaw : camelCase(keyRaw);

      if (value === undefined || value === 'true') {
        return {
          [key]: true
        };
      }

      if (value === 'false') {
        return {
          [key]: false
        };
      }

      if (Number.isNaN(Number(value))) {
        return {
          [key]: value
        };
      }

      return {
        [key]: Number(value)
      };
    }, rawArguments);
  }

  function titleCase(str, extraLatin = false) {
    const method = extraLatin ? wordsX : words;
    return join(' ', map(val => `${toUpper(head(val))}${toLower(tail(val))}`, method(str)));
  }

  exports.between = between;
  exports.camelCase = camelCase;
  exports.constantCase = constantCase;
  exports.count = count;
  exports.distance = distance;
  exports.distanceGerman = distanceGerman;
  exports.dotCase = dotCase;
  exports.fitWithinLines = fitWithinLines;
  exports.getIndent = getIndent;
  exports.getMaxLength = getMaxLength;
  exports.glob = glob;
  exports.indent = indent;
  exports.isLetter = isLetter;
  exports.isPunctuation = isPunctuation;
  exports.kebabCase = kebabCase;
  exports.maskSentence = maskSentence;
  exports.maskWords = maskWords;
  exports.ms = ms;
  exports.pascalCase = pascalCase;
  exports.removeIndent = removeIndent;
  exports.reverse = reverse;
  exports.seoTitle = seoTitle;
  exports.shuffle = shuffle;
  exports.snakeCase = snakeCase;
  exports.splitPerLine = splitPerLine;
  exports.splitSentence = splitSentence;
  exports.stripPunctuation = stripPunctuation;
  exports.stripTags = stripTags;
  exports.takeArguments = takeArguments;
  exports.titleCase = titleCase;
  exports.trim = trim$1;
  exports.words = words;
  exports.wordsX = wordsX;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
