const { getStagedFiles } = require("./get-staged-files");

test("happy", async () => {
  const result = await getStagedFiles(process.cwd());
  expect(result).toMatchInlineSnapshot(`
    Array [
      "packages/helpers-fn/package.json",
      "packages/helpers-fn/src/exported/get-staged-files.js",
      "packages/helpers-fn/src/exported/get-staged-files.spec.js",
    ]
  `);
});
