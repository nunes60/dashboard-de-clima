const http = require("http");

const PORT = Number(process.env.PORT || 8787);
const API_KEY = process.env.OPENWEATHER_API_KEY || "";

if (!API_KEY) {
    console.error("Missing OPENWEATHER_API_KEY environment variable.");
    process.exit(1);
}

const routeMap = {
    "/api/weather": "https://api.openweathermap.org/data/2.5/weather",
    "/api/forecast": "https://api.openweathermap.org/data/2.5/forecast",
    "/api/onecall": "https://api.openweathermap.org/data/3.0/onecall",
    "/api/aqi": "https://api.openweathermap.org/data/2.5/air_pollution",
    "/api/geocoding": "https://api.openweathermap.org/geo/1.0/direct",
    "/api/reverse-geocoding": "https://api.openweathermap.org/geo/1.0/reverse"
};

function sendJson(response, statusCode, payload) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
    });
    response.end(JSON.stringify(payload));
}

const server = http.createServer(async (request, response) => {
    if (request.method === "OPTIONS") {
        response.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type"
        });
        response.end();
        return;
    }

    if (request.method !== "GET") {
        sendJson(response, 405, { error: "Method not allowed" });
        return;
    }

    const incomingUrl = new URL(request.url, `http://${request.headers.host}`);
    const targetBase = routeMap[incomingUrl.pathname];

    if (!targetBase) {
        sendJson(response, 404, { error: "Route not found" });
        return;
    }

    const params = new URLSearchParams(incomingUrl.searchParams);
    params.delete("appid");
    params.set("appid", API_KEY);

    const targetUrl = `${targetBase}?${params.toString()}`;

    try {
        const upstreamResponse = await fetch(targetUrl);
        const contentType = upstreamResponse.headers.get("content-type") || "application/json; charset=utf-8";
        const body = await upstreamResponse.text();

        response.writeHead(upstreamResponse.status, {
            "Content-Type": contentType,
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-store"
        });
        response.end(body);
    } catch (error) {
        sendJson(response, 502, {
            error: "Upstream weather provider unavailable",
            detail: error instanceof Error ? error.message : "Unknown error"
        });
    }
});

server.listen(PORT, () => {
    console.log(`Weather proxy running at http://localhost:${PORT}`);
});
