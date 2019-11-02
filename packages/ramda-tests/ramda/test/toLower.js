var R = require('../../../../..'../../../../../rambda/dist/rambda.js'');
var eq = require('./shared/eq');


describe('toLower', function() {
  it('returns the lower-case equivalent of the input string', function() {
    eq(R.toLower('XYZ'), 'xyz');
  });

});
