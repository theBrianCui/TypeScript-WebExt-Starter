const cpx = require("cpx");
const rollup = require("rollup");
const tsPlugin = require("rollup-plugin-typescript2");
const commonjs = require("rollup-plugin-commonjs");
const resolve = require("rollup-plugin-node-resolve");

const BASE_SRC_PATH = "src/";
const BASE_BUILD_PATH = "build/";

const inputConfigs = ["popup/popup.ts", "content/content.ts"]
    .map(file => [
        {
            input: BASE_SRC_PATH + file,
            plugins: [resolve(), commonjs(), tsPlugin()],
        },
        {
            file: BASE_BUILD_PATH + file.substring(0, file.length - 2) + "js",
            format: "umd",
        },
    ]);

async function build(config) {
    const bundle = await rollup.rollup(config[0]);
    await bundle.write(config[1]);
}

inputConfigs.forEach(config => build(config));
cpx.copy(BASE_SRC_PATH + "**/*.{css,html,jpg,png}", BASE_BUILD_PATH);
cpx.copy(BASE_SRC_PATH + "manifest.json", BASE_BUILD_PATH);
