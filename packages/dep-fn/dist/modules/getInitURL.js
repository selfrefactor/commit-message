"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambdax_1 = require("rambdax");
const execCommand_1 = require("./helpers/execCommand");
const urlConditionFn = rambdax_1.compose(x => x === 1, rambdax_1.length, rambdax_1.match(/:/g));
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
        const urlGithub = rambdax_1.compose(x => `https://${x}`, rambdax_1.replace('github.com:', 'github.com/'), rambdax_1.replace('.git', ''), rambdax_1.head, rambdax_1.identity, rambdax_1.match(/github.com.{1,100}/))(url);
        const startCondition = urlGithub.startsWith('https://github.com');
        const urlCondition = urlConditionFn(urlGithub);
        if (!startCondition || !urlCondition) {
            console.log('URL issue', urlGithub, dependency);
            process.exit();
        }
        return urlGithub;
    }
    catch (error) {
        rambdax_1.debug(error);
    }
};
//# sourceMappingURL=getInitURL.js.map