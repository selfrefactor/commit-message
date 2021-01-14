"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = void 0;
const beforeEnd_1 = require("./modules/beforeEnd");
const getUpdateDependencies_1 = require("./modules/getUpdateDependencies");
const getDependencies_1 = require("./modules/helpers/getDependencies");
async function update() {
    const { devDependencies, dependencies, peerDependencies, packageJson, } = getDependencies_1.getDependencies();
    const updatedDependencies = await getUpdateDependencies_1.getUpdateDependencies(dependencies);
    const updatedDevDependencies = await getUpdateDependencies_1.getUpdateDependencies(devDependencies);
    const updatedPeerDependencies = await getUpdateDependencies_1.getUpdateDependencies(peerDependencies);
    beforeEnd_1.beforeEnd({
        dependencies: updatedDependencies,
        devDependencies: updatedDevDependencies,
        packageJson: packageJson,
        peerDependencies: updatedPeerDependencies,
    });
}
exports.update = update;
