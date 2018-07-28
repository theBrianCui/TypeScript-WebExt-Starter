const cpx = require("cpx");
const rollup = require("rollup");
const tsPlugin = require("rollup-plugin-typescript2");

async function buildPopup() {
    const inputOptions = {
        input: "src/popup/popup.ts",
        plugins: [tsPlugin()],
    };
    const outputOptions = {
        file: "build/popup/popup.js",
        format: "umd",
    };

    const bundle = await rollup.rollup(inputOptions);
    await bundle.write(outputOptions);
}

async function buildContent() {
        const inputOptions = {
            input: "src/content/content.ts",
            plugins: [tsPlugin()],
        };
        const outputOptions = {
            file: "build/content/content.js",
            format: "umd",
        };

        const bundle = await rollup.rollup(inputOptions);
        await bundle.write(outputOptions);
}

buildPopup();
buildContent();
cpx.copy("src/**/*.{css,html,jpg,png,json}", "build/");
