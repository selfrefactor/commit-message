"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const fs_extra_1 = require("fs-extra");
const jsonFormat = require("json-format");
const log_1 = require("log");
const path_1 = require("path");
const rambdax_1 = require("rambdax");
exports.beforeEnd = async (input) => {
    const filePath = path_1.join(process.cwd(), 'package.json');
    const lockFilePath = path_1.join(process.cwd(), 'yarn.lock');
    fs_1.unlinkSync(filePath);
    if (fs_1.existsSync(lockFilePath)) {
        fs_1.unlinkSync(lockFilePath);
    }
    const newProps = {
        dependencies: input.dependencies,
        devDependencies: input.devDependencies,
    };
    const newPackageJson = rambdax_1.merge(input.packageJson, newProps);
    fs_extra_1.writeFileSync(filePath, jsonFormat(newPackageJson));
    log_1.log('', 'info');
};
//# sourceMappingURL=beforeEnd.js.map