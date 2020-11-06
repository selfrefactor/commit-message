import { indentRight } from "./indentRight";

test("happy", () => {
  expect(indentRight("foo\n   bar\nbaz", 4)).toMatchInlineSnapshot(`
    "foo    
       bar    
    baz    "
  `);
});
