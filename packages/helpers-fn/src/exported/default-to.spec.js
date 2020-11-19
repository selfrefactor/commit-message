import { defaultTo } from "./default-to";

const KEY = "FOO";

test("happy", () => {
  expect(defaultTo(KEY, 1)).toMatchInlineSnapshot(`1`);
  process.env[KEY] = "2";
  expect(defaultTo(KEY, 1)).toMatchInlineSnapshot(`"2"`);
  process.env[KEY] = undefined;
});

describe("mode - onoff", () => {
  test("default is true", () => {
    expect(defaultTo(KEY, true, "onoff")).toMatchInlineSnapshot(`true`);
    process.env[KEY] = "ON";
    expect(defaultTo(KEY, true, "onoff")).toMatchInlineSnapshot(`true`);
    process.env[KEY] = "OFF";
    expect(defaultTo(KEY, true, "onoff")).toMatchInlineSnapshot(`false`);
    process.env[KEY] = undefined;
  });
  test("default is false", () => {
    expect(defaultTo(KEY, false, "onoff")).toMatchInlineSnapshot(`false`);
    process.env[KEY] = "ON";
    expect(defaultTo(KEY, false, "onoff")).toMatchInlineSnapshot(`true`);
    process.env[KEY] = "OFF";
    expect(defaultTo(KEY, false, "onoff")).toMatchInlineSnapshot(`false`);
    process.env[KEY] = undefined;
  });
});
