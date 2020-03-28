"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
exports.getDependencies = () => {
    const filePath = path_1.join(process.cwd(), 'package.json');
    if (!fs_1.existsSync(filePath)) {
        throw `filePath ${filePath} doesn't exists`;
    }
    const packageJson = fs_extra_1.readJsonSync(filePath);
    const dependencies = rambdax_1.defaultTo({}, packageJson.dependencies);
    const devDependencies = rambdax_1.defaultTo({}, packageJson.devDependencies);
    const peerDependencies = rambdax_1.defaultTo({}, packageJson.peerDependencies);
    return {
        dependencies,
        devDependencies,
        packageJson,
        peerDependencies,
    };
};
