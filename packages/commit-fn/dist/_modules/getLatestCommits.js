"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLatestCommits = void 0;
const helpers_fn_1 = require("helpers-fn");
const rambda_1 = require("rambda");
const fs_1 = require("fs");
const nonCommitPrefixes = ['commit', 'Author:', 'Date:'];
const COMMITS_OUTPUT = `${__dirname}/commits.txt`;
/*
  DEPRECATED
*/
async function getLatestCommits(dir) {
    await helpers_fn_1.exec({
        command: `git log -3 > ${COMMITS_OUTPUT}`,
        onLog: () => { },
        cwd: dir,
    });
    const latestCommitsRaw = fs_1.readFileSync(COMMITS_OUTPUT).toString();
    const latestCommits = latestCommitsRaw
        .split('\n')
        .filter(line => rambda_1.all(prefix => !line.startsWith(prefix), nonCommitPrefixes))
        .filter(Boolean)
        .map(x => x.trim())
        .reverse();
    return latestCommits;
}
exports.getLatestCommits = getLatestCommits;
//# sourceMappingURL=getLatestCommits.js.map