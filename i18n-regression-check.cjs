const fs = require("fs");
const path = require("path");

const projectRoot = __dirname;
const localesDir = path.join(projectRoot, "locales");
const baseLocaleFile = "pt-BR.json";

function readJson(filePath) {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
}

function sortedKeys(obj) {
    return Object.keys(obj || {}).sort((a, b) => a.localeCompare(b));
}

function diffKeys(baseKeys, targetKeys) {
    const targetSet = new Set(targetKeys);
    const baseSet = new Set(baseKeys);

    const missing = baseKeys.filter((key) => !targetSet.has(key));
    const extra = targetKeys.filter((key) => !baseSet.has(key));

    return { missing, extra };
}

function run() {
    if (!fs.existsSync(localesDir)) {
        console.error("[i18n-check] Pasta locales nao encontrada.");
        process.exit(1);
    }

    const files = fs.readdirSync(localesDir).filter((file) => file.endsWith(".json"));
    if (!files.length) {
        console.error("[i18n-check] Nenhum locale JSON encontrado.");
        process.exit(1);
    }

    if (!files.includes(baseLocaleFile)) {
        console.error(`[i18n-check] Locale base ausente: ${baseLocaleFile}`);
        process.exit(1);
    }

    const basePath = path.join(localesDir, baseLocaleFile);
    const baseJson = readJson(basePath);
    const baseKeys = sortedKeys(baseJson);

    let hasBlockingIssues = false;

    console.log(`[i18n-check] Base: ${baseLocaleFile} (${baseKeys.length} chaves)`);

    files.forEach((fileName) => {
        const targetPath = path.join(localesDir, fileName);
        const targetJson = readJson(targetPath);
        const targetKeys = sortedKeys(targetJson);
        const { missing, extra } = diffKeys(baseKeys, targetKeys);

        const status = missing.length ? "FAIL" : "OK";
        console.log(`- ${fileName}: ${status} | missing=${missing.length} | extra=${extra.length}`);

        if (missing.length) {
            hasBlockingIssues = true;
            console.log(`  missing keys: ${missing.join(", ")}`);
        }

        if (extra.length) {
            console.log(`  extra keys: ${extra.join(", ")}`);
        }
    });

    if (hasBlockingIssues) {
        console.error("[i18n-check] Regressao detectada: existem chaves faltando.");
        process.exit(1);
    }

    console.log("[i18n-check] OK: todos os locais possuem as chaves base.");
}

run();
