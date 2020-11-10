import { toFixedLineLength } from "./toFixedLineLength.js";

test("happy", () => {
  expect(toFixedLineLength("foo\n      bar\nbaz", 8)).toMatchInlineSnapshot(`
    "foo     
          bar
    baz     "
  `);
});
