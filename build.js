const cpx = require("cpx");
const rollup = require("rollup");

async function buildPopup() {
    const inputOptions = {
        input: "src/popup/popup.js",
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
            input: "src/content/content.js",
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
