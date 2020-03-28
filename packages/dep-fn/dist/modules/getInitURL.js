"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const execCommand_1 = require("./helpers/execCommand");
const urlConditionFn = rambdax_1.compose(x => x === 1, rambdax_1.length, rambdax_1.match(/:/g));
function getGithubUrl(urlInput) {
    const [a] = rambdax_1.match(/github.com.{1,100}/, urlInput);
    const b = rambdax_1.replace('.git', '', a);
    const c = rambdax_1.replace('github.com:', 'github.com/', b);
    return `https://${c}`;
}
exports.getInitURL = async (dependency) => {
    const command = `npm info --json ${dependency}`;
    const packageInfoRaw = await execCommand_1.execCommand(command);
    try {
        const packageInfo = JSON.parse(packageInfoRaw);
        const url = rambdax_1.path('repository.url', packageInfo);
        if (url === undefined) {
            console.log('url === undefined');
            process.exit();
        }
        const urlGithub = getGithubUrl(url);
        const startCondition = urlGithub.startsWith('https://github.com');
        const urlCondition = urlConditionFn(urlGithub);
        if (!startCondition || !urlCondition) {
            console.log('URL issue', urlGithub, dependency);
            process.exit();
        }
        return urlGithub;
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
