const fs = require("fs");
const path = require("path");
const assert = require("assert");

const root = path.resolve(__dirname, "..");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const js = fs.readFileSync(path.join(root, "script.js"), "utf8");
const sw = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");

function expectContains(haystack, needle, label) {
    assert.ok(haystack.includes(needle), `${label} not found`);
}

expectContains(html, "id=\"weatherForm\"", "Main weather form");
expectContains(html, "id=\"cityInput\"", "City input");
expectContains(html, "id=\"languageSelect\"", "Language selector");
expectContains(js, "function fetchCitySuggestions", "City suggestions fetcher");
expectContains(js, "function applyThemeByCondition", "Dynamic visual theme engine");
expectContains(js, "function extractRainChanceFromForecast", "Rain chance extractor");
expectContains(js, "applyAdaptiveLayoutMode", "Adaptive layout mode handler");
expectContains(sw, "request.mode === \"navigate\"", "Navigation-only offline fallback");
expectContains(sw, "weather-static-v3", "Updated static cache version");

console.log("Smoke static checks passed.");
