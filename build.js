const cpx = require("cpx");
const rollup = require("rollup");
const tsPlugin = require("rollup-plugin-typescript2");

const BASE_SRC_PATH = "src/";
const BASE_BUILD_PATH = "build/";

const inputConfigs = ["popup/popup.ts", "content/content.ts"]
    .map(file => [
        {
            input: BASE_SRC_PATH + file,
            plugins: [tsPlugin()],
        },
        {
            file: BASE_BUILD_PATH + file,
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
