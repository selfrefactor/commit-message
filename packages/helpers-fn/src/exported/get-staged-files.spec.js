const { getStagedFiles } = require("./get-staged-files");

test("happy", async () => {
  const getStagedFilesResult = await getStagedFiles(process.cwd());
  console.log({getStagedFilesResult})
});
