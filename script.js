const API_KEY = "208149362cc36431e3720b25cd1fd053";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const AQI_URL = "https://api.openweathermap.org/data/2.5/air_pollution";
const ONE_CALL_URL = "https://api.openweathermap.org/data/3.0/onecall";
const OPEN_METEO_URL = "https://api.open-meteo.com/v1/forecast";
const GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct";
const REVERSE_GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/reverse";
const MAPBOX_DIRECTIONS_BASE_URL = "https://api.mapbox.com/directions/v5/mapbox";
const MAPBOX_ACCESS_TOKEN = "";
const RAINVIEWER_MAPS_URL = "https://api.rainviewer.com/public/weather-maps.json";
const OPENWEATHER_PROXY_BASE = typeof window !== "undefined" && typeof window.__WEATHER_PROXY_BASE__ === "string"
    ? window.__WEATHER_PROXY_BASE__.trim().replace(/\/+$/, "")
    : "";
const USING_OPENWEATHER_PROXY = Boolean(OPENWEATHER_PROXY_BASE);
const RAIN_RADAR_ANIMATION_INTERVAL_MS = 900;
const RAIN_RADAR_FRAME_LIMIT = 10;
const RAIN_RADAR_CACHE_TTL_MS = 6 * 60 * 1000;
const RAIN_RADAR_MIN_ZOOM = 3;
const RAIN_RADAR_MAX_ZOOM = 10;
const RAIN_RADAR_COLOR_SCHEME = 3;

const DEFAULT_CITY = "São Paulo";
const STORAGE_KEY_LAST_CITY = "weather:last-city";
const STORAGE_KEY_FAVORITES = "weather:favorites";
const STORAGE_KEY_HISTORY = "weather:history";
const STORAGE_KEY_UNITS = "weather:units";
const STORAGE_KEY_LANGUAGE = "weather:language";
const STORAGE_KEY_TRAVEL_TIMEZONES = "weather:travel-timezones";
const STORAGE_KEY_SENSITIVITY_PROFILE = "weather:sensitivity-profile";
const STORAGE_KEY_COMMUTE_ETA_HISTORY = "weather:commute-eta-history";
const STORAGE_KEY_FEATURE_FLAGS = "weather:feature-flags";
const STORAGE_KEY_TELEMETRY = "weather:telemetry";
const STORAGE_KEY_ERROR_LOG = "weather:error-log";
const MAX_FAVORITES = 8;
const MAX_HISTORY = 10;
const MAX_COMMUTE_HISTORY = 180;
const CITY_SUGGESTIONS_MIN_CHARS = 2;
const CITY_SUGGESTIONS_LIMIT = 6;
const CITY_SUGGESTIONS_DEBOUNCE_MS = 280;
const COMMUTE_DESTINATION_SUGGESTIONS_LIMIT = 6;
const COMMUTE_DESTINATION_DEBOUNCE_MS = 240;
const COMMUTE_DESTINATION_MAX_DISTANCE_KM = 85;
const COMMUTE_COMPARE_MODE_KEYS = ["departureModeCar", "departureModeMotorcycle", "departureModeTransit"];
const AUTO_REFRESH_INTERVAL_MS = 10 * 60 * 1000;
const CINEMATIC_SCENE_TIMELINE_HOURS = [3, 6, 12];
const REQUEST_CACHE_TTL_DEFAULT_MS = 18 * 1000;
const REQUEST_CACHE_MAX_ITEMS = 120;
const ERROR_LOG_MAX_ENTRIES = 40;
const TELEMETRY_MAX_EVENTS = 120;
const REQUEST_CACHE_TTL_BY_SCOPE = Object.freeze({
    locale: 12 * 60 * 1000,
    weather: 45 * 1000,
    forecast: 40 * 1000,
    onecall: 50 * 1000,
    openmeteo: 35 * 1000,
    aqi: 55 * 1000,
    geocoding: 3 * 60 * 1000,
    reverseGeocoding: 3 * 60 * 1000,
    timezone: 6 * 60 * 1000,
    mapbox: 45 * 1000,
    rainRadar: 2 * 60 * 1000,
    default: REQUEST_CACHE_TTL_DEFAULT_MS
});
const FEATURE_FLAGS_DEFAULT = Object.freeze({
    enableRequestDedupe: true,
    enableRuntimeTelemetry: true,
    enableErrorObservability: true,
    enableServiceWorker: true
});
const CONTINENT_COUNTRY_GROUPS = Object.freeze({
    africa: [
        "DZ", "AO", "BJ", "BW", "BF", "BI", "CM", "CV", "CF", "TD", "KM", "CG", "CD", "CI", "DJ",
        "EG", "GQ", "ER", "SZ", "ET", "GA", "GM", "GH", "GN", "GW", "KE", "LS", "LR", "LY",
        "MG", "MW", "ML", "MR", "MU", "MA", "MZ", "NA", "NE", "NG", "RW", "ST", "SN", "SC",
        "SL", "SO", "ZA", "SS", "SD", "TZ", "TG", "TN", "UG", "EH", "ZM", "ZW", "RE", "YT",
        "SH", "IO"
    ],
    "north-america": [
        "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM",
        "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS",
        "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"
    ],
    "south-america": [
        "AR", "BO", "BR", "CL", "CO", "EC", "FK", "GF", "GY", "PE", "PY", "SR", "UY", "VE", "GS"
    ],
    europe: [
        "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CY", "CZ", "DE", "DK", "EE",
        "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT",
        "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT",
        "RO", "RS", "RU", "SE", "SI", "SK", "SM", "SJ", "UA", "VA", "XK"
    ],
    asia: [
        "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "GE", "HK", "ID", "IL", "IN",
        "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM",
        "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH",
        "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"
    ],
    oceania: [
        "AS", "AU", "CC", "CK", "CX", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF",
        "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "SB", "TK", "TO", "TV", "UM", "VU", "WF",
        "WS"
    ]
});
const CONTINENT_FILTERS = new Set(Object.keys(CONTINENT_COUNTRY_GROUPS));
const CONTINENT_LABEL_KEYS = Object.freeze({
    africa: "continentAfrica",
    "north-america": "continentNorthAmerica",
    "south-america": "continentSouthAmerica",
    europe: "continentEurope",
    asia: "continentAsia",
    oceania: "continentOceania"
});
const CONTINENT_BY_COUNTRY = Object.freeze(Object.entries(CONTINENT_COUNTRY_GROUPS).reduce((acc, [continent, codes]) => {
    codes.forEach((code) => {
        acc[code] = continent;
    });
    return acc;
}, {}));

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const citySuggestionsEl = document.getElementById("citySuggestions");
const countryFilterSelect = document.getElementById("countryFilterSelect");
const languageSelect = document.getElementById("languageSelect");
const unitToggleButton = document.getElementById("unitToggleButton");
const geoButton = document.getElementById("geoButton");
const retryButton = document.getElementById("retryButton");
const favoriteToggleButton = document.getElementById("favoriteToggleButton");
const clearHistoryButton = document.getElementById("clearHistoryButton");
const shareTextButton = document.getElementById("shareTextButton");
const searchButton = form.querySelector('button[type="submit"]');
const compareForm = document.getElementById("compareForm");
const compareCityInput = document.getElementById("compareCityInput");
const compareCitySuggestionsEl = document.getElementById("compareCitySuggestions");
const compareResultEl = document.getElementById("compareResult");

const appTitleEl = document.getElementById("appTitle");
const appSubtitleEl = document.getElementById("appSubtitle");
const compareTitleEl = document.getElementById("compareTitle");
const compareSubtitleEl = document.getElementById("compareSubtitle");
const compareCityInputLabelEl = document.getElementById("compareCityInputLabel");
const cityInputLabelEl = document.getElementById("cityInputLabel");
const localTimeTitleEl = document.getElementById("localTimeTitle");
const sunriseTitleEl = document.getElementById("sunriseTitle");
const sunsetTitleEl = document.getElementById("sunsetTitle");
const feelsLikeTitleEl = document.getElementById("feelsLikeTitle");
const humidityTitleEl = document.getElementById("humidityTitle");
const windTitleEl = document.getElementById("windTitle");
const windGustTitleEl = document.getElementById("windGustTitle");
const pressureTitleEl = document.getElementById("pressureTitle");
const visibilityTitleEl = document.getElementById("visibilityTitle");
const rainChanceTitleEl = document.getElementById("rainChanceTitle");
const uvTitleEl = document.getElementById("uvTitle");
const aqiTitleEl = document.getElementById("aqiTitle");
const outdoorTitleEl = document.getElementById("outdoorTitle");
const hourlyTitleEl = document.getElementById("hourlyTitle");
const hourlySubtitleEl = document.getElementById("hourlySubtitle");
const hourlyTapHintEl = document.getElementById("hourlyTapHint");
const forecastTitleEl = document.getElementById("forecastTitle");
const forecastSubtitleEl = document.getElementById("forecastSubtitle");
const favoritesTitleEl = document.getElementById("favoritesTitle");
const historyTitleEl = document.getElementById("historyTitle");
const travelTimeTitleEl = document.getElementById("travelTimeTitle");
const travelTimeSubtitleEl = document.getElementById("travelTimeSubtitle");
const travelTimeListEl = document.getElementById("travelTimeList");

const statusMessage = document.getElementById("statusMessage");
const severeAlertBannerEl = document.getElementById("severeAlertBanner");
const rainSmartAlertEl = document.getElementById("rainSmartAlert");
const windSmartAlertEl = document.getElementById("windSmartAlert");
const dailySummaryTitleEl = document.getElementById("dailySummaryTitle");
const dailySummaryTextEl = document.getElementById("dailySummaryText");
const dailySummaryListEl = document.getElementById("dailySummaryList");
const cinematicSceneTitleEl = document.getElementById("cinematicSceneTitle");
const cinematicSceneTagEl = document.getElementById("cinematicSceneTag");
const cinematicSceneNarrativeEl = document.getElementById("cinematicSceneNarrative");
const cinematicSceneScoreEl = document.getElementById("cinematicSceneScore");
const cinematicSceneWhyTitleEl = document.getElementById("cinematicSceneWhyTitle");
const cinematicSceneReasonEl = document.getElementById("cinematicSceneReason");
const cinematicSceneRecommendationEl = document.getElementById("cinematicSceneRecommendation");
const cinematicSceneTimelineTitleEl = document.getElementById("cinematicSceneTimelineTitle");
const cinematicSceneTimelineEl = document.getElementById("cinematicSceneTimeline");
const departureAssistantTitleEl = document.getElementById("departureAssistantTitle");
const departureAssistantHintEl = document.getElementById("departureAssistantHint");
const departureAssistantForm = document.getElementById("departureAssistantForm");
const departurePromptLabelEl = document.getElementById("departurePromptLabel");
const departurePromptInputEl = document.getElementById("departurePromptInput");
const departureAnalyzeButtonEl = document.getElementById("departureAnalyzeButton");
const departureAssistantResultEl = document.getElementById("departureAssistantResult");
const sensitivityTitleEl = document.getElementById("sensitivityTitle");
const sensitivitySubtitleEl = document.getElementById("sensitivitySubtitle");
const sensitivitySelectLabelEl = document.getElementById("sensitivitySelectLabel");
const sensitivityProfileSelectEl = document.getElementById("sensitivityProfileSelect");
const sensitivityCurrentHintEl = document.getElementById("sensitivityCurrentHint");
const safeWindowTitleEl = document.getElementById("safeWindowTitle");
const safeWindowRangeEl = document.getElementById("safeWindowRange");
const safeWindowConfidenceEl = document.getElementById("safeWindowConfidence");
const safeWindowModeEl = document.getElementById("safeWindowMode");
const safeWindowNoteEl = document.getElementById("safeWindowNote");
const healthContextTitleEl = document.getElementById("healthContextTitle");
const healthContextListEl = document.getElementById("healthContextList");
const weeklyInsightsTitleEl = document.getElementById("weeklyInsightsTitle");
const weeklyNarrativeTitleEl = document.getElementById("weeklyNarrativeTitle");
const weeklyNarrativeTextEl = document.getElementById("weeklyNarrativeText");
const weeklyInsightsListEl = document.getElementById("weeklyInsightsList");
const commuteTitleEl = document.getElementById("commuteTitle");
const commuteSubtitleEl = document.getElementById("commuteSubtitle");
const commuteFormEl = document.getElementById("commuteForm");
const commuteDestinationLabelEl = document.getElementById("commuteDestinationLabel");
const commuteDestinationInputEl = document.getElementById("commuteDestinationInput");
const commuteDestinationSuggestionsEl = document.getElementById("commuteDestinationSuggestions");
const commuteModeLabelEl = document.getElementById("commuteModeLabel");
const commuteModeSelectEl = document.getElementById("commuteModeSelect");
const commuteAnalyzeButtonEl = document.getElementById("commuteAnalyzeButton");
const commuteResultEl = document.getElementById("commuteResult");
const forecastReliabilityTitleEl = document.getElementById("forecastReliabilityTitle");
const forecastReliabilitySubtitleEl = document.getElementById("forecastReliabilitySubtitle");
const forecastReliabilityListEl = document.getElementById("forecastReliabilityList");
const rainRadarTitleEl = document.getElementById("rainRadarTitle");
const rainRadarSubtitleEl = document.getElementById("rainRadarSubtitle");
const rainRadarFrameLabelEl = document.getElementById("rainRadarFrameLabel");
const rainRadarStatusEl = document.getElementById("rainRadarStatus");
const rainRadarMapEl = document.getElementById("rainRadarMap");
const rainRadarPreviewListEl = document.getElementById("rainRadarPreviewList");
const exposureIndexTitleEl = document.getElementById("exposureIndexTitle");
const exposureIndexBadgeEl = document.getElementById("exposureIndexBadge");
const exposureIndexSummaryEl = document.getElementById("exposureIndexSummary");
const exposureIndexDriversEl = document.getElementById("exposureIndexDrivers");

const cityNameEl = document.getElementById("cityName");
const weatherDescriptionEl = document.getElementById("weatherDescription");
const weatherIconEl = document.getElementById("weatherIcon");
const temperatureEl = document.getElementById("temperature");
const temperatureUnitEl = document.getElementById("temperatureUnit");
const feelsLikeEl = document.getElementById("feelsLike");
const feelsLikeUnitEl = document.getElementById("feelsLikeUnit");
const humidityEl = document.getElementById("humidity");
const windSpeedEl = document.getElementById("windSpeed");
const windSpeedUnitEl = document.getElementById("windSpeedUnit");
const windGustEl = document.getElementById("windGust");
const windGustUnitEl = document.getElementById("windGustUnit");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");
const rainChanceEl = document.getElementById("rainChance");
const uvIndexEl = document.getElementById("uvIndex");
const uvCardEl = document.getElementById("uvCard");
const uvLabelEl = document.getElementById("uvLabel");
const aqiCardEl = document.getElementById("aqiCard");
const aqiValueEl = document.getElementById("aqiValue");
const aqiLabelEl = document.getElementById("aqiLabel");
const aqiComponentsEl = document.getElementById("aqiComponents");
const outdoorScoreCardEl = document.getElementById("outdoorScoreCard");
const outdoorBestTimeEl = document.getElementById("outdoorBestTime");
const outdoorScoreLabelEl = document.getElementById("outdoorScoreLabel");
const outdoorTopListEl = document.getElementById("outdoorTopList");

const localTimeEl = document.getElementById("localTime");
const sunriseTimeEl = document.getElementById("sunriseTime");
const sunsetTimeEl = document.getElementById("sunsetTime");

const weatherCardEl = document.querySelector(".weather-card");
const hourlyChartEl = document.getElementById("hourlyChart");
const forecastListEl = document.getElementById("forecastList");
const favoritesListEl = document.getElementById("favoritesList");
const historyListEl = document.getElementById("historyList");
const rainLayerEl = document.getElementById("rainLayer");
const sceneMistLayerEl = document.getElementById("sceneMistLayer");
const sceneSparkLayerEl = document.getElementById("sceneSparkLayer");
const themeColorMetaEl = document.querySelector('meta[name="theme-color"]');

const THEME_CLASS_MAP = {
    sunny: "theme-sunny",
    rainy: "theme-rainy",
    cloudy: "theme-cloudy",
    snowy: "theme-snowy",
    default: "theme-default"
};

const DEFAULT_WEATHER_UI_PROFILE_KEY = "default-day";

const WEATHER_UI_BASE_CSS_VARS = Object.freeze({
    "--ui-card-bg": "rgba(255, 255, 255, 0.14)",
    "--ui-panel-bg": "color-mix(in srgb, var(--glass-effect) 80%, transparent)",
    "--ui-panel-border": "rgba(255, 255, 255, 0.24)",
    "--ui-panel-shadow": "0 14px 28px rgba(0, 0, 0, 0.14)",
    "--ui-overlay-opacity": "0",
    "--ui-overlay-bg": "transparent",
    "--ui-grain-opacity": "0",
    "--ui-rain-opacity": "0",
    "--ui-mist-opacity": "0",
    "--ui-spark-opacity": "0",
    "--ui-sun-opacity": "0",
    "--ui-sun-scale": "0.85",
    "--ui-cloud-opacity": "0",
    "--ui-moon-opacity": "0"
});

const WEATHER_UI_PROFILES = Object.freeze({
    "clear-day": {
        family: "clear",
        themeColor: "#ffb347",
        vars: {
            "--bg-color": "linear-gradient(132deg, #ff9340 0%, #ffd56c 45%, #fff2c7 100%)",
            "--text-color": "#3f2308",
            "--accent-color": "#ff9f1c",
            "--glass-effect": "rgba(255, 255, 255, 0.45)",
            "--ui-card-bg": "rgba(255, 253, 246, 0.28)",
            "--ui-panel-border": "rgba(255, 255, 255, 0.52)",
            "--ui-panel-shadow": "0 20px 45px rgba(191, 120, 26, 0.26)",
            "--ui-overlay-opacity": "0.36",
            "--ui-overlay-bg": "radial-gradient(circle at 22% 12%, rgba(255, 198, 106, 0.33), rgba(255, 198, 106, 0) 45%), radial-gradient(circle at 78% 25%, rgba(255, 229, 169, 0.28), rgba(255, 229, 169, 0) 44%)",
            "--ui-sun-opacity": "1",
            "--ui-sun-scale": "1.05",
            "--ui-mist-opacity": "0.14",
            "--ui-spark-opacity": "0.44",
            "--ui-cloud-opacity": "0.22"
        }
    },
    "clear-night": {
        family: "clear",
        themeColor: "#10223f",
        vars: {
            "--bg-color": "linear-gradient(148deg, #071228 0%, #13284f 48%, #1f3f70 100%)",
            "--text-color": "#e6efff",
            "--accent-color": "#9ec8ff",
            "--glass-effect": "rgba(12, 24, 48, 0.5)",
            "--ui-card-bg": "rgba(14, 30, 58, 0.46)",
            "--ui-panel-border": "rgba(174, 206, 255, 0.3)",
            "--ui-panel-shadow": "0 22px 48px rgba(5, 12, 30, 0.45)",
            "--ui-overlay-opacity": "0.42",
            "--ui-overlay-bg": "radial-gradient(circle at 72% 16%, rgba(171, 190, 255, 0.22), rgba(171, 190, 255, 0) 46%), linear-gradient(170deg, rgba(68, 104, 166, 0.22), rgba(68, 104, 166, 0))",
            "--ui-mist-opacity": "0.18",
            "--ui-cloud-opacity": "0.16",
            "--ui-moon-opacity": "0.9"
        }
    },
    "heat-day": {
        family: "heat",
        themeColor: "#ff8a3c",
        vars: {
            "--bg-color": "linear-gradient(145deg, #ff7f3f 0%, #ffb866 42%, #ffe6b3 100%)",
            "--text-color": "#40200b",
            "--accent-color": "#ff7f1f",
            "--glass-effect": "rgba(255, 244, 228, 0.42)",
            "--ui-card-bg": "rgba(255, 240, 219, 0.3)",
            "--ui-panel-border": "rgba(255, 214, 170, 0.6)",
            "--ui-panel-shadow": "0 18px 45px rgba(171, 83, 18, 0.28)",
            "--ui-overlay-opacity": "0.5",
            "--ui-overlay-bg": "linear-gradient(180deg, rgba(255, 150, 86, 0.26), rgba(255, 150, 86, 0))",
            "--ui-grain-opacity": "0.4",
            "--ui-sun-opacity": "1",
            "--ui-sun-scale": "1.08",
            "--ui-cloud-opacity": "0.12"
        }
    },
    "cloud-day": {
        family: "cloud",
        themeColor: "#7f8792",
        vars: {
            "--bg-color": "linear-gradient(145deg, #8f939b 0%, #717783 42%, #555d68 100%)",
            "--text-color": "#f4f2ef",
            "--accent-color": "#d4d0c8",
            "--glass-effect": "rgba(85, 89, 99, 0.34)",
            "--ui-card-bg": "rgba(79, 83, 94, 0.35)",
            "--ui-panel-border": "rgba(219, 224, 233, 0.3)",
            "--ui-panel-shadow": "0 18px 38px rgba(32, 37, 46, 0.28)",
            "--ui-overlay-opacity": "0.34",
            "--ui-overlay-bg": "linear-gradient(160deg, rgba(146, 162, 187, 0.22), rgba(146, 162, 187, 0))",
            "--ui-mist-opacity": "0.44",
            "--ui-cloud-opacity": "0.88",
            "--ui-sun-opacity": "0.2"
        }
    },
    "cloud-night": {
        family: "cloud",
        themeColor: "#313843",
        vars: {
            "--bg-color": "linear-gradient(148deg, #313843 0%, #252b34 45%, #1d232b 100%)",
            "--text-color": "#ece8e1",
            "--accent-color": "#b5c0ce",
            "--glass-effect": "rgba(33, 41, 53, 0.44)",
            "--ui-card-bg": "rgba(34, 42, 54, 0.44)",
            "--ui-panel-border": "rgba(183, 196, 214, 0.28)",
            "--ui-panel-shadow": "0 22px 45px rgba(7, 11, 20, 0.42)",
            "--ui-overlay-opacity": "0.46",
            "--ui-overlay-bg": "linear-gradient(168deg, rgba(93, 111, 140, 0.24), rgba(93, 111, 140, 0))",
            "--ui-rain-opacity": "0.08",
            "--ui-mist-opacity": "0.58",
            "--ui-cloud-opacity": "0.74",
            "--ui-moon-opacity": "0.62"
        }
    },
    "rain-day": {
        family: "rain",
        themeColor: "#27507f",
        vars: {
            "--bg-color": "linear-gradient(160deg, #27507f 0%, #2f6aa5 45%, #1a3f6f 100%)",
            "--text-color": "#dbeafe",
            "--accent-color": "#60a5fa",
            "--glass-effect": "rgba(20, 43, 72, 0.38)",
            "--ui-card-bg": "rgba(18, 44, 76, 0.4)",
            "--ui-panel-border": "rgba(157, 204, 255, 0.3)",
            "--ui-panel-shadow": "0 22px 44px rgba(8, 19, 37, 0.38)",
            "--ui-overlay-opacity": "0.46",
            "--ui-overlay-bg": "linear-gradient(170deg, rgba(94, 153, 255, 0.25), rgba(94, 153, 255, 0))",
            "--ui-grain-opacity": "0.06",
            "--ui-rain-opacity": "0.9",
            "--ui-mist-opacity": "0.4",
            "--ui-cloud-opacity": "0.7"
        }
    },
    "rain-night": {
        family: "rain",
        themeColor: "#0f2b53",
        vars: {
            "--bg-color": "linear-gradient(165deg, #07162d 0%, #0f2b53 45%, #060d1f 100%)",
            "--text-color": "#dbeafe",
            "--accent-color": "#7ab4ff",
            "--glass-effect": "rgba(12, 29, 55, 0.5)",
            "--ui-card-bg": "rgba(11, 30, 58, 0.5)",
            "--ui-panel-border": "rgba(145, 183, 235, 0.26)",
            "--ui-panel-shadow": "0 24px 52px rgba(3, 8, 18, 0.5)",
            "--ui-overlay-opacity": "0.54",
            "--ui-overlay-bg": "linear-gradient(170deg, rgba(90, 138, 216, 0.24), rgba(90, 138, 216, 0))",
            "--ui-grain-opacity": "0.08",
            "--ui-rain-opacity": "0.95",
            "--ui-mist-opacity": "0.5",
            "--ui-cloud-opacity": "0.66",
            "--ui-moon-opacity": "0.22"
        }
    },
    "storm-day": {
        family: "storm",
        themeColor: "#2e3d77",
        vars: {
            "--bg-color": "linear-gradient(165deg, #233e78 0%, #1f4d8e 35%, #1b284e 100%)",
            "--text-color": "#e6eeff",
            "--accent-color": "#aebeff",
            "--glass-effect": "rgba(22, 36, 73, 0.42)",
            "--ui-card-bg": "rgba(19, 36, 71, 0.46)",
            "--ui-panel-border": "rgba(183, 196, 255, 0.32)",
            "--ui-panel-shadow": "0 26px 56px rgba(9, 14, 36, 0.46)",
            "--ui-overlay-opacity": "0.58",
            "--ui-overlay-bg": "radial-gradient(circle at 70% 14%, rgba(188, 173, 255, 0.26), rgba(188, 173, 255, 0) 42%), linear-gradient(170deg, rgba(88, 74, 153, 0.24), rgba(88, 74, 153, 0))",
            "--ui-grain-opacity": "0.1",
            "--ui-rain-opacity": "1",
            "--ui-mist-opacity": "0.62",
            "--ui-spark-opacity": "0.78",
            "--ui-cloud-opacity": "0.78"
        }
    },
    "storm-night": {
        family: "storm",
        themeColor: "#181b3f",
        vars: {
            "--bg-color": "linear-gradient(166deg, #0b1230 0%, #171b44 42%, #070b20 100%)",
            "--text-color": "#e7ecff",
            "--accent-color": "#b6b8ff",
            "--glass-effect": "rgba(16, 20, 49, 0.55)",
            "--ui-card-bg": "rgba(15, 20, 47, 0.55)",
            "--ui-panel-border": "rgba(172, 178, 236, 0.3)",
            "--ui-panel-shadow": "0 30px 62px rgba(0, 0, 0, 0.56)",
            "--ui-overlay-opacity": "0.66",
            "--ui-overlay-bg": "radial-gradient(circle at 74% 12%, rgba(171, 154, 255, 0.32), rgba(171, 154, 255, 0) 41%), linear-gradient(170deg, rgba(65, 58, 122, 0.33), rgba(65, 58, 122, 0))",
            "--ui-grain-opacity": "0.12",
            "--ui-rain-opacity": "1",
            "--ui-mist-opacity": "0.68",
            "--ui-spark-opacity": "0.94",
            "--ui-cloud-opacity": "0.86"
        }
    },
    "snow-day": {
        family: "snow",
        themeColor: "#8bb8d8",
        vars: {
            "--bg-color": "linear-gradient(155deg, #d9ecff 0%, #b9d7f3 45%, #ecf5ff 100%)",
            "--text-color": "#0b3653",
            "--accent-color": "#58a6dd",
            "--glass-effect": "rgba(255, 255, 255, 0.42)",
            "--ui-card-bg": "rgba(234, 246, 255, 0.34)",
            "--ui-panel-border": "rgba(188, 220, 246, 0.58)",
            "--ui-panel-shadow": "0 18px 44px rgba(77, 122, 156, 0.25)",
            "--ui-overlay-opacity": "0.34",
            "--ui-overlay-bg": "linear-gradient(160deg, rgba(190, 225, 255, 0.25), rgba(190, 225, 255, 0))",
            "--ui-mist-opacity": "0.58",
            "--ui-cloud-opacity": "0.54",
            "--ui-sun-opacity": "0.28"
        }
    },
    "snow-night": {
        family: "snow",
        themeColor: "#1e4d74",
        vars: {
            "--bg-color": "linear-gradient(150deg, #0d2b44 0%, #1e4d74 45%, #113554 100%)",
            "--text-color": "#e1f1ff",
            "--accent-color": "#94d0ff",
            "--glass-effect": "rgba(16, 44, 68, 0.46)",
            "--ui-card-bg": "rgba(16, 47, 74, 0.44)",
            "--ui-panel-border": "rgba(159, 205, 236, 0.35)",
            "--ui-panel-shadow": "0 24px 52px rgba(4, 18, 32, 0.48)",
            "--ui-overlay-opacity": "0.44",
            "--ui-overlay-bg": "linear-gradient(170deg, rgba(122, 190, 236, 0.2), rgba(122, 190, 236, 0))",
            "--ui-mist-opacity": "0.64",
            "--ui-cloud-opacity": "0.48",
            "--ui-moon-opacity": "0.52"
        }
    },
    "mist-day": {
        family: "mist",
        themeColor: "#8a9fb6",
        vars: {
            "--bg-color": "linear-gradient(150deg, #95a6b9 0%, #8297ac 45%, #70869b 100%)",
            "--text-color": "#f8fbff",
            "--accent-color": "#c4d6eb",
            "--glass-effect": "rgba(83, 102, 126, 0.34)",
            "--ui-card-bg": "rgba(79, 98, 122, 0.36)",
            "--ui-panel-border": "rgba(202, 217, 235, 0.34)",
            "--ui-panel-shadow": "0 18px 42px rgba(38, 52, 70, 0.3)",
            "--ui-overlay-opacity": "0.44",
            "--ui-overlay-bg": "linear-gradient(165deg, rgba(197, 217, 240, 0.2), rgba(197, 217, 240, 0))",
            "--ui-rain-opacity": "0.12",
            "--ui-mist-opacity": "0.72",
            "--ui-cloud-opacity": "0.62",
            "--ui-sun-opacity": "0.18"
        }
    },
    "mist-night": {
        family: "mist",
        themeColor: "#324256",
        vars: {
            "--bg-color": "linear-gradient(155deg, #2f3f53 0%, #29394d 45%, #1e2c3f 100%)",
            "--text-color": "#edf4ff",
            "--accent-color": "#bfd3ee",
            "--glass-effect": "rgba(34, 48, 66, 0.48)",
            "--ui-card-bg": "rgba(31, 46, 64, 0.48)",
            "--ui-panel-border": "rgba(172, 191, 214, 0.3)",
            "--ui-panel-shadow": "0 24px 52px rgba(7, 11, 20, 0.48)",
            "--ui-overlay-opacity": "0.52",
            "--ui-overlay-bg": "linear-gradient(170deg, rgba(142, 171, 204, 0.2), rgba(142, 171, 204, 0))",
            "--ui-rain-opacity": "0.2",
            "--ui-mist-opacity": "0.8",
            "--ui-cloud-opacity": "0.66",
            "--ui-moon-opacity": "0.42"
        }
    },
    "default-day": {
        family: "default",
        themeColor: "#1f2937",
        vars: {
            "--bg-color": "linear-gradient(125deg, #0f172a 0%, #1f2937 55%, #0b1220 100%)",
            "--text-color": "#f8fafc",
            "--accent-color": "#38bdf8",
            "--glass-effect": "rgba(255, 255, 255, 0.14)",
            "--ui-card-bg": "rgba(255, 255, 255, 0.14)"
        }
    },
    "default-night": {
        family: "default",
        themeColor: "#101b31",
        vars: {
            "--bg-color": "linear-gradient(140deg, #090f1d 0%, #101b31 55%, #060d19 100%)",
            "--text-color": "#f0f6ff",
            "--accent-color": "#7eb5ff",
            "--glass-effect": "rgba(16, 27, 48, 0.42)",
            "--ui-card-bg": "rgba(16, 27, 48, 0.44)",
            "--ui-overlay-opacity": "0.3",
            "--ui-overlay-bg": "linear-gradient(170deg, rgba(103, 137, 195, 0.15), rgba(103, 137, 195, 0))",
            "--ui-mist-opacity": "0.1",
            "--ui-spark-opacity": "0.08",
            "--ui-cloud-opacity": "0.18",
            "--ui-moon-opacity": "0.7"
        }
    }
});

const PERIOD_CLASS_MAP = {
    day: "period-day",
    night: "period-night"
};

const TIME_PERIODS = [
    { labelKey: "periodMorning", startHour: 5, endHour: 11, targetHour: 9 },
    { labelKey: "periodAfternoon", startHour: 12, endHour: 17, targetHour: 15 },
    { labelKey: "periodNight", startHour: 18, endHour: 23, targetHour: 21 }
];

const AQI_MAP = {
    1: { labelKey: "aqiGood", className: "aqi-good" },
    2: { labelKey: "aqiModerate", className: "aqi-moderate" },
    3: { labelKey: "aqiPoor", className: "aqi-poor" },
    4: { labelKey: "aqiPoor", className: "aqi-poor" },
    5: { labelKey: "aqiPoor", className: "aqi-poor" }
};

const AQI_COMPONENT_LABELS = {
    pm2_5: "PM2.5",
    pm10: "PM10",
    no2: "NO2",
    o3: "O3",
    so2: "SO2",
    co: "CO"
};

const OUTDOOR_AQI_PENALTY = {
    1: 5,
    2: 15,
    3: 30,
    4: 45,
    5: 60
};

const OUTDOOR_ACTIVE_HOURS = {
    start: 6,
    end: 22
};

const DEFAULT_DEPARTURE_MODE_KEY = "departureModeGeneric";

const UV_RISK_MAP = [
    {
        min: 0,
        max: 2.9,
        className: "uv-minimal",
        labelKey: "uvRiskMinimal"
    },
    {
        min: 3,
        max: 5.9,
        className: "uv-moderate",
        labelKey: "uvRiskModerate"
    },
    {
        min: 6,
        max: 7.9,
        className: "uv-high",
        labelKey: "uvRiskHigh"
    },
    {
        min: 8,
        max: 10.9,
        className: "uv-very-high",
        labelKey: "uvRiskVeryHigh"
    },
    {
        min: 11,
        max: Number.POSITIVE_INFINITY,
        className: "uv-extreme",
        labelKey: "uvRiskExtreme"
    }
];

const DEFAULT_LANGUAGE = "pt-BR";
const SUPPORTED_LANGUAGES = Object.freeze(["pt-BR", "en", "es", "fr"]);
const LANGUAGE_TO_LOCALE_MAP = Object.freeze({
    "pt-BR": "pt-BR",
    en: "en-US",
    es: "es-ES",
    fr: "fr-FR"
});
const I18N_FILE_BY_LANGUAGE = Object.freeze({
    "pt-BR": "pt-BR.json",
    en: "en.json",
    es: "es.json",
    fr: "fr.json"
});

const translationTableCache = new Map();
const requestInFlightMap = new Map();
const requestResponseCache = new Map();
let fallbackTranslations = Object.create(null);
let activeTranslations = Object.create(null);
let featureFlags = { ...FEATURE_FLAGS_DEFAULT };
let telemetryState = { counters: {}, events: [] };
let errorLogEntries = [];

function normalizeLanguageCode(languageCode) {
    return SUPPORTED_LANGUAGES.includes(languageCode) ? languageCode : DEFAULT_LANGUAGE;
}

async function fetchTranslationTable(languageCode) {
    const normalizedCode = normalizeLanguageCode(languageCode);

    if (translationTableCache.has(normalizedCode)) {
        return translationTableCache.get(normalizedCode);
    }

    const fileName = I18N_FILE_BY_LANGUAGE[normalizedCode] || I18N_FILE_BY_LANGUAGE[DEFAULT_LANGUAGE];
    const localeFilePath = "locales/" + fileName;

    try {
        const result = await requestJsonWithPolicy(localeFilePath, {
            scope: "locale",
            cacheKey: `locale:${fileName}`,
            fetchOptions: {
                cache: "force-cache"
            }
        });
        if (!result.ok) {
            throw new Error("Could not load translation file " + fileName + " (" + result.status + ").");
        }

        const table = result.data;
        const safeTable = table && typeof table === "object" && !Array.isArray(table)
            ? table
            : Object.create(null);

        translationTableCache.set(normalizedCode, safeTable);
        return safeTable;
    } catch (error) {
        console.warn("Failed to load translation file " + fileName + ".", error);
        const emptyTable = Object.create(null);
        translationTableCache.set(normalizedCode, emptyTable);
        return emptyTable;
    }
}

async function ensureTranslationsLoaded(languageCode = currentLanguage) {
    const normalizedCode = normalizeLanguageCode(languageCode);

    if (!Object.keys(fallbackTranslations).length) {
        fallbackTranslations = await fetchTranslationTable(DEFAULT_LANGUAGE);
    }

    if (normalizedCode === DEFAULT_LANGUAGE) {
        activeTranslations = fallbackTranslations;
        return;
    }

    activeTranslations = await fetchTranslationTable(normalizedCode);

    if (!Object.keys(activeTranslations).length) {
        currentLanguage = DEFAULT_LANGUAGE;
        activeTranslations = fallbackTranslations;
    }
}

function loadFeatureFlags() {
    featureFlags = { ...FEATURE_FLAGS_DEFAULT };

    try {
        const raw = localStorage.getItem(STORAGE_KEY_FEATURE_FLAGS);
        if (!raw) {
            return;
        }

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return;
        }

        Object.keys(FEATURE_FLAGS_DEFAULT).forEach((flagName) => {
            if (typeof parsed[flagName] === "boolean") {
                featureFlags[flagName] = parsed[flagName];
            }
        });
    } catch {
        featureFlags = { ...FEATURE_FLAGS_DEFAULT };
    }
}

function isFeatureEnabled(flagName) {
    return featureFlags?.[flagName] !== false;
}

function loadTelemetryState() {
    telemetryState = { counters: {}, events: [] };

    try {
        const raw = localStorage.getItem(STORAGE_KEY_TELEMETRY);
        if (!raw) {
            return;
        }

        const parsed = JSON.parse(raw);
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return;
        }

        telemetryState = {
            counters: parsed.counters && typeof parsed.counters === "object" ? parsed.counters : {},
            events: Array.isArray(parsed.events) ? parsed.events.slice(-TELEMETRY_MAX_EVENTS) : []
        };
    } catch {
        telemetryState = { counters: {}, events: [] };
    }
}

function persistTelemetryState() {
    try {
        localStorage.setItem(STORAGE_KEY_TELEMETRY, JSON.stringify(telemetryState));
    } catch {
        // Ignora erro de storage para manter a experiencia funcional.
    }
}

function trackTelemetry(eventName, payload = null) {
    if (!isFeatureEnabled("enableRuntimeTelemetry") || typeof eventName !== "string" || !eventName.trim()) {
        return;
    }

    const safeEventName = eventName.trim();
    const nextCount = Number(telemetryState.counters[safeEventName] || 0) + 1;
    telemetryState.counters[safeEventName] = nextCount;

    telemetryState.events.push({
        event: safeEventName,
        at: Date.now(),
        payload: payload && typeof payload === "object" ? payload : null
    });

    if (telemetryState.events.length > TELEMETRY_MAX_EVENTS) {
        telemetryState.events = telemetryState.events.slice(-TELEMETRY_MAX_EVENTS);
    }

    persistTelemetryState();
}

function loadErrorLogEntries() {
    errorLogEntries = [];

    try {
        const raw = localStorage.getItem(STORAGE_KEY_ERROR_LOG);
        if (!raw) {
            return;
        }

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
            errorLogEntries = parsed.slice(-ERROR_LOG_MAX_ENTRIES);
        }
    } catch {
        errorLogEntries = [];
    }
}

function persistErrorLogEntries() {
    try {
        localStorage.setItem(STORAGE_KEY_ERROR_LOG, JSON.stringify(errorLogEntries.slice(-ERROR_LOG_MAX_ENTRIES)));
    } catch {
        // Ignora erro de storage para manter a experiencia funcional.
    }
}

function reportAppError(source, error, context = {}) {
    if (!isFeatureEnabled("enableErrorObservability")) {
        return;
    }

    const normalizedSource = typeof source === "string" && source.trim() ? source.trim() : "unknown";
    const errorMessage = error instanceof Error
        ? error.message
        : (typeof error === "string" ? error : "Unknown error");
    const stack = error instanceof Error && typeof error.stack === "string"
        ? error.stack
        : "";

    const entry = {
        at: Date.now(),
        source: normalizedSource,
        message: String(errorMessage || "Unknown error"),
        stack,
        context: context && typeof context === "object" && !Array.isArray(context) ? context : {}
    };

    errorLogEntries.push(entry);
    if (errorLogEntries.length > ERROR_LOG_MAX_ENTRIES) {
        errorLogEntries = errorLogEntries.slice(-ERROR_LOG_MAX_ENTRIES);
    }

    persistErrorLogEntries();
    trackTelemetry("app-error", { source: normalizedSource });
    console.error("[WeatherDashboard]", normalizedSource, entry.message, entry.context, stack);
}

function installGlobalErrorObservers() {
    if (!isFeatureEnabled("enableErrorObservability")) {
        return;
    }

    window.addEventListener("error", (event) => {
        reportAppError("window-error", event?.error || event?.message || "Unhandled window error", {
            fileName: event?.filename || "",
            line: Number.isFinite(event?.lineno) ? event.lineno : null,
            column: Number.isFinite(event?.colno) ? event.colno : null
        });
    });

    window.addEventListener("unhandledrejection", (event) => {
        reportAppError("unhandled-rejection", event?.reason || "Unhandled promise rejection");
    });
}

function deepCloneJsonData(value) {
    if (value === null || value === undefined) {
        return value;
    }

    try {
        return JSON.parse(JSON.stringify(value));
    } catch {
        return value;
    }
}

function getRequestScopeTtlMs(scope = "default") {
    const baseTtlMs = REQUEST_CACHE_TTL_BY_SCOPE[scope] || REQUEST_CACHE_TTL_BY_SCOPE.default || REQUEST_CACHE_TTL_DEFAULT_MS;
    return baseTtlMs;
}

function trimRequestResponseCache() {
    if (requestResponseCache.size <= REQUEST_CACHE_MAX_ITEMS) {
        return;
    }

    const sortedEntries = Array.from(requestResponseCache.entries())
        .sort((entryA, entryB) => (entryA[1]?.createdAt || 0) - (entryB[1]?.createdAt || 0));
    const overflow = requestResponseCache.size - REQUEST_CACHE_MAX_ITEMS;

    sortedEntries.slice(0, overflow).forEach(([cacheKey]) => {
        requestResponseCache.delete(cacheKey);
    });
}

function makeRequestCacheKey(scope, url, fetchOptions = {}) {
    const method = typeof fetchOptions?.method === "string" ? fetchOptions.method.toUpperCase() : "GET";
    return `${scope}:${method}:${url}`;
}

function getCachedResponseEntry(cacheKey, ttlMs) {
    const entry = requestResponseCache.get(cacheKey);
    if (!entry) {
        return null;
    }

    const ageMs = Date.now() - entry.createdAt;
    if (ageMs > ttlMs) {
        return null;
    }

    return entry;
}

async function requestJsonWithPolicy(url, options = {}) {
    const {
        scope = "default",
        cacheKey = "",
        ttlMs = null,
        dedupe = true,
        allowStaleOnError = true,
        fetchOptions = {}
    } = options;

    const resolvedTtlMs = Number.isFinite(ttlMs) ? ttlMs : getRequestScopeTtlMs(scope);
    const requestCacheKey = cacheKey || makeRequestCacheKey(scope, url, fetchOptions);
    const cachedEntry = getCachedResponseEntry(requestCacheKey, resolvedTtlMs);

    if (cachedEntry) {
        trackTelemetry("request-cache-hit", { scope });
        return {
            ok: true,
            status: 200,
            data: deepCloneJsonData(cachedEntry.data),
            cached: true,
            stale: false
        };
    }

    if (isFeatureEnabled("enableRequestDedupe") && dedupe && requestInFlightMap.has(requestCacheKey)) {
        trackTelemetry("request-dedupe-hit", { scope });
        return requestInFlightMap.get(requestCacheKey);
    }

    const effectiveFetchOptions = {
        ...fetchOptions
    };

    const pendingPromise = (async () => {
        try {
            const response = await fetch(url, effectiveFetchOptions);

            if (!response.ok) {
                trackTelemetry("request-http-error", { scope, status: response.status });
                return {
                    ok: false,
                    status: response.status,
                    data: null,
                    cached: false,
                    stale: false
                };
            }

            const data = await response.json();
            requestResponseCache.set(requestCacheKey, {
                createdAt: Date.now(),
                data: deepCloneJsonData(data)
            });
            trimRequestResponseCache();
            trackTelemetry("request-network-success", { scope });

            return {
                ok: true,
                status: response.status,
                data,
                cached: false,
                stale: false
            };
        } catch (error) {
            const staleEntry = requestResponseCache.get(requestCacheKey);
            if (allowStaleOnError && staleEntry) {
                trackTelemetry("request-stale-fallback", { scope });
                return {
                    ok: true,
                    status: 200,
                    data: deepCloneJsonData(staleEntry.data),
                    cached: true,
                    stale: true
                };
            }

            reportAppError("request-json-with-policy", error, { scope, url });
            throw error;
        } finally {
            requestInFlightMap.delete(requestCacheKey);
        }
    })();

    if (isFeatureEnabled("enableRequestDedupe") && dedupe) {
        requestInFlightMap.set(requestCacheKey, pendingPromise);
    }

    return pendingPromise;
}

function getAutoRefreshIntervalMs() {
    return AUTO_REFRESH_INTERVAL_MS;
}

async function registerServiceWorkerIfEnabled() {
    if (!isFeatureEnabled("enableServiceWorker") || !("serviceWorker" in navigator)) {
        return;
    }

    try {
        const registration = await navigator.serviceWorker.register("./service-worker.js", {
            updateViaCache: "none"
        });
        await registration.update();
        trackTelemetry("service-worker-registered");
    } catch (error) {
        reportAppError("service-worker-register", error);
    }
}

let lastRequest = null;
let currentCityName = null;
let currentSharePayload = null;
let currentWeatherSnapshot = null;
let compareWeatherSnapshot = null;
let selectedCitySuggestion = null;
let citySuggestions = [];
let activeCitySuggestionIndex = -1;
let citySuggestionsDebounceTimer = null;
let citySuggestionsRequestToken = 0;
let selectedCompareCitySuggestion = null;
let compareCitySuggestions = [];
let activeCompareCitySuggestionIndex = -1;
let compareCitySuggestionsDebounceTimer = null;
let compareCitySuggestionsRequestToken = 0;
let selectedCommuteDestinationSuggestion = null;
let commuteDestinationSuggestions = [];
let activeCommuteDestinationSuggestionIndex = -1;
let commuteDestinationSuggestionsDebounceTimer = null;
let commuteDestinationSuggestionsRequestToken = 0;
let localClockIntervalId = null;
let travelClockIntervalId = null;
let autoRefreshIntervalId = null;
let isWeatherRequestInProgress = false;
let isTravelTimezoneSyncInProgress = false;
let chartSelectedPointIndex = 0;
let travelTimezoneCache = {};
let currentUnits = "metric";
let currentLanguage = DEFAULT_LANGUAGE;
let currentCountryFilter = "auto";
let lastDepartureAssessment = null;
let lastDeparturePromptErrorCode = null;
let currentSafeWindowModeKey = DEFAULT_DEPARTURE_MODE_KEY;
let currentSensitivityProfile = "balanced";
let lastCommuteAssessment = null;
let rainRadarMap = null;
let rainRadarBaseLayer = null;
let rainRadarOverlayLayer = null;
let rainRadarFrames = [];
let rainRadarFrameIndex = -1;
let rainRadarAnimationTimer = null;
let rainRadarRequestToken = 0;
let rainRadarCache = { frames: [], fetchedAt: 0 };
let rainRadarTimezoneOffset = 0;
let currentCinematicSceneDetails = null;
let currentWeeklyNarrativeSummary = "";

function buildOpenWeatherRequestUrl(proxyPath, directBaseUrl, queryParams = {}) {
    const params = new URLSearchParams();

    Object.entries(queryParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === "") {
            return;
        }

        params.set(key, String(value));
    });

    if (!USING_OPENWEATHER_PROXY) {
        params.set("appid", API_KEY);
    }

    const base = USING_OPENWEATHER_PROXY
        ? `${OPENWEATHER_PROXY_BASE}${proxyPath}`
        : directBaseUrl;

    return `${base}?${params.toString()}`;
}

function applyAdaptiveLayoutMode() {
    if (typeof window === "undefined") {
        return;
    }

    const isMobileViewport = window.matchMedia("(max-width: 980px)").matches;
    document.body.dataset.deviceMode = isMobileViewport ? "focus-mobile" : "analytic-desktop";
}

async function init() {
    loadFeatureFlags();
    loadTelemetryState();
    loadErrorLogEntries();
    installGlobalErrorObservers();
    loadPreferences();
    await ensureTranslationsLoaded(currentLanguage);
    createRainDrops(100);
    createSceneMistPuffs(10);
    createSceneSparkParticles(28);
    bindEvents();
    renderForecastEmptyState(t("forecastEmptyIdle"));
    renderHourlyChartEmptyState(t("hourlyEmptyIdle"));
    renderSavedCityLists();
    renderTravelTimePanel();
    applyLanguageToStaticUI();
    applyAdaptiveLayoutMode();
    applyUnitLabels();
    updateUnitToggleButtonLabel();
    startTravelClock();
    startAutoRefresh();
    resetCompareState();
    updateShareButtonsState(false);
    await registerServiceWorkerIfEnabled();

    const initialCity = getLastCity() || DEFAULT_CITY;
    cityInput.value = initialCity;
    await fetchWeatherByCity(initialCity, { persist: false, trackRequest: true });
}

function bindEvents() {
    form.addEventListener("submit", handleSearch);
    geoButton.addEventListener("click", handleGeolocationSearch);
    retryButton.addEventListener("click", handleRetryRequest);
    favoriteToggleButton.addEventListener("click", handleFavoriteToggle);
    clearHistoryButton.addEventListener("click", clearHistory);
    shareTextButton.addEventListener("click", handleShareText);
    unitToggleButton.addEventListener("click", handleUnitToggle);
    countryFilterSelect.addEventListener("change", handleCountryFilterChange);
    languageSelect.addEventListener("change", handleLanguageChange);
    compareForm.addEventListener("submit", handleCompareSubmit);
    departureAssistantForm.addEventListener("submit", handleDepartureAssistantSubmit);
    commuteFormEl.addEventListener("submit", handleCommuteSubmit);
    sensitivityProfileSelectEl.addEventListener("change", handleSensitivityProfileChange);
    cityInput.addEventListener("input", handleCityInputSanitization);
    cityInput.addEventListener("keydown", handleCityInputKeydown);
    cityInput.addEventListener("focus", handleCityInputFocus);
    cityInput.addEventListener("blur", handleCityInputBlur);
    compareCityInput.addEventListener("input", handleCompareCityInputSanitization);
    compareCityInput.addEventListener("keydown", handleCompareCityInputKeydown);
    compareCityInput.addEventListener("focus", handleCompareCityInputFocus);
    compareCityInput.addEventListener("blur", handleCompareCityInputBlur);
    commuteDestinationInputEl.addEventListener("input", handleCommuteDestinationInput);
    commuteDestinationInputEl.addEventListener("keydown", handleCommuteDestinationKeydown);
    commuteDestinationInputEl.addEventListener("focus", handleCommuteDestinationFocus);
    commuteDestinationInputEl.addEventListener("blur", handleCommuteDestinationBlur);

    citySuggestionsEl.addEventListener("mousedown", handleCitySuggestionsMouseDown);
    citySuggestionsEl.addEventListener("click", handleCitySuggestionClick);
    compareCitySuggestionsEl.addEventListener("mousedown", handleCompareCitySuggestionsMouseDown);
    compareCitySuggestionsEl.addEventListener("click", handleCompareCitySuggestionClick);
    commuteDestinationSuggestionsEl.addEventListener("mousedown", handleCommuteDestinationSuggestionsMouseDown);
    commuteDestinationSuggestionsEl.addEventListener("click", handleCommuteDestinationSuggestionClick);
    document.addEventListener("click", handleDocumentClickForSuggestions);
    document.addEventListener("click", handleDocumentClickForCompareSuggestions);
    document.addEventListener("click", handleDocumentClickForCommuteSuggestions);
    window.addEventListener("resize", applyAdaptiveLayoutMode);

    favoritesListEl.addEventListener("click", handleQuickCityClick);
    historyListEl.addEventListener("click", handleQuickCityClick);
}

async function handleSearch(event) {
    event.preventDefault();
    const city = sanitizeCityInputValue(cityInput.value).trim();
    cityInput.value = city;
    hideCitySuggestions();

    if (!city) {
        setStatus(t("searchEmpty"), "error");
        return;
    }

    if (!isCityNameValid(city)) {
        setStatus(t("searchInvalid"), "error");
        return;
    }

    const shouldUseSuggestion = selectedCitySuggestion
        && normalizeCityToken(selectedCitySuggestion.name) === normalizeCityToken(city)
        && Number.isFinite(selectedCitySuggestion.lat)
        && Number.isFinite(selectedCitySuggestion.lon);

    if (shouldUseSuggestion) {
        await fetchWeatherByCoordinates(
            selectedCitySuggestion.lat,
            selectedCitySuggestion.lon,
            { locationOverride: buildLocationOverrideFromSuggestion(selectedCitySuggestion) }
        );
        return;
    }

    const resolvedSuggestion = await resolveSuggestionForSearch(city);
    if (resolvedSuggestion?.type === "single") {
        selectedCitySuggestion = resolvedSuggestion.suggestion;
        cityInput.value = resolvedSuggestion.suggestion.name;
        await fetchWeatherByCoordinates(
            resolvedSuggestion.suggestion.lat,
            resolvedSuggestion.suggestion.lon,
            { locationOverride: buildLocationOverrideFromSuggestion(resolvedSuggestion.suggestion) }
        );
        return;
    }

    if (resolvedSuggestion?.type === "ambiguous") {
        selectedCitySuggestion = null;
        cityInput.focus();
        renderCitySuggestions(resolvedSuggestion.suggestions);
        setStatus(t("searchAmbiguous"), "error");
        return;
    }

    await fetchWeatherByCity(city);
}

function handleCityInputSanitization() {
    const sanitizedValue = sanitizeCityInputValue(cityInput.value);
    if (sanitizedValue !== cityInput.value) {
        cityInput.value = sanitizedValue;
    }

    const query = cityInput.value.trim();
    if (
        selectedCitySuggestion
        && normalizeCityToken(query) !== normalizeCityToken(selectedCitySuggestion.name)
    ) {
        selectedCitySuggestion = null;
    }

    queueCitySuggestionsFetch(query);
}

function handleCompareCityInputSanitization() {
    const sanitizedValue = sanitizeCityInputValue(compareCityInput.value);
    if (sanitizedValue !== compareCityInput.value) {
        compareCityInput.value = sanitizedValue;
    }

    const query = compareCityInput.value.trim();
    if (
        selectedCompareCitySuggestion
        && normalizeCityToken(query) !== normalizeCityToken(selectedCompareCitySuggestion.name)
    ) {
        selectedCompareCitySuggestion = null;
    }

    queueCompareCitySuggestionsFetch(query);
}

function handleCityInputKeydown(event) {
    if (citySuggestionsEl.classList.contains("hidden") || !citySuggestions.length) {
        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        activeCitySuggestionIndex = (activeCitySuggestionIndex + 1) % citySuggestions.length;
        updateCitySuggestionActiveState();
        return;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        activeCitySuggestionIndex = (activeCitySuggestionIndex - 1 + citySuggestions.length) % citySuggestions.length;
        updateCitySuggestionActiveState();
        return;
    }

    if (event.key === "Enter" && activeCitySuggestionIndex >= 0) {
        event.preventDefault();
        applyCitySuggestion(citySuggestions[activeCitySuggestionIndex]);
        form.requestSubmit();
        return;
    }

    if (event.key === "Escape") {
        hideCitySuggestions();
    }
}

function handleCompareCityInputKeydown(event) {
    if (compareCitySuggestionsEl.classList.contains("hidden") || !compareCitySuggestions.length) {
        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        activeCompareCitySuggestionIndex = (activeCompareCitySuggestionIndex + 1) % compareCitySuggestions.length;
        updateCompareCitySuggestionActiveState();
        return;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        activeCompareCitySuggestionIndex = (activeCompareCitySuggestionIndex - 1 + compareCitySuggestions.length) % compareCitySuggestions.length;
        updateCompareCitySuggestionActiveState();
        return;
    }

    if (event.key === "Enter" && activeCompareCitySuggestionIndex >= 0) {
        event.preventDefault();
        applyCompareCitySuggestion(compareCitySuggestions[activeCompareCitySuggestionIndex]);
        compareForm.requestSubmit();
        return;
    }

    if (event.key === "Escape") {
        hideCompareCitySuggestions();
    }
}

function handleCityInputFocus() {
    const query = cityInput.value.trim();
    if (query.length < CITY_SUGGESTIONS_MIN_CHARS) {
        return;
    }

    if (citySuggestions.length) {
        showCitySuggestions();
        return;
    }

    queueCitySuggestionsFetch(query, true);
}

function handleCompareCityInputFocus() {
    const query = compareCityInput.value.trim();
    if (query.length < CITY_SUGGESTIONS_MIN_CHARS) {
        return;
    }

    if (compareCitySuggestions.length) {
        showCompareCitySuggestions();
        return;
    }

    queueCompareCitySuggestionsFetch(query, true);
}

function handleCityInputBlur() {
    window.setTimeout(() => {
        hideCitySuggestions();
    }, 120);
}

function handleCompareCityInputBlur() {
    window.setTimeout(() => {
        hideCompareCitySuggestions();
    }, 120);
}

function handleCommuteDestinationInput() {
    const query = String(commuteDestinationInputEl.value || "").trim();
    if (
        selectedCommuteDestinationSuggestion
        && normalizeCityToken(query) !== normalizeCityToken(selectedCommuteDestinationSuggestion.value)
    ) {
        selectedCommuteDestinationSuggestion = null;
    }

    queueCommuteDestinationSuggestionsFetch(query, query.length < CITY_SUGGESTIONS_MIN_CHARS);
}

function handleCommuteDestinationKeydown(event) {
    if (commuteDestinationSuggestionsEl.classList.contains("hidden") || !commuteDestinationSuggestions.length) {
        return;
    }

    if (event.key === "ArrowDown") {
        event.preventDefault();
        activeCommuteDestinationSuggestionIndex = (activeCommuteDestinationSuggestionIndex + 1) % commuteDestinationSuggestions.length;
        updateCommuteDestinationSuggestionActiveState();
        return;
    }

    if (event.key === "ArrowUp") {
        event.preventDefault();
        activeCommuteDestinationSuggestionIndex = (activeCommuteDestinationSuggestionIndex - 1 + commuteDestinationSuggestions.length) % commuteDestinationSuggestions.length;
        updateCommuteDestinationSuggestionActiveState();
        return;
    }

    if (event.key === "Enter" && activeCommuteDestinationSuggestionIndex >= 0) {
        event.preventDefault();
        applyCommuteDestinationSuggestion(commuteDestinationSuggestions[activeCommuteDestinationSuggestionIndex]);
        commuteFormEl.requestSubmit();
        return;
    }

    if (event.key === "Escape") {
        hideCommuteDestinationSuggestions();
    }
}

function handleCommuteDestinationFocus() {
    const query = String(commuteDestinationInputEl.value || "").trim();

    if (commuteDestinationSuggestions.length) {
        showCommuteDestinationSuggestions();
        return;
    }

    queueCommuteDestinationSuggestionsFetch(query, true);
}

function handleCommuteDestinationBlur() {
    window.setTimeout(() => {
        hideCommuteDestinationSuggestions();
    }, 120);
}

function handleCitySuggestionsMouseDown(event) {
    const suggestionButton = event.target.closest(".city-suggestion-item");
    if (!suggestionButton) {
        return;
    }

    event.preventDefault();
}

function handleCompareCitySuggestionsMouseDown(event) {
    const suggestionButton = event.target.closest(".city-suggestion-item");
    if (!suggestionButton) {
        return;
    }

    event.preventDefault();
}

function handleCommuteDestinationSuggestionsMouseDown(event) {
    const suggestionButton = event.target.closest(".city-suggestion-item");
    if (!suggestionButton) {
        return;
    }

    event.preventDefault();
}

function handleCitySuggestionClick(event) {
    const suggestionButton = event.target.closest(".city-suggestion-item");
    if (!suggestionButton) {
        return;
    }

    const suggestionIndex = Number(suggestionButton.dataset.index);
    const suggestion = citySuggestions[suggestionIndex];
    if (!suggestion) {
        return;
    }

    applyCitySuggestion(suggestion);
}

function handleCompareCitySuggestionClick(event) {
    const suggestionButton = event.target.closest(".city-suggestion-item");
    if (!suggestionButton) {
        return;
    }

    const suggestionIndex = Number(suggestionButton.dataset.index);
    const suggestion = compareCitySuggestions[suggestionIndex];
    if (!suggestion) {
        return;
    }

    applyCompareCitySuggestion(suggestion);
}

function handleCommuteDestinationSuggestionClick(event) {
    const suggestionButton = event.target.closest(".city-suggestion-item");
    if (!suggestionButton) {
        return;
    }

    const suggestionIndex = Number(suggestionButton.dataset.index);
    const suggestion = commuteDestinationSuggestions[suggestionIndex];
    if (!suggestion) {
        return;
    }

    applyCommuteDestinationSuggestion(suggestion);
}

function handleDocumentClickForSuggestions(event) {
    if (
        event.target === cityInput
        || citySuggestionsEl.contains(event.target)
    ) {
        return;
    }

    hideCitySuggestions();
}

function handleDocumentClickForCompareSuggestions(event) {
    if (
        event.target === compareCityInput
        || compareCitySuggestionsEl.contains(event.target)
    ) {
        return;
    }

    hideCompareCitySuggestions();
}

function handleDocumentClickForCommuteSuggestions(event) {
    if (
        event.target === commuteDestinationInputEl
        || commuteDestinationSuggestionsEl.contains(event.target)
    ) {
        return;
    }

    hideCommuteDestinationSuggestions();
}

function sanitizeCityInputValue(value) {
    return value
        .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ\s'-]/g, "")
        .replace(/\s{2,}/g, " ");
}

function isCityNameValid(value) {
    return /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/.test(value);
}

function normalizeCityToken(value) {
    return String(value || "")
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function normalizeCountryCode(value) {
    return String(value || "").trim().toUpperCase();
}

function getContinentForCountry(countryCode) {
    const normalizedCode = normalizeCountryCode(countryCode);
    return CONTINENT_BY_COUNTRY[normalizedCode] || null;
}

function getNormalizedContinentFilter(value) {
    const normalizedValue = normalizeCityToken(value);
    return CONTINENT_FILTERS.has(normalizedValue) ? normalizedValue : null;
}

function getLocalizedContinentLabel(value) {
    const normalizedValue = normalizeCityToken(value);

    if (!normalizedValue) {
        return "";
    }

    if (normalizedValue === "auto") {
        return t("countryGlobal");
    }

    const continentKey = CONTINENT_LABEL_KEYS[normalizedValue] || normalizedValue;
    const translatedLabel = t(continentKey);

    if (translatedLabel && translatedLabel !== continentKey) {
        return translatedLabel;
    }

    if (continentKey !== normalizedValue) {
        const rawTranslatedLabel = t(normalizedValue);
        if (rawTranslatedLabel && rawTranslatedLabel !== normalizedValue) {
            return rawTranslatedLabel;
        }
    }

    return normalizedValue
        .split(/[-_]/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ");
}

function loadPreferences() {
    currentCountryFilter = "auto";
    currentUnits = getStoredPreference(STORAGE_KEY_UNITS, "metric");
    currentLanguage = getStoredPreference(STORAGE_KEY_LANGUAGE, DEFAULT_LANGUAGE);
    currentSensitivityProfile = getStoredPreference(STORAGE_KEY_SENSITIVITY_PROFILE, "balanced");
    travelTimezoneCache = getStoredTimezoneCache();

    if (!["metric", "imperial"].includes(currentUnits)) {
        currentUnits = "metric";
    }

    if (!SUPPORTED_LANGUAGES.includes(currentLanguage)) {
        currentLanguage = DEFAULT_LANGUAGE;
    }

    if (!["balanced", "heat", "rain", "wind", "air"].includes(currentSensitivityProfile)) {
        currentSensitivityProfile = "balanced";
    }

    countryFilterSelect.value = currentCountryFilter;
    languageSelect.value = currentLanguage;
    sensitivityProfileSelectEl.value = currentSensitivityProfile;
}

function getStoredPreference(key, fallbackValue) {
    try {
        const value = localStorage.getItem(key);
        return value ?? fallbackValue;
    } catch {
        return fallbackValue;
    }
}

function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Ignora erro de storage para manter a experiencia funcional.
    }
}

function t(key, params = {}) {
    const template = activeTranslations[key] ?? fallbackTranslations[key] ?? key;

    return Object.entries(params).reduce((message, [paramKey, paramValue]) => {
        return message.replaceAll(`{${paramKey}}`, String(paramValue));
    }, template);
}

function handleCountryFilterChange(event) {
    currentCountryFilter = event.target.value || "auto";

    if (cityInput.value.trim().length >= CITY_SUGGESTIONS_MIN_CHARS) {
        queueCitySuggestionsFetch(cityInput.value.trim(), true);
    }
}

async function handleLanguageChange(event) {
    currentLanguage = normalizeLanguageCode(event.target.value || DEFAULT_LANGUAGE);
    savePreference(STORAGE_KEY_LANGUAGE, currentLanguage);
    await ensureTranslationsLoaded(currentLanguage);
    languageSelect.value = currentLanguage;
    applyLanguageToStaticUI();

    const hasWeatherLoaded = cityNameEl.textContent && cityNameEl.textContent !== "--";
    if (hasWeatherLoaded) {
        await handleRetryRequest();
    }

    if (compareWeatherSnapshot) {
        renderCompareResult();
    }
}

function handleUnitToggle() {
    currentUnits = currentUnits === "metric" ? "imperial" : "metric";
    savePreference(STORAGE_KEY_UNITS, currentUnits);
    applyUnitLabels();
    updateUnitToggleButtonLabel();

    if (currentWeatherSnapshot) {
        applyCurrentSnapshotToUI();
    }

    if (compareWeatherSnapshot) {
        renderCompareResult();
    }
}

function startAutoRefresh() {
    stopAutoRefresh();
    autoRefreshIntervalId = window.setInterval(() => {
        void refreshWeatherFromLastRequest();
    }, getAutoRefreshIntervalMs());
}

function stopAutoRefresh() {
    if (autoRefreshIntervalId === null) {
        return;
    }

    window.clearInterval(autoRefreshIntervalId);
    autoRefreshIntervalId = null;
}

async function refreshWeatherFromLastRequest() {
    if (document.hidden || isWeatherRequestInProgress || !lastRequest) {
        return;
    }

    if (lastRequest.type === "coords") {
        await fetchWeatherByCoordinates(lastRequest.latitude, lastRequest.longitude, {
            persist: false,
            trackRequest: false,
            locationOverride: lastRequest.locationOverride || null,
            skipHistory: true
        });
        return;
    }

    if (lastRequest.type === "city" && typeof lastRequest.city === "string") {
        await fetchWeatherByCity(lastRequest.city, {
            persist: false,
            trackRequest: false,
            skipHistory: true
        });
    }
}

function getStoredTimezoneCache() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_TRAVEL_TIMEZONES);
        const parsed = JSON.parse(raw || "{}");
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
            return {};
        }

        return Object.entries(parsed).reduce((cache, [key, value]) => {
            if (typeof key === "string" && Number.isFinite(value)) {
                cache[key] = value;
            }
            return cache;
        }, {});
    } catch {
        return {};
    }
}

function saveTravelTimezoneCache() {
    try {
        localStorage.setItem(STORAGE_KEY_TRAVEL_TIMEZONES, JSON.stringify(travelTimezoneCache));
    } catch {
        // Ignora erro de storage para manter a experiencia funcional.
    }
}

function applyLanguageToStaticUI() {
    document.documentElement.lang = currentLanguage;
    document.title = t("appTitle");
    appTitleEl.textContent = t("appTitle");
    appSubtitleEl.textContent = t("appSubtitle");
    cityInputLabelEl.textContent = t("cityInputLabel");
    cityInput.placeholder = t("cityInputPlaceholder");
    cityInput.title = t("searchInvalid");
    compareTitleEl.textContent = t("compareTitle");
    compareSubtitleEl.textContent = t("compareSubtitle");
    compareCityInputLabelEl.textContent = t("compareInputLabel");
    compareCityInput.placeholder = t("comparePlaceholder");
    compareCitySuggestionsEl.setAttribute("aria-label", t("compareSuggestionsAriaLabel"));
    document.getElementById("compareButton").textContent = t("compareButton");
    localTimeTitleEl.textContent = t("localTimeTitle");
    sunriseTitleEl.textContent = t("sunriseTitle");
    sunsetTitleEl.textContent = t("sunsetTitle");
    feelsLikeTitleEl.textContent = t("feelsLikeTitle");
    humidityTitleEl.textContent = t("humidityTitle");
    windTitleEl.textContent = t("windTitle");
    windGustTitleEl.textContent = t("windGustTitle");
    pressureTitleEl.textContent = t("pressureTitle");
    visibilityTitleEl.textContent = t("visibilityTitle");
    rainChanceTitleEl.textContent = t("rainChanceTitle");
    uvTitleEl.textContent = t("uvTitle");
    aqiTitleEl.textContent = t("aqiTitle");
    outdoorTitleEl.textContent = t("outdoorTitle");
    hourlyTitleEl.textContent = t("hourlyTitle");
    hourlySubtitleEl.textContent = t("hourlySubtitle");
    hourlyTapHintEl.textContent = t("hourlyTapHint");
    forecastTitleEl.textContent = t("forecastTitle");
    forecastSubtitleEl.textContent = t("forecastSubtitle");
    favoritesTitleEl.textContent = t("favoritesTitle");
    historyTitleEl.textContent = t("historyTitle");
    travelTimeTitleEl.textContent = t("travelTimeTitle");
    travelTimeSubtitleEl.textContent = t("travelTimeSubtitle");
    clearHistoryButton.textContent = t("clearHistoryButton");
    searchButton.textContent = t("searchButton");
    geoButton.textContent = t("useLocationButton");
    retryButton.textContent = t("retryButton");
    shareTextButton.textContent = t("shareTextButton");
    dailySummaryTitleEl.textContent = t("dailySummaryTitle");
    dailySummaryListEl.setAttribute("aria-label", t("dailySummaryVisualLabel"));
    cinematicSceneTitleEl.textContent = t("cinematicSceneTitle");
    cinematicSceneWhyTitleEl.textContent = t("cinematicSceneWhyTitle");
    cinematicSceneTimelineTitleEl.textContent = t("cinematicSceneTimelineTitle");
    departureAssistantTitleEl.textContent = t("departureAssistantTitle");
    departureAssistantHintEl.textContent = t("departureHint");
    departurePromptLabelEl.textContent = t("departurePromptLabel");
    departurePromptInputEl.placeholder = t("departurePromptPlaceholder");
    departureAnalyzeButtonEl.textContent = t("departureAnalyzeButton");
    commuteTitleEl.textContent = t("commuteTitle");
    commuteSubtitleEl.textContent = t("commuteSubtitle");
    commuteDestinationLabelEl.textContent = t("commuteDestinationLabel");
    commuteDestinationSuggestionsEl.setAttribute("aria-label", t("commuteDestinationSuggestionsAriaLabel"));
    updateCommuteDestinationPlaceholderByCity();
    commuteModeLabelEl.textContent = t("commuteModeLabel");
    commuteAnalyzeButtonEl.textContent = t("commuteAnalyzeButton");
    forecastReliabilityTitleEl.textContent = t("forecastReliabilityTitle");
    forecastReliabilitySubtitleEl.textContent = t("forecastReliabilitySubtitle");
    rainRadarTitleEl.textContent = t("rainRadarTitle");
    rainRadarSubtitleEl.textContent = t("rainRadarSubtitle");
    exposureIndexTitleEl.textContent = t("exposureIndexTitle");
    updateCommuteModeOptionsLabel();
    sensitivityTitleEl.textContent = t("sensitivityTitle");
    sensitivitySubtitleEl.textContent = t("sensitivitySubtitle");
    sensitivitySelectLabelEl.textContent = t("sensitivitySelectLabel");
    updateSensitivityProfileOptionsLabel();
    updateSensitivityProfileHint();
    safeWindowTitleEl.textContent = t("safeWindowTitle");
    healthContextTitleEl.textContent = t("healthContextTitle");
    weeklyInsightsTitleEl.textContent = t("weeklyInsightsTitle");
    weeklyNarrativeTitleEl.textContent = t("weeklyNarrativeTitle");
    updateCountryFilterOptionsLabel();
    updateUnitToggleButtonLabel();
    updateFavoriteButtonState();
    renderSavedCityLists();
    renderTravelTimePanel();

    if (compareResultEl.classList.contains("compare-empty")) {
        compareResultEl.textContent = t("compareEmpty");
    }

    if (!currentWeatherSnapshot) {
        dailySummaryTextEl.textContent = t("dailySummaryIdle");
        dailySummaryListEl.classList.add("hidden");
        dailySummaryListEl.innerHTML = "";
        setCinematicSceneState(getDefaultCinematicSceneState());
        resetDepartureAssistantResult();
        resetCommuteState();
        resetSafeWindowState();
        resetForecastReliabilityState();
        resetRainRadarState();
        resetHealthContextState();
        resetWeeklyInsightsState();
        currentWeeklyNarrativeSummary = "";
        resetOutdoorSuggestion();
        weatherDescriptionEl.textContent = t("weatherDescriptionIdle");
        renderForecastEmptyState(t("forecastEmptyIdle"));
        renderHourlyChartEmptyState(t("hourlyEmptyIdle"));
    } else {
        updateCinematicScene(
            currentWeatherSnapshot.weatherData,
            currentWeatherSnapshot.forecastData,
            currentWeatherSnapshot.timezoneOffset,
            {
                uvIndex: currentWeatherSnapshot.oneCallInsights?.uvIndex,
                oneCallInsights: currentWeatherSnapshot.oneCallInsights,
                aqiData: currentWeatherSnapshot.aqiData,
                rainChance: currentWeatherSnapshot.rainChance
            }
        );
        void updateRainRadar(currentWeatherSnapshot);
        updateSafeWindow(currentWeatherSnapshot, currentSafeWindowModeKey);
        updateForecastReliability(currentWeatherSnapshot);
        updateHealthContext(currentWeatherSnapshot);
        updateWeeklyInsights(currentWeatherSnapshot);
        if (lastDepartureAssessment) {
            renderDepartureAssistantResult(lastDepartureAssessment);
        } else if (departureAssistantResultEl.classList.contains("departure-empty")) {
            departureAssistantResultEl.innerHTML = t("departureEmpty");
        }
        if (lastCommuteAssessment) {
            renderCommuteResult(lastCommuteAssessment);
        } else if (commuteResultEl.classList.contains("departure-empty")) {
            commuteResultEl.textContent = t("commuteEmpty");
        }

        if (document.activeElement === commuteDestinationInputEl) {
            queueCommuteDestinationSuggestionsFetch(String(commuteDestinationInputEl.value || "").trim(), true);
        }
    }
}

function updateCountryFilterOptionsLabel() {
    try {
        console.debug(`[i18n] updateCountryFilterOptionsLabel currentLanguage=${currentLanguage}`, { activeCount: Object.keys(activeTranslations).length, fallbackCount: Object.keys(fallbackTranslations).length });
    } catch (e) {
        // ignore
    }

    Array.from(countryFilterSelect.options).forEach((option) => {
        const value = String(option.value || "");
        const label = getLocalizedContinentLabel(value);

        if (label) {
            option.textContent = label;
            option.label = label;
        }
    });
}

function updateSensitivityProfileOptionsLabel() {
    const labelMap = {
        balanced: t("sensitivityBalanced"),
        heat: t("sensitivityHeat"),
        rain: t("sensitivityRain"),
        wind: t("sensitivityWind"),
        air: t("sensitivityAir")
    };

    Array.from(sensitivityProfileSelectEl.options).forEach((option) => {
        option.textContent = labelMap[option.value] || option.textContent;
    });
}

function updateCommuteModeOptionsLabel() {
    const labelMap = {
        departureModeGeneric: t("departureModeGeneric"),
        departureModeMotorcycle: t("departureModeMotorcycle"),
        departureModeBike: t("departureModeBike"),
        departureModeWalking: t("departureModeWalking"),
        departureModeRunning: t("departureModeRunning"),
        departureModeCar: t("departureModeCar"),
        departureModeTransit: t("departureModeTransit")
    };

    Array.from(commuteModeSelectEl.options).forEach((option) => {
        option.textContent = labelMap[option.value] || option.textContent;
    });
}

function updateSensitivityProfileHint() {
    const keyMap = {
        balanced: "sensitivityBalanced",
        heat: "sensitivityHeat",
        rain: "sensitivityRain",
        wind: "sensitivityWind",
        air: "sensitivityAir"
    };

    sensitivityCurrentHintEl.textContent = t("sensitivityCurrent", {
        profile: t(keyMap[currentSensitivityProfile] || "sensitivityBalanced")
    });
}

function handleSensitivityProfileChange(event) {
    const selectedProfile = event.target.value || "balanced";
    currentSensitivityProfile = ["balanced", "heat", "rain", "wind", "air"].includes(selectedProfile)
        ? selectedProfile
        : "balanced";

    savePreference(STORAGE_KEY_SENSITIVITY_PROFILE, currentSensitivityProfile);
    updateSensitivityProfileHint();

    if (!currentWeatherSnapshot) {
        return;
    }

    updateSafeWindow(currentWeatherSnapshot, currentSafeWindowModeKey);
    updateWeeklyInsights(currentWeatherSnapshot);
    refreshDepartureAssessmentFromState();
    refreshCommuteAssessmentFromState();
}

function refreshDepartureAssessmentFromState() {
    if (!currentWeatherSnapshot) {
        return;
    }

    if (!lastDepartureAssessment) {
        const prompt = String(departurePromptInputEl.value || "").trim();
        if (prompt) {
            runDepartureAssistantFromInput();
        }
        return;
    }

    const assessment = buildDepartureAssessment(currentWeatherSnapshot, {
        modeKey: lastDepartureAssessment.modeKey,
        targetUnix: lastDepartureAssessment.targetUnix
    });

    if (!assessment) {
        resetDepartureAssistantResult();
        return;
    }

    lastDepartureAssessment = assessment;
    renderDepartureAssistantResult(assessment);
}

function updateUnitToggleButtonLabel() {
    unitToggleButton.textContent = currentUnits === "metric"
        ? t("unitMetric")
        : t("unitImperial");
}

function applyUnitLabels() {
    const temperatureUnit = currentUnits === "metric" ? "°C" : "°F";
    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";

    temperatureUnitEl.textContent = temperatureUnit;
    feelsLikeUnitEl.textContent = temperatureUnit;
    windSpeedUnitEl.textContent = speedUnit;
    windGustUnitEl.textContent = speedUnit;
}

function convertTemperatureForDisplay(temperatureC) {
    if (!Number.isFinite(temperatureC)) {
        return null;
    }

    if (currentUnits === "imperial") {
        return (temperatureC * 9 / 5) + 32;
    }

    return temperatureC;
}

function formatTemperatureValue(temperatureC, fallbackValue = "--") {
    const converted = convertTemperatureForDisplay(temperatureC);
    return Number.isFinite(converted) ? Math.round(converted) : fallbackValue;
}

function convertWindForDisplay(speedKmh) {
    if (!Number.isFinite(speedKmh)) {
        return null;
    }

    if (currentUnits === "imperial") {
        return speedKmh / 1.609344;
    }

    return speedKmh;
}

function formatWindSpeedValue(speedKmh, fallbackValue = t("unavailable")) {
    const converted = convertWindForDisplay(speedKmh);
    return Number.isFinite(converted) ? Math.round(converted) : fallbackValue;
}

function applyCurrentSnapshotToUI() {
    if (!currentWeatherSnapshot) {
        return;
    }

    updateCommuteDestinationPlaceholderByCity();

    const {
        weatherData,
        forecastData,
        oneCallInsights,
        aqiData,
        rainChance,
        locationOverride,
        timezoneOffset
    } = currentWeatherSnapshot;

    updateUI(weatherData, {
        uvIndex: oneCallInsights?.uvIndex,
        rainChance,
        aqiData,
        locationOverride
    });

    updateForecastUI(forecastData, timezoneOffset);
    updateHourlyChart(forecastData, oneCallInsights, timezoneOffset);
    updateSmartRainAlert(forecastData, oneCallInsights, timezoneOffset);
    updateDailySummary(forecastData, timezoneOffset);
    updateCinematicScene(weatherData, forecastData, timezoneOffset, {
        uvIndex: oneCallInsights?.uvIndex,
        oneCallInsights,
        aqiData,
        rainChance
    });
    currentSharePayload = createSharePayload(weatherData, {
        uvIndex: oneCallInsights?.uvIndex,
        rainChance,
        aqiData,
        locationOverride
    });
    void updateRainRadar(currentWeatherSnapshot);
    updateSafeWindow(currentWeatherSnapshot, currentSafeWindowModeKey);
    updateForecastReliability(currentWeatherSnapshot);
    updateHealthContext(currentWeatherSnapshot);
    updateWeeklyInsights(currentWeatherSnapshot);
    updateOutdoorSuggestion(forecastData, oneCallInsights, aqiData, timezoneOffset);
    refreshDepartureAssessmentFromState();
    refreshCommuteAssessmentFromState();
}

function queueCitySuggestionsFetch(query, immediate = false) {
    window.clearTimeout(citySuggestionsDebounceTimer);

    if (query.length < CITY_SUGGESTIONS_MIN_CHARS || !isApiKeyConfigured()) {
        hideCitySuggestions(true);
        return;
    }

    const requestToken = ++citySuggestionsRequestToken;
    const loadSuggestions = async () => {
        const suggestions = await fetchCitySuggestions(query);
        if (requestToken !== citySuggestionsRequestToken) {
            return;
        }

        renderCitySuggestions(suggestions);
    };

    if (immediate) {
        void loadSuggestions();
        return;
    }

    citySuggestionsDebounceTimer = window.setTimeout(
        loadSuggestions,
        CITY_SUGGESTIONS_DEBOUNCE_MS
    );
}

function queueCompareCitySuggestionsFetch(query, immediate = false) {
    window.clearTimeout(compareCitySuggestionsDebounceTimer);

    if (query.length < CITY_SUGGESTIONS_MIN_CHARS || !isApiKeyConfigured()) {
        hideCompareCitySuggestions(true);
        return;
    }

    const requestToken = ++compareCitySuggestionsRequestToken;
    const loadSuggestions = async () => {
        const suggestions = await fetchCitySuggestions(query);
        if (requestToken !== compareCitySuggestionsRequestToken) {
            return;
        }

        renderCompareCitySuggestions(suggestions);
    };

    if (immediate) {
        void loadSuggestions();
        return;
    }

    compareCitySuggestionsDebounceTimer = window.setTimeout(
        loadSuggestions,
        CITY_SUGGESTIONS_DEBOUNCE_MS
    );
}

function queueCommuteDestinationSuggestionsFetch(query, immediate = false) {
    window.clearTimeout(commuteDestinationSuggestionsDebounceTimer);

    if (!currentWeatherSnapshot?.weatherData) {
        hideCommuteDestinationSuggestions(true);
        return;
    }

    const requestToken = ++commuteDestinationSuggestionsRequestToken;
    const loadSuggestions = async () => {
        const suggestions = await fetchCommuteDestinationSuggestions(query);
        if (requestToken !== commuteDestinationSuggestionsRequestToken) {
            return;
        }

        renderCommuteDestinationSuggestions(suggestions);
    };

    if (immediate) {
        void loadSuggestions();
        return;
    }

    commuteDestinationSuggestionsDebounceTimer = window.setTimeout(
        loadSuggestions,
        COMMUTE_DESTINATION_DEBOUNCE_MS
    );
}

async function fetchCommuteDestinationSuggestions(query) {
    const context = getCommuteCityContext();
    if (!context) {
        return [];
    }

    const cleanQuery = String(query || "").trim();
    const localFallback = await fetchCommuteLocalDestinationSuggestions(context);
    if (cleanQuery.length < CITY_SUGGESTIONS_MIN_CHARS) {
        return localFallback;
    }

    const candidateQueries = buildCommuteDestinationCandidateQueries(cleanQuery, context);
    const mergedSuggestions = [];

    for (const candidateQuery of candidateQueries.slice(0, 3)) {
        const suggestions = await fetchCitySuggestions(candidateQuery, { countryFilter: "auto" });
        if (Array.isArray(suggestions) && suggestions.length) {
            mergedSuggestions.push(...suggestions);
        }
    }

    const ranked = rankCommuteDestinationCandidates(mergedSuggestions, cleanQuery, context);
    const scopedRanked = ranked.filter(isSuggestionWithinCommuteScope);
    if (!scopedRanked.length) {
        return localFallback;
    }

    const scopedSuggestions = scopedRanked
        .slice(0, COMMUTE_DESTINATION_SUGGESTIONS_LIMIT)
        .map((item) => createCommuteDestinationSuggestionFromCity(item.suggestion, item.distanceKm));

    return mergeUniqueCommuteSuggestions(scopedSuggestions, localFallback)
        .slice(0, COMMUTE_DESTINATION_SUGGESTIONS_LIMIT);
}

async function fetchCommuteLocalDestinationSuggestions(context) {
    if (!context?.cityName || !Number.isFinite(context?.lat) || !Number.isFinite(context?.lon)) {
        return [];
    }

    const nearbySuggestions = await fetchNearbyLocalitySuggestions(context.lat, context.lon);

    const seedQueries = [
        context.cityName,
        context.state ? `${context.cityName}, ${context.state}` : "",
        context.country ? `${context.cityName}, ${context.country}` : ""
    ].filter(Boolean);

    const mergedSuggestions = [];
    if (nearbySuggestions.length) {
        mergedSuggestions.push(...nearbySuggestions);
    }

    for (const seedQuery of seedQueries) {
        const suggestions = await fetchCitySuggestions(seedQuery, { countryFilter: "auto" });
        if (Array.isArray(suggestions) && suggestions.length) {
            mergedSuggestions.push(...suggestions);
        }
    }

    const ranked = rankCommuteDestinationCandidates(mergedSuggestions, context.cityName, context);
    return ranked
        .filter(isSuggestionWithinCommuteScope)
        .slice(0, COMMUTE_DESTINATION_SUGGESTIONS_LIMIT)
        .map((item) => createCommuteDestinationSuggestionFromCity(item.suggestion, item.distanceKm));
}

async function fetchNearbyLocalitySuggestions(lat, lon) {
    if (!isApiKeyConfigured() || !Number.isFinite(lat) || !Number.isFinite(lon)) {
        return [];
    }

    const url = buildOpenWeatherRequestUrl("/api/reverse-geocoding", REVERSE_GEOCODING_URL, {
        lat,
        lon,
        limit: 12
    });
    try {
        const result = await requestJsonWithPolicy(url, {
            scope: "reverseGeocoding",
            cacheKey: `reverse-geocode:${lat.toFixed(3)}:${lon.toFixed(3)}`,
            allowStaleOnError: true
        });
        if (!result.ok) {
            return [];
        }

        const payload = result.data;
        if (!Array.isArray(payload)) {
            return [];
        }

        const seen = new Set();
        return payload
            .map((item) => createCitySuggestion(item))
            .filter(Boolean)
            .filter((item) => {
                const key = `${item.name}|${item.state}|${item.country}|${item.lat.toFixed(4)}|${item.lon.toFixed(4)}`;
                if (seen.has(key)) {
                    return false;
                }
                seen.add(key);
                return true;
            });
    } catch {
        return [];
    }
}

function mergeUniqueCommuteSuggestions(primarySuggestions, fallbackSuggestions) {
    const merged = [];
    const seen = new Set();

    const register = (suggestion) => {
        if (!suggestion || typeof suggestion.value !== "string") {
            return;
        }

        const key = normalizeCityToken(suggestion.value);
        if (!key || seen.has(key)) {
            return;
        }

        seen.add(key);
        merged.push(suggestion);
    };

    (primarySuggestions || []).forEach(register);
    (fallbackSuggestions || []).forEach(register);
    return merged;
}

function buildCommuteDestinationCandidateQueries(query, context) {
    const cleanQuery = String(query || "").trim();
    if (!cleanQuery) {
        return [];
    }

    const querySet = new Set();
    const normalizedQuery = normalizeCityToken(cleanQuery);
    const normalizedCity = normalizeCityToken(context?.cityName);
    const normalizedCountry = normalizeCityToken(context?.country);
    const includesCity = normalizedCity && normalizedQuery.includes(normalizedCity);
    const includesCountry = normalizedCountry && normalizedQuery.includes(normalizedCountry);

    if (includesCity || includesCountry) {
        querySet.add(cleanQuery);
    } else {
        querySet.add(buildScopedCommuteDestinationQuery(cleanQuery, context, true));
        querySet.add(buildScopedCommuteDestinationQuery(cleanQuery, context, false));
        if (context?.country) {
            querySet.add(`${cleanQuery}, ${context.country}`);
        }
        querySet.add(cleanQuery);
    }

    return Array.from(querySet)
        .map((item) => String(item || "").trim())
        .filter(Boolean);
}

function buildScopedCommuteDestinationQuery(query, context, includeCountry = true) {
    const parts = [String(query || "").trim(), context?.cityName || ""];
    if (includeCountry && context?.country) {
        parts.push(context.country);
    }

    return parts.filter(Boolean).join(", ");
}

function isSuggestionWithinCommuteScope(candidate) {
    if (!candidate || !candidate.sameCountry) {
        return false;
    }

    if (!Number.isFinite(candidate.distanceKm)) {
        return false;
    }

    return candidate.distanceKm <= COMMUTE_DESTINATION_MAX_DISTANCE_KM;
}

function getCommuteCityContext() {
    if (!currentWeatherSnapshot?.weatherData) {
        return null;
    }

    const weatherData = currentWeatherSnapshot.weatherData;
    const locationOverride = currentWeatherSnapshot.locationOverride || null;
    const cityName = typeof locationOverride?.name === "string" && locationOverride.name.trim()
        ? locationOverride.name.trim()
        : String(weatherData?.name || "").trim();
    const state = typeof locationOverride?.state === "string" ? locationOverride.state.trim() : "";
    const country = typeof locationOverride?.country === "string" && locationOverride.country.trim()
        ? locationOverride.country.trim()
        : String(weatherData?.sys?.country || "").trim();
    const lat = weatherData?.coord?.lat;
    const lon = weatherData?.coord?.lon;

    if (!cityName || !Number.isFinite(lat) || !Number.isFinite(lon)) {
        return null;
    }

    return {
        cityName,
        state,
        country,
        lat,
        lon
    };
}

function rankCommuteDestinationCandidates(suggestions, query, context) {
    if (!Array.isArray(suggestions) || !suggestions.length || !context) {
        return [];
    }

    const normalizedQuery = normalizeCityToken(query);
    const normalizedCity = normalizeCityToken(context.cityName);
    const normalizedCountry = normalizeCityToken(context.country);
    const seen = new Set();
    const ranked = [];

    suggestions.forEach((suggestion) => {
        if (!suggestion || !Number.isFinite(suggestion.lat) || !Number.isFinite(suggestion.lon)) {
            return;
        }

        const key = `${suggestion.name}|${suggestion.state}|${suggestion.country}|${suggestion.lat.toFixed(4)}|${suggestion.lon.toFixed(4)}`;
        if (seen.has(key)) {
            return;
        }
        seen.add(key);

        const distanceKm = calculateGreatCircleDistanceKm(context.lat, context.lon, suggestion.lat, suggestion.lon);
        const sameCountry = normalizedCountry
            ? normalizeCityToken(suggestion.country) === normalizedCountry
            : true;
        const sameCity = normalizeCityToken(suggestion.name) === normalizedCity;
        const queryScore = getSuggestionScoreForQuery(suggestion, normalizedQuery, null, normalizedCountry);
        const distanceScore = Number.isFinite(distanceKm)
            ? Math.max(0, 44 - (distanceKm * 0.75))
            : 0;
        const score = queryScore
            + distanceScore
            + (sameCity ? 24 : 0)
            + (sameCountry ? 16 : -25);

        ranked.push({
            suggestion,
            score,
            distanceKm,
            sameCity,
            sameCountry
        });
    });

    return ranked
        .filter((item) => item.sameCountry)
        .sort((itemA, itemB) => itemB.score - itemA.score);
}

function createCommuteDestinationSuggestionFromCity(suggestion, distanceKm) {
    const value = [suggestion?.name, suggestion?.state, suggestion?.country]
        .filter((part) => typeof part === "string" && part.trim())
        .join(", ");
    const roundedDistance = Number.isFinite(distanceKm) ? Math.round(distanceKm) : null;
    const meta = roundedDistance !== null
        ? `${suggestion?.meta || t("commuteSuggestionMetaFallback")} • ${roundedDistance} km`
        : (suggestion?.meta || t("commuteSuggestionMetaFallback"));

    return {
        value: value || suggestion?.name || "",
        label: value || suggestion?.name || "",
        meta,
        lat: suggestion?.lat,
        lon: suggestion?.lon
    };
}

function renderCommuteDestinationSuggestions(suggestions) {
    commuteDestinationSuggestions = Array.isArray(suggestions) ? suggestions : [];
    activeCommuteDestinationSuggestionIndex = commuteDestinationSuggestions.length ? 0 : -1;
    commuteDestinationSuggestionsEl.innerHTML = "";

    if (!commuteDestinationSuggestions.length) {
        hideCommuteDestinationSuggestions(true);
        return;
    }

    const fragment = document.createDocumentFragment();

    commuteDestinationSuggestions.forEach((suggestion, index) => {
        const itemButton = document.createElement("button");
        itemButton.type = "button";
        itemButton.className = "city-suggestion-item";
        itemButton.dataset.index = String(index);
        itemButton.setAttribute("role", "option");
        itemButton.setAttribute("aria-selected", "false");

        const name = document.createElement("span");
        name.className = "city-suggestion-name";
        name.textContent = suggestion.label || suggestion.value;

        const meta = document.createElement("span");
        meta.className = "city-suggestion-meta";
        meta.textContent = suggestion.meta || t("commuteSuggestionMetaFallback");

        itemButton.append(name, meta);
        fragment.appendChild(itemButton);
    });

    commuteDestinationSuggestionsEl.appendChild(fragment);
    updateCommuteDestinationSuggestionActiveState();

    if (document.activeElement !== commuteDestinationInputEl) {
        hideCommuteDestinationSuggestions();
        return;
    }

    showCommuteDestinationSuggestions();
}

function updateCommuteDestinationSuggestionActiveState() {
    const suggestionButtons = commuteDestinationSuggestionsEl.querySelectorAll(".city-suggestion-item");

    suggestionButtons.forEach((button, index) => {
        const isActive = index === activeCommuteDestinationSuggestionIndex;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function applyCommuteDestinationSuggestion(suggestion) {
    if (!suggestion) {
        return;
    }

    commuteDestinationInputEl.value = suggestion.value || "";
    selectedCommuteDestinationSuggestion = Number.isFinite(suggestion.lat) && Number.isFinite(suggestion.lon)
        ? suggestion
        : null;
    hideCommuteDestinationSuggestions();
    commuteDestinationInputEl.focus();
}

function showCommuteDestinationSuggestions() {
    commuteDestinationSuggestionsEl.classList.remove("hidden");
    commuteDestinationInputEl.setAttribute("aria-expanded", "true");
}

function hideCommuteDestinationSuggestions(clearSuggestions = false) {
    commuteDestinationSuggestionsEl.classList.add("hidden");
    commuteDestinationInputEl.setAttribute("aria-expanded", "false");

    if (clearSuggestions) {
        commuteDestinationSuggestions = [];
        activeCommuteDestinationSuggestionIndex = -1;
        commuteDestinationSuggestionsEl.innerHTML = "";
    }
}

function updateCommuteDestinationPlaceholderByCity() {
    const context = getCommuteCityContext();
    commuteDestinationInputEl.placeholder = context?.cityName
        ? t("commuteDestinationPlaceholderByCity", { city: context.cityName })
        : t("commuteDestinationPlaceholder");
}

async function resolveCommuteDestinationFromInputOrState(options = {}) {
    const { allowErrorResult = false } = options;
    const query = String(commuteDestinationInputEl.value || "").trim();
    const canUseSelectedSuggestion = selectedCommuteDestinationSuggestion
        && normalizeCityToken(selectedCommuteDestinationSuggestion.value) === normalizeCityToken(query)
        && Number.isFinite(selectedCommuteDestinationSuggestion.lat)
        && Number.isFinite(selectedCommuteDestinationSuggestion.lon);

    if (canUseSelectedSuggestion) {
        return {
            lat: selectedCommuteDestinationSuggestion.lat,
            lon: selectedCommuteDestinationSuggestion.lon,
            label: selectedCommuteDestinationSuggestion.value
        };
    }

    if (query) {
        const resolved = await resolveCommuteDestination(query);
        if (resolved && (!resolved.errorKey || allowErrorResult)) {
            return resolved;
        }
    }

    if (
        lastCommuteAssessment
        && Number.isFinite(lastCommuteAssessment.destinationLat)
        && Number.isFinite(lastCommuteAssessment.destinationLon)
    ) {
        return {
            lat: lastCommuteAssessment.destinationLat,
            lon: lastCommuteAssessment.destinationLon,
            label: lastCommuteAssessment.destinationLabel
        };
    }

    return null;
}

function resetCommuteDestinationSuggestionsState() {
    selectedCommuteDestinationSuggestion = null;
    window.clearTimeout(commuteDestinationSuggestionsDebounceTimer);
    hideCommuteDestinationSuggestions(true);
    updateCommuteDestinationPlaceholderByCity();
}

async function fetchCitySuggestions(query, options = {}) {
    const countryFilter = options.countryFilter || currentCountryFilter;
    const geocodingQuery = buildGeocodingQuery(query, countryFilter);
    const suggestionLimit = CITY_SUGGESTIONS_LIMIT;
    const url = buildOpenWeatherRequestUrl("/api/geocoding", GEOCODING_URL, {
        q: geocodingQuery,
        limit: suggestionLimit
    });

    try {
        const result = await requestJsonWithPolicy(url, {
            scope: "geocoding",
            cacheKey: `geocode:${normalizeCityToken(geocodingQuery)}`,
            allowStaleOnError: true
        });
        if (!result.ok) {
            return [];
        }

        const payload = result.data;
        if (!Array.isArray(payload)) {
            return [];
        }

        const seen = new Set();
        const normalizedQuery = normalizeCityToken(query);
        const continentFilter = getNormalizedContinentFilter(countryFilter);
        const preferenceTokens = buildSuggestionPreferenceTokens();
        const suggestions = payload
            .map((item) => createCitySuggestion(item))
            .filter(Boolean)
            .filter((item) => {
                if (!continentFilter) {
                    return true;
                }
                const suggestionContinent = getContinentForCountry(item.country);
                return !suggestionContinent || suggestionContinent === continentFilter;
            })
            .filter((item) => {
                const key = `${item.name}|${item.state}|${item.country}|${item.lat.toFixed(4)}|${item.lon.toFixed(4)}`;
                if (seen.has(key)) {
                    return false;
                }

                seen.add(key);
                return true;
            });

        return suggestions.sort((itemA, itemB) => {
            const scoreA = getSuggestionScoreForQuery(itemA, normalizedQuery, preferenceTokens, countryFilter);
            const scoreB = getSuggestionScoreForQuery(itemB, normalizedQuery, preferenceTokens, countryFilter);
            return scoreB - scoreA;
        }).slice(0, suggestionLimit);
    } catch {
        return [];
    }
}

function buildGeocodingQuery(query, countryFilter = currentCountryFilter) {
    const cleanQuery = String(query || "").trim();
    if (!cleanQuery) {
        return "";
    }

    if (!countryFilter || countryFilter === "auto") {
        return cleanQuery;
    }

    if (getNormalizedContinentFilter(countryFilter)) {
        return cleanQuery;
    }

    return `${cleanQuery},${countryFilter}`;
}

function buildWeatherCityQuery(city) {
    const cleanCity = String(city || "").trim();
    if (!cleanCity) {
        return cleanCity;
    }

    if (!currentCountryFilter || currentCountryFilter === "auto") {
        return cleanCity;
    }

    if (getNormalizedContinentFilter(currentCountryFilter)) {
        return cleanCity;
    }

    return `${cleanCity},${currentCountryFilter}`;
}

function getWeatherApiLanguage() {
    return t("languageCode");
}

function buildSuggestionPreferenceTokens() {
    const favorites = getStoredCityList(STORAGE_KEY_FAVORITES);
    const history = getStoredCityList(STORAGE_KEY_HISTORY);

    return {
        favorites: new Set(favorites.map((city) => normalizeCityToken(city))),
        history: new Set(history.map((city) => normalizeCityToken(city)))
    };
}

function getSuggestionScoreForQuery(suggestion, normalizedQuery, preferenceTokens = null, preferredFilter = currentCountryFilter) {
    const normalizedName = normalizeCityToken(suggestion?.name);
    const normalizedState = normalizeCityToken(suggestion?.state);
    const normalizedCountry = normalizeCityToken(suggestion?.country);
    const normalizedPreferredFilter = normalizeCityToken(preferredFilter);
    const preferredContinent = getNormalizedContinentFilter(normalizedPreferredFilter);
    const suggestionContinent = preferredContinent ? getContinentForCountry(suggestion?.country) : null;

    let score = 0;

    if (normalizedName === normalizedQuery) {
        score += 120;
    } else if (normalizedName.startsWith(normalizedQuery)) {
        score += 70;
    } else if (normalizedName.includes(normalizedQuery)) {
        score += 35;
    }

    if (preferredContinent) {
        if (suggestionContinent && suggestionContinent === preferredContinent) {
            score += 15;
        }
    } else if (normalizedPreferredFilter && normalizedPreferredFilter !== "auto" && normalizedCountry === normalizedPreferredFilter) {
        score += 15;
    }

    if (preferenceTokens?.favorites instanceof Set && preferenceTokens.favorites.has(normalizedName)) {
        score += 28;
    }

    if (preferenceTokens?.history instanceof Set && preferenceTokens.history.has(normalizedName)) {
        score += 16;
    }

    // Evita priorizar local que apenas tem o nome no estado quando nao bate com a cidade.
    if (normalizedState === normalizedQuery && normalizedName !== normalizedQuery) {
        score -= 45;
    }

    return score;
}

async function resolveSuggestionForSearch(city) {
    const suggestions = await fetchCitySuggestions(city);
    if (!suggestions.length) {
        return null;
    }

    const normalizedQuery = normalizeCityToken(city);
    const exactMatches = suggestions.filter(
        (suggestion) => normalizeCityToken(suggestion.name) === normalizedQuery
    );

    if (exactMatches.length === 1) {
        return { type: "single", suggestion: exactMatches[0] };
    }

    if (exactMatches.length > 1) {
        return { type: "ambiguous", suggestions: exactMatches };
    }

    if (suggestions.length === 1) {
        return { type: "single", suggestion: suggestions[0] };
    }

    return { type: "ambiguous", suggestions };
}

function createCitySuggestion(rawSuggestion) {
    const name = typeof rawSuggestion?.name === "string" ? rawSuggestion.name.trim() : "";
    const state = typeof rawSuggestion?.state === "string" ? rawSuggestion.state.trim() : "";
    const country = typeof rawSuggestion?.country === "string" ? rawSuggestion.country.trim() : "";
    const lat = rawSuggestion?.lat;
    const lon = rawSuggestion?.lon;

    if (!name || !Number.isFinite(lat) || !Number.isFinite(lon)) {
        return null;
    }

    return {
        name,
        state,
        country,
        lat,
        lon,
        meta: [state, country].filter(Boolean).join(", ")
    };
}

function buildLocationOverrideFromSuggestion(suggestion) {
    if (!suggestion || typeof suggestion !== "object") {
        return null;
    }

    return {
        name: suggestion.name || "",
        state: suggestion.state || "",
        country: suggestion.country || ""
    };
}

function getDisplayLocationTitle(locationOverride, fallbackTitle) {
    const hasOverrideName = typeof locationOverride?.name === "string" && locationOverride.name.trim();
    if (!hasOverrideName) {
        return fallbackTitle || "--";
    }

    const parts = [locationOverride.name.trim()];
    const hasState = typeof locationOverride?.state === "string" && locationOverride.state.trim();
    const hasCountry = typeof locationOverride?.country === "string" && locationOverride.country.trim();

    if (hasState) {
        parts.push(locationOverride.state.trim());
    }

    if (hasCountry) {
        parts.push(locationOverride.country.trim());
    }

    return parts.join(", ");
}

function renderCitySuggestions(suggestions) {
    citySuggestions = suggestions;
    activeCitySuggestionIndex = suggestions.length ? 0 : -1;
    citySuggestionsEl.innerHTML = "";

    if (!suggestions.length) {
        hideCitySuggestions(true);
        return;
    }

    const fragment = document.createDocumentFragment();

    suggestions.forEach((suggestion, index) => {
        const itemButton = document.createElement("button");
        itemButton.type = "button";
        itemButton.className = "city-suggestion-item";
        itemButton.dataset.index = String(index);
        itemButton.setAttribute("role", "option");
        itemButton.setAttribute("aria-selected", "false");

        const name = document.createElement("span");
        name.className = "city-suggestion-name";
        name.textContent = suggestion.name;

        const meta = document.createElement("span");
        meta.className = "city-suggestion-meta";
        meta.textContent = suggestion.meta || t("suggestionMetaFallback");

        itemButton.append(name, meta);
        fragment.appendChild(itemButton);
    });

    citySuggestionsEl.appendChild(fragment);
    updateCitySuggestionActiveState();

    if (document.activeElement !== cityInput) {
        hideCitySuggestions();
        return;
    }

    showCitySuggestions();
}

function renderCompareCitySuggestions(suggestions) {
    compareCitySuggestions = suggestions;
    activeCompareCitySuggestionIndex = suggestions.length ? 0 : -1;
    compareCitySuggestionsEl.innerHTML = "";

    if (!suggestions.length) {
        hideCompareCitySuggestions(true);
        return;
    }

    const fragment = document.createDocumentFragment();

    suggestions.forEach((suggestion, index) => {
        const itemButton = document.createElement("button");
        itemButton.type = "button";
        itemButton.className = "city-suggestion-item";
        itemButton.dataset.index = String(index);
        itemButton.setAttribute("role", "option");
        itemButton.setAttribute("aria-selected", "false");

        const name = document.createElement("span");
        name.className = "city-suggestion-name";
        name.textContent = suggestion.name;

        const meta = document.createElement("span");
        meta.className = "city-suggestion-meta";
        meta.textContent = suggestion.meta || t("suggestionMetaFallback");

        itemButton.append(name, meta);
        fragment.appendChild(itemButton);
    });

    compareCitySuggestionsEl.appendChild(fragment);
    updateCompareCitySuggestionActiveState();

    if (document.activeElement !== compareCityInput) {
        hideCompareCitySuggestions();
        return;
    }

    showCompareCitySuggestions();
}

function updateCitySuggestionActiveState() {
    const suggestionButtons = citySuggestionsEl.querySelectorAll(".city-suggestion-item");

    suggestionButtons.forEach((button, index) => {
        const isActive = index === activeCitySuggestionIndex;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function updateCompareCitySuggestionActiveState() {
    const suggestionButtons = compareCitySuggestionsEl.querySelectorAll(".city-suggestion-item");

    suggestionButtons.forEach((button, index) => {
        const isActive = index === activeCompareCitySuggestionIndex;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
    });
}

function applyCitySuggestion(suggestion) {
    if (!suggestion) {
        return;
    }

    selectedCitySuggestion = suggestion;
    cityInput.value = suggestion.name;
    hideCitySuggestions();
    cityInput.focus();
}

function applyCompareCitySuggestion(suggestion) {
    if (!suggestion) {
        return;
    }

    selectedCompareCitySuggestion = suggestion;
    compareCityInput.value = suggestion.name;
    hideCompareCitySuggestions();
    compareCityInput.focus();
}

function showCitySuggestions() {
    citySuggestionsEl.classList.remove("hidden");
    cityInput.setAttribute("aria-expanded", "true");
}

function showCompareCitySuggestions() {
    compareCitySuggestionsEl.classList.remove("hidden");
    compareCityInput.setAttribute("aria-expanded", "true");
}

function hideCitySuggestions(clearSuggestions = false) {
    citySuggestionsEl.classList.add("hidden");
    cityInput.setAttribute("aria-expanded", "false");

    if (clearSuggestions) {
        citySuggestions = [];
        activeCitySuggestionIndex = -1;
        citySuggestionsEl.innerHTML = "";
    }
}

function hideCompareCitySuggestions(clearSuggestions = false) {
    compareCitySuggestionsEl.classList.add("hidden");
    compareCityInput.setAttribute("aria-expanded", "false");

    if (clearSuggestions) {
        compareCitySuggestions = [];
        activeCompareCitySuggestionIndex = -1;
        compareCitySuggestionsEl.innerHTML = "";
    }
}

async function fetchWeatherByCity(city, options = {}) {
    const { persist = true, trackRequest = true, skipHistory = false } = options;

    if (!isApiKeyConfigured()) {
        setStatus("Configure sua API key da OpenWeatherMap no script.js para iniciar.", "error");
        toggleRetryButton(false);
        return;
    }

    if (trackRequest) {
        lastRequest = { type: "city", city };
    }

    isWeatherRequestInProgress = true;
    setLoadingState(true);
    toggleRetryButton(false);
    setStatus(t("loadingWeather"), "loading");

    try {
        const weatherData = await fetchCurrentWeatherByCity(city);
        await processSuccessfulWeatherPayload(weatherData, { persist, skipHistory });
    } catch (error) {
        handleWeatherError(error);
    } finally {
        isWeatherRequestInProgress = false;
        setLoadingState(false);
    }
}

async function fetchWeatherByCoordinates(latitude, longitude, options = {}) {
    const {
        persist = true,
        trackRequest = true,
        locationOverride = null,
        skipHistory = false
    } = options;

    if (!isApiKeyConfigured()) {
        setStatus("Configure sua API key da OpenWeatherMap no script.js para iniciar.", "error");
        toggleRetryButton(false);
        return;
    }

    if (trackRequest) {
        lastRequest = { type: "coords", latitude, longitude, locationOverride };
    }

    isWeatherRequestInProgress = true;
    setLoadingState(true);
    toggleRetryButton(false);
    setStatus(t("loadingLocation"), "loading");

    try {
        const weatherData = await fetchCurrentWeatherByCoordinates(latitude, longitude);
        await processSuccessfulWeatherPayload(weatherData, {
            persist,
            locationOverride,
            skipHistory
        });
    } catch (error) {
        handleWeatherError(error);
    } finally {
        isWeatherRequestInProgress = false;
        setLoadingState(false);
    }
}

function isApiKeyConfigured() {
    return USING_OPENWEATHER_PROXY || Boolean(API_KEY && API_KEY !== "YOUR_OPENWEATHERMAP_API_KEY");
}

async function fetchCurrentWeatherByCity(city) {
    const cityQuery = buildWeatherCityQuery(city);
    const lang = getWeatherApiLanguage();
    const url = buildOpenWeatherRequestUrl("/api/weather", BASE_URL, {
        q: cityQuery,
        units: "metric",
        lang
    });
    const result = await requestJsonWithPolicy(url, {
        scope: "weather",
        cacheKey: `weather-city:${normalizeCityToken(cityQuery)}:${lang}`,
        allowStaleOnError: true
    });

    if (!result.ok) {
        throw buildApiError(result.status, false);
    }

    return result.data;
}

async function fetchCurrentWeatherByCoordinates(latitude, longitude) {
    const lang = getWeatherApiLanguage();
    const url = buildOpenWeatherRequestUrl("/api/weather", BASE_URL, {
        lat: latitude,
        lon: longitude,
        units: "metric",
        lang
    });
    const result = await requestJsonWithPolicy(url, {
        scope: "weather",
        cacheKey: `weather-coords:${latitude.toFixed(3)}:${longitude.toFixed(3)}:${lang}`,
        allowStaleOnError: true
    });

    if (!result.ok) {
        throw buildApiError(result.status, true);
    }

    return result.data;
}

async function processSuccessfulWeatherPayload(weatherData, options = {}) {
    const { persist = true, locationOverride = null, skipHistory = false } = options;
    const previousCommuteContext = getCommuteCityContext();
    const latitude = weatherData?.coord?.lat;
    const longitude = weatherData?.coord?.lon;

    const [forecastData, oneCallInsights, aqiData] = await Promise.all([
        fetchForecastByCoordinates(latitude, longitude).catch(() => null),
        fetchOneCallInsights(latitude, longitude).catch(() => ({ uvIndex: null, hourlyUv: [], hourlyWeather: [], alerts: [] })),
        fetchAqiByCoordinates(latitude, longitude).catch(() => null)
    ]);

    const rainChance = extractRainChanceFromForecast(forecastData, weatherData?.dt, oneCallInsights);

    currentWeatherSnapshot = {
        weatherData,
        forecastData,
        oneCallInsights,
        aqiData,
        rainChance,
        locationOverride,
        timezoneOffset: weatherData?.timezone ?? 0
    };

    const nextCommuteContext = getCommuteCityContext();
    const hasCommuteCityChanged = normalizeCityToken(previousCommuteContext?.cityName) !== normalizeCityToken(nextCommuteContext?.cityName)
        || normalizeCityToken(previousCommuteContext?.country) !== normalizeCityToken(nextCommuteContext?.country);

    if (hasCommuteCityChanged) {
        selectedCommuteDestinationSuggestion = null;
        commuteDestinationInputEl.value = "";
        hideCommuteDestinationSuggestions(true);
        resetCommuteState();
    }

    updateCommuteDestinationPlaceholderByCity();

    updateUI(weatherData, {
        uvIndex: oneCallInsights.uvIndex,
        rainChance,
        aqiData,
        locationOverride
    });

    updateForecastUI(forecastData, weatherData?.timezone ?? 0);
    updateHourlyChart(forecastData, oneCallInsights, weatherData?.timezone ?? 0);
    updateSmartRainAlert(forecastData, oneCallInsights, weatherData?.timezone ?? 0);
    updateWindSmartAlert(weatherData);
    updateDailySummary(forecastData, weatherData?.timezone ?? 0);
    updateCinematicScene(weatherData, forecastData, weatherData?.timezone ?? 0, {
        uvIndex: oneCallInsights.uvIndex,
        oneCallInsights,
        aqiData,
        rainChance
    });
    currentSharePayload = createSharePayload(weatherData, {
        uvIndex: oneCallInsights.uvIndex,
        rainChance,
        aqiData,
        locationOverride
    });
    updateShareButtonsState(true);
    void updateRainRadar(currentWeatherSnapshot);
    updateSafeWindow(currentWeatherSnapshot, currentSafeWindowModeKey);
    updateForecastReliability(currentWeatherSnapshot);
    updateHealthContext(currentWeatherSnapshot);
    updateWeeklyInsights(currentWeatherSnapshot);
    updateOutdoorSuggestion(forecastData, oneCallInsights, aqiData, weatherData?.timezone ?? 0);
    updateSevereAlert(weatherData, forecastData, oneCallInsights.alerts, weatherData?.timezone ?? 0);
    refreshDepartureAssessmentFromState();
    refreshCommuteAssessmentFromState();

    currentCityName = formatCityForStorage(weatherData, locationOverride);
    updateFavoriteButtonState();

    if (persist) {
        saveLastCity(currentCityName);
    }

    if (!skipHistory) {
        addToHistory(currentCityName);
    }
    renderSavedCityLists();
    syncTravelTimezoneFromSnapshot(currentCityName, weatherData?.timezone);

    cityInput.value = locationOverride?.name || weatherData?.name || cityInput.value;

    if (document.activeElement === commuteDestinationInputEl) {
        queueCommuteDestinationSuggestionsFetch(String(commuteDestinationInputEl.value || "").trim(), true);
    } else if (hasCommuteCityChanged) {
        hideCommuteDestinationSuggestions(true);
    }

    setStatus("", "idle");
}

function handleWeatherError(error) {
    reportAppError("weather-flow", error, {
        hasLastRequest: Boolean(lastRequest)
    });
    trackTelemetry("weather-error");
    currentSharePayload = null;
    updateShareButtonsState(false);
    resetWeatherState();
    resetForecastState();
    resetHourlyChartState();
    hideSevereAlert();
    hideSmartRainAlert();
    hideWindSmartAlert();
    setStatus(error.message, "error");
    toggleRetryButton(true);
}

async function fetchForecastByCoordinates(latitude, longitude) {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
    }

    const lang = getWeatherApiLanguage();
    const url = buildOpenWeatherRequestUrl("/api/forecast", FORECAST_URL, {
        lat: latitude,
        lon: longitude,
        units: "metric",
        lang
    });
    const result = await requestJsonWithPolicy(url, {
        scope: "forecast",
        cacheKey: `forecast:${latitude.toFixed(3)}:${longitude.toFixed(3)}:${lang}`,
        allowStaleOnError: true
    });

    if (!result.ok) {
        return null;
    }

    return result.data;
}

async function fetchOneCallInsights(latitude, longitude) {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return { uvIndex: null, hourlyUv: [], hourlyWeather: [], alerts: [] };
    }

    let uvIndex = null;
    let hourlyUv = [];
    let hourlyWeather = [];
    let alerts = [];
    const url = buildOpenWeatherRequestUrl("/api/onecall", ONE_CALL_URL, {
        lat: latitude,
        lon: longitude,
        units: "metric",
        exclude: "minutely,daily"
    });

    try {
        const result = await requestJsonWithPolicy(url, {
            scope: "onecall",
            cacheKey: `onecall:${latitude.toFixed(3)}:${longitude.toFixed(3)}`,
            allowStaleOnError: true
        });
        if (result.ok) {
            const payload = result.data;
            uvIndex = Number.isFinite(payload?.current?.uvi) ? payload.current.uvi : null;
            hourlyUv = Array.isArray(payload?.hourly)
                ? payload.hourly
                    .filter((entry) => Number.isFinite(entry?.dt) && Number.isFinite(entry?.uvi))
                    .map((entry) => ({ dt: entry.dt, uv: entry.uvi }))
                : [];
            hourlyWeather = Array.isArray(payload?.hourly)
                ? payload.hourly
                    .filter((entry) => Number.isFinite(entry?.dt) && Number.isFinite(entry?.temp))
                    .map((entry) => ({
                        dt: entry.dt,
                        temp: entry.temp,
                        pop: Number.isFinite(entry?.pop) ? entry.pop : null,
                        rainMm: Number.isFinite(entry?.rain?.["1h"]) ? entry.rain["1h"] : null
                    }))
                : [];
            alerts = Array.isArray(payload?.alerts) ? payload.alerts : [];
        }
    } catch {
        // Mantem fallback para nao bloquear a exibicao do UV.
    }

    if (!Number.isFinite(uvIndex) || !hourlyUv.length) {
        const fallbackUv = await fetchUvInsightsFallback(latitude, longitude);
        if (!Number.isFinite(uvIndex)) {
            uvIndex = fallbackUv.currentUv;
        }
        if (!hourlyUv.length) {
            hourlyUv = fallbackUv.hourlyUv;
        }
    }

    if (!hourlyWeather.length) {
        hourlyWeather = await fetchHourlyWeatherFallback(latitude, longitude);
    }

    return {
        uvIndex,
        hourlyUv,
        hourlyWeather,
        alerts
    };
}

async function fetchHourlyWeatherFallback(latitude, longitude) {
    const url = `${OPEN_METEO_URL}?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation_probability,precipitation&timezone=GMT&forecast_days=2`;

    try {
        const result = await requestJsonWithPolicy(url, {
            scope: "openmeteo",
            cacheKey: `openmeteo-hourly:${latitude.toFixed(3)}:${longitude.toFixed(3)}`,
            allowStaleOnError: true
        });
        if (!result.ok) {
            return [];
        }

        const payload = result.data;
        const hourlyTimes = payload?.hourly?.time;
        const hourlyTemperatures = payload?.hourly?.temperature_2m;
        const hourlyPop = payload?.hourly?.precipitation_probability;
        const hourlyRain = payload?.hourly?.precipitation;

        if (!Array.isArray(hourlyTimes) || !Array.isArray(hourlyTemperatures)) {
            return [];
        }

        return hourlyTimes
            .map((time, index) => {
                const date = new Date(`${time}:00Z`);
                const dt = Math.floor(date.getTime() / 1000);
                const temp = hourlyTemperatures[index];
                const popPercent = Array.isArray(hourlyPop) ? hourlyPop[index] : null;
                const rainMm = Array.isArray(hourlyRain) ? hourlyRain[index] : null;

                if (!Number.isFinite(dt) || !Number.isFinite(temp)) {
                    return null;
                }

                return {
                    dt,
                    temp,
                    pop: Number.isFinite(popPercent) ? popPercent / 100 : null,
                    rainMm: Number.isFinite(rainMm) ? rainMm : null
                };
            })
            .filter(Boolean);
    } catch {
        return [];
    }
}

async function fetchUvInsightsFallback(latitude, longitude) {
    const url = `${OPEN_METEO_URL}?latitude=${latitude}&longitude=${longitude}&current=uv_index&hourly=uv_index&timezone=GMT&forecast_days=2`;

    try {
        const result = await requestJsonWithPolicy(url, {
            scope: "openmeteo",
            cacheKey: `openmeteo-uv:${latitude.toFixed(3)}:${longitude.toFixed(3)}`,
            allowStaleOnError: true
        });
        if (!result.ok) {
            return { currentUv: null, hourlyUv: [] };
        }

        const payload = result.data;
        const currentUv = Number.isFinite(payload?.current?.uv_index) ? payload.current.uv_index : null;
        const hourlyTimes = payload?.hourly?.time;
        const hourlyValues = payload?.hourly?.uv_index;
        const hourlyUv = Array.isArray(hourlyTimes) && Array.isArray(hourlyValues)
            ? hourlyTimes
                .map((time, index) => {
                    const uvValue = hourlyValues[index];
                    const date = new Date(`${time}:00Z`);
                    const dt = Math.floor(date.getTime() / 1000);
                    if (!Number.isFinite(uvValue) || !Number.isFinite(dt)) {
                        return null;
                    }
                    return { dt, uv: uvValue };
                })
                .filter(Boolean)
            : [];

        return { currentUv, hourlyUv };
    } catch {
        return { currentUv: null, hourlyUv: [] };
    }
}

async function fetchAqiByCoordinates(latitude, longitude) {
    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        return null;
    }

    const url = buildOpenWeatherRequestUrl("/api/aqi", AQI_URL, {
        lat: latitude,
        lon: longitude
    });
    const result = await requestJsonWithPolicy(url, {
        scope: "aqi",
        cacheKey: `aqi:${latitude.toFixed(3)}:${longitude.toFixed(3)}`,
        allowStaleOnError: true
    });
    if (!result.ok) {
        return null;
    }

    const payload = result.data;
    const aqi = payload?.list?.[0]?.main?.aqi;
    const components = payload?.list?.[0]?.components;
    const safeComponents = components && typeof components === "object" ? components : null;

    return {
        value: Number.isFinite(aqi) ? aqi : null,
        components: safeComponents
    };
}

function buildApiError(statusCode, isLocationFlow) {
    if (statusCode === 404) {
        return new Error(t("apiCityNotFound"));
    }

    if (statusCode === 401) {
        return new Error(t("apiUnauthorized"));
    }

    if (isLocationFlow) {
        return new Error(t("apiLocationError"));
    }

    return new Error(t("apiGenericError"));
}

async function handleGeolocationSearch() {
    if (!window.isSecureContext) {
        setStatus(t("geolocationRequiresSecure"), "error");
        return;
    }

    if (!navigator.geolocation) {
        setStatus(t("geolocationUnsupported"), "error");
        return;
    }

    const isPermissionDenied = await checkIfGeolocationPermissionIsDenied();
    if (isPermissionDenied) {
        setStatus(getPermissionHelpMessage(), "error");
        return;
    }

    geoButton.disabled = true;
    selectedCitySuggestion = null;
    hideCitySuggestions(true);
    setStatus(t("geolocationRequesting"), "loading");

    try {
        const position = await getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
        });

        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoordinates(latitude, longitude);
    } catch (error) {
        setStatus(getGeolocationErrorMessage(error), "error");
    } finally {
        geoButton.disabled = false;
    }
}

async function handleRetryRequest() {
    if (lastRequest?.type === "coords") {
        await fetchWeatherByCoordinates(lastRequest.latitude, lastRequest.longitude, {
            trackRequest: false,
            locationOverride: lastRequest.locationOverride || null
        });
        return;
    }

    const city = lastRequest?.city || getLastCity() || DEFAULT_CITY;
    await fetchWeatherByCity(city, { trackRequest: false });
}

function getCurrentPosition(options) {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}

function getGeolocationErrorMessage(error) {
    if (!error || typeof error.code !== "number") {
        return t("geolocationFailed");
    }

    if (error.code === 1) {
        return getPermissionHelpMessage();
    }

    if (error.code === 2) {
        return t("geolocationUnavailable");
    }

    if (error.code === 3) {
        return t("geolocationTimeout");
    }

    return t("geolocationFailed");
}

async function checkIfGeolocationPermissionIsDenied() {
    if (!navigator.permissions || typeof navigator.permissions.query !== "function") {
        return false;
    }

    try {
        const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
        return permissionStatus.state === "denied";
    } catch {
        return false;
    }
}

function getPermissionHelpMessage() {
    return t("geolocationPermissionHelp");
}

async function handleShareText() {
    if (!currentSharePayload) {
        setStatus(t("shareNeedWeatherText"), "error");
        return;
    }

    const shareText = buildShareText(currentSharePayload);
    const shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    try {
        if (navigator.share) {
            await navigator.share({
                title: `${t("shareTitlePrefix")} ${currentSharePayload.city}`,
                text: shareText
            });
            setStatus(t("shareTextSuccess"), "idle");
            return;
        }

        await copyTextToClipboard(shareText);
        window.open(shareUrl, "_blank", "noopener");
        setStatus(t("shareTextFallbackSuccess"), "idle");
    } catch (error) {
        if (error?.name === "AbortError") {
            return;
        }
        setStatus(t("shareTextError"), "error");
    }
}

async function handleCompareSubmit(event) {
    event.preventDefault();
    hideCompareCitySuggestions();

    if (!currentWeatherSnapshot) {
        setStatus(t("compareNoCurrent"), "error");
        return;
    }

    const rawQuery = sanitizeCityInputValue(compareCityInput.value).trim();
    compareCityInput.value = rawQuery;

    if (!rawQuery) {
        setStatus(t("searchEmpty"), "error");
        return;
    }

    const shouldUseSuggestion = selectedCompareCitySuggestion
        && normalizeCityToken(selectedCompareCitySuggestion.name) === normalizeCityToken(rawQuery)
        && Number.isFinite(selectedCompareCitySuggestion.lat)
        && Number.isFinite(selectedCompareCitySuggestion.lon);

    if (shouldUseSuggestion) {
        setStatus(t("compareLoading"), "loading");

        try {
            compareWeatherSnapshot = await fetchWeatherSnapshotByCoordinates(
                selectedCompareCitySuggestion.lat,
                selectedCompareCitySuggestion.lon,
                buildLocationOverrideFromSuggestion(selectedCompareCitySuggestion)
            );
            renderCompareResult();
            setStatus("", "idle");
        } catch {
            setStatus(t("compareError"), "error");
        }

        return;
    }

    setStatus(t("compareLoading"), "loading");

    try {
        const resolvedSuggestion = await resolveSuggestionForSearch(rawQuery);

        if (resolvedSuggestion?.type === "ambiguous") {
            selectedCompareCitySuggestion = null;
            compareCityInput.focus();
            renderCompareCitySuggestions(resolvedSuggestion.suggestions);
            setStatus(t("compareAmbiguous"), "error");
            return;
        }

        if (resolvedSuggestion?.type === "single") {
            selectedCompareCitySuggestion = resolvedSuggestion.suggestion;
            compareCityInput.value = resolvedSuggestion.suggestion.name;
            compareWeatherSnapshot = await fetchWeatherSnapshotByCoordinates(
                resolvedSuggestion.suggestion.lat,
                resolvedSuggestion.suggestion.lon,
                buildLocationOverrideFromSuggestion(resolvedSuggestion.suggestion)
            );
        } else {
            compareWeatherSnapshot = await fetchWeatherSnapshotByCity(rawQuery);
        }

        renderCompareResult();
        setStatus("", "idle");
    } catch {
        setStatus(t("compareError"), "error");
    }
}

async function fetchWeatherSnapshotByCity(city) {
    const weatherData = await fetchCurrentWeatherByCity(city);
    return fetchWeatherSnapshotByData(weatherData, null);
}

async function fetchWeatherSnapshotByCoordinates(latitude, longitude, locationOverride = null) {
    const weatherData = await fetchCurrentWeatherByCoordinates(latitude, longitude);
    return fetchWeatherSnapshotByData(weatherData, locationOverride);
}

async function fetchWeatherSnapshotByData(weatherData, locationOverride = null) {
    const latitude = weatherData?.coord?.lat;
    const longitude = weatherData?.coord?.lon;

    const [forecastData, oneCallInsights, aqiData] = await Promise.all([
        fetchForecastByCoordinates(latitude, longitude).catch(() => null),
        fetchOneCallInsights(latitude, longitude).catch(() => ({ uvIndex: null, hourlyUv: [], hourlyWeather: [], alerts: [] })),
        fetchAqiByCoordinates(latitude, longitude).catch(() => null)
    ]);

    return {
        weatherData,
        forecastData,
        oneCallInsights,
        aqiData,
        rainChance: extractRainChanceFromForecast(forecastData, weatherData?.dt, oneCallInsights),
        locationOverride,
        timezoneOffset: weatherData?.timezone ?? 0
    };
}

function renderCompareResult() {
    if (!currentWeatherSnapshot || !compareWeatherSnapshot) {
        resetCompareState();
        return;
    }

    compareResultEl.classList.remove("compare-empty");
    const primaryCard = buildCompareCardMarkup(t("comparePrimary"), currentWeatherSnapshot);
    const secondaryCard = buildCompareCardMarkup(t("compareSecondary"), compareWeatherSnapshot);
    const deltaMarkup = buildCompareDeltaMarkup(currentWeatherSnapshot, compareWeatherSnapshot);

    compareResultEl.innerHTML = `<div class="compare-grid">${primaryCard}${secondaryCard}</div>${deltaMarkup}`;
}

function buildCompareCardMarkup(title, snapshot) {
    const weatherData = snapshot?.weatherData;
    const aqiValue = Number.isFinite(snapshot?.aqiData?.value) ? snapshot.aqiData.value : null;
    const aqiLabel = AQI_MAP[aqiValue]?.labelKey ? t(AQI_MAP[aqiValue].labelKey) : t("unavailable");
    const windKmh = Number.isFinite(weatherData?.wind?.speed) ? weatherData.wind.speed * 3.6 : null;
    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";
    const city = formatCityForStorage(weatherData, snapshot?.locationOverride);
    const temperature = formatTemperatureValue(weatherData?.main?.temp);
    const uvIndex = Number.isFinite(snapshot?.oneCallInsights?.uvIndex) ? snapshot.oneCallInsights.uvIndex.toFixed(1) : t("unavailable");
    const rainChance = Number.isFinite(snapshot?.rainChance) ? `${Math.round(snapshot.rainChance)}%` : t("unavailable");
    const wind = formatWindSpeedValue(windKmh, t("unavailable"));

    return `
        <article class="compare-city-card">
            <h3>${title}</h3>
            <p><strong>${city}</strong></p>
            <p>Temp: ${temperature}°</p>
            <p>AQI: ${aqiLabel}</p>
            <p>UV: ${uvIndex}</p>
            <p>${t("rainPrefix")}: ${rainChance}</p>
            <p>${t("windLabel")}: ${wind} ${speedUnit}</p>
        </article>
    `;
}

function buildCompareDeltaMarkup(primarySnapshot, secondarySnapshot) {
    const primaryTemperature = convertTemperatureForDisplay(primarySnapshot?.weatherData?.main?.temp);
    const secondaryTemperature = convertTemperatureForDisplay(secondarySnapshot?.weatherData?.main?.temp);
    const primaryRain = Number.isFinite(primarySnapshot?.rainChance) ? primarySnapshot.rainChance : null;
    const secondaryRain = Number.isFinite(secondarySnapshot?.rainChance) ? secondarySnapshot.rainChance : null;
    const primaryWind = convertWindForDisplay(Number.isFinite(primarySnapshot?.weatherData?.wind?.speed)
        ? primarySnapshot.weatherData.wind.speed * 3.6
        : null);
    const secondaryWind = convertWindForDisplay(Number.isFinite(secondarySnapshot?.weatherData?.wind?.speed)
        ? secondarySnapshot.weatherData.wind.speed * 3.6
        : null);

    const tempDelta = formatDeltaDescriptor(
        Number.isFinite(primaryTemperature) && Number.isFinite(secondaryTemperature)
            ? secondaryTemperature - primaryTemperature
            : null,
        "°",
        0
    );

    const rainDelta = formatDeltaDescriptor(
        Number.isFinite(primaryRain) && Number.isFinite(secondaryRain)
            ? secondaryRain - primaryRain
            : null,
        "%",
        0
    );

    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";
    const windDelta = formatDeltaDescriptor(
        Number.isFinite(primaryWind) && Number.isFinite(secondaryWind)
            ? secondaryWind - primaryWind
            : null,
        ` ${speedUnit}`,
        0
    );

    return `
        <div class="compare-delta-grid">
            ${buildSingleDeltaItem(t("compareDeltaTemp"), tempDelta)}
            ${buildSingleDeltaItem(t("compareDeltaRain"), rainDelta)}
            ${buildSingleDeltaItem(t("compareDeltaWind"), windDelta)}
        </div>
    `;
}

function buildSingleDeltaItem(label, delta) {
    return `
        <article class="compare-delta-item ${delta.className}">
            <span>${label}</span>
            <strong>${delta.marker} ${delta.value}</strong>
        </article>
    `;
}

function formatDeltaDescriptor(value, suffix = "", decimals = 0) {
    if (!Number.isFinite(value)) {
        return {
            marker: t("deltaNeutral"),
            value: t("unavailable"),
            className: "is-neutral"
        };
    }

    const rounded = Number(value.toFixed(decimals));
    if (rounded > 0) {
        return {
            marker: t("deltaUp"),
            value: `+${rounded}${suffix}`,
            className: "is-up"
        };
    }

    if (rounded < 0) {
        return {
            marker: t("deltaDown"),
            value: `${rounded}${suffix}`,
            className: "is-down"
        };
    }

    return {
        marker: t("deltaNeutral"),
        value: `0${suffix}`,
        className: "is-neutral"
    };
}

function resetCompareState() {
    compareWeatherSnapshot = null;
    compareResultEl.classList.add("compare-empty");
    compareResultEl.textContent = t("compareEmpty");
}

async function fetchImageAsDataUrl(url) {
    if (!url) {
        return null;
    }

    const response = await fetch(url, { mode: "cors", cache: "force-cache" });
    if (!response.ok) {
        return null;
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(typeof reader.result === "string" ? reader.result : null);
        reader.onerror = () => reject(reader.error || new Error("share-image-read-failed"));
        reader.readAsDataURL(blob);
    });
}

function updateShareButtonsState(isEnabled) {
    shareTextButton.disabled = !isEnabled;
}

function buildShareText(sharePayload) {
    const temperature = formatTemperatureValue(sharePayload.temperatureC);
    const feelsLike = formatTemperatureValue(sharePayload.feelsLikeC);
    const wind = formatWindSpeedValue(sharePayload.windKmh);
    const windGust = formatWindSpeedValue(sharePayload.windGustKmh);
    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";

    const parts = [
        t("shareLineNowIn", { city: sharePayload.city }),
        t("shareLineTemp", {
            description: sharePayload.description,
            temperature,
            unit: currentUnits === "metric" ? "C" : "F",
            feelsLike
        }),
        t("shareLineHumidityWind", {
            humidity: sharePayload.humidity,
            wind,
            gust: windGust,
            speedUnit
        }),
        t("shareLineRainUv", {
            rainChance: sharePayload.rainChance,
            uvIndex: sharePayload.uvIndex
        }),
        t("shareLineAqi", { aqiLabel: sharePayload.aqiLabel }),
        t("shareLineLocalTime", { localTime: sharePayload.localTime })
    ];

    if (sharePayload.sceneTag) {
        parts.push(t("shareLineScene", {
            scene: sharePayload.sceneTag,
            score: Number.isFinite(sharePayload.sceneScore)
                ? sharePayload.sceneScore
                : t("unavailable")
        }));
    }

    if (sharePayload.sceneRecommendation) {
        parts.push(t("shareLineRecommendation", {
            recommendation: sharePayload.sceneRecommendation
        }));
    }

    return parts.join("\n");
}

function createSharePayload(weatherData, metrics) {
    const { uvIndex, rainChance, aqiData, locationOverride = null } = metrics;
    const main = weatherData?.main || {};
    const wind = weatherData?.wind || {};
    const weather = weatherData?.weather?.[0] || {};

    const safeUv = Number.isFinite(uvIndex) ? uvIndex.toFixed(1) : t("unavailable");
    const safeRain = Number.isFinite(rainChance) ? `${Math.round(rainChance)}%` : t("unavailable");
    const aqiDescriptor = AQI_MAP[aqiData?.value]?.labelKey
        ? t(AQI_MAP[aqiData.value].labelKey)
        : t("unavailable");
    const sceneTag = currentCinematicSceneDetails?.tagKey
        ? t(currentCinematicSceneDetails.tagKey)
        : null;
    const sceneRecommendation = currentCinematicSceneDetails?.recommendationKey
        ? t(currentCinematicSceneDetails.recommendationKey)
        : null;
    const sceneScore = Number.isFinite(currentCinematicSceneDetails?.contextualScore)
        ? Math.round(currentCinematicSceneDetails.contextualScore)
        : null;

    return {
        city: formatCityForStorage(weatherData, locationOverride),
        description: weather.description || t("unavailable"),
        temperatureC: Number.isFinite(main.temp) ? main.temp : null,
        feelsLikeC: Number.isFinite(main.feels_like) ? main.feels_like : null,
        humidity: Number.isFinite(main.humidity) ? Math.round(main.humidity) : "--",
        windKmh: Number.isFinite(wind.speed) ? wind.speed * 3.6 : null,
        windGustKmh: Number.isFinite(wind.gust) ? wind.gust * 3.6 : null,
        rainChance: safeRain,
        uvIndex: safeUv,
        aqiLabel: aqiDescriptor,
        localTime: formatTimeFromUnix(weatherData?.dt, weatherData?.timezone),
        sceneTag,
        sceneRecommendation,
        sceneScore
    };
}

async function copyTextToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}

function updateUI(weatherData, options = {}) {
    const { uvIndex = null, rainChance = null, aqiData = null, locationOverride = null } = options;
    const { name, sys, main, weather, wind, visibility, timezone } = weatherData;
    const primaryWeather = weather?.[0] || {};
    const isDayPeriod = isDaytimeAtLocation(weatherData, primaryWeather.icon);
    const fallbackTitle = [name, sys?.country].filter(Boolean).join(", ");

    cityNameEl.textContent = getDisplayLocationTitle(locationOverride, fallbackTitle);
    weatherDescriptionEl.textContent = primaryWeather.description || t("noDescription");
    temperatureEl.textContent = formatTemperatureValue(main?.temp);
    feelsLikeEl.textContent = formatTemperatureValue(main?.feels_like);
    humidityEl.textContent = Number.isFinite(main?.humidity) ? Math.round(main.humidity) : "--";
    windSpeedEl.textContent = formatWindSpeedValue(Number.isFinite(wind?.speed) ? wind.speed * 3.6 : null, "--");
    windGustEl.textContent = formatWindSpeedValue(Number.isFinite(wind?.gust) ? wind.gust * 3.6 : null, t("unavailable"));
    pressureEl.textContent = Number.isFinite(main?.pressure) ? Math.round(main.pressure) : "--";
    visibilityEl.textContent = Number.isFinite(visibility) ? (visibility / 1000).toFixed(1) : "--";
    rainChanceEl.textContent = Number.isFinite(rainChance) ? Math.round(rainChance) : t("unavailable");
    updateUvCard(uvIndex);
    startLocalClock(timezone);
    sunriseTimeEl.textContent = formatTimeFromUnix(sys?.sunrise, timezone);
    sunsetTimeEl.textContent = formatTimeFromUnix(sys?.sunset, timezone);

    updateAqiCard(aqiData);
    updateIcon(primaryWeather.icon, primaryWeather.main || t("unavailable"));
    applyThemeByCondition(primaryWeather.id, isDayPeriod, {
        uvIndex,
        rainChance,
        windSpeedKmh: Number.isFinite(wind?.speed) ? wind.speed * 3.6 : null
    });
}

function updateUvCard(uvIndex) {
    uvCardEl.classList.remove("uv-minimal", "uv-moderate", "uv-high", "uv-very-high", "uv-extreme", "uv-unknown");

    if (!Number.isFinite(uvIndex)) {
        uvCardEl.classList.add("uv-unknown");
        uvIndexEl.textContent = t("unavailable");
        uvLabelEl.textContent = t("unavailable");
        return;
    }

    const safeUv = Math.max(0, uvIndex);
    const descriptor = UV_RISK_MAP.find((risk) => safeUv >= risk.min && safeUv <= risk.max) || UV_RISK_MAP[UV_RISK_MAP.length - 1];

    uvCardEl.classList.add(descriptor.className);
    uvIndexEl.textContent = safeUv.toFixed(1);
    uvLabelEl.textContent = t(descriptor.labelKey);
}

function updateAqiCard(aqiData) {
    const aqiValue = aqiData?.value;

    aqiCardEl.classList.remove("aqi-good", "aqi-moderate", "aqi-poor", "aqi-unknown");

    if (!Number.isFinite(aqiValue)) {
        aqiCardEl.classList.add("aqi-unknown");
        aqiValueEl.textContent = t("unavailable");
        aqiLabelEl.textContent = t("unavailable");
        aqiComponentsEl.textContent = t("pollutantsUnavailable");
        return;
    }

    const descriptor = AQI_MAP[aqiValue] || AQI_MAP[3];
    aqiCardEl.classList.add(descriptor.className);
    aqiValueEl.textContent = String(aqiValue);
    aqiLabelEl.textContent = t(descriptor.labelKey);
    aqiComponentsEl.textContent = formatAqiComponentsSummary(aqiData?.components);
}

function formatAqiComponentsSummary(components) {
    if (!components || typeof components !== "object") {
        return t("pollutantsUnavailable");
    }

    const ranked = Object.entries(AQI_COMPONENT_LABELS)
        .map(([key, label]) => {
            const value = components[key];
            return Number.isFinite(value) ? { label, value } : null;
        })
        .filter(Boolean)
        .sort((itemA, itemB) => itemB.value - itemA.value)
        .slice(0, 3);

    if (!ranked.length) {
        return t("pollutantsUnavailable");
    }

    const summary = ranked
        .map((item) => `${item.label}: ${item.value.toFixed(1)}`)
        .join(" | ");

    return `${t("highlightsPrefix")}: ${summary}`;
}

function updateForecastUI(forecastData, fallbackTimezone = 0) {
    const timezoneOffset = Number.isFinite(forecastData?.city?.timezone)
        ? forecastData.city.timezone
        : fallbackTimezone;

    const cards = buildFiveDayForecastByPeriod(forecastData?.list || [], timezoneOffset);
    if (!cards.length) {
        renderForecastEmptyState(t("forecastEmptyUnavailable"));
        return;
    }

    renderForecastCards(cards);
}

function buildFiveDayForecastByPeriod(entries, timezoneOffset) {
    if (!Array.isArray(entries) || entries.length === 0) {
        return [];
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const sortedEntries = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix - 3600)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    const groupedByDay = new Map();

    sortedEntries.forEach((entry) => {
        const dayKey = getLocationDayKey(entry.dt, timezoneOffset);
        if (!groupedByDay.has(dayKey)) {
            groupedByDay.set(dayKey, []);
        }
        groupedByDay.get(dayKey).push(entry);
    });

    const fiveDayKeys = Array.from(groupedByDay.keys()).slice(0, 5);
    const forecastCards = [];

    fiveDayKeys.forEach((dayKey) => {
        const dayEntries = groupedByDay.get(dayKey) || [];

        TIME_PERIODS.forEach((period) => {
            const candidates = dayEntries.filter((entry) => {
                const localHour = getLocationHour(entry.dt, timezoneOffset);
                return localHour >= period.startHour && localHour <= period.endHour;
            });

            if (!candidates.length) {
                return;
            }

            const chosenEntry = pickClosestEntryByHour(candidates, period.targetHour, timezoneOffset);
            forecastCards.push({
                dayLabel: formatDayLabel(chosenEntry.dt, timezoneOffset),
                periodLabel: t(period.labelKey),
                iconCode: chosenEntry?.weather?.[0]?.icon || "01d",
                temperature: Number.isFinite(chosenEntry?.main?.temp) ? Math.round(chosenEntry.main.temp) : "--",
                rainChance: Number.isFinite(chosenEntry?.pop) ? Math.round(chosenEntry.pop * 100) : null,
                description: chosenEntry?.weather?.[0]?.description || t("noDescription")
            });
        });
    });

    return forecastCards;
}

function renderForecastCards(cards) {
    forecastListEl.classList.remove("is-loading");
    forecastListEl.innerHTML = "";

    const fragment = document.createDocumentFragment();

    cards.forEach((card) => {
        const article = document.createElement("article");
        article.className = "forecast-card";

        const day = document.createElement("p");
        day.className = "forecast-day";
        day.textContent = card.dayLabel;

        const period = document.createElement("p");
        period.className = "forecast-period";
        period.textContent = card.periodLabel;

        const icon = document.createElement("img");
        icon.className = "forecast-icon";
        icon.src = `https://openweathermap.org/img/wn/${card.iconCode}@2x.png`;
        icon.alt = t("forecastIconAlt", { description: card.description });
        icon.loading = "lazy";

        const temperature = document.createElement("p");
        temperature.className = "forecast-temp";
        temperature.textContent = `${formatTemperatureValue(card.temperature)}°`;

        const rainChance = document.createElement("p");
        rainChance.className = "forecast-rain";
        rainChance.textContent = card.rainChance === null
            ? `${t("rainPrefix")}: ${t("unavailable")}`
            : `${t("rainPrefix")}: ${card.rainChance}%`;

        article.append(day, period, icon, temperature, rainChance);
        fragment.appendChild(article);
    });

    forecastListEl.appendChild(fragment);
}

function renderForecastSkeleton(cardCount = 9) {
    forecastListEl.classList.add("is-loading");
    forecastListEl.innerHTML = "";

    const fragment = document.createDocumentFragment();
    for (let index = 0; index < cardCount; index += 1) {
        const skeletonCard = document.createElement("article");
        skeletonCard.className = "forecast-card";
        fragment.appendChild(skeletonCard);
    }

    forecastListEl.appendChild(fragment);
}

function renderForecastEmptyState(message) {
    forecastListEl.classList.remove("is-loading");
    forecastListEl.innerHTML = `<p class="forecast-empty">${message}</p>`;
}

function resetForecastState() {
    renderForecastEmptyState(t("forecastEmptyLoaded"));
}

function updateHourlyChart(forecastData, oneCallInsights = null, timezoneOffset = 0) {
    const entries = buildHourlyChartEntries(
        forecastData?.list || [],
        oneCallInsights?.hourlyWeather || [],
        timezoneOffset
    );
    if (!entries.length) {
        renderHourlyChartEmptyState(t("hourlyEmptyUnavailable"));
        return;
    }

    renderHourlyChart(entries);
}

function buildHourlyChartEntries(forecastEntries, oneCallHourlyEntries, timezoneOffset) {
    const safeRangeHours = 12;
    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (safeRangeHours * 60 * 60);

    const oneHourEntries = Array.isArray(oneCallHourlyEntries)
        ? oneCallHourlyEntries
            .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
            .slice(0, safeRangeHours)
            .map((entry) => ({
                time: formatTimeFromUnix(entry.dt, timezoneOffset),
                temperature: Number.isFinite(entry?.temp) ? entry.temp : null,
                rainChance: Number.isFinite(entry?.pop) ? entry.pop * 100 : 0,
                rainMm: Number.isFinite(entry?.rainMm) ? entry.rainMm : null
            }))
            .filter((entry) => Number.isFinite(entry.temperature))
        : [];

    if (oneHourEntries.length >= 6) {
        return oneHourEntries;
    }

    if (!Array.isArray(forecastEntries) || !forecastEntries.length) {
        return [];
    }

    return forecastEntries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
        .slice(0, safeRangeHours)
        .map((entry) => {
            const rainMmRaw = entry?.rain?.["3h"];
            return {
                time: formatTimeFromUnix(entry.dt, timezoneOffset),
                temperature: Number.isFinite(entry?.main?.temp) ? entry.main.temp : null,
                rainChance: Number.isFinite(entry?.pop) ? entry.pop * 100 : 0,
                rainMm: Number.isFinite(rainMmRaw) ? rainMmRaw : null
            };
        })
        .filter((entry) => Number.isFinite(entry.temperature));
}

function formatRainIndexValue(entry) {
    const chance = Number.isFinite(entry?.rainChance) ? Math.round(entry.rainChance) : 0;
    const rainMm = Number.isFinite(entry?.rainMm) ? Number(entry.rainMm.toFixed(1)) : null;

    if (Number.isFinite(rainMm) && rainMm > 0) {
        return t("rainChanceAndMm", { chance, mm: rainMm });
    }

    return t("rainChanceValue", { chance });
}

function formatChartSelectedPoint(point) {
    return t("chartSelectedPoint", {
        time: point.time,
        temp: formatTemperatureValue(point.temperature),
        rain: formatRainIndexValue(point)
    });
}

function renderHourlyChart(entries) {
    hourlyChartEl.classList.remove("is-loading");

    const width = 760;
    const height = 260;
    const margin = { top: 18, right: 20, bottom: 52, left: 44 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    const barAreaHeight = innerHeight * 0.42;
    const barBaseY = height - margin.bottom;
    const lineBottomY = barBaseY - barAreaHeight - 12;
    const lineTopY = margin.top;

    const temperatures = entries.map((entry) => entry.temperature);
    let minTemp = Math.floor(Math.min(...temperatures) - 1);
    let maxTemp = Math.ceil(Math.max(...temperatures) + 1);
    if (minTemp === maxTemp) {
        minTemp -= 1;
        maxTemp += 1;
    }

    const count = entries.length;
    const xStep = count > 1 ? innerWidth / (count - 1) : 0;
    const barWidth = Math.max(14, Math.min(32, innerWidth / (count * 1.7)));
    const labelStep = count > 18 ? 3 : (count > 12 ? 2 : 1);
    const tempLabelStep = count > 18 ? 3 : (count > 12 ? 2 : 1);

    const points = entries.map((entry, index) => {
        const x = margin.left + (count > 1 ? index * xStep : innerWidth / 2);
        const normalized = (entry.temperature - minTemp) / (maxTemp - minTemp);
        const y = lineBottomY - normalized * (lineBottomY - lineTopY);
        const rainHeight = (entry.rainChance / 100) * barAreaHeight;
        const barY = barBaseY - rainHeight;

        return {
            x,
            y,
            temperature: entry.temperature,
            time: entry.time,
            rainChance: entry.rainChance,
            rainMm: entry.rainMm,
            barY,
            rainHeight
        };
    });

    const linePath = points
        .map((point, index) => `${index === 0 ? "M" : "L"}${point.x.toFixed(2)} ${point.y.toFixed(2)}`)
        .join(" ");

    const barsMarkup = points
        .map((point) => {
            const x = point.x - barWidth / 2;
            return `<rect x="${x.toFixed(2)}" y="${point.barY.toFixed(2)}" width="${barWidth.toFixed(2)}" height="${point.rainHeight.toFixed(2)}" rx="5" fill="rgba(103, 183, 255, 0.72)"></rect>`;
        })
        .join("");

    const pointsMarkup = points
        .map((point) => `<circle cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="3.6" fill="#ffb454"></circle>`)
        .join("");

    const xTicksMarkup = points
        .map((point, index) => {
            if (index % labelStep !== 0) {
                return "";
            }

            return `<line x1="${point.x.toFixed(2)}" y1="${lineTopY.toFixed(2)}" x2="${point.x.toFixed(2)}" y2="${barBaseY.toFixed(2)}" stroke="rgba(255,255,255,0.08)" stroke-width="1" stroke-dasharray="2 5"></line>`;
        })
        .join("");

    const labelsMarkup = points
        .map((point, index) => {
            if (index % labelStep !== 0) {
                return "";
            }

            const labelY = (height - 18).toFixed(2);
            return `<text x="${point.x.toFixed(2)}" y="${labelY}" text-anchor="middle" fill="currentColor" font-size="11">${point.time}</text>`;
        })
        .join("");

    const tempTextMarkup = points
        .map((point, index) => {
            if (index % tempLabelStep !== 0) {
                return "";
            }

            return `<text x="${point.x.toFixed(2)}" y="${(point.y - 10).toFixed(2)}" text-anchor="middle" fill="currentColor" font-size="10">${formatTemperatureValue(point.temperature)}°</text>`;
        })
        .join("");

    const hitboxesMarkup = points
        .map((point, index) => {
            const ariaLabel = formatChartSelectedPoint(point);
            return `<circle class="chart-point-hitbox" data-index="${index}" cx="${point.x.toFixed(2)}" cy="${point.y.toFixed(2)}" r="14" tabindex="0" role="button" aria-label="${ariaLabel}"></circle>`;
        })
        .join("");

    chartSelectedPointIndex = Math.min(chartSelectedPointIndex, points.length - 1);
    if (chartSelectedPointIndex < 0) {
        chartSelectedPointIndex = 0;
    }
    const selectedSummary = formatChartSelectedPoint(points[chartSelectedPointIndex]);

    const rainIndexMarkup = entries
        .map((entry) => `
            <li class="rain-index-item">
                <span class="rain-index-time">${entry.time}</span>
                <strong class="rain-index-value">${formatRainIndexValue(entry)}</strong>
            </li>
        `)
        .join("");

    hourlyChartEl.innerHTML = `
        <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("chartAriaLabel")}">
            <line x1="${margin.left}" y1="${barBaseY}" x2="${width - margin.right}" y2="${barBaseY}" stroke="rgba(255,255,255,0.25)" stroke-width="1"></line>
            <line x1="${margin.left}" y1="${lineBottomY}" x2="${width - margin.right}" y2="${lineBottomY}" stroke="rgba(255,255,255,0.18)" stroke-width="1"></line>
            ${xTicksMarkup}
            ${barsMarkup}
            <path d="${linePath}" fill="none" stroke="#ffb454" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path>
            ${pointsMarkup}
            ${hitboxesMarkup}
            ${tempTextMarkup}
            ${labelsMarkup}
        </svg>
        <div class="chart-legend">
            <span class="legend-item"><span class="legend-swatch temp"></span> ${t("tempLegend")}</span>
            <span class="legend-item"><span class="legend-swatch rain"></span> ${t("rainLegend")}</span>
        </div>
        <p id="chartSelectedSummary" class="chart-selected-summary">${selectedSummary}</p>
        <div class="rain-index-block">
            <p class="rain-index-title">${t("rainIndexTitle")}</p>
            <ul class="rain-index-list">${rainIndexMarkup}</ul>
        </div>
    `;

    const selectedSummaryEl = hourlyChartEl.querySelector("#chartSelectedSummary");
    const hitboxes = hourlyChartEl.querySelectorAll(".chart-point-hitbox");
    hitboxes.forEach((hitbox) => {
        const updateSelection = () => {
            const index = Number(hitbox.getAttribute("data-index"));
            if (!Number.isFinite(index) || !points[index]) {
                return;
            }

            chartSelectedPointIndex = index;
            if (selectedSummaryEl) {
                selectedSummaryEl.textContent = formatChartSelectedPoint(points[index]);
            }
        };

        hitbox.addEventListener("click", updateSelection);
        hitbox.addEventListener("touchstart", updateSelection, { passive: true });
        hitbox.addEventListener("focus", updateSelection);
    });
}

function renderHourlyChartEmptyState(message) {
    hourlyChartEl.classList.remove("is-loading");
    hourlyChartEl.innerHTML = `<div class="hourly-empty">${message}</div>`;
}

function resetHourlyChartState() {
    renderHourlyChartEmptyState(t("hourlyEmptyLoaded"));
}

function updateDailySummary(forecastData, timezoneOffset = 0) {
    const summaryData = buildDailySummaryData(forecastData, timezoneOffset);

    if (!summaryData.parts.length) {
        dailySummaryTextEl.textContent = t("dailySummaryUnavailable");
        renderDailySummaryHighlights([]);
        return;
    }

    dailySummaryTextEl.textContent = summaryData.narrative;
    renderDailySummaryHighlights(summaryData.parts);
}

function buildDailySummaryData(forecastData, timezoneOffset = 0) {
    const entries = Array.isArray(forecastData?.list) ? forecastData.list : [];
    if (!entries.length) {
        return {
            narrative: "",
            parts: []
        };
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (24 * 60 * 60);
    const upcoming = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!upcoming.length) {
        return {
            narrative: "",
            parts: []
        };
    }

    const summaryParts = [];
    const visualParts = [];

    TIME_PERIODS.forEach((period) => {
        const periodEntries = upcoming.filter((entry) => {
            const localHour = getLocationHour(entry.dt, timezoneOffset);
            return localHour >= period.startHour && localHour <= period.endHour;
        });

        if (!periodEntries.length) {
            return;
        }

        const representativeEntry = pickClosestEntryByHour(periodEntries, period.targetHour, timezoneOffset);
        const tempDescriptorKey = pickSummaryTemperatureDescriptorKey(representativeEntry?.main?.temp);
        const conditionDescriptorKey = pickSummaryConditionDescriptorKey({
            weatherId: representativeEntry?.weather?.[0]?.id,
            rainChance: Number.isFinite(representativeEntry?.pop) ? representativeEntry.pop * 100 : null,
            windKmh: Number.isFinite(representativeEntry?.wind?.speed) ? representativeEntry.wind.speed * 3.6 : null,
            gustKmh: Number.isFinite(representativeEntry?.wind?.gust) ? representativeEntry.wind.gust * 3.6 : null
        });
        const periodDisplay = t(period.labelKey);
        const periodNarrative = getSummaryPeriodLabel(period.labelKey);
        const iconCode = representativeEntry?.weather?.[0]?.icon || getSummaryIconCodeFromConditionKey(conditionDescriptorKey);

        summaryParts.push(
            t("dailySummaryPart", {
                period: periodNarrative,
                temperature: t(tempDescriptorKey),
                condition: t(conditionDescriptorKey)
            })
        );

        visualParts.push({
            periodLabel: periodDisplay,
            tempDescriptorKey,
            conditionDescriptorKey,
            iconCode
        });
    });

    if (!summaryParts.length) {
        return {
            narrative: "",
            parts: []
        };
    }

    return {
        narrative: `${summaryParts.join(t("dailySummarySeparator"))}.`,
        parts: visualParts
    };
}

function getSummaryIconCodeFromConditionKey(conditionDescriptorKey) {
    const iconByCondition = {
        summaryCondStormy: "11d",
        summaryCondRainy: "10d",
        summaryCondSnowy: "13d",
        summaryCondSunny: "01d",
        summaryCondWindy: "50d",
        summaryCondCloudy: "03d"
    };

    return iconByCondition[conditionDescriptorKey] || "03d";
}

function getDailySummaryIconUrl(iconCode) {
    return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

function getDailySummaryIconAnimationClass(conditionDescriptorKey) {
    const classByCondition = {
        summaryCondSunny: "is-sunny",
        summaryCondCloudy: "is-cloudy",
        summaryCondRainy: "is-rainy",
        summaryCondStormy: "is-stormy",
        summaryCondSnowy: "is-snowy",
        summaryCondWindy: "is-windy"
    };

    return classByCondition[conditionDescriptorKey] || "is-cloudy";
}

function renderDailySummaryHighlights(parts) {
    dailySummaryListEl.innerHTML = "";

    if (!Array.isArray(parts) || !parts.length) {
        dailySummaryListEl.classList.add("hidden");
        return;
    }

    const fragment = document.createDocumentFragment();

    parts.forEach((part, index) => {
        const item = document.createElement("li");
        item.className = "daily-summary-item";
        item.style.setProperty("--summary-delay", `${index * 0.08}s`);

        const period = document.createElement("p");
        period.className = "daily-summary-period";
        period.textContent = part.periodLabel;

        const icon = document.createElement("img");
        icon.className = `daily-summary-icon ${getDailySummaryIconAnimationClass(part.conditionDescriptorKey)}`;
        icon.src = getDailySummaryIconUrl(part.iconCode);
        icon.alt = t("dailySummaryIconAlt", {
            period: part.periodLabel,
            condition: t(part.conditionDescriptorKey)
        });
        icon.loading = "lazy";

        const badges = document.createElement("div");
        badges.className = "daily-summary-badges";

        const tempBadge = document.createElement("span");
        tempBadge.className = "daily-summary-badge temp";
        tempBadge.textContent = t("dailySummaryBadgeTemp", {
            temperature: t(part.tempDescriptorKey)
        });

        const conditionBadge = document.createElement("span");
        conditionBadge.className = "daily-summary-badge cond";
        conditionBadge.textContent = t("dailySummaryBadgeCondition", {
            condition: t(part.conditionDescriptorKey)
        });

        badges.append(tempBadge, conditionBadge);
        item.append(period, icon, badges);
        fragment.appendChild(item);
    });

    dailySummaryListEl.appendChild(fragment);
    dailySummaryListEl.classList.remove("hidden");
}

function getSummaryPeriodLabel(periodLabelKey) {
    const locale = LANGUAGE_TO_LOCALE_MAP[currentLanguage] || "en-US";
    return t(periodLabelKey).toLocaleLowerCase(locale);
}

function pickSummaryTemperatureDescriptorKey(temperatureC) {
    if (!Number.isFinite(temperatureC)) {
        return "summaryTempMild";
    }

    if (temperatureC <= 13) {
        return "summaryTempCold";
    }

    if (temperatureC <= 20) {
        return "summaryTempFresh";
    }

    if (temperatureC <= 27) {
        return "summaryTempMild";
    }

    if (temperatureC <= 33) {
        return "summaryTempWarm";
    }

    return "summaryTempHot";
}

function pickSummaryConditionDescriptorKey(metrics) {
    const weatherId = metrics?.weatherId;
    const rainChance = metrics?.rainChance;
    const windKmh = metrics?.windKmh;
    const gustKmh = metrics?.gustKmh;

    if (Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300) {
        return "summaryCondStormy";
    }

    if (Number.isFinite(weatherId) && weatherId >= 600 && weatherId < 700) {
        return "summaryCondSnowy";
    }

    if (
        Number.isFinite(rainChance) && rainChance >= 60
        || (Number.isFinite(weatherId) && weatherId >= 500 && weatherId < 600)
    ) {
        return "summaryCondRainy";
    }

    if (Number.isFinite(windKmh) && windKmh >= 45 || Number.isFinite(gustKmh) && gustKmh >= 55) {
        return "summaryCondWindy";
    }

    if (Number.isFinite(weatherId) && weatherId === 800) {
        return "summaryCondSunny";
    }

    if (
        Number.isFinite(weatherId)
        && ((weatherId >= 700 && weatherId < 800) || (weatherId > 800 && weatherId < 900))
    ) {
        return "summaryCondCloudy";
    }

    return "summaryCondCloudy";
}

function getDefaultCinematicSceneState() {
    return {
        sceneKey: "default",
        tagKey: "cinematicSceneDefaultTag",
        narrativeKey: "cinematicSceneDefaultNarrative",
        recommendationKey: "cinematicSceneRecommendationDefault",
        contextualScore: null,
        factors: null,
        topDriverKeys: [],
        timeline: []
    };
}

function setCinematicSceneState(sceneState) {
    const safeState = sceneState || getDefaultCinematicSceneState();
    const sceneKey = safeState.sceneKey || "default";

    document.body.dataset.scene = sceneKey;
    cinematicSceneTagEl.className = `cinematic-scene-tag is-${sceneKey}`;
    cinematicSceneTagEl.textContent = t(safeState.tagKey);
    cinematicSceneNarrativeEl.textContent = t(safeState.narrativeKey);

    currentCinematicSceneDetails = safeState;
    renderCinematicSceneContext(safeState);
    renderCinematicSceneTimeline(safeState.timeline);
}

function updateCinematicScene(weatherData, forecastData, timezoneOffset = 0, context = {}) {
    const sceneState = deriveCinematicScene(weatherData, forecastData, timezoneOffset, context);
    setCinematicSceneState(sceneState);
}

function deriveCinematicScene(weatherData, forecastData, timezoneOffset = 0, context = {}) {
    const defaultScene = getDefaultCinematicSceneState();
    const weatherId = weatherData?.weather?.[0]?.id;
    const iconCode = weatherData?.weather?.[0]?.icon;
    const temp = weatherData?.main?.temp;
    const humidity = weatherData?.main?.humidity;
    const hasWeatherContext = Number.isFinite(weatherId) || Number.isFinite(temp) || Number.isFinite(weatherData?.dt);

    if (!hasWeatherContext) {
        return defaultScene;
    }

    const timezoneSafe = Number.isFinite(timezoneOffset) ? timezoneOffset : 0;
    const referenceTimestamp = Number.isFinite(weatherData?.dt)
        ? weatherData.dt
        : Math.floor(Date.now() / 1000);
    const localHour = getLocationHour(referenceTimestamp, timezoneSafe);
    const isNight = !isDaytimeAtLocation(weatherData, iconCode);
    const sceneSignals = getCinematicForecastSignals(forecastData, referenceTimestamp, temp);
    const uvIndex = Number.isFinite(context?.uvIndex)
        ? context.uvIndex
        : resolveDepartureUvForTimestamp(context?.oneCallInsights, referenceTimestamp);
    const aqiValue = Number.isFinite(context?.aqiData?.value) ? context.aqiData.value : null;
    const rainChance = Number.isFinite(context?.rainChance)
        ? Math.max(0, Math.min(100, context.rainChance))
        : sceneSignals.peakRainChance;
    const windNowKmh = Number.isFinite(weatherData?.wind?.gust)
        ? weatherData.wind.gust * 3.6
        : (Number.isFinite(weatherData?.wind?.speed) ? weatherData.wind.speed * 3.6 : 0);

    const sceneState = deriveCinematicSceneFromMetrics({
        weatherId,
        isNight,
        localHour,
        temperatureC: Number.isFinite(temp) ? temp : null,
        humidity: Number.isFinite(humidity) ? humidity : null,
        uvIndex,
        aqiValue,
        peakRainChance: Math.max(rainChance, sceneSignals.peakRainChance),
        peakWindKmh: Math.max(windNowKmh, sceneSignals.peakWindKmh),
        tempVariationC: sceneSignals.tempVariationC,
        hasStormAhead: sceneSignals.hasStormAhead,
        coldFrontApproaching: sceneSignals.coldFrontApproaching,
        cloudiness: Number.isFinite(weatherData?.clouds?.all) ? weatherData.clouds.all : null
    });

    const timeline = buildCinematicSceneTimeline(
        {
            weatherData,
            forecastData,
            oneCallInsights: context?.oneCallInsights ?? null,
            aqiData: context?.aqiData ?? null,
            rainChance,
            timezoneOffset: timezoneSafe
        },
        referenceTimestamp
    );

    return {
        ...sceneState,
        timeline
    };
}

function deriveCinematicSceneFromMetrics(scoreInput) {
    const pressure = buildCinematicPressureVector(scoreInput);
    const isMorningWindow = scoreInput.localHour >= 5 && scoreInput.localHour <= 8;

    const scores = {
        "electric-night": clampCinematicScore(
            18
            + (scoreInput.isNight ? 24 : -22)
            + pressure.rain * 0.35
            + pressure.wind * 0.3
            + pressure.tempVariation * 0.16
            + pressure.aqi * 0.12
            + pressure.storm * 0.34
            + pressure.uv * 0.04
        ),
        "cold-front": clampCinematicScore(
            16
            + pressure.tempVariation * 0.42
            + pressure.rain * 0.28
            + pressure.wind * 0.25
            + pressure.aqi * 0.12
            + pressure.uv * 0.04
            + (scoreInput.coldFrontApproaching ? 18 : 0)
            + (scoreInput.isNight ? 4 : 10)
        ),
        "heat-dry": clampCinematicScore(
            15
            + pressure.heat * 0.47
            + pressure.uv * 0.3
            + pressure.aqi * 0.12
            + (100 - pressure.rain) * 0.18
            + (100 - pressure.wind) * 0.08
            + (scoreInput.isNight ? -22 : 10)
        ),
        aurora: clampCinematicScore(
            18
            + pressure.clear * 0.4
            + pressure.calm * 0.28
            + (100 - pressure.aqi) * 0.15
            + (100 - pressure.rain) * 0.12
            + (isMorningWindow ? 16 : 0)
            + (scoreInput.isNight ? -18 : 8)
        ),
        "rain-approach": clampCinematicScore(
            14
            + pressure.rain * 0.48
            + pressure.wind * 0.24
            + pressure.tempVariation * 0.15
            + pressure.aqi * 0.1
            + pressure.storm * 0.18
            + (scoreInput.isNight ? 8 : 4)
        ),
        "calm-night": clampCinematicScore(
            12
            + (scoreInput.isNight ? 22 : -18)
            + pressure.calm * 0.46
            + (100 - pressure.rain) * 0.18
            + (100 - pressure.wind) * 0.14
            + (100 - pressure.aqi) * 0.12
            + pressure.tempVariation * 0.08
        ),
        "steady-day": clampCinematicScore(
            10
            + (scoreInput.isNight ? -20 : 18)
            + pressure.calm * 0.45
            + (100 - pressure.tempVariation) * 0.2
            + (100 - pressure.rain) * 0.15
            + (100 - pressure.wind) * 0.1
            + (100 - pressure.aqi) * 0.1
            + (100 - pressure.uv) * 0.04
        )
    };

    const [sceneKey, contextualScore] = Object.entries(scores)
        .sort((entryA, entryB) => entryB[1] - entryA[1])[0];
    const sceneMeta = getCinematicSceneMeta(sceneKey);
    const topDriverKeys = Object.entries(pressure.driverScores)
        .sort((entryA, entryB) => entryB[1] - entryA[1])
        .slice(0, 2)
        .map(([driverKey]) => driverKey);

    return {
        ...sceneMeta,
        contextualScore,
        factors: {
            rain: Math.round(pressure.rain),
            wind: Math.round(pressure.wind),
            uv: Number.isFinite(scoreInput.uvIndex) ? Number(scoreInput.uvIndex.toFixed(1)) : null,
            aqi: Number.isFinite(scoreInput.aqiValue) ? scoreInput.aqiValue : null,
            tempVariation: Math.round(pressure.tempVariation)
        },
        topDriverKeys,
        timeline: []
    };
}

function buildCinematicPressureVector(scoreInput) {
    const peakRainChance = Number.isFinite(scoreInput?.peakRainChance) ? scoreInput.peakRainChance : 0;
    const peakWindKmh = Number.isFinite(scoreInput?.peakWindKmh) ? scoreInput.peakWindKmh : 0;
    const uvIndex = Number.isFinite(scoreInput?.uvIndex) ? scoreInput.uvIndex : 0;
    const aqiValue = Number.isFinite(scoreInput?.aqiValue) ? scoreInput.aqiValue : 2;
    const tempVariationC = Number.isFinite(scoreInput?.tempVariationC) ? scoreInput.tempVariationC : 0;
    const temperatureC = Number.isFinite(scoreInput?.temperatureC) ? scoreInput.temperatureC : 24;
    const humidity = Number.isFinite(scoreInput?.humidity) ? scoreInput.humidity : 55;
    const cloudiness = Number.isFinite(scoreInput?.cloudiness) ? scoreInput.cloudiness : 45;
    const weatherId = scoreInput?.weatherId;
    const isClear = weatherId === 800;
    const isStormNow = Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300;

    const rain = clampCinematicScore(peakRainChance);
    const wind = clampCinematicScore(normalizeCinematicRange(peakWindKmh, 12, 82) * 100);
    const uv = clampCinematicScore(normalizeCinematicRange(uvIndex, 0, 11) * 100);
    const aqi = clampCinematicScore(normalizeCinematicRange(aqiValue, 1, 5) * 100);
    const tempVariation = clampCinematicScore(normalizeCinematicRange(tempVariationC, 0, 11) * 100);
    const heat = clampCinematicScore(
        normalizeCinematicRange(temperatureC, 25, 40) * 100
        + normalizeCinematicRange(uvIndex, 3, 11) * 24
        + normalizeCinematicRange(48 - humidity, 0, 25) * 20
    );
    const calm = clampCinematicScore(
        100
        - rain * 0.62
        - wind * 0.52
        - tempVariation * 0.35
        - Math.max(0, aqi - 35) * 0.52
    );
    const clear = clampCinematicScore(
        (isClear ? 78 : 34)
        + (100 - rain) * 0.2
        + (100 - wind) * 0.14
        + (100 - cloudiness) * 0.22
    );
    const storm = (isStormNow || scoreInput?.hasStormAhead) ? 100 : 0;

    return {
        rain,
        wind,
        uv,
        aqi,
        tempVariation,
        heat,
        calm,
        clear,
        storm,
        driverScores: {
            rain,
            wind,
            uv,
            aqi,
            tempVariation
        }
    };
}

function buildCinematicSceneTimeline(snapshot, referenceTimestamp) {
    if (!snapshot?.weatherData || !Array.isArray(CINEMATIC_SCENE_TIMELINE_HOURS)) {
        return [];
    }

    const timezoneOffset = Number.isFinite(snapshot.timezoneOffset) ? snapshot.timezoneOffset : 0;
    const baseTimestamp = Number.isFinite(referenceTimestamp) ? referenceTimestamp : Math.floor(Date.now() / 1000);

    return CINEMATIC_SCENE_TIMELINE_HOURS.map((offsetHours) => {
        const targetUnix = baseTimestamp + (offsetHours * 60 * 60);
        const targetConditions = getDepartureConditionsAtTimestamp(snapshot, targetUnix);

        if (!targetConditions) {
            return null;
        }

        const targetHour = getLocationHour(targetUnix, timezoneOffset);
        const baselineTemp = Number.isFinite(snapshot?.weatherData?.main?.temp)
            ? snapshot.weatherData.main.temp
            : targetConditions.tempC;
        const sceneAtOffset = deriveCinematicSceneFromMetrics({
            weatherId: targetConditions.weatherId,
            isNight: targetHour < 6 || targetHour >= 18,
            localHour: targetHour,
            temperatureC: targetConditions.tempC,
            humidity: snapshot?.weatherData?.main?.humidity ?? null,
            uvIndex: targetConditions.uvIndex,
            aqiValue: targetConditions.aqiValue,
            peakRainChance: targetConditions.rainChance,
            peakWindKmh: targetConditions.gustKmh,
            tempVariationC: Number.isFinite(baselineTemp) && Number.isFinite(targetConditions.tempC)
                ? Math.abs(baselineTemp - targetConditions.tempC)
                : 0,
            hasStormAhead: Number.isFinite(targetConditions.weatherId)
                ? (targetConditions.weatherId >= 200 && targetConditions.weatherId < 300)
                : false,
            coldFrontApproaching: false,
            cloudiness: null
        });

        return {
            offsetHours,
            timeLabel: formatTimeFromUnix(targetUnix, timezoneOffset),
            sceneKey: sceneAtOffset.sceneKey,
            tagKey: sceneAtOffset.tagKey,
            score: sceneAtOffset.contextualScore
        };
    }).filter(Boolean);
}

function renderCinematicSceneContext(sceneState) {
    if (!cinematicSceneScoreEl || !cinematicSceneReasonEl || !cinematicSceneRecommendationEl) {
        return;
    }

    const score = Number.isFinite(sceneState?.contextualScore) ? Math.round(sceneState.contextualScore) : null;
    cinematicSceneScoreEl.textContent = score === null
        ? t("cinematicSceneScoreIdle")
        : t("cinematicSceneScoreValue", { score });

    if (!sceneState?.factors) {
        cinematicSceneReasonEl.textContent = t("cinematicSceneReasonIdle");
    } else {
        const topDriverA = sceneState?.topDriverKeys?.[0] || "rain";
        const topDriverB = sceneState?.topDriverKeys?.[1] || topDriverA;
        const reasonBase = t("cinematicSceneWhyTemplate", {
            rain: sceneState.factors.rain,
            wind: sceneState.factors.wind,
            uv: Number.isFinite(sceneState.factors.uv) ? sceneState.factors.uv : t("unavailable"),
            aqi: Number.isFinite(sceneState.factors.aqi) ? sceneState.factors.aqi : t("unavailable"),
            tempVariation: sceneState.factors.tempVariation
        });
        const reasonDrivers = t("cinematicSceneWhyDrivers", {
            driverA: t(getCinematicDriverLabelKey(topDriverA)),
            driverB: t(getCinematicDriverLabelKey(topDriverB))
        });
        cinematicSceneReasonEl.textContent = `${reasonBase} ${reasonDrivers}`;
    }

    const recommendation = t(sceneState?.recommendationKey || "cinematicSceneRecommendationDefault");
    cinematicSceneRecommendationEl.textContent = t("cinematicSceneRecommendationLabel", { recommendation });
}

function renderCinematicSceneTimeline(timelineItems) {
    if (!cinematicSceneTimelineEl) {
        return;
    }

    cinematicSceneTimelineEl.innerHTML = "";
    const safeItems = Array.isArray(timelineItems)
        ? timelineItems.filter((item) => item && Number.isFinite(item.offsetHours) && item.tagKey)
        : [];

    if (!safeItems.length) {
        cinematicSceneTimelineEl.innerHTML = `<li>${t("cinematicSceneTimelineIdle")}</li>`;
        return;
    }

    safeItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.className = "cinematic-scene-timeline-item";

        const timeLabel = document.createElement("span");
        timeLabel.className = "cinematic-scene-timeline-time";
        timeLabel.textContent = t("cinematicSceneTimelineSlot", {
            offset: item.offsetHours,
            time: item.timeLabel
        });

        const tag = document.createElement("span");
        tag.className = "cinematic-scene-timeline-tag";
        tag.textContent = `${t(item.tagKey)}${Number.isFinite(item.score) ? ` · ${Math.round(item.score)}/100` : ""}`;

        listItem.append(timeLabel, tag);
        cinematicSceneTimelineEl.appendChild(listItem);
    });
}

function getCinematicDriverLabelKey(driverKey) {
    const labelMap = {
        rain: "cinematicSceneDriverRain",
        wind: "cinematicSceneDriverWind",
        uv: "cinematicSceneDriverUv",
        aqi: "cinematicSceneDriverAqi",
        tempVariation: "cinematicSceneDriverTempVariation"
    };

    return labelMap[driverKey] || labelMap.rain;
}

function getCinematicSceneMeta(sceneKey) {
    const sceneMap = {
        aurora: {
            sceneKey: "aurora",
            tagKey: "cinematicSceneTagAurora",
            narrativeKey: "cinematicSceneNarrativeAurora",
            recommendationKey: "cinematicSceneRecommendationAurora"
        },
        "heat-dry": {
            sceneKey: "heat-dry",
            tagKey: "cinematicSceneTagHeatDry",
            narrativeKey: "cinematicSceneNarrativeHeatDry",
            recommendationKey: "cinematicSceneRecommendationHeatDry"
        },
        "cold-front": {
            sceneKey: "cold-front",
            tagKey: "cinematicSceneTagColdFront",
            narrativeKey: "cinematicSceneNarrativeColdFront",
            recommendationKey: "cinematicSceneRecommendationColdFront"
        },
        "rain-approach": {
            sceneKey: "rain-approach",
            tagKey: "cinematicSceneTagRainApproach",
            narrativeKey: "cinematicSceneNarrativeRainApproach",
            recommendationKey: "cinematicSceneRecommendationRainApproach"
        },
        "electric-night": {
            sceneKey: "electric-night",
            tagKey: "cinematicSceneTagElectricNight",
            narrativeKey: "cinematicSceneNarrativeElectricNight",
            recommendationKey: "cinematicSceneRecommendationElectricNight"
        },
        "calm-night": {
            sceneKey: "calm-night",
            tagKey: "cinematicSceneTagCalmNight",
            narrativeKey: "cinematicSceneNarrativeCalmNight",
            recommendationKey: "cinematicSceneRecommendationCalmNight"
        },
        "steady-day": {
            sceneKey: "steady-day",
            tagKey: "cinematicSceneTagSteadyDay",
            narrativeKey: "cinematicSceneNarrativeSteadyDay",
            recommendationKey: "cinematicSceneRecommendationSteadyDay"
        }
    };

    return sceneMap[sceneKey] || getDefaultCinematicSceneState();
}

function normalizeCinematicRange(value, min, max) {
    if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) {
        return 0;
    }

    return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

function clampCinematicScore(value) {
    if (!Number.isFinite(value)) {
        return 0;
    }

    return Math.max(0, Math.min(100, value));
}

function getCinematicForecastSignals(forecastData, referenceTimestamp, currentTemp) {
    const entries = Array.isArray(forecastData?.list) ? forecastData.list : [];
    if (!entries.length) {
        return {
            peakRainChance: 0,
            hasStormAhead: false,
            coldFrontApproaching: false,
            peakWindKmh: 0,
            tempVariationC: 0
        };
    }

    const nowUnix = Number.isFinite(referenceTimestamp) ? referenceTimestamp : Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (12 * 60 * 60);
    const upcoming = entries.filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix);

    if (!upcoming.length) {
        return {
            peakRainChance: 0,
            hasStormAhead: false,
            coldFrontApproaching: false,
            peakWindKmh: 0,
            tempVariationC: 0
        };
    }

    let peakRainChance = 0;
    let hasStormAhead = false;
    let minTempAhead = Number.POSITIVE_INFINITY;
    let maxTempAhead = Number.NEGATIVE_INFINITY;
    let peakWindKmh = 0;

    upcoming.forEach((entry) => {
        const chance = Number.isFinite(entry?.pop) ? Math.round(entry.pop * 100) : 0;
        const weatherId = entry?.weather?.[0]?.id;
        const temp = entry?.main?.temp;
        const gustKmh = Number.isFinite(entry?.wind?.gust)
            ? entry.wind.gust * 3.6
            : (Number.isFinite(entry?.wind?.speed) ? entry.wind.speed * 3.6 : 0);

        peakRainChance = Math.max(peakRainChance, chance);
        peakWindKmh = Math.max(peakWindKmh, gustKmh);

        if (Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300) {
            hasStormAhead = true;
        }

        if (Number.isFinite(temp)) {
            minTempAhead = Math.min(minTempAhead, temp);
            maxTempAhead = Math.max(maxTempAhead, temp);
        }
    });

    const hasTempDrop = Number.isFinite(currentTemp) && Number.isFinite(minTempAhead) && (currentTemp - minTempAhead) >= 5;
    const coldFrontApproaching = hasTempDrop && (peakRainChance >= 45 || hasStormAhead);
    const tempVariationC = Number.isFinite(currentTemp) && Number.isFinite(minTempAhead) && Number.isFinite(maxTempAhead)
        ? Math.max(Math.abs(currentTemp - minTempAhead), Math.abs(maxTempAhead - currentTemp))
        : 0;

    return {
        peakRainChance,
        hasStormAhead,
        coldFrontApproaching,
        peakWindKmh,
        tempVariationC
    };
}

function resetDepartureAssistantResult() {
    lastDepartureAssessment = null;
    currentSafeWindowModeKey = DEFAULT_DEPARTURE_MODE_KEY;
    departureAssistantResultEl.classList.add("departure-empty");
    departureAssistantResultEl.innerHTML = t("departureEmpty");
}

function handleDepartureAssistantSubmit(event) {
    event.preventDefault();

    if (!currentWeatherSnapshot) {
        setStatus(t("departureNoData"), "error");
        departureAssistantResultEl.classList.add("departure-empty");
        departureAssistantResultEl.innerHTML = t("departureNoData");
        return;
    }

    const wasHandled = runDepartureAssistantFromInput(true);
    if (!wasHandled) {
        departureAssistantResultEl.classList.add("departure-empty");
        departureAssistantResultEl.innerHTML = lastDeparturePromptErrorCode === "blocked"
            ? t("departureBlockedSpeech")
            : t("departureInvalid");
    }
}

function runDepartureAssistantFromInput(requirePrompt = false) {
    lastDeparturePromptErrorCode = null;

    if (!currentWeatherSnapshot) {
        return false;
    }

    const prompt = String(departurePromptInputEl.value || "").trim();
    if (!prompt) {
        lastDeparturePromptErrorCode = "invalid";
        if (requirePrompt) {
            departureAssistantResultEl.classList.add("departure-empty");
            departureAssistantResultEl.innerHTML = t("departureInvalid");
        }
        return false;
    }

    const normalizedPrompt = normalizeDeparturePrompt(prompt);
    if (hasBlockedDepartureSpeech(normalizedPrompt)) {
        lastDeparturePromptErrorCode = "blocked";
        if (requirePrompt) {
            setStatus(t("departureBlockedSpeech"), "error");
            departureAssistantResultEl.classList.add("departure-empty");
            departureAssistantResultEl.innerHTML = t("departureBlockedSpeech");
        }
        return false;
    }

    const parsedPrompt = parseDeparturePrompt(prompt, currentWeatherSnapshot.timezoneOffset);
    if (!parsedPrompt) {
        lastDeparturePromptErrorCode = "invalid";
        return false;
    }

    currentSafeWindowModeKey = parsedPrompt.modeKey || DEFAULT_DEPARTURE_MODE_KEY;
    updateSafeWindow(currentWeatherSnapshot, currentSafeWindowModeKey);

    const assessment = buildDepartureAssessment(currentWeatherSnapshot, parsedPrompt);
    if (!assessment) {
        return false;
    }

    lastDepartureAssessment = assessment;
    renderDepartureAssistantResult(assessment);
    return true;
}

function parseDeparturePrompt(prompt, timezoneOffset = 0) {
    const normalized = normalizeDeparturePrompt(prompt);
    if (!normalized) {
        return null;
    }

    const modeKey = detectDepartureModeKey(normalized);
    const modeCueDetected = modeKey !== "departureModeGeneric";
    const temporalSignal = parseDepartureTargetSignal(normalized, timezoneOffset);
    const intentDetected = hasDepartureIntent(normalized);

    // Evita falso-positivo com texto aleatorio: exige intencao clara,
    // ou combinacao de modal + referencia temporal.
    if (!intentDetected && !(modeCueDetected && temporalSignal.hasTemporalCue)) {
        return null;
    }

    const targetUnix = temporalSignal.targetUnix ?? Math.floor(Date.now() / 1000);

    return {
        rawPrompt: prompt,
        modeKey,
        targetUnix
    };
}

function hasDepartureIntent(normalizedPrompt) {
    return /(se eu sair|vou sair|devo sair|posso sair|sair agora|sair as|sair a|vou ir|devo ir|posso ir|partir|pegar a estrada|if i leave|should i leave|leave now|leave at|go out|should i go)/.test(normalizedPrompt);
}

function normalizeDeparturePrompt(prompt) {
    return normalizeCityToken(prompt)
        .replace(/[?!.,]/g, " ")
        .replace(/\s{2,}/g, " ")
        .trim();
}

function hasBlockedDepartureSpeech(normalizedPrompt) {
    if (!normalizedPrompt) {
        return false;
    }

    return /(\bcaralh\w*\b|\bporr\w*\b|\bmerd\w*\b|\bbost\w*\b|\bidiot\w*\b|\botari\w*\b|\bbabac\w*\b|\bimbecil\w*\b|\bburr\w*\b|\barromb\w*\b|\bdesgrac\w*\b|\bfdp\b|\bvsf\b|\bvtnc\b|\bfuck\w*\b|\bshit\w*\b|\bbitch\w*\b|\basshole\w*\b|\bstupid\w*\b|\bmoron\w*\b|filho\s+da\s+puta|vai\s+se\s+foder|foda\s*-?\s*se|puta\s+que\s+pariu)/.test(normalizedPrompt);
}

function detectDepartureModeKey(normalizedPrompt) {
    if (/moto|motocicleta/.test(normalizedPrompt)) {
        return "departureModeMotorcycle";
    }

    if (/bike|bicicleta|ciclismo/.test(normalizedPrompt)) {
        return "departureModeBike";
    }

    if (/corrida|correr|running/.test(normalizedPrompt)) {
        return "departureModeRunning";
    }

    if (/a pe|andar|caminhada|walking/.test(normalizedPrompt)) {
        return "departureModeWalking";
    }

    if (/carro|dirigir|drive/.test(normalizedPrompt)) {
        return "departureModeCar";
    }

    if (/onibus|metro|trem|bus|train|transporte publico/.test(normalizedPrompt)) {
        return "departureModeTransit";
    }

    return "departureModeGeneric";
}

function parseDepartureTargetSignal(normalizedPrompt, timezoneOffset = 0) {
    const nowUnix = Math.floor(Date.now() / 1000);

    const clockMatch = normalizedPrompt.match(/(?:\bas\b|\ba\b|\bat\b)\s*(\d{1,2})(?:[:h](\d{2}))?\s*h?|\b(\d{1,2}):(\d{2})\b/);
    if (clockMatch) {
        const hourValue = Number.isFinite(Number(clockMatch[1])) ? Number(clockMatch[1]) : Number(clockMatch[3]);
        const minuteValue = Number.isFinite(Number(clockMatch[2]))
            ? Number(clockMatch[2])
            : (Number.isFinite(Number(clockMatch[4])) ? Number(clockMatch[4]) : 0);

        if (hourValue >= 0 && hourValue <= 23 && minuteValue >= 0 && minuteValue <= 59) {
            return {
                targetUnix: getNextUnixForLocalClock(hourValue, minuteValue, timezoneOffset),
                hasTemporalCue: true
            };
        }
    }

    if (/\bagora\b|\bnow\b/.test(normalizedPrompt)) {
        return {
            targetUnix: nowUnix,
            hasTemporalCue: true
        };
    }

    const minutesMatch = normalizedPrompt.match(/(?:daqui|em|in)?\s*(\d{1,3})\s*(m|min|minuto|minutos|minute|minutes)\b/);
    if (minutesMatch) {
        const minutes = Number(minutesMatch[1]);
        if (Number.isFinite(minutes)) {
            return {
                targetUnix: nowUnix + (minutes * 60),
                hasTemporalCue: true
            };
        }
    }

    const hoursMatch = normalizedPrompt.match(/(?:daqui|em|in)?\s*(\d{1,3})\s*(h|hr|hrs|hora|horas|hour|hours)\b/);
    if (hoursMatch) {
        const hours = Number(hoursMatch[1]);
        if (Number.isFinite(hours)) {
            return {
                targetUnix: nowUnix + (hours * 60 * 60),
                hasTemporalCue: true
            };
        }
    }

    const daysMatch = normalizedPrompt.match(/(?:daqui|em|in)?\s*(\d{1,3})\s*(d|dia|dias|day|days)\b/);
    if (daysMatch) {
        const days = Number(daysMatch[1]);
        if (Number.isFinite(days)) {
            return {
                targetUnix: nowUnix + (days * 24 * 60 * 60),
                hasTemporalCue: true
            };
        }
    }

    return {
        targetUnix: null,
        hasTemporalCue: false
    };
}

function getNextUnixForLocalClock(hour, minute, timezoneOffset = 0) {
    const nowUnix = Math.floor(Date.now() / 1000);
    const localNow = toLocationDate(nowUnix, timezoneOffset);
    const targetUtcMs = Date.UTC(
        localNow.getUTCFullYear(),
        localNow.getUTCMonth(),
        localNow.getUTCDate(),
        hour,
        minute,
        0
    );

    let targetUnix = Math.floor(targetUtcMs / 1000) - timezoneOffset;
    if (targetUnix < nowUnix - 60) {
        targetUnix += 24 * 60 * 60;
    }

    return targetUnix;
}

function buildDepartureAssessment(snapshot, parsedPrompt) {
    const conditions = getDepartureConditionsAtTimestamp(snapshot, parsedPrompt.targetUnix);
    if (!conditions) {
        return null;
    }

    const riskScore = calculateDepartureRiskScore(conditions, parsedPrompt.modeKey);
    const riskDescriptor = getDepartureRiskDescriptor(riskScore);
    const recommendationKey = pickDepartureRecommendationKey(conditions, riskDescriptor.level, parsedPrompt.modeKey);
    const planBItems = buildDeparturePlanBItems(conditions, riskDescriptor.level, parsedPrompt.modeKey, parsedPrompt.targetUnix);

    return {
        modeKey: parsedPrompt.modeKey,
        targetUnix: parsedPrompt.targetUnix,
        conditions,
        riskScore,
        riskLevel: riskDescriptor.level,
        riskLabelKey: riskDescriptor.labelKey,
        riskClassName: riskDescriptor.className,
        recommendationKey,
        planBItems
    };
}

function getDepartureConditionsAtTimestamp(snapshot, targetUnix) {
    if (!snapshot?.weatherData) {
        return null;
    }

    const currentWeather = snapshot.weatherData;
    const forecastEntries = Array.isArray(snapshot?.forecastData?.list) ? snapshot.forecastData.list : [];
    const nearestForecast = forecastEntries.length
        ? forecastEntries.reduce((closest, current) => {
            if (!closest) {
                return current;
            }

            const closestDistance = Math.abs(closest.dt - targetUnix);
            const currentDistance = Math.abs(current.dt - targetUnix);
            return currentDistance < closestDistance ? current : closest;
        }, null)
        : null;

    const useForecast = nearestForecast && Math.abs(nearestForecast.dt - targetUnix) <= (6 * 60 * 60);
    const source = useForecast ? nearestForecast : null;

    const tempC = Number.isFinite(source?.main?.temp)
        ? source.main.temp
        : currentWeather?.main?.temp;
    const rainChance = Number.isFinite(source?.pop)
        ? Math.round(source.pop * 100)
        : (Number.isFinite(snapshot?.rainChance) ? Math.round(snapshot.rainChance) : 0);
    const windKmh = Number.isFinite(source?.wind?.speed)
        ? source.wind.speed * 3.6
        : (Number.isFinite(currentWeather?.wind?.speed) ? currentWeather.wind.speed * 3.6 : null);
    const gustKmh = Number.isFinite(source?.wind?.gust)
        ? source.wind.gust * 3.6
        : (Number.isFinite(currentWeather?.wind?.gust) ? currentWeather.wind.gust * 3.6 : windKmh);
    const weatherId = source?.weather?.[0]?.id ?? currentWeather?.weather?.[0]?.id ?? null;
    const uvIndex = resolveDepartureUvForTimestamp(snapshot?.oneCallInsights, targetUnix);
    const aqiValue = Number.isFinite(snapshot?.aqiData?.value) ? snapshot.aqiData.value : null;

    return {
        tempC,
        rainChance,
        windKmh,
        gustKmh,
        weatherId,
        uvIndex,
        aqiValue,
        timezoneOffset: snapshot.timezoneOffset ?? 0
    };
}

function resolveDepartureUvForTimestamp(oneCallInsights, targetUnix) {
    const hourlyUv = Array.isArray(oneCallInsights?.hourlyUv) ? oneCallInsights.hourlyUv : [];
    if (hourlyUv.length) {
        const nearest = hourlyUv.reduce((closest, current) => {
            if (!closest) {
                return current;
            }

            const closestDistance = Math.abs(closest.dt - targetUnix);
            const currentDistance = Math.abs(current.dt - targetUnix);
            return currentDistance < closestDistance ? current : closest;
        }, null);

        if (Number.isFinite(nearest?.uv)) {
            return nearest.uv;
        }
    }

    return Number.isFinite(oneCallInsights?.uvIndex) ? oneCallInsights.uvIndex : null;
}

function getDepartureModeProfile(modeKey) {
    const profiles = {
        departureModeMotorcycle: { rainWeight: 1.45, windWeight: 1.45, heatWeight: 1.05, uvWeight: 0.9, aqiWeight: 0.75, isTwoWheels: true, isOutdoor: true },
        departureModeBike: { rainWeight: 1.35, windWeight: 1.25, heatWeight: 1.2, uvWeight: 1.2, aqiWeight: 0.95, isTwoWheels: true, isOutdoor: true },
        departureModeWalking: { rainWeight: 1.15, windWeight: 1.0, heatWeight: 1.2, uvWeight: 1.25, aqiWeight: 1.1, isTwoWheels: false, isOutdoor: true },
        departureModeRunning: { rainWeight: 1.1, windWeight: 1.0, heatWeight: 1.35, uvWeight: 1.35, aqiWeight: 1.2, isTwoWheels: false, isOutdoor: true },
        departureModeCar: { rainWeight: 0.8, windWeight: 0.8, heatWeight: 0.6, uvWeight: 0.4, aqiWeight: 0.4, isTwoWheels: false, isOutdoor: false },
        departureModeTransit: { rainWeight: 1.0, windWeight: 0.9, heatWeight: 0.8, uvWeight: 0.7, aqiWeight: 0.8, isTwoWheels: false, isOutdoor: false },
        departureModeGeneric: { rainWeight: 1.0, windWeight: 1.0, heatWeight: 1.0, uvWeight: 1.0, aqiWeight: 1.0, isTwoWheels: false, isOutdoor: true }
    };

    return profiles[modeKey] || profiles.departureModeGeneric;
}

function getSensitivityProfileAdjustments(profileKey) {
    const profiles = {
        balanced: { rainMultiplier: 1.0, windMultiplier: 1.0, heatMultiplier: 1.0, uvMultiplier: 1.0, aqiMultiplier: 1.0 },
        heat: { rainMultiplier: 0.95, windMultiplier: 0.95, heatMultiplier: 1.4, uvMultiplier: 1.45, aqiMultiplier: 1.0 },
        rain: { rainMultiplier: 1.5, windMultiplier: 1.05, heatMultiplier: 0.9, uvMultiplier: 0.9, aqiMultiplier: 1.0 },
        wind: { rainMultiplier: 1.0, windMultiplier: 1.5, heatMultiplier: 0.95, uvMultiplier: 0.95, aqiMultiplier: 1.0 },
        air: { rainMultiplier: 0.95, windMultiplier: 1.0, heatMultiplier: 1.05, uvMultiplier: 1.1, aqiMultiplier: 1.8 }
    };

    return profiles[profileKey] || profiles.balanced;
}

function applySensitivityProfileToModeProfile(modeProfile) {
    const safeModeProfile = modeProfile || getDepartureModeProfile(DEFAULT_DEPARTURE_MODE_KEY);
    const adjustment = getSensitivityProfileAdjustments(currentSensitivityProfile);

    return {
        ...safeModeProfile,
        rainWeight: safeModeProfile.rainWeight * adjustment.rainMultiplier,
        windWeight: safeModeProfile.windWeight * adjustment.windMultiplier,
        heatWeight: safeModeProfile.heatWeight * adjustment.heatMultiplier,
        uvWeight: safeModeProfile.uvWeight * adjustment.uvMultiplier,
        aqiWeight: safeModeProfile.aqiWeight * adjustment.aqiMultiplier
    };
}

function calculateDepartureRiskScore(conditions, modeKey) {
    const modeProfile = applySensitivityProfileToModeProfile(getDepartureModeProfile(modeKey));
    const rainChance = Number.isFinite(conditions?.rainChance) ? conditions.rainChance : 0;
    const windKmh = Number.isFinite(conditions?.windKmh) ? conditions.windKmh : 0;
    const gustKmh = Number.isFinite(conditions?.gustKmh) ? conditions.gustKmh : windKmh;
    const tempC = Number.isFinite(conditions?.tempC) ? conditions.tempC : 24;
    const uvIndex = Number.isFinite(conditions?.uvIndex) ? conditions.uvIndex : 2;
    const aqiValue = Number.isFinite(conditions?.aqiValue) ? conditions.aqiValue : 2;
    const weatherId = conditions?.weatherId;

    let score = 8;

    score += Math.max(0, (rainChance - 25) * 0.72) * modeProfile.rainWeight;
    score += Math.max(0, (gustKmh - 35) * 0.55) * modeProfile.windWeight;
    score += Math.max(0, (tempC - 31) * 2.8) * modeProfile.heatWeight;

    if (modeProfile.isOutdoor) {
        score += Math.max(0, (uvIndex - 6) * 4.2) * modeProfile.uvWeight;
    }

    score += Math.max(0, (aqiValue - 2) * 8) * modeProfile.aqiWeight;

    if (Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300) {
        score += 25;
    }

    if (modeProfile.isTwoWheels && rainChance >= 65) {
        score += 14;
    }

    if (modeProfile.isTwoWheels && gustKmh >= 65) {
        score += 14;
    }

    return Math.max(0, Math.min(100, Math.round(score)));
}

function getDepartureRiskDescriptor(riskScore) {
    if (riskScore >= 80) {
        return {
            level: "critical",
            labelKey: "departureRiskCritical",
            className: "is-critical"
        };
    }

    if (riskScore >= 60) {
        return {
            level: "high",
            labelKey: "departureRiskHigh",
            className: "is-high"
        };
    }

    if (riskScore >= 35) {
        return {
            level: "moderate",
            labelKey: "departureRiskModerate",
            className: "is-moderate"
        };
    }

    return {
        level: "low",
        labelKey: "departureRiskLow",
        className: "is-low"
    };
}

function pickDepartureRecommendationKey(conditions, riskLevel, modeKey) {
    const weatherId = conditions?.weatherId;
    const rainChance = Number.isFinite(conditions?.rainChance) ? conditions.rainChance : 0;
    const gustKmh = Number.isFinite(conditions?.gustKmh) ? conditions.gustKmh : 0;
    const tempC = Number.isFinite(conditions?.tempC) ? conditions.tempC : null;
    const isStorm = Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300;
    const isTwoWheels = getDepartureModeProfile(modeKey).isTwoWheels;

    if (riskLevel === "critical" || isStorm) {
        return "departureRecCriticalStorm";
    }

    if (isTwoWheels && rainChance >= 65) {
        return "departureRecHighRainRide";
    }

    if (isTwoWheels && gustKmh >= 65) {
        return "departureRecHighWindRide";
    }

    if (Number.isFinite(tempC) && tempC >= 35 && (modeKey === "departureModeRunning" || modeKey === "departureModeWalking")) {
        return "departureRecHeatOutdoor";
    }

    if (riskLevel === "high" || riskLevel === "moderate") {
        return "departureRecModerate";
    }

    return "departureRecLow";
}

function buildDeparturePlanBItems(conditions, riskLevel, modeKey, targetUnix) {
    if (riskLevel !== "critical" && riskLevel !== "high") {
        return [];
    }

    const items = [];
    const rainChance = Number.isFinite(conditions?.rainChance) ? conditions.rainChance : 0;
    const gustKmh = Number.isFinite(conditions?.gustKmh) ? conditions.gustKmh : 0;
    const weatherId = conditions?.weatherId;
    const isStorm = Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300;
    const modeProfile = getDepartureModeProfile(modeKey);
    const nowUnix = Math.floor(Date.now() / 1000);
    const deltaMinutes = Math.max(0, Math.round((targetUnix - nowUnix) / 60));

    if (deltaMinutes <= 10) {
        items.push(t("planBDelayByMinutes", { minutes: 20 }));
    } else if (deltaMinutes <= 30) {
        items.push(t("planBDelayByMinutes", { minutes: 30 }));
    } else {
        items.push(t("planBDelayGeneric"));
    }

    if (modeProfile.isTwoWheels || isStorm || rainChance >= 70 || gustKmh >= 60) {
        items.push(t("planBSwitchTransport"));
    }

    if (rainChance >= 60 || isStorm) {
        items.push(t("planBRainGear"));
    }

    if (gustKmh >= 60) {
        items.push(t("planBWindRoute"));
    }

    return Array.from(new Set(items));
}

function renderDepartureAssistantResult(assessment) {
    if (!assessment) {
        resetDepartureAssistantResult();
        return;
    }

    const targetTime = formatTimeFromUnix(assessment.targetUnix, assessment.conditions.timezoneOffset);
    const targetLabel = t("departureTargetLabel", {
        time: targetTime,
        mode: t(assessment.modeKey)
    });
    const temp = formatTemperatureValue(assessment.conditions.tempC, t("unavailable"));
    const rain = Number.isFinite(assessment.conditions.rainChance) ? Math.round(assessment.conditions.rainChance) : 0;
    const wind = formatWindSpeedValue(assessment.conditions.windKmh, t("unavailable"));
    const gust = formatWindSpeedValue(assessment.conditions.gustKmh, t("unavailable"));
    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";
    const planBItems = Array.isArray(assessment.planBItems) ? assessment.planBItems : [];
    const planBMarkup = planBItems.length
        ? `
            <div class="departure-plan-b">
                <strong>${t("planBTitle")}</strong>
                <ul>${planBItems.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
        `
        : "";

    departureAssistantResultEl.classList.remove("departure-empty");
    departureAssistantResultEl.innerHTML = `
        <div class="departure-result-head">
            <span class="departure-risk-badge ${assessment.riskClassName}">${t(assessment.riskLabelKey)} · ${assessment.riskScore}/100</span>
            <strong>${targetLabel}</strong>
        </div>
        <p>${t("departureConditionsLine", {
            temp,
            rain,
            wind,
            gust,
            speedUnit
        })}</p>
        <p class="departure-recommendation">${t("departureRecommendationPrefix")} ${t(assessment.recommendationKey)}</p>
        ${planBMarkup}
    `;
}

function resetCommuteState() {
    lastCommuteAssessment = null;
    commuteResultEl.classList.add("departure-empty");
    commuteResultEl.textContent = t("commuteEmpty");
}

async function handleCommuteSubmit(event) {
    event.preventDefault();
    hideCommuteDestinationSuggestions();

    if (!currentWeatherSnapshot?.weatherData) {
        setStatus(t("commuteNoData"), "error");
        resetCommuteState();
        return;
    }

    const destinationQuery = String(commuteDestinationInputEl.value || "").trim();
    if (!destinationQuery) {
        setStatus(t("commuteDestinationRequired"), "error");
        resetCommuteState();
        return;
    }

    const modeKey = commuteModeSelectEl.value || DEFAULT_DEPARTURE_MODE_KEY;
    setStatus(t("commuteLoading"), "loading");

    try {
        const destination = await resolveCommuteDestinationFromInputOrState({ allowErrorResult: true });

        if (!destination) {
            setStatus(t("commuteDestinationNotFound"), "error");
            resetCommuteState();
            return;
        }

        if (destination.errorKey) {
            const cityName = getCommuteCityContext()?.cityName || currentCityName || t("cityInputLabel");
            setStatus(t(destination.errorKey, { city: cityName }), "error");
            resetCommuteState();
            return;
        }

        const originLat = currentWeatherSnapshot.weatherData?.coord?.lat;
        const originLon = currentWeatherSnapshot.weatherData?.coord?.lon;
        const etaData = await resolveCommuteEta({
            originLat,
            originLon,
            destinationLat: destination.lat,
            destinationLon: destination.lon,
            modeKey
        });

        if (!etaData || !Number.isFinite(etaData.etaSeconds)) {
            setStatus(t("commuteRouteUnavailable"), "error");
            resetCommuteState();
            return;
        }

        const assessment = buildCommuteAssessmentFromEta({
            destinationLabel: destination.label,
            destinationLat: destination.lat,
            destinationLon: destination.lon,
            modeKey,
            etaSeconds: etaData.etaSeconds,
            distanceKm: etaData.distanceKm,
            providerKey: etaData.providerKey,
            trafficDelayMinutes: etaData.trafficDelayMinutes,
            usesEstimate: etaData.usesEstimate
        });

        if (!assessment) {
            setStatus(t("commuteRouteUnavailable"), "error");
            resetCommuteState();
            return;
        }

        assessment.modeComparison = await buildCommuteModeComparison({
            originLat,
            originLon,
            destination,
            fallbackProviderKey: etaData.providerKey
        });

        recordCommuteEtaHistory(assessment);

        lastCommuteAssessment = assessment;
        renderCommuteResult(assessment);
        setStatus("", "idle");
    } catch {
        setStatus(t("commuteRouteUnavailable"), "error");
        resetCommuteState();
    }
}

function refreshCommuteAssessmentFromState() {
    if (!currentWeatherSnapshot || !lastCommuteAssessment) {
        return;
    }

    const assessment = buildCommuteAssessmentFromEta({
        destinationLabel: lastCommuteAssessment.destinationLabel,
        destinationLat: lastCommuteAssessment.destinationLat,
        destinationLon: lastCommuteAssessment.destinationLon,
        modeKey: lastCommuteAssessment.modeKey,
        etaSeconds: lastCommuteAssessment.etaSeconds,
        distanceKm: lastCommuteAssessment.distanceKm,
        providerKey: lastCommuteAssessment.providerKey,
        trafficDelayMinutes: lastCommuteAssessment.trafficDelayMinutes,
        usesEstimate: lastCommuteAssessment.usesEstimate
    });

    if (!assessment) {
        resetCommuteState();
        return;
    }

    assessment.modeComparison = Array.isArray(lastCommuteAssessment.modeComparison)
        ? lastCommuteAssessment.modeComparison
        : [];
    lastCommuteAssessment = assessment;
    renderCommuteResult(assessment);
}

function buildCommuteAssessmentFromEta(baseData) {
    if (!currentWeatherSnapshot || !Number.isFinite(baseData?.etaSeconds)) {
        return null;
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const targetUnix = nowUnix + Math.max(60, Math.round(baseData.etaSeconds));
    const parsedPrompt = {
        modeKey: baseData.modeKey || DEFAULT_DEPARTURE_MODE_KEY,
        targetUnix
    };

    const arrivalAssessment = buildDepartureAssessment(currentWeatherSnapshot, parsedPrompt);
    if (!arrivalAssessment) {
        return null;
    }

    const routeRisk = buildRouteWindowRisk(currentWeatherSnapshot, parsedPrompt.modeKey, targetUnix, arrivalAssessment.riskScore);
    const adjustedRiskScore = calculateAdjustedCommuteRisk(
        arrivalAssessment.riskScore,
        routeRisk.averageRisk,
        routeRisk.peakRisk,
        baseData.trafficDelayMinutes
    );
    const adjustedRiskDescriptor = getDepartureRiskDescriptor(adjustedRiskScore);
    const criticalAlerts = buildCommuteCriticalRouteAlerts(currentWeatherSnapshot, targetUnix);
    const etaTrend = buildCommuteEtaTrend({
        modeKey: parsedPrompt.modeKey,
        targetUnix,
        etaSeconds: Math.max(60, Math.round(baseData.etaSeconds))
    });
    const departureWindowRecommendation = buildCommuteDepartureWindowRecommendation({
        modeKey: parsedPrompt.modeKey,
        etaSeconds: Math.max(60, Math.round(baseData.etaSeconds)),
        trafficDelayMinutes: baseData.trafficDelayMinutes,
        timezoneOffset: arrivalAssessment.conditions.timezoneOffset
    });

    return {
        ...arrivalAssessment,
        destinationLabel: baseData.destinationLabel,
        destinationLat: baseData.destinationLat,
        destinationLon: baseData.destinationLon,
        etaSeconds: Math.max(60, Math.round(baseData.etaSeconds)),
        distanceKm: baseData.distanceKm,
        providerKey: baseData.providerKey || "commuteProviderEstimate",
        trafficDelayMinutes: baseData.trafficDelayMinutes,
        usesEstimate: Boolean(baseData.usesEstimate),
        adjustedRiskScore,
        adjustedRiskClassName: adjustedRiskDescriptor.className,
        adjustedRiskLabelKey: adjustedRiskDescriptor.labelKey,
        adjustedRecommendationKey: pickDepartureRecommendationKey(
            arrivalAssessment.conditions,
            adjustedRiskDescriptor.level,
            parsedPrompt.modeKey
        ),
        planBItems: buildDeparturePlanBItems(
            arrivalAssessment.conditions,
            adjustedRiskDescriptor.level,
            parsedPrompt.modeKey,
            targetUnix
        ),
        routeAverageRisk: routeRisk.averageRisk,
        routePeakRisk: routeRisk.peakRisk,
        criticalAlerts,
        etaTrend,
        departureWindowRecommendation,
        modeComparison: []
    };
}

function calculateAdjustedCommuteRisk(arrivalRisk, routeAverageRisk, routePeakRisk, trafficDelayMinutes = null) {
    const safeArrivalRisk = Number.isFinite(arrivalRisk) ? arrivalRisk : 45;
    const safeAverageRisk = Number.isFinite(routeAverageRisk) ? routeAverageRisk : safeArrivalRisk;
    const safePeakRisk = Number.isFinite(routePeakRisk) ? routePeakRisk : Math.max(safeArrivalRisk, safeAverageRisk);
    const trafficPenalty = Number.isFinite(trafficDelayMinutes)
        ? Math.min(10, Math.max(0, trafficDelayMinutes * 0.45))
        : 0;

    const blended = (safeArrivalRisk * 0.52) + (safeAverageRisk * 0.28) + (safePeakRisk * 0.2) + trafficPenalty;
    return Math.max(0, Math.min(100, Math.round(blended)));
}

function buildRouteWindowRisk(snapshot, modeKey, targetUnix, fallbackRisk = 45) {
    const entries = Array.isArray(snapshot?.forecastData?.list) ? snapshot.forecastData.list : [];
    if (!entries.length) {
        const safeRisk = Number.isFinite(fallbackRisk) ? Math.round(fallbackRisk) : 45;
        return { averageRisk: safeRisk, peakRisk: safeRisk };
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = Math.max(nowUnix + 60, targetUnix);
    const upcoming = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!upcoming.length) {
        const safeRisk = Number.isFinite(fallbackRisk) ? Math.round(fallbackRisk) : 45;
        return { averageRisk: safeRisk, peakRisk: safeRisk };
    }

    const scored = upcoming.map((entry) => {
        const conditions = buildDepartureConditionsFromForecastEntry(snapshot, entry);
        return calculateDepartureRiskScore(conditions, modeKey);
    });

    const averageRisk = Math.round(scored.reduce((sum, value) => sum + value, 0) / scored.length);
    const peakRisk = Math.max(...scored);
    return {
        averageRisk: Number.isFinite(averageRisk) ? averageRisk : Math.round(fallbackRisk),
        peakRisk: Number.isFinite(peakRisk) ? peakRisk : Math.round(fallbackRisk)
    };
}

function buildCommuteCriticalRouteAlerts(snapshot, targetUnix) {
    const entries = Array.isArray(snapshot?.forecastData?.list) ? snapshot.forecastData.list : [];
    if (!entries.length) {
        return [];
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = Math.max(nowUnix + 60, targetUnix);
    const upcoming = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!upcoming.length) {
        return [];
    }

    const timezoneOffset = snapshot?.timezoneOffset ?? 0;
    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";
    const heavyRainEntry = upcoming.find((entry) => Number.isFinite(entry?.pop) && (entry.pop * 100) >= 75);
    const strongWindEntry = upcoming.find((entry) => Number.isFinite(entry?.wind?.gust) && (entry.wind.gust * 3.6) >= 55);
    const alerts = [];

    if (heavyRainEntry) {
        alerts.push(t("commuteCriticalRainAlert", {
            time: formatTimeFromUnix(heavyRainEntry.dt, timezoneOffset),
            chance: Math.round(heavyRainEntry.pop * 100)
        }));
    }

    if (strongWindEntry) {
        const gustKmh = strongWindEntry.wind.gust * 3.6;
        alerts.push(t("commuteCriticalWindAlert", {
            time: formatTimeFromUnix(strongWindEntry.dt, timezoneOffset),
            gust: formatWindSpeedValue(gustKmh, t("unavailable")),
            unit: speedUnit
        }));
    }

    return alerts;
}

function buildCommuteEtaTrend({ modeKey, targetUnix, etaSeconds }) {
    const context = getCommuteCityContext();
    const cityKey = getCommuteCityStorageKey(context);
    if (!cityKey) {
        return { kind: "insufficient" };
    }

    const targetHour = getLocationHour(targetUnix, currentWeatherSnapshot?.timezoneOffset ?? 0);
    const allEntries = getStoredCommuteEtaHistory().filter((entry) => entry.cityKey === cityKey && entry.modeKey === modeKey);
    if (allEntries.length < 4) {
        return { kind: "insufficient" };
    }

    const sameHourEntries = allEntries.filter((entry) => entry.targetHour === targetHour);
    if (sameHourEntries.length < 2) {
        return { kind: "insufficient" };
    }

    const averageAll = allEntries.reduce((sum, entry) => sum + entry.etaSeconds, 0) / allEntries.length;
    const averageHour = sameHourEntries.reduce((sum, entry) => sum + entry.etaSeconds, 0) / sameHourEntries.length;
    const deltaMinutes = Math.round((averageHour - averageAll) / 60);

    return {
        kind: "available",
        hour: `${String(targetHour).padStart(2, "0")}`,
        deltaMinutes,
        samples: sameHourEntries.length,
        referenceEtaSeconds: Math.round(averageHour),
        currentEtaSeconds: etaSeconds
    };
}

function buildCommuteDepartureWindowRecommendation({ modeKey, etaSeconds, trafficDelayMinutes, timezoneOffset }) {
    const offsets = [0, 10, 20, 30, 45, 60];
    const nowUnix = Math.floor(Date.now() / 1000);

    const evaluated = offsets.map((offsetMinutes) => {
        const targetUnix = nowUnix + etaSeconds + (offsetMinutes * 60);
        const arrivalAssessment = buildDepartureAssessment(currentWeatherSnapshot, {
            modeKey,
            targetUnix
        });

        if (!arrivalAssessment) {
            return null;
        }

        const routeRisk = buildRouteWindowRisk(currentWeatherSnapshot, modeKey, targetUnix, arrivalAssessment.riskScore);
        const adjustedRisk = calculateAdjustedCommuteRisk(
            arrivalAssessment.riskScore,
            routeRisk.averageRisk,
            routeRisk.peakRisk,
            trafficDelayMinutes
        );

        return {
            offsetMinutes,
            targetUnix,
            adjustedRisk
        };
    }).filter(Boolean);

    if (!evaluated.length) {
        return null;
    }

    const baseline = evaluated.find((item) => item.offsetMinutes === 0) || evaluated[0];
    const best = evaluated.reduce((lowest, current) => (current.adjustedRisk < lowest.adjustedRisk ? current : lowest), baseline);
    const currentArrival = formatTimeFromUnix(baseline.targetUnix, timezoneOffset);
    const bestArrival = formatTimeFromUnix(best.targetUnix, timezoneOffset);

    if (!best || best.offsetMinutes === 0 || (baseline.adjustedRisk - best.adjustedRisk) < 4) {
        return {
            kind: "now",
            currentRisk: baseline.adjustedRisk,
            bestRisk: baseline.adjustedRisk,
            currentArrival,
            bestArrival,
            minutes: 0
        };
    }

    return {
        kind: "delay",
        currentRisk: baseline.adjustedRisk,
        bestRisk: best.adjustedRisk,
        currentArrival,
        bestArrival,
        minutes: best.offsetMinutes
    };
}

async function buildCommuteModeComparison({ originLat, originLon, destination, fallbackProviderKey }) {
    if (!Number.isFinite(originLat) || !Number.isFinite(originLon) || !destination) {
        return [];
    }

    const comparisons = await Promise.all(COMMUTE_COMPARE_MODE_KEYS.map(async (modeKey) => {
        const etaData = await resolveCommuteEta({
            originLat,
            originLon,
            destinationLat: destination.lat,
            destinationLon: destination.lon,
            modeKey
        });

        if (!etaData || !Number.isFinite(etaData.etaSeconds)) {
            return null;
        }

        const assessment = buildCommuteAssessmentFromEta({
            destinationLabel: destination.label,
            destinationLat: destination.lat,
            destinationLon: destination.lon,
            modeKey,
            etaSeconds: etaData.etaSeconds,
            distanceKm: etaData.distanceKm,
            providerKey: etaData.providerKey || fallbackProviderKey || "commuteProviderEstimate",
            trafficDelayMinutes: etaData.trafficDelayMinutes,
            usesEstimate: etaData.usesEstimate
        });

        if (!assessment) {
            return null;
        }

        return {
            modeKey,
            etaSeconds: assessment.etaSeconds,
            adjustedRiskScore: assessment.adjustedRiskScore
        };
    }));

    return comparisons.filter(Boolean);
}

async function resolveCommuteDestination(query) {
    const context = getCommuteCityContext();
    if (!context) {
        return null;
    }

    const candidateQueries = buildCommuteDestinationCandidateQueries(query, context);
    const mergedSuggestions = [];

    for (const candidateQuery of candidateQueries) {
        const suggestions = await fetchCitySuggestions(candidateQuery, { countryFilter: "auto" });
        if (Array.isArray(suggestions) && suggestions.length) {
            mergedSuggestions.push(...suggestions);
        }

        if (mergedSuggestions.length >= COMMUTE_DESTINATION_SUGGESTIONS_LIMIT) {
            break;
        }
    }

    const ranked = rankCommuteDestinationCandidates(mergedSuggestions, query, context);
    if (!ranked.length) {
        return null;
    }

    const best = ranked[0];
    if (!best) {
        return null;
    }

    if (Number.isFinite(best.distanceKm) && best.distanceKm > COMMUTE_DESTINATION_MAX_DISTANCE_KM) {
        return { errorKey: "commuteDestinationOutOfCity" };
    }

    if (ranked.length > 1 && !best.sameCity) {
        const second = ranked[1];
        const scoreGap = Number.isFinite(second?.score) ? best.score - second.score : best.score;
        const isCloseTie = scoreGap < 8;

        if (isCloseTie) {
            return { errorKey: "commuteDestinationAmbiguous" };
        }
    }

    const suggestion = best.suggestion;
    if (!suggestion) {
        return null;
    }

    const label = [suggestion.name, suggestion.state, suggestion.country]
        .filter((part) => typeof part === "string" && part.trim())
        .join(", ");

    return {
        lat: suggestion.lat,
        lon: suggestion.lon,
        label: label || suggestion.name
    };
}

async function resolveCommuteEta({ originLat, originLon, destinationLat, destinationLon, modeKey }) {
    const mapboxRoute = await fetchMapboxRouteEta({
        originLat,
        originLon,
        destinationLat,
        destinationLon,
        modeKey
    });

    if (mapboxRoute) {
        return mapboxRoute;
    }

    const estimate = estimateEtaFromDistance({
        originLat,
        originLon,
        destinationLat,
        destinationLon,
        modeKey
    });

    if (!estimate) {
        return null;
    }

    return {
        ...estimate,
        providerKey: "commuteProviderEstimate",
        usesEstimate: true,
        trafficDelayMinutes: null
    };
}

async function fetchMapboxRouteEta({ originLat, originLon, destinationLat, destinationLon, modeKey }) {
    if (!MAPBOX_ACCESS_TOKEN || !Number.isFinite(originLat) || !Number.isFinite(originLon) || !Number.isFinite(destinationLat) || !Number.isFinite(destinationLon)) {
        return null;
    }

    const profile = getMapboxProfileByMode(modeKey);
    const coordinates = `${originLon},${originLat};${destinationLon},${destinationLat}`;
    const url = `${MAPBOX_DIRECTIONS_BASE_URL}/${profile}/${coordinates}?alternatives=false&overview=false&steps=false&access_token=${encodeURIComponent(MAPBOX_ACCESS_TOKEN)}`;

    try {
        const result = await requestJsonWithPolicy(url, {
            scope: "mapbox",
            cacheKey: `mapbox:${profile}:${originLat.toFixed(4)}:${originLon.toFixed(4)}:${destinationLat.toFixed(4)}:${destinationLon.toFixed(4)}`,
            allowStaleOnError: true
        });
        if (!result.ok) {
            return null;
        }

        const payload = result.data;
        const route = payload?.routes?.[0];
        const duration = route?.duration;
        if (!Number.isFinite(duration)) {
            return null;
        }

        const distanceKm = Number.isFinite(route?.distance) ? route.distance / 1000 : null;
        const typicalDuration = Number.isFinite(route?.duration_typical) ? route.duration_typical : null;
        const trafficDelayMinutes = Number.isFinite(typicalDuration)
            ? Math.max(0, Math.round((duration - typicalDuration) / 60))
            : null;

        return {
            etaSeconds: Math.round(duration),
            distanceKm,
            providerKey: "commuteProviderMapbox",
            usesEstimate: false,
            trafficDelayMinutes
        };
    } catch {
        return null;
    }
}

function estimateEtaFromDistance({ originLat, originLon, destinationLat, destinationLon, modeKey }) {
    const distanceKm = calculateGreatCircleDistanceKm(originLat, originLon, destinationLat, destinationLon);
    if (!Number.isFinite(distanceKm) || distanceKm <= 0) {
        return null;
    }

    const speedMap = {
        departureModeCar: 32,
        departureModeMotorcycle: 34,
        departureModeTransit: 24,
        departureModeBike: 16,
        departureModeWalking: 5,
        departureModeRunning: 9,
        departureModeGeneric: 20
    };

    const speedKmh = speedMap[modeKey] || speedMap.departureModeGeneric;
    const etaSeconds = Math.max(5 * 60, Math.round((distanceKm / speedKmh) * 3600));

    return {
        etaSeconds,
        distanceKm
    };
}

function getMapboxProfileByMode(modeKey) {
    const profileMap = {
        departureModeCar: "driving-traffic",
        departureModeMotorcycle: "driving-traffic",
        departureModeTransit: "driving",
        departureModeBike: "cycling",
        departureModeWalking: "walking",
        departureModeRunning: "walking",
        departureModeGeneric: "driving-traffic"
    };

    return profileMap[modeKey] || profileMap.departureModeGeneric;
}

function calculateGreatCircleDistanceKm(latA, lonA, latB, lonB) {
    if (![latA, lonA, latB, lonB].every(Number.isFinite)) {
        return null;
    }

    const toRad = (value) => value * (Math.PI / 180);
    const earthRadiusKm = 6371;
    const latDelta = toRad(latB - latA);
    const lonDelta = toRad(lonB - lonA);
    const partA = Math.sin(latDelta / 2) ** 2;
    const partB = Math.cos(toRad(latA)) * Math.cos(toRad(latB)) * (Math.sin(lonDelta / 2) ** 2);
    const centralAngle = 2 * Math.atan2(Math.sqrt(partA + partB), Math.sqrt(1 - (partA + partB)));
    return earthRadiusKm * centralAngle;
}

function formatEtaDuration(etaSeconds) {
    if (!Number.isFinite(etaSeconds)) {
        return t("unavailable");
    }

    const minutes = Math.max(1, Math.round(etaSeconds / 60));
    if (minutes < 60) {
        return `${minutes} min`;
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (!remainingMinutes) {
        return `${hours}h`;
    }

    return `${hours}h ${remainingMinutes}min`;
}

function renderCommuteResult(assessment) {
    if (!assessment) {
        resetCommuteState();
        return;
    }

    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";
    const targetTime = formatTimeFromUnix(assessment.targetUnix, assessment.conditions.timezoneOffset);
    const targetLabel = t("commuteTargetLabel", {
        destination: assessment.destinationLabel,
        mode: t(assessment.modeKey)
    });
    const etaText = t("commuteEtaLabel", { eta: formatEtaDuration(assessment.etaSeconds) });
    const arrivalText = t("commuteArrivalLabel", { arrival: targetTime });
    const distanceText = t("commuteDistanceLabel", {
        distance: Number.isFinite(assessment.distanceKm) ? assessment.distanceKm.toFixed(1) : t("unavailable")
    });
    const trafficDelayText = Number.isFinite(assessment.trafficDelayMinutes) && assessment.trafficDelayMinutes > 0
        ? `<p class="commute-meta">${t("commuteTrafficDelayLabel", { minutes: assessment.trafficDelayMinutes })}</p>`
        : "";
    const temp = formatTemperatureValue(assessment.conditions.tempC, t("unavailable"));
    const rain = Number.isFinite(assessment.conditions.rainChance) ? Math.round(assessment.conditions.rainChance) : 0;
    const wind = formatWindSpeedValue(assessment.conditions.windKmh, t("unavailable"));
    const gust = formatWindSpeedValue(assessment.conditions.gustKmh, t("unavailable"));
    const routeRiskLine = t("commuteRiskRouteLabel", {
        average: Number.isFinite(assessment.routeAverageRisk) ? assessment.routeAverageRisk : t("unavailable"),
        peak: Number.isFinite(assessment.routePeakRisk) ? assessment.routePeakRisk : t("unavailable")
    });
    const trendMarkup = assessment.etaTrend?.kind === "available"
        ? `<p class="commute-trend-line">${t("commuteTrendLine", {
            hour: `${assessment.etaTrend.hour}h`,
            delta: assessment.etaTrend.deltaMinutes >= 0 ? `+${assessment.etaTrend.deltaMinutes}` : `${assessment.etaTrend.deltaMinutes}`,
            samples: assessment.etaTrend.samples
        })}</p>`
        : `<p class="commute-trend-line">${t("commuteTrendInsufficient")}</p>`;
    const windowRecommendationMarkup = assessment.departureWindowRecommendation
        ? `<p class="commute-window-recommendation">${assessment.departureWindowRecommendation.kind === "delay"
            ? t("commuteWindowBestDelay", {
                minutes: assessment.departureWindowRecommendation.minutes,
                current: assessment.departureWindowRecommendation.currentRisk,
                best: assessment.departureWindowRecommendation.bestRisk,
                arrivalCurrent: assessment.departureWindowRecommendation.currentArrival,
                arrivalBest: assessment.departureWindowRecommendation.bestArrival
            })
            : t("commuteWindowBestNow")}</p>`
        : "";
    const criticalAlerts = Array.isArray(assessment.criticalAlerts) ? assessment.criticalAlerts : [];
    const criticalAlertMarkup = criticalAlerts.length
        ? `
            <div class="commute-critical-alert">
                <strong>${t("commuteCriticalAlertTitle")}</strong>
                <ul>${criticalAlerts.map((alert) => `<li>${alert}</li>`).join("")}</ul>
            </div>
        `
        : "";
    const modeComparison = Array.isArray(assessment.modeComparison) ? assessment.modeComparison : [];
    const modeComparisonMarkup = modeComparison.length
        ? `
            <div class="commute-mode-comparison">
                <strong>${t("commuteModeComparisonTitle")}</strong>
                <ul>
                    ${modeComparison.map((item) => `
                        <li>
                            <span>${t(item.modeKey)}</span>
                            <span>${t("commuteModeComparisonItem", {
                                eta: formatEtaDuration(item.etaSeconds),
                                risk: item.adjustedRiskScore
                            })}</span>
                        </li>
                    `).join("")}
                </ul>
            </div>
        `
        : "";
    const planBItems = Array.isArray(assessment.planBItems) ? assessment.planBItems : [];
    const planBMarkup = planBItems.length
        ? `
            <div class="departure-plan-b">
                <strong>${t("planBTitle")}</strong>
                <ul>${planBItems.map((item) => `<li>${item}</li>`).join("")}</ul>
            </div>
        `
        : "";

    commuteResultEl.classList.remove("departure-empty");
    commuteResultEl.innerHTML = `
        <div class="commute-result-head">
            <span class="departure-risk-badge ${assessment.adjustedRiskClassName}">${t(assessment.adjustedRiskLabelKey)} · ${assessment.adjustedRiskScore}/100</span>
            <strong>${targetLabel}</strong>
        </div>
        <p class="commute-meta">${[etaText, arrivalText, distanceText].join(" • ")}</p>
        ${trafficDelayText}
        <p class="commute-explanation">${routeRiskLine}</p>
        <p class="commute-explanation">${t("commuteRiskAdjustedLabel", { score: assessment.adjustedRiskScore })}</p>
        ${trendMarkup}
        ${windowRecommendationMarkup}
        ${criticalAlertMarkup}
        <p>${t("departureConditionsLine", {
            temp,
            rain,
            wind,
            gust,
            speedUnit
        })}</p>
        <p class="departure-recommendation">${t("commuteRecommendationPrefix")} ${t(assessment.adjustedRecommendationKey)}</p>
        <p class="commute-explanation">${t("commuteExplanationLine", { provider: t(assessment.providerKey) })}</p>
        ${modeComparisonMarkup}
        ${planBMarkup}
    `;
}

function resetSafeWindowState() {
    const modeLabel = t(currentSafeWindowModeKey || DEFAULT_DEPARTURE_MODE_KEY);
    safeWindowRangeEl.textContent = t("safeWindowIdle");
    safeWindowModeEl.textContent = t("safeWindowModeLabel", { mode: modeLabel });
    safeWindowConfidenceEl.className = "safe-window-confidence is-unknown";
    safeWindowConfidenceEl.textContent = t("safeWindowConfidenceLabel", {
        level: t("safeWindowConfidenceUnknown")
    });
    safeWindowNoteEl.textContent = t("safeWindowNote");
}

function updateSafeWindow(snapshot, modeKey = DEFAULT_DEPARTURE_MODE_KEY) {
    const safeModeKey = modeKey || DEFAULT_DEPARTURE_MODE_KEY;
    const modeLabel = t(safeModeKey);

    safeWindowModeEl.textContent = t("safeWindowModeLabel", { mode: modeLabel });

    const assessment = buildSafeWindowAssessment(snapshot, safeModeKey);
    if (!assessment?.available) {
        safeWindowRangeEl.textContent = t(snapshot?.weatherData ? "safeWindowUnavailable" : "safeWindowIdle");
        safeWindowConfidenceEl.className = "safe-window-confidence is-unknown";
        safeWindowConfidenceEl.textContent = t("safeWindowConfidenceLabel", {
            level: t("safeWindowConfidenceUnknown")
        });
        safeWindowNoteEl.textContent = t(snapshot?.weatherData ? "safeWindowNoteUnavailable" : "safeWindowNote");
        return;
    }

    const start = formatTimeFromUnix(assessment.startUnix, snapshot.timezoneOffset);
    const end = formatTimeFromUnix(assessment.endUnix, snapshot.timezoneOffset);
    const hasWindowRange = assessment.endUnix > assessment.startUnix;

    safeWindowRangeEl.textContent = hasWindowRange
        ? t("safeWindowRange", { start, end })
        : t("safeWindowRangeSingle", { time: start });
    safeWindowConfidenceEl.className = `safe-window-confidence is-${assessment.confidenceLevel}`;
    safeWindowConfidenceEl.textContent = t("safeWindowConfidenceLabel", {
        level: t(assessment.confidenceKey)
    });
    safeWindowNoteEl.textContent = t("safeWindowNote");
}

function buildSafeWindowAssessment(snapshot, modeKey) {
    const entries = Array.isArray(snapshot?.forecastData?.list) ? snapshot.forecastData.list : [];
    if (!entries.length) {
        return { available: false };
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (15 * 60 * 60);
    const upcoming = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!upcoming.length) {
        return { available: false };
    }

    const scored = upcoming.map((entry) => {
        const conditions = buildDepartureConditionsFromForecastEntry(snapshot, entry);
        return {
            dt: entry.dt,
            riskScore: calculateDepartureRiskScore(conditions, modeKey)
        };
    });

    const timelineStepSeconds = getTimelineStepSeconds(scored);
    const safeThreshold = 45;
    const safeCandidates = scored.filter((entry) => entry.riskScore <= safeThreshold);

    if (!safeCandidates.length) {
        const bestPoint = scored.reduce((lowest, current) => (current.riskScore < lowest.riskScore ? current : lowest), scored[0]);
        if (!bestPoint || bestPoint.riskScore > 60) {
            return { available: false };
        }

        return {
            available: true,
            startUnix: bestPoint.dt,
            endUnix: bestPoint.dt,
            confidenceLevel: "low",
            confidenceKey: "safeWindowConfidenceLow"
        };
    }

    const windows = [];
    let currentWindow = [];

    safeCandidates.forEach((entry) => {
        const lastEntry = currentWindow[currentWindow.length - 1];
        if (!lastEntry || (entry.dt - lastEntry.dt) <= Math.round(timelineStepSeconds * 1.6)) {
            currentWindow.push(entry);
            return;
        }

        windows.push(currentWindow);
        currentWindow = [entry];
    });

    if (currentWindow.length) {
        windows.push(currentWindow);
    }

    const rankedWindows = windows
        .map((windowEntries) => {
            const scores = windowEntries.map((entry) => entry.riskScore);
            const avgRisk = scores.reduce((sum, score) => sum + score, 0) / scores.length;
            const spread = Math.max(...scores) - Math.min(...scores);
            return {
                entries: windowEntries,
                avgRisk,
                spread
            };
        })
        .sort((windowA, windowB) => {
            if (windowA.avgRisk !== windowB.avgRisk) {
                return windowA.avgRisk - windowB.avgRisk;
            }

            return windowB.entries.length - windowA.entries.length;
        });

    const bestWindow = rankedWindows[0];
    if (!bestWindow) {
        return { available: false };
    }

    const startUnix = bestWindow.entries[0].dt;
    const endUnix = bestWindow.entries.length > 1
        ? bestWindow.entries[bestWindow.entries.length - 1].dt + timelineStepSeconds
        : startUnix;
    const confidence = deriveSafeWindowConfidence(bestWindow.entries.length, bestWindow.avgRisk, bestWindow.spread);

    return {
        available: true,
        startUnix,
        endUnix,
        confidenceLevel: confidence,
        confidenceKey: confidence === "high"
            ? "safeWindowConfidenceHigh"
            : confidence === "medium"
                ? "safeWindowConfidenceMedium"
                : "safeWindowConfidenceLow"
    };
}

function buildDepartureConditionsFromForecastEntry(snapshot, entry) {
    const targetUnix = Number.isFinite(entry?.dt) ? entry.dt : Math.floor(Date.now() / 1000);
    const windKmh = Number.isFinite(entry?.wind?.speed) ? entry.wind.speed * 3.6 : 0;

    return {
        tempC: Number.isFinite(entry?.main?.temp) ? entry.main.temp : (snapshot?.weatherData?.main?.temp ?? null),
        rainChance: Number.isFinite(entry?.pop) ? Math.round(entry.pop * 100) : 0,
        windKmh,
        gustKmh: Number.isFinite(entry?.wind?.gust) ? entry.wind.gust * 3.6 : windKmh,
        weatherId: entry?.weather?.[0]?.id ?? snapshot?.weatherData?.weather?.[0]?.id ?? null,
        uvIndex: resolveDepartureUvForTimestamp(snapshot?.oneCallInsights, targetUnix),
        aqiValue: Number.isFinite(snapshot?.aqiData?.value) ? snapshot.aqiData.value : null
    };
}

function deriveSafeWindowConfidence(windowLength, averageRisk, spread) {
    if (windowLength >= 3 && averageRisk <= 30 && spread <= 14) {
        return "high";
    }

    if (windowLength >= 2 && averageRisk <= 40) {
        return "medium";
    }

    return "low";
}

function resetForecastReliabilityState() {
    forecastReliabilityListEl.innerHTML = `<li>${t("forecastReliabilityIdle")}</li>`;
}

function updateForecastReliability(snapshot) {
    if (!snapshot?.weatherData) {
        resetForecastReliabilityState();
        return;
    }

    const windows = buildForecastReliabilityWindows(snapshot);
    renderForecastReliabilityList(windows);
}

function buildForecastReliabilityWindows(snapshot) {
    const nowUnix = Math.floor(Date.now() / 1000);
    const oneHourTimeline = Array.isArray(snapshot?.oneCallInsights?.hourlyWeather)
        ? snapshot.oneCallInsights.hourlyWeather
            .filter((entry) => Number.isFinite(entry?.dt) && Number.isFinite(entry?.temp))
            .map((entry) => ({
                dt: entry.dt,
                temp: entry.temp,
                rainChance: Number.isFinite(entry?.pop) ? entry.pop * 100 : 0
            }))
        : [];
    const threeHourTimeline = Array.isArray(snapshot?.forecastData?.list)
        ? snapshot.forecastData.list
            .filter((entry) => Number.isFinite(entry?.dt) && Number.isFinite(entry?.main?.temp))
            .map((entry) => ({
                dt: entry.dt,
                temp: entry.main.temp,
                rainChance: Number.isFinite(entry?.pop) ? entry.pop * 100 : 0
            }))
        : [];

    const useOneHourSource = oneHourTimeline.length >= 6;
    const sourceTimeline = useOneHourSource ? oneHourTimeline : threeHourTimeline;
    if (!sourceTimeline.length) {
        return [];
    }

    const sourceKey = useOneHourSource
        ? "forecastReliabilitySourceHourly"
        : "forecastReliabilitySourceForecast";
    const resolutionHours = useOneHourSource ? 1 : 3;
    const windowSpecs = [
        { from: 0, to: 3 },
        { from: 3, to: 6 },
        { from: 6, to: 12 }
    ];

    return windowSpecs.map((windowSpec) => {
        const startUnix = nowUnix + (windowSpec.from * 60 * 60);
        const endUnix = nowUnix + (windowSpec.to * 60 * 60);
        const points = sourceTimeline
            .filter((entry) => entry.dt >= startUnix && entry.dt <= endUnix)
            .sort((entryA, entryB) => entryA.dt - entryB.dt);
        const expectedPoints = Math.max(1, Math.round((windowSpec.to - windowSpec.from) / resolutionHours));
        const densityFactor = Math.min(1.2, points.length / expectedPoints);
        const temperatures = points.map((point) => point.temp).filter(Number.isFinite);
        const rainChances = points.map((point) => point.rainChance).filter(Number.isFinite);
        const tempStdDev = calculateStandardDeviation(temperatures);
        const rainStdDev = calculateStandardDeviation(rainChances);
        const centerHour = (windowSpec.from + windowSpec.to) / 2;

        let score = useOneHourSource ? 76 : 60;
        score += densityFactor * 8;
        score -= centerHour * 4;
        score -= Math.min(20, (tempStdDev * 2.2) + (rainStdDev * 0.08));

        if (points.length < 2) {
            score -= 10;
        }

        score = Math.max(12, Math.min(96, Math.round(score)));

        const levelKey = score >= 72
            ? "forecastReliabilityHigh"
            : score >= 48
                ? "forecastReliabilityMedium"
                : "forecastReliabilityLow";
        const badgeClass = score >= 72
            ? "is-high"
            : score >= 48
                ? "is-medium"
                : "is-low";

        return {
            from: windowSpec.from,
            to: windowSpec.to,
            score,
            levelKey,
            badgeClass,
            reason: t("forecastReliabilityReason", {
                source: t(sourceKey),
                points: points.length,
                tempVar: Number.isFinite(tempStdDev) ? tempStdDev.toFixed(1) : t("unavailable"),
                rainVar: Number.isFinite(rainStdDev) ? rainStdDev.toFixed(1) : t("unavailable")
            })
        };
    });
}

function renderForecastReliabilityList(items) {
    if (!Array.isArray(items) || !items.length) {
        resetForecastReliabilityState();
        return;
    }

    forecastReliabilityListEl.innerHTML = items
        .map((item) => `
            <li class="forecast-reliability-item">
                <div class="forecast-reliability-row">
                    <span class="forecast-reliability-window">${t("forecastReliabilityWindowLabel", { from: item.from, to: item.to })}</span>
                    <span class="forecast-reliability-badge ${item.badgeClass}">${t(item.levelKey)} · ${item.score}/100</span>
                </div>
                <p class="forecast-reliability-reason">${item.reason}</p>
            </li>
        `)
        .join("");
}

function calculateStandardDeviation(values) {
    const validValues = Array.isArray(values)
        ? values.filter(Number.isFinite)
        : [];

    if (validValues.length < 2) {
        return 0;
    }

    const mean = validValues.reduce((sum, value) => sum + value, 0) / validValues.length;
    const variance = validValues.reduce((sum, value) => sum + ((value - mean) ** 2), 0) / validValues.length;
    return Math.sqrt(variance);
}

function resetRainRadarState() {
    stopRainRadarAnimation();
    rainRadarRequestToken += 1;
    rainRadarFrames = [];
    rainRadarFrameIndex = -1;
    rainRadarTimezoneOffset = 0;

    if (rainRadarMap && rainRadarOverlayLayer) {
        rainRadarMap.removeLayer(rainRadarOverlayLayer);
        rainRadarOverlayLayer = null;
    }

    rainRadarFrameLabelEl.textContent = t("rainRadarFrameLabel");
    rainRadarStatusEl.textContent = t("rainRadarStatusIdle");
    rainRadarPreviewListEl.innerHTML = `<li>${t("rainRadarPreviewEmpty")}</li>`;
}

async function updateRainRadar(snapshot) {
    if (!snapshot?.weatherData) {
        resetRainRadarState();
        return;
    }

    rainRadarTimezoneOffset = Number.isFinite(snapshot?.timezoneOffset) ? snapshot.timezoneOffset : 0;
    renderRainRadarPreview(snapshot);

    const latitude = snapshot?.weatherData?.coord?.lat;
    const longitude = snapshot?.weatherData?.coord?.lon;

    if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        rainRadarStatusEl.textContent = t("rainRadarStatusFallback");
        return;
    }

    const hasMap = ensureRainRadarMap(latitude, longitude);
    if (!hasMap) {
        rainRadarStatusEl.textContent = t("rainRadarStatusUnavailable");
        return;
    }

    rainRadarStatusEl.textContent = t("rainRadarStatusLoading");
    const requestToken = ++rainRadarRequestToken;

    try {
        const frames = await fetchRainRadarFrames();
        if (requestToken !== rainRadarRequestToken) {
            return;
        }

        if (!Array.isArray(frames) || !frames.length) {
            stopRainRadarAnimation();
            rainRadarStatusEl.textContent = t("rainRadarStatusFallback");
            return;
        }

        rainRadarFrames = frames;
        startRainRadarAnimation();
        rainRadarStatusEl.textContent = t("rainRadarStatusLive");
    } catch {
        if (requestToken !== rainRadarRequestToken) {
            return;
        }

        stopRainRadarAnimation();
        rainRadarStatusEl.textContent = t("rainRadarStatusFallback");
    }
}

function ensureRainRadarMap(latitude, longitude) {
    if (!rainRadarMapEl || typeof window === "undefined" || !window.L) {
        return false;
    }

    if (!rainRadarMap) {
        rainRadarMap = window.L.map(rainRadarMapEl, {
            zoomControl: false,
            minZoom: RAIN_RADAR_MIN_ZOOM,
            maxZoom: RAIN_RADAR_MAX_ZOOM,
            zoomSnap: 1
        });

        rainRadarMap.on("zoomend", handleRainRadarZoomChange);

        rainRadarBaseLayer = window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: "&copy; OpenStreetMap",
            opacity: 0.9
        });

        rainRadarBaseLayer.addTo(rainRadarMap);
        rainRadarMap.setView([latitude, longitude], 7);
        window.setTimeout(() => {
            rainRadarMap?.invalidateSize();
        }, 40);
    } else {
        const nextZoom = Math.max(6, Math.min(RAIN_RADAR_MAX_ZOOM, rainRadarMap.getZoom() || 7));
        rainRadarMap.setView([latitude, longitude], nextZoom, { animate: false });
    }

    return true;
}

async function fetchRainRadarFrames() {
    const nowMs = Date.now();
    const hasFreshCache = Array.isArray(rainRadarCache.frames)
        && rainRadarCache.frames.length
        && Number.isFinite(rainRadarCache.fetchedAt)
        && (nowMs - rainRadarCache.fetchedAt) <= RAIN_RADAR_CACHE_TTL_MS;

    if (hasFreshCache) {
        return rainRadarCache.frames;
    }

    const result = await requestJsonWithPolicy(RAINVIEWER_MAPS_URL, {
        scope: "rainRadar",
        cacheKey: "rain-radar:frames",
        fetchOptions: {
            cache: "no-store"
        },
        allowStaleOnError: true
    });
    if (!result.ok) {
        throw new Error("rain-radar-unavailable");
    }

    const payload = result.data;
    const host = typeof payload?.host === "string" && payload.host.trim()
        ? payload.host
        : "https://tilecache.rainviewer.com";
    const pastFrames = Array.isArray(payload?.radar?.past) ? payload.radar.past : [];
    const nowcastFrames = Array.isArray(payload?.radar?.nowcast) ? payload.radar.nowcast : [];
    const selected = [
        ...pastFrames.slice(-4),
        ...nowcastFrames.slice(0, 6)
    ];
    const rawFrames = selected.length ? selected : pastFrames.slice(-RAIN_RADAR_FRAME_LIMIT);
    const frames = rawFrames
        .map((frame) => {
            const time = Number(frame?.time);
            const path = typeof frame?.path === "string" ? frame.path.trim() : "";
            if (!Number.isFinite(time) || !path) {
                return null;
            }

            return {
                time,
                tileUrl: buildRainRadarTileUrl(host, path)
            };
        })
        .filter(Boolean)
        .slice(-RAIN_RADAR_FRAME_LIMIT);

    rainRadarCache = {
        frames,
        fetchedAt: nowMs
    };

    return frames;
}

function buildRainRadarTileUrl(host, path) {
    const safeHost = String(host || "").replace(/\/+$/, "");
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${safeHost}${normalizedPath}/256/{z}/{x}/{y}/${RAIN_RADAR_COLOR_SCHEME}/1_1.png`;
}

function handleRainRadarZoomChange() {
    if (!rainRadarMap) {
        return;
    }

    const currentZoom = rainRadarMap.getZoom();
    if (currentZoom > RAIN_RADAR_MAX_ZOOM) {
        rainRadarMap.setZoom(RAIN_RADAR_MAX_ZOOM, { animate: false });
        rainRadarStatusEl.textContent = t("rainRadarStatusZoomLimit", { level: RAIN_RADAR_MAX_ZOOM });
        return;
    }

    if (Array.isArray(rainRadarFrames) && rainRadarFrames.length && currentZoom >= (RAIN_RADAR_MAX_ZOOM - 1)) {
        rainRadarStatusEl.textContent = t("rainRadarStatusZoomLimit", { level: RAIN_RADAR_MAX_ZOOM });
        return;
    }

    if (Array.isArray(rainRadarFrames) && rainRadarFrames.length) {
        rainRadarStatusEl.textContent = t("rainRadarStatusLive");
    }
}

function startRainRadarAnimation() {
    if (!rainRadarMap || !Array.isArray(rainRadarFrames) || !rainRadarFrames.length) {
        return;
    }

    stopRainRadarAnimation();

    rainRadarFrameIndex = (rainRadarFrameIndex >= 0)
        ? rainRadarFrameIndex % rainRadarFrames.length
        : 0;
    applyRainRadarFrame(rainRadarFrameIndex);

    rainRadarAnimationTimer = window.setInterval(() => {
        if (!rainRadarFrames.length) {
            return;
        }

        rainRadarFrameIndex = (rainRadarFrameIndex + 1) % rainRadarFrames.length;
        applyRainRadarFrame(rainRadarFrameIndex);
    }, RAIN_RADAR_ANIMATION_INTERVAL_MS);
}

function stopRainRadarAnimation() {
    if (!Number.isFinite(rainRadarAnimationTimer)) {
        return;
    }

    window.clearInterval(rainRadarAnimationTimer);
    rainRadarAnimationTimer = null;
}

function applyRainRadarFrame(frameIndex) {
    const frame = rainRadarFrames[frameIndex];
    if (!frame || !rainRadarMap) {
        return;
    }

    if (!rainRadarOverlayLayer) {
        rainRadarOverlayLayer = window.L.tileLayer(frame.tileUrl, {
            opacity: 0.68,
            zIndex: 520,
            attribution: "RainViewer",
            maxZoom: RAIN_RADAR_MAX_ZOOM,
            maxNativeZoom: RAIN_RADAR_MAX_ZOOM,
            minZoom: RAIN_RADAR_MIN_ZOOM,
            crossOrigin: true
        }).addTo(rainRadarMap);

        rainRadarOverlayLayer.on("tileerror", handleRainRadarTileError);
    } else {
        rainRadarOverlayLayer.setUrl(frame.tileUrl);
        rainRadarOverlayLayer.redraw();
    }

    rainRadarFrameLabelEl.textContent = t("rainRadarFrameValue", {
        time: formatTimeFromUnix(frame.time, rainRadarTimezoneOffset)
    });
}

function handleRainRadarTileError() {
    if (!rainRadarMap) {
        return;
    }

    const currentZoom = rainRadarMap.getZoom();
    if (currentZoom > RAIN_RADAR_MAX_ZOOM) {
        rainRadarMap.setZoom(RAIN_RADAR_MAX_ZOOM, { animate: false });
        rainRadarStatusEl.textContent = t("rainRadarStatusZoomLimit", { level: RAIN_RADAR_MAX_ZOOM });
        return;
    }

    rainRadarStatusEl.textContent = t("rainRadarStatusTileIssue");
}

function renderRainRadarPreview(snapshot) {
    const entries = buildRainRadarPreviewEntries(snapshot);
    if (!entries.length) {
        rainRadarPreviewListEl.innerHTML = `<li>${t("rainRadarPreviewEmpty")}</li>`;
        return;
    }

    rainRadarPreviewListEl.innerHTML = entries
        .map((entry) => {
            const mmValue = Number.isFinite(entry.rainMm) ? entry.rainMm.toFixed(1) : null;
            const text = mmValue
                ? t("rainRadarPreviewItem", {
                    time: entry.time,
                    chance: entry.chance,
                    mm: mmValue
                })
                : t("rainRadarPreviewItemNoMm", {
                    time: entry.time,
                    chance: entry.chance
                });
            return `<li>${text}</li>`;
        })
        .join("");
}

function buildRainRadarPreviewEntries(snapshot) {
    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (9 * 60 * 60);
    const timezoneOffset = Number.isFinite(snapshot?.timezoneOffset) ? snapshot.timezoneOffset : 0;
    const oneHourTimeline = Array.isArray(snapshot?.oneCallInsights?.hourlyWeather)
        ? snapshot.oneCallInsights.hourlyWeather
        : [];
    const forecastTimeline = Array.isArray(snapshot?.forecastData?.list)
        ? snapshot.forecastData.list
        : [];
    const source = oneHourTimeline.length >= 4 ? oneHourTimeline : forecastTimeline;

    return source
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix)
        .slice(0, 6)
        .map((entry) => {
            const rawRainMm = Number.isFinite(entry?.rainMm)
                ? entry.rainMm
                : Number.isFinite(entry?.rain?.["3h"])
                    ? entry.rain["3h"] / 3
                    : null;
            return {
                time: formatTimeFromUnix(entry.dt, timezoneOffset),
                chance: Number.isFinite(entry?.pop) ? Math.round(entry.pop * 100) : 0,
                rainMm: Number.isFinite(rawRainMm) ? rawRainMm : null
            };
        });
}

function resetExposureIndexState() {
    exposureIndexBadgeEl.classList.remove("is-low", "is-moderate", "is-high", "is-critical");
    exposureIndexBadgeEl.classList.add("is-unknown");
    exposureIndexBadgeEl.textContent = "--";
    exposureIndexSummaryEl.textContent = t("exposureIndexIdleSummary");
    renderSimpleInsightList(exposureIndexDriversEl, [t("exposureIndexIdleDriver")]);
}

function updateExposureIndex(snapshot) {
    if (!snapshot?.weatherData) {
        resetExposureIndexState();
        return;
    }

    const exposure = calculateExposureIndex(snapshot);
    exposureIndexBadgeEl.classList.remove("is-unknown", "is-low", "is-moderate", "is-high", "is-critical");
    exposureIndexBadgeEl.classList.add(exposure.badgeClass);
    exposureIndexBadgeEl.textContent = String(exposure.score);
    exposureIndexSummaryEl.textContent = t("exposureSummary", {
        score: exposure.score,
        level: t(exposure.levelKey)
    });

    const drivers = exposure.drivers.length ? exposure.drivers : [t("exposureDriverStable")];
    renderSimpleInsightList(exposureIndexDriversEl, drivers);
}

function calculateExposureIndex(snapshot) {
    const feelsLikeC = snapshot?.weatherData?.main?.feels_like;
    const humidity = snapshot?.weatherData?.main?.humidity;
    const aqi = snapshot?.aqiData?.value;
    let score = 0;
    const drivers = [];

    if (Number.isFinite(feelsLikeC)) {
        const feelsLikeDisplay = formatTemperatureValue(feelsLikeC);
        if (feelsLikeC >= 42) {
            score += 42;
            drivers.push(t("exposureDriverHeatExtreme", { value: feelsLikeDisplay }));
        } else if (feelsLikeC >= 35) {
            score += 28;
            drivers.push(t("exposureDriverHeatHigh", { value: feelsLikeDisplay }));
        } else if (feelsLikeC <= 2) {
            score += 30;
            drivers.push(t("exposureDriverColdExtreme", { value: feelsLikeDisplay }));
        } else if (feelsLikeC <= 8) {
            score += 16;
            drivers.push(t("exposureDriverColdHigh", { value: feelsLikeDisplay }));
        }
    }

    if (Number.isFinite(humidity)) {
        if (humidity <= 20) {
            score += 24;
            drivers.push(t("exposureDriverHumidityCritical", { value: Math.round(humidity) }));
        } else if (humidity <= 30) {
            score += 16;
            drivers.push(t("exposureDriverHumidityLow", { value: Math.round(humidity) }));
        }
    }

    if (Number.isFinite(aqi)) {
        if (aqi >= 5) {
            score += 44;
            drivers.push(t("exposureDriverAqiSevere", { value: aqi }));
        } else if (aqi >= 4) {
            score += 34;
            drivers.push(t("exposureDriverAqiSevere", { value: aqi }));
        } else if (aqi >= 3) {
            score += 20;
            drivers.push(t("exposureDriverAqiHigh", { value: aqi }));
        } else if (aqi === 2) {
            score += 8;
        }
    }

    score = Math.max(0, Math.min(100, Math.round(score)));

    if (score >= 75) {
        return { score, levelKey: "exposureLevelCritical", badgeClass: "is-critical", drivers };
    }

    if (score >= 50) {
        return { score, levelKey: "exposureLevelHigh", badgeClass: "is-high", drivers };
    }

    if (score >= 25) {
        return { score, levelKey: "exposureLevelModerate", badgeClass: "is-moderate", drivers };
    }

    return { score, levelKey: "exposureLevelLow", badgeClass: "is-low", drivers };
}

function resetHealthContextState() {
    resetExposureIndexState();
    healthContextListEl.innerHTML = `<li>${t("healthContextIdle")}</li>`;
}

function updateHealthContext(snapshot) {
    if (!snapshot?.weatherData) {
        resetHealthContextState();
        return;
    }

    const triggers = [];
    const nowUnix = Math.floor(Date.now() / 1000);
    const uvIndex = resolveDepartureUvForTimestamp(snapshot?.oneCallInsights, nowUnix);
    const feelsLikeC = snapshot?.weatherData?.main?.feels_like;
    const humidity = snapshot?.weatherData?.main?.humidity;
    const aqiLevel = snapshot?.aqiData?.value;

    updateExposureIndex(snapshot);

    if (Number.isFinite(feelsLikeC) && (feelsLikeC >= 37 || feelsLikeC <= 5)) {
        triggers.push(t("healthFeelsExtreme"));
    }

    if (Number.isFinite(uvIndex) && uvIndex >= 8) {
        triggers.push(t("healthUvHigh"));
    }

    if (Number.isFinite(humidity) && humidity <= 30) {
        triggers.push(t("healthHumidityLow"));
    }

    if (Number.isFinite(aqiLevel) && aqiLevel >= 4) {
        triggers.push(t("healthAqiPoor"));
    }

    renderSimpleInsightList(healthContextListEl, triggers.length ? triggers : [t("healthNoAlerts")]);
}

function resetWeeklyInsightsState() {
    weeklyInsightsListEl.innerHTML = `<li>${t("weeklyInsightsIdle")}</li>`;
    resetWeeklyNarrativeState();
}

function updateWeeklyInsights(snapshot) {
    if (!snapshot?.weatherData) {
        resetWeeklyInsightsState();
        return;
    }

    const insights = buildWeeklyInsights(snapshot);
    renderWeeklyInsightsList(
        weeklyInsightsListEl,
        insights.length ? insights : [{ text: t("weeklyInsightsPatternStable"), reason: "", driverKey: "" }]
    );
    updateWeeklyNarrative(snapshot);
}

function resetWeeklyNarrativeState() {
    if (weeklyNarrativeTextEl) {
        weeklyNarrativeTextEl.textContent = t("weeklyNarrativeIdle");
    }
    currentWeeklyNarrativeSummary = "";
}

function updateWeeklyNarrative(snapshot) {
    if (!snapshot?.weatherData) {
        resetWeeklyNarrativeState();
        return;
    }

    const summary = buildWeeklyCinematicNarrative(snapshot);
    currentWeeklyNarrativeSummary = summary;

    if (weeklyNarrativeTextEl) {
        weeklyNarrativeTextEl.textContent = summary;
    }
}

function buildWeeklyCinematicNarrative(snapshot) {
    const entries = Array.isArray(snapshot?.forecastData?.list) ? snapshot.forecastData.list : [];
    if (!entries.length) {
        return t("weeklyNarrativeNoForecast");
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const weekHorizonUnix = nowUnix + (5 * 24 * 60 * 60);
    const timezoneOffset = snapshot.timezoneOffset ?? 0;
    const scopedEntries = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= weekHorizonUnix)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!scopedEntries.length) {
        return t("weeklyNarrativeNoForecast");
    }

    const scoredEntries = scopedEntries.map((entry) => {
        const conditions = buildDepartureConditionsFromForecastEntry(snapshot, entry);
        const riskScore = calculateDepartureRiskScore(conditions, DEFAULT_DEPARTURE_MODE_KEY);
        return {
            entry,
            conditions,
            riskScore,
            dayLabel: getWeekdayLabelForTimestamp(entry.dt, timezoneOffset),
            hour: getLocationHour(entry.dt, timezoneOffset)
        };
    });

    const highestRisk = [...scoredEntries].sort((entryA, entryB) => entryB.riskScore - entryA.riskScore)[0];
    const safestWindow = scoredEntries
        .filter((entry) => entry.hour >= OUTDOOR_ACTIVE_HOURS.start && entry.hour <= OUTDOOR_ACTIVE_HOURS.end)
        .sort((entryA, entryB) => entryA.riskScore - entryB.riskScore)[0] || null;

    if (!highestRisk) {
        return t("weeklyNarrativeNoForecast");
    }

    const highestScene = deriveCinematicSceneFromMetrics({
        weatherId: highestRisk.conditions.weatherId,
        isNight: highestRisk.hour < 6 || highestRisk.hour >= 18,
        localHour: highestRisk.hour,
        temperatureC: highestRisk.conditions.tempC,
        humidity: highestRisk.entry?.main?.humidity ?? null,
        uvIndex: highestRisk.conditions.uvIndex,
        aqiValue: highestRisk.conditions.aqiValue,
        peakRainChance: highestRisk.conditions.rainChance,
        peakWindKmh: highestRisk.conditions.gustKmh,
        tempVariationC: 0,
        hasStormAhead: Number.isFinite(highestRisk.conditions.weatherId)
            ? (highestRisk.conditions.weatherId >= 200 && highestRisk.conditions.weatherId < 300)
            : false,
        coldFrontApproaching: false,
        cloudiness: highestRisk.entry?.clouds?.all ?? null
    });

    const safeScene = safestWindow
        ? deriveCinematicSceneFromMetrics({
            weatherId: safestWindow.conditions.weatherId,
            isNight: safestWindow.hour < 6 || safestWindow.hour >= 18,
            localHour: safestWindow.hour,
            temperatureC: safestWindow.conditions.tempC,
            humidity: safestWindow.entry?.main?.humidity ?? null,
            uvIndex: safestWindow.conditions.uvIndex,
            aqiValue: safestWindow.conditions.aqiValue,
            peakRainChance: safestWindow.conditions.rainChance,
            peakWindKmh: safestWindow.conditions.gustKmh,
            tempVariationC: 0,
            hasStormAhead: Number.isFinite(safestWindow.conditions.weatherId)
                ? (safestWindow.conditions.weatherId >= 200 && safestWindow.conditions.weatherId < 300)
                : false,
            coldFrontApproaching: false,
            cloudiness: safestWindow.entry?.clouds?.all ?? null
        })
        : getCinematicSceneMeta("steady-day");

    const trend = getWeeklyRiskTrendKey(scoredEntries);
    const safeWindowLabel = safestWindow
        ? `${safestWindow.dayLabel} ${formatTimeFromUnix(safestWindow.entry.dt, timezoneOffset)}`
        : t("weeklyNarrativeNoSafeWindow");

    return t("weeklyNarrativeSummary", {
        riskDay: highestRisk.dayLabel,
        riskTime: formatTimeFromUnix(highestRisk.entry.dt, timezoneOffset),
        riskScene: t(highestScene.tagKey),
        riskScore: highestRisk.riskScore,
        safeWindow: safeWindowLabel,
        safeScene: t(safeScene.tagKey),
        trend: trend.text
    });
}

function buildWeeklyInsights(snapshot) {
    const entries = Array.isArray(snapshot?.forecastData?.list) ? snapshot.forecastData.list : [];
    if (!entries.length) {
        return [];
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const weekHorizonUnix = nowUnix + (5 * 24 * 60 * 60);
    const nextEntries = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= weekHorizonUnix)
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!nextEntries.length) {
        return [];
    }

    const timezoneOffset = snapshot.timezoneOffset ?? 0;
    const insights = [];
    const dayBuckets = new Map();
    const scoredEntries = nextEntries.map((entry) => {
        const conditions = buildDepartureConditionsFromForecastEntry(snapshot, entry);
        const riskScore = calculateDepartureRiskScore(conditions, DEFAULT_DEPARTURE_MODE_KEY);
        const dayLabel = getWeekdayLabelForTimestamp(entry.dt, timezoneOffset);
        const hour = getLocationHour(entry.dt, timezoneOffset);
        const driverKey = getWeeklyRiskDriverKey(conditions);

        return {
            dt: entry.dt,
            conditions,
            riskScore,
            dayLabel,
            hour,
            driverKey
        };
    });

    const factorContext = buildWeeklyInsightFactorContext(scoredEntries, snapshot);

    scoredEntries.forEach((entry) => {
        const bucket = dayBuckets.get(entry.dayLabel) || {
            total: 0,
            count: 0,
            driverWeights: {
                weeklyInsightsDriverStorm: 0,
                weeklyInsightsDriverRain: 0,
                weeklyInsightsDriverWind: 0,
                weeklyInsightsDriverHeat: 0,
                weeklyInsightsDriverMixed: 0
            }
        };

        bucket.total += entry.riskScore;
        bucket.count += 1;
        bucket.driverWeights[entry.driverKey] += Math.max(1, entry.riskScore);

        dayBuckets.set(entry.dayLabel, bucket);
    });

    const highestRiskDay = Array.from(dayBuckets.entries())
        .map(([day, values]) => ({
            day,
            average: values.count ? values.total / values.count : 0,
            bucket: values
        }))
        .sort((entryA, entryB) => entryB.average - entryA.average)[0];

    if (highestRiskDay) {
        const dominantDriverKey = getDominantWeeklyDriverKey(highestRiskDay.bucket.driverWeights);
        const highestRiskScore = Math.round(highestRiskDay.average);

        insights.push({
            text: t("weeklyInsightsRiskDay", {
                day: highestRiskDay.day,
                score: highestRiskScore
            }),
            reason: buildWeeklyInsightReasonByType("risk-day", factorContext, {
                day: highestRiskDay.day,
                score: highestRiskScore,
                driverKey: dominantDriverKey
            }),
            driverKey: dominantDriverKey
        });

        insights.push({
            text: t("weeklyInsightsTopDriver", {
                driver: t(dominantDriverKey)
            }),
            reason: buildWeeklyInsightReasonByType("top-driver", factorContext, {
                driverKey: dominantDriverKey
            }),
            driverKey: dominantDriverKey
        });
    }

    const safestHours = scoredEntries
        .filter((entry) => entry.hour >= OUTDOOR_ACTIVE_HOURS.start && entry.hour <= OUTDOOR_ACTIVE_HOURS.end)
        .sort((entryA, entryB) => entryA.riskScore - entryB.riskScore)
        .slice(0, 3)
        .map((entry) => `${entry.dayLabel} ${formatTimeFromUnix(entry.dt, timezoneOffset)}`);

    if (safestHours.length) {
        insights.push({
            text: t("weeklyInsightsSafeHours", {
                times: safestHours.join(" · ")
            }),
            reason: buildWeeklyInsightReasonByType("safe-hours", factorContext, {
                count: safestHours.length,
                driverKey: "weeklyInsightsDriverMixed"
            }),
            driverKey: "weeklyInsightsDriverMixed"
        });
    } else {
        insights.push({
            text: t("weeklyInsightsSafeHoursFallback"),
            reason: buildWeeklyInsightReasonByType("safe-hours-fallback", factorContext, {
                driverKey: "weeklyInsightsDriverMixed"
            }),
            driverKey: "weeklyInsightsDriverMixed"
        });
    }

    const highRiskWindows = scoredEntries.filter((entry) => entry.riskScore >= 60).length;
    if (highRiskWindows > 0) {
        insights.push({
            text: t("weeklyInsightsHighRiskWindows", { count: highRiskWindows }),
            reason: buildWeeklyInsightReasonByType("high-risk-windows", factorContext, {
                count: highRiskWindows,
                driverKey: "weeklyInsightsDriverMixed"
            }),
            driverKey: "weeklyInsightsDriverMixed"
        });
    }

    const weeklyTrend = getWeeklyRiskTrendKey(scoredEntries);
    if (weeklyTrend) {
        insights.push({
            text: weeklyTrend.text,
            reason: buildWeeklyInsightReasonByType("trend", factorContext, {
                trend: weeklyTrend,
                driverKey: "weeklyInsightsDriverMixed"
            }),
            driverKey: "weeklyInsightsDriverMixed"
        });
    }

    const rainPeriod = getDominantForecastPeriod(nextEntries, timezoneOffset, (entry) => {
        const chance = Number.isFinite(entry?.pop) ? entry.pop * 100 : 0;
        return chance >= 40 ? chance : 0;
    });
    const windPeriod = getDominantForecastPeriod(nextEntries, timezoneOffset, (entry) => {
        const gust = Number.isFinite(entry?.wind?.gust) ? entry.wind.gust * 3.6 : (Number.isFinite(entry?.wind?.speed) ? entry.wind.speed * 3.6 : 0);
        return gust >= 38 ? gust : 0;
    });

    if (rainPeriod) {
        insights.push({
            text: t("weeklyInsightsPatternRain", { period: rainPeriod }),
            reason: buildWeeklyInsightReasonByType("pattern-rain", factorContext, {
                driverKey: "weeklyInsightsDriverRain"
            }),
            driverKey: "weeklyInsightsDriverRain"
        });
    }

    if (windPeriod) {
        insights.push({
            text: t("weeklyInsightsPatternWind", { period: windPeriod }),
            reason: buildWeeklyInsightReasonByType("pattern-wind", factorContext, {
                driverKey: "weeklyInsightsDriverWind"
            }),
            driverKey: "weeklyInsightsDriverWind"
        });
    }

    if (!rainPeriod && !windPeriod) {
        insights.push({
            text: t("weeklyInsightsPatternStable"),
            reason: buildWeeklyInsightReasonByType("pattern-stable", factorContext, {
                driverKey: "weeklyInsightsDriverMixed"
            }),
            driverKey: "weeklyInsightsDriverMixed"
        });
    }

    return insights.filter((item) => item && typeof item.text === "string" && item.text.trim());
}

function buildWeeklyInsightFactorContext(scoredEntries, snapshot) {
    const rainPeak = scoredEntries.reduce((peak, entry) => {
        const chance = Number.isFinite(entry?.conditions?.rainChance) ? entry.conditions.rainChance : 0;
        return Math.max(peak, chance);
    }, 0);

    const gustPeakKmh = scoredEntries.reduce((peak, entry) => {
        const gust = Number.isFinite(entry?.conditions?.gustKmh) ? entry.conditions.gustKmh : 0;
        return Math.max(peak, gust);
    }, 0);

    const uvPeak = scoredEntries.reduce((peak, entry) => {
        const uv = Number.isFinite(entry?.conditions?.uvIndex) ? entry.conditions.uvIndex : 0;
        return Math.max(peak, uv);
    }, 0);

    const aqiValue = Number.isFinite(snapshot?.aqiData?.value) ? snapshot.aqiData.value : null;
    const aqiLabel = AQI_MAP[aqiValue]?.labelKey ? t(AQI_MAP[aqiValue].labelKey) : t("unavailable");

    return {
        rainPeak: Number.isFinite(rainPeak) ? Math.round(rainPeak) : t("unavailable"),
        gustPeak: formatWindSpeedValue(gustPeakKmh, t("unavailable")),
        uvPeak: Number.isFinite(uvPeak) ? uvPeak.toFixed(1) : t("unavailable"),
        aqiValue: Number.isFinite(aqiValue) ? String(aqiValue) : t("unavailable"),
        aqiLabel,
        speedUnit: currentUnits === "metric" ? "km/h" : "mph"
    };
}

function buildWeeklyInsightReasonByType(reasonType, factorContext, details = {}) {
    const lead = t("weeklyInsightWhyLead");
    const driverKey = details?.driverKey || "";
    const driverLine = driverKey
        ? t("weeklyInsightWhyDriver", { driver: t(driverKey) })
        : "";
    const factorsLine = t("weeklyInsightWhyFactors", {
        rain: factorContext?.rainPeak ?? t("unavailable"),
        gust: factorContext?.gustPeak ?? t("unavailable"),
        speedUnit: factorContext?.speedUnit ?? (currentUnits === "metric" ? "km/h" : "mph"),
        uv: factorContext?.uvPeak ?? t("unavailable"),
        aqi: factorContext?.aqiValue ?? t("unavailable"),
        aqiLabel: factorContext?.aqiLabel ?? t("unavailable")
    });

    let specificLine = "";
    let appendGlobalFactors = false;

    switch (reasonType) {
        case "risk-day":
            specificLine = t("weeklyInsightWhyRiskDay", {
                day: details?.day || t("unavailable"),
                score: Number.isFinite(details?.score) ? details.score : t("unavailable")
            });
            appendGlobalFactors = true;
            break;
        case "top-driver":
            specificLine = t("weeklyInsightWhyTopDriver", {
                driver: t(driverKey || "weeklyInsightsDriverMixed")
            });
            appendGlobalFactors = true;
            break;
        case "safe-hours":
            specificLine = t("weeklyInsightWhySafeHours", {
                count: Number.isFinite(details?.count) ? details.count : 0,
                start: OUTDOOR_ACTIVE_HOURS.start,
                end: OUTDOOR_ACTIVE_HOURS.end
            });
            break;
        case "safe-hours-fallback":
            specificLine = t("weeklyInsightWhySafeHoursFallbackExplain", {
                start: OUTDOOR_ACTIVE_HOURS.start,
                end: OUTDOOR_ACTIVE_HOURS.end
            });
            break;
        case "high-risk-windows":
            specificLine = t("weeklyInsightWhyHighRiskWindows", {
                count: Number.isFinite(details?.count) ? details.count : 0
            });
            appendGlobalFactors = true;
            break;
        case "trend": {
            const trend = details?.trend || {};
            if (trend.direction === "up") {
                specificLine = t("weeklyInsightWhyTrendUp", {
                    start: Number.isFinite(trend.startAvg) ? trend.startAvg : t("unavailable"),
                    end: Number.isFinite(trend.endAvg) ? trend.endAvg : t("unavailable")
                });
            } else if (trend.direction === "down") {
                specificLine = t("weeklyInsightWhyTrendDown", {
                    start: Number.isFinite(trend.startAvg) ? trend.startAvg : t("unavailable"),
                    end: Number.isFinite(trend.endAvg) ? trend.endAvg : t("unavailable")
                });
            } else {
                specificLine = t("weeklyInsightWhyTrendStableExplain", {
                    start: Number.isFinite(trend.startAvg) ? trend.startAvg : t("unavailable"),
                    end: Number.isFinite(trend.endAvg) ? trend.endAvg : t("unavailable")
                });
            }
            break;
        }
        case "pattern-rain":
            specificLine = t("weeklyInsightWhyRainFocus", {
                rain: factorContext?.rainPeak ?? t("unavailable")
            });
            break;
        case "pattern-wind":
            specificLine = t("weeklyInsightWhyWindFocus", {
                gust: factorContext?.gustPeak ?? t("unavailable"),
                speedUnit: factorContext?.speedUnit ?? (currentUnits === "metric" ? "km/h" : "mph")
            });
            break;
        case "pattern-stable":
        default:
            specificLine = t("weeklyInsightWhyStableFocus");
            break;
    }

    return [lead, specificLine, driverLine, appendGlobalFactors ? factorsLine : ""]
        .filter(Boolean)
        .join(" ");
}

function getWeeklyRiskDriverKey(conditions) {
    const weatherId = conditions?.weatherId;
    const rainChance = Number.isFinite(conditions?.rainChance) ? conditions.rainChance : 0;
    const gustKmh = Number.isFinite(conditions?.gustKmh) ? conditions.gustKmh : 0;
    const tempC = Number.isFinite(conditions?.tempC) ? conditions.tempC : 0;
    const uvIndex = Number.isFinite(conditions?.uvIndex) ? conditions.uvIndex : 0;

    if (Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300) {
        return "weeklyInsightsDriverStorm";
    }

    if (rainChance >= 60) {
        return "weeklyInsightsDriverRain";
    }

    if (gustKmh >= 55) {
        return "weeklyInsightsDriverWind";
    }

    if (tempC >= 33 || uvIndex >= 8) {
        return "weeklyInsightsDriverHeat";
    }

    return "weeklyInsightsDriverMixed";
}

function getDominantWeeklyDriverKey(driverWeights) {
    if (!driverWeights || typeof driverWeights !== "object") {
        return "weeklyInsightsDriverMixed";
    }

    const sorted = Object.entries(driverWeights).sort((entryA, entryB) => entryB[1] - entryA[1]);
    const [driverKey, weight] = sorted[0] || [];
    if (!driverKey || !Number.isFinite(weight) || weight <= 0) {
        return "weeklyInsightsDriverMixed";
    }

    return driverKey;
}

function getWeeklyRiskTrendKey(scoredEntries) {
    if (!Array.isArray(scoredEntries) || scoredEntries.length < 4) {
        return {
            text: t("weeklyInsightsTrendStable"),
            direction: "stable",
            delta: 0,
            startAvg: null,
            endAvg: null
        };
    }

    const ordered = [...scoredEntries].sort((entryA, entryB) => entryA.dt - entryB.dt);
    const splitIndex = Math.max(2, Math.floor(ordered.length / 2));
    const firstHalf = ordered.slice(0, splitIndex);
    const secondHalf = ordered.slice(splitIndex);

    const average = (items) => items.length
        ? items.reduce((sum, entry) => sum + entry.riskScore, 0) / items.length
        : 0;

    const firstAverage = average(firstHalf);
    const secondAverage = average(secondHalf);
    const delta = secondAverage - firstAverage;
    const roundedDelta = Math.abs(Math.round(delta));
    const startAvg = Math.round(firstAverage);
    const endAvg = Math.round(secondAverage);

    if (delta <= -7) {
        return {
            text: t("weeklyInsightsTrendImproving", { delta: roundedDelta }),
            direction: "down",
            delta: roundedDelta,
            startAvg,
            endAvg
        };
    }

    if (delta >= 7) {
        return {
            text: t("weeklyInsightsTrendWorsening", { delta: roundedDelta }),
            direction: "up",
            delta: roundedDelta,
            startAvg,
            endAvg
        };
    }

    return {
        text: t("weeklyInsightsTrendStable"),
        direction: "stable",
        delta: roundedDelta,
        startAvg,
        endAvg
    };
}

function renderWeeklyInsightsList(targetElement, insights) {
    if (!targetElement) {
        return;
    }

    const safeInsights = Array.isArray(insights)
        ? insights.filter((item) => item && typeof item.text === "string" && item.text.trim())
        : [];

    targetElement.innerHTML = "";

    safeInsights.forEach((item, index) => {
        const listItem = document.createElement("li");
        listItem.className = "weekly-insight-item";

        const row = document.createElement("div");
        row.className = "weekly-insight-row";

        const text = document.createElement("span");
        text.className = "weekly-insight-text";
        text.textContent = item.text;

        row.appendChild(text);

        if (item.reason) {
            const reasonId = `weeklyInsightReason-${index}`;

            const button = document.createElement("button");
            button.type = "button";
            button.className = "weekly-insight-why";
            button.textContent = t("weeklyInsightWhyShow");
            button.setAttribute("aria-expanded", "false");
            button.setAttribute("aria-controls", reasonId);

            const reason = document.createElement("p");
            reason.id = reasonId;
            reason.className = "weekly-insight-reason hidden";
            reason.textContent = item.reason;

            button.addEventListener("click", () => {
                const expanded = button.getAttribute("aria-expanded") === "true";
                button.setAttribute("aria-expanded", expanded ? "false" : "true");
                button.textContent = expanded ? t("weeklyInsightWhyShow") : t("weeklyInsightWhyHide");
                reason.classList.toggle("hidden", expanded);
            });

            row.appendChild(button);
            listItem.append(row, reason);
        } else {
            listItem.appendChild(row);
        }

        targetElement.appendChild(listItem);
    });
}

function getWeekdayLabelForTimestamp(timestamp, timezoneOffset = 0) {
    const dayIndex = toLocationDate(timestamp, timezoneOffset).getUTCDay();
    const keys = [
        "weekdaySun",
        "weekdayMon",
        "weekdayTue",
        "weekdayWed",
        "weekdayThu",
        "weekdayFri",
        "weekdaySat"
    ];

    return t(keys[dayIndex] || "weekdaySun");
}

function getDominantForecastPeriod(entries, timezoneOffset, scoreResolver) {
    if (!Array.isArray(entries) || !entries.length || typeof scoreResolver !== "function") {
        return "";
    }

    const periodScores = {
        morning: 0,
        afternoon: 0,
        night: 0
    };

    entries.forEach((entry) => {
        const score = scoreResolver(entry);
        if (!Number.isFinite(score) || score <= 0) {
            return;
        }

        const hour = getLocationHour(entry.dt, timezoneOffset);
        if (hour >= 5 && hour <= 11) {
            periodScores.morning += score;
            return;
        }

        if (hour >= 12 && hour <= 17) {
            periodScores.afternoon += score;
            return;
        }

        periodScores.night += score;
    });

    const sorted = Object.entries(periodScores).sort((entryA, entryB) => entryB[1] - entryA[1]);
    const [periodKey, bestScore] = sorted[0] || [];
    if (!periodKey || !Number.isFinite(bestScore) || bestScore <= 0) {
        return "";
    }

    if (periodKey === "morning") {
        return getSummaryPeriodLabel("periodMorning");
    }

    if (periodKey === "afternoon") {
        return getSummaryPeriodLabel("periodAfternoon");
    }

    return getSummaryPeriodLabel("periodNight");
}

function renderSimpleInsightList(targetElement, lines) {
    if (!targetElement) {
        return;
    }

    const safeLines = Array.isArray(lines)
        ? lines.filter((line) => typeof line === "string" && line.trim())
        : [];

    targetElement.innerHTML = safeLines.map((line) => `<li>${line}</li>`).join("");
}

function updateSmartRainAlert(forecastData, oneCallInsights = null, timezoneOffset = 0) {
    const rainAlertData = getRainAlertData(
        forecastData?.list || [],
        oneCallInsights?.hourlyWeather || [],
        timezoneOffset
    );
    if (!rainAlertData || rainAlertData.chance < 60) {
        hideSmartRainAlert();
        return;
    }

    const hasWindow = rainAlertData.startTime && rainAlertData.endTime;
    rainSmartAlertEl.textContent = hasWindow
        ? t("rainAlertWindowMessage", {
            chance: rainAlertData.chance,
            start: rainAlertData.startTime,
            end: rainAlertData.endTime
        })
        : t("rainAlertMessage", {
            chance: rainAlertData.chance,
            time: rainAlertData.time
        });
    rainSmartAlertEl.classList.remove("hidden");
}

function getRainAlertData(forecastEntries, oneCallHourlyEntries, timezoneOffset = 0) {
    const hasOneHourTimeline = Array.isArray(oneCallHourlyEntries) && oneCallHourlyEntries.length >= 6;
    const entries = hasOneHourTimeline ? oneCallHourlyEntries : forecastEntries;
    if (!Array.isArray(entries) || !entries.length) {
        return null;
    }

    const now = Math.floor(Date.now() / 1000);
    const horizon = now + (12 * 60 * 60);
    const upcoming = entries
        .filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= now && entry.dt <= horizon)
        .map((entry) => ({
            dt: entry.dt,
            chance: Math.round(entry.pop * 100),
            time: formatTimeFromUnix(entry.dt, timezoneOffset)
        }))
        .filter((entry) => Number.isFinite(entry.chance))
        .sort((entryA, entryB) => entryA.dt - entryB.dt);

    if (!upcoming.length) {
        return null;
    }

    const peak = upcoming.reduce((max, current) => (current.chance > max.chance ? current : max));
    const threshold = Math.max(60, peak.chance - 15);
    const peakIndex = upcoming.findIndex((entry) => entry.dt === peak.dt);
    const stepSeconds = getTimelineStepSeconds(upcoming);

    let startIndex = peakIndex;
    while (
        startIndex > 0
        && upcoming[startIndex - 1].chance >= threshold
        && (upcoming[startIndex].dt - upcoming[startIndex - 1].dt) <= Math.round(stepSeconds * 1.5)
    ) {
        startIndex -= 1;
    }

    let endIndex = peakIndex;
    while (
        endIndex < upcoming.length - 1
        && upcoming[endIndex + 1].chance >= threshold
        && (upcoming[endIndex + 1].dt - upcoming[endIndex].dt) <= Math.round(stepSeconds * 1.5)
    ) {
        endIndex += 1;
    }

    const startTime = formatTimeFromUnix(upcoming[startIndex].dt, timezoneOffset);
    const endTimestamp = endIndex === startIndex
        ? upcoming[endIndex].dt + stepSeconds
        : upcoming[endIndex].dt;
    const endTime = formatTimeFromUnix(endTimestamp, timezoneOffset);

    return {
        chance: peak.chance,
        time: peak.time,
        startTime,
        endTime
    };
}

function getTimelineStepSeconds(upcomingTimeline) {
    if (!Array.isArray(upcomingTimeline) || upcomingTimeline.length < 2) {
        return 60 * 60;
    }

    const intervals = [];
    for (let index = 1; index < upcomingTimeline.length; index += 1) {
        const diff = upcomingTimeline[index].dt - upcomingTimeline[index - 1].dt;
        if (Number.isFinite(diff) && diff > 0) {
            intervals.push(diff);
        }
    }

    if (!intervals.length) {
        return 60 * 60;
    }

    intervals.sort((a, b) => a - b);
    return intervals[Math.floor(intervals.length / 2)];
}

function hideSmartRainAlert() {
    rainSmartAlertEl.classList.add("hidden");
    rainSmartAlertEl.textContent = "";
}

function updateWindSmartAlert(weatherData) {
    const gustKmh = Number.isFinite(weatherData?.wind?.gust)
        ? weatherData.wind.gust * 3.6
        : null;

    if (!Number.isFinite(gustKmh) || gustKmh < 45) {
        hideWindSmartAlert();
        return;
    }

    const gustValue = formatWindSpeedValue(gustKmh, t("unavailable"));
    const speedUnit = currentUnits === "metric" ? "km/h" : "mph";
    windSmartAlertEl.textContent = t("windAlertMessage", {
        gust: gustValue,
        unit: speedUnit
    });
    windSmartAlertEl.classList.remove("hidden");
}

function hideWindSmartAlert() {
    windSmartAlertEl.classList.add("hidden");
    windSmartAlertEl.textContent = "";
}

function updateOutdoorSuggestion(forecastData, oneCallInsights, aqiData, timezoneOffset = 0) {
    const topSlots = getTopOutdoorSlots(forecastData, oneCallInsights, aqiData, timezoneOffset);
    const recommendation = topSlots[0] || null;

    if (!recommendation) {
        resetOutdoorSuggestion();
        return;
    }

    const aqiLabel = AQI_MAP[recommendation.aqiValue]?.labelKey
        ? t(AQI_MAP[recommendation.aqiValue].labelKey)
        : t("unavailable");
    const uvText = Number.isFinite(recommendation.uvIndex) ? recommendation.uvIndex.toFixed(1) : t("unavailable");

    setOutdoorScoreClass(recommendation.score);
    outdoorBestTimeEl.textContent = recommendation.time;
    outdoorScoreLabelEl.textContent = t("scoreLabel", {
        score: recommendation.score,
        uv: uvText,
        rain: recommendation.rainChance,
        aqi: aqiLabel
    });

    outdoorTopListEl.innerHTML = topSlots
        .map((slot, index) => `<li>${t("slotLabel", { rank: index + 1, time: slot.time, score: slot.score })}</li>`)
        .join("");
}

function getTopOutdoorSlots(forecastData, oneCallInsights, aqiData, timezoneOffset = 0) {
    const entries = Array.isArray(forecastData?.list) ? forecastData.list : [];
    if (!entries.length) {
        return [];
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (24 * 60 * 60);
    const hourlyUv = Array.isArray(oneCallInsights?.hourlyUv) ? oneCallInsights.hourlyUv : [];
    const currentUv = Number.isFinite(oneCallInsights?.uvIndex) ? oneCallInsights.uvIndex : null;
    const aqiValue = Number.isFinite(aqiData?.value) ? aqiData.value : null;

    const candidates = entries
        .filter((entry) => {
            if (!Number.isFinite(entry?.dt) || entry.dt < nowUnix || entry.dt > horizonUnix) {
                return false;
            }

            const localHour = getLocationHour(entry.dt, timezoneOffset);
            return localHour >= OUTDOOR_ACTIVE_HOURS.start && localHour <= OUTDOOR_ACTIVE_HOURS.end;
        })
        .slice(0, 8)
        .map((entry) => {
            const rainChance = Number.isFinite(entry?.pop) ? Math.round(entry.pop * 100) : 45;
            const uvIndex = resolveUvForTimestamp(entry.dt, hourlyUv, currentUv);
            const score = calculateOutdoorScore({ uvIndex, rainChance, aqiValue });

            return {
                score,
                time: formatTimeFromUnix(entry.dt, timezoneOffset),
                uvIndex,
                rainChance,
                aqiValue
            };
        });

    if (!candidates.length) {
        return [];
    }

    return candidates
        .sort((itemA, itemB) => itemB.score - itemA.score)
        .slice(0, 3);
}

function resolveUvForTimestamp(timestamp, hourlyUv, currentUv) {
    if (Array.isArray(hourlyUv) && hourlyUv.length) {
        const closest = hourlyUv.reduce((best, current) => {
            const bestDistance = Math.abs(best.dt - timestamp);
            const currentDistance = Math.abs(current.dt - timestamp);
            return currentDistance < bestDistance ? current : best;
        });
        if (Number.isFinite(closest?.uv)) {
            return closest.uv;
        }
    }

    return Number.isFinite(currentUv) ? currentUv : null;
}

function calculateOutdoorScore({ uvIndex, rainChance, aqiValue }) {
    const safeRain = Number.isFinite(rainChance) ? Math.min(100, Math.max(0, rainChance)) : 45;
    const uvPenalty = getUvPenalty(uvIndex);
    const rainPenalty = safeRain * 0.5;
    const aqiPenalty = OUTDOOR_AQI_PENALTY[aqiValue] ?? 20;
    const rawScore = 100 - uvPenalty - rainPenalty - aqiPenalty;

    return Math.max(0, Math.min(100, Math.round(rawScore)));
}

function getUvPenalty(uvIndex) {
    if (!Number.isFinite(uvIndex)) {
        return 20;
    }

    if (uvIndex <= 2.9) {
        return 5;
    }

    if (uvIndex <= 5.9) {
        return 15;
    }

    if (uvIndex <= 7.9) {
        return 30;
    }

    if (uvIndex <= 10.9) {
        return 45;
    }

    return 60;
}

function setOutdoorScoreClass(score) {
    outdoorScoreCardEl.classList.remove("score-good", "score-moderate", "score-caution", "score-avoid", "score-unknown");

    if (!Number.isFinite(score)) {
        outdoorScoreCardEl.classList.add("score-unknown");
        return;
    }

    if (score >= 75) {
        outdoorScoreCardEl.classList.add("score-good");
        return;
    }

    if (score >= 55) {
        outdoorScoreCardEl.classList.add("score-moderate");
        return;
    }

    if (score >= 35) {
        outdoorScoreCardEl.classList.add("score-caution");
        return;
    }

    outdoorScoreCardEl.classList.add("score-avoid");
}

function resetOutdoorSuggestion() {
    setOutdoorScoreClass(null);
    outdoorBestTimeEl.textContent = "--:--";
    outdoorScoreLabelEl.textContent = t("noRecommendation");
    outdoorTopListEl.innerHTML = "";
}

function updateSevereAlert(weatherData, forecastData, apiAlerts, timezoneOffset = 0) {
    const officialAlert = getOfficialSevereAlert(apiAlerts, timezoneOffset);
    if (officialAlert) {
        showSevereAlert(officialAlert.message, "is-info");
        return;
    }

    const heuristicAlert = getHeuristicSevereAlert(weatherData, forecastData);
    if (heuristicAlert) {
        showSevereAlert(heuristicAlert.message, heuristicAlert.level);
        return;
    }

    hideSevereAlert();
}

function getOfficialSevereAlert(alerts, timezoneOffset = 0) {
    if (!Array.isArray(alerts) || alerts.length === 0) {
        return null;
    }

    const firstAlert = alerts[0];
    const start = formatTimeFromUnix(firstAlert?.start, timezoneOffset);
    const end = formatTimeFromUnix(firstAlert?.end, timezoneOffset);
    const event = firstAlert?.event || t("officialAlertDefaultEvent");

    return {
        message: t("officialAlertMessage", { event, start, end })
    };
}

function getUpcomingRiskWindow(forecastData, horizonHours = 12) {
    const entries = Array.isArray(forecastData?.list) ? forecastData.list : [];
    if (!entries.length) {
        return {
            hasStorm: false,
            maxTemp: null,
            maxWindKmh: null,
            maxGustKmh: null,
            maxRainChance: null
        };
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const horizonUnix = nowUnix + (horizonHours * 60 * 60);
    const upcoming = entries.filter((entry) => Number.isFinite(entry?.dt) && entry.dt >= nowUnix && entry.dt <= horizonUnix);

    if (!upcoming.length) {
        return {
            hasStorm: false,
            maxTemp: null,
            maxWindKmh: null,
            maxGustKmh: null,
            maxRainChance: null
        };
    }

    let hasStorm = false;
    let maxTemp = null;
    let maxWindKmh = null;
    let maxGustKmh = null;
    let maxRainChance = null;

    upcoming.forEach((entry) => {
        const weatherId = entry?.weather?.[0]?.id;
        const temp = entry?.main?.temp;
        const windKmh = Number.isFinite(entry?.wind?.speed) ? entry.wind.speed * 3.6 : null;
        const gustKmh = Number.isFinite(entry?.wind?.gust) ? entry.wind.gust * 3.6 : null;
        const rainChance = Number.isFinite(entry?.pop) ? Math.round(entry.pop * 100) : null;

        if (Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300) {
            hasStorm = true;
        }

        if (Number.isFinite(temp)) {
            maxTemp = Number.isFinite(maxTemp) ? Math.max(maxTemp, temp) : temp;
        }

        if (Number.isFinite(windKmh)) {
            maxWindKmh = Number.isFinite(maxWindKmh) ? Math.max(maxWindKmh, windKmh) : windKmh;
        }

        if (Number.isFinite(gustKmh)) {
            maxGustKmh = Number.isFinite(maxGustKmh) ? Math.max(maxGustKmh, gustKmh) : gustKmh;
        }

        if (Number.isFinite(rainChance)) {
            maxRainChance = Number.isFinite(maxRainChance) ? Math.max(maxRainChance, rainChance) : rainChance;
        }
    });

    return {
        hasStorm,
        maxTemp,
        maxWindKmh,
        maxGustKmh,
        maxRainChance
    };
}

function getHeuristicSevereAlert(weatherData, forecastData) {
    const weatherId = weatherData?.weather?.[0]?.id;
    const temp = weatherData?.main?.temp;
    const windKmh = Number.isFinite(weatherData?.wind?.speed) ? weatherData.wind.speed * 3.6 : null;
    const gustKmh = Number.isFinite(weatherData?.wind?.gust) ? weatherData.wind.gust * 3.6 : null;
    const riskWindow = getUpcomingRiskWindow(forecastData, 12);
    const rainAlertData = getRainAlertData(forecastData?.list || []);

    if (Number.isFinite(weatherId) && weatherId >= 200 && weatherId < 300) {
        return {
            level: "is-critical",
            message: t("severeStormMessage")
        };
    }

    if (riskWindow.hasStorm) {
        return {
            level: "is-warning",
            message: t("severeStormIncomingMessage")
        };
    }

    const maxTemp = Number.isFinite(riskWindow.maxTemp)
        ? Math.max(riskWindow.maxTemp, Number.isFinite(temp) ? temp : Number.NEGATIVE_INFINITY)
        : temp;

    if (Number.isFinite(maxTemp) && maxTemp >= 40) {
        return {
            level: "is-critical",
            message: t("severeHeatExtremeMessage")
        };
    }

    if (Number.isFinite(maxTemp) && maxTemp >= 35) {
        return {
            level: "is-warning",
            message: t("severeHeatMessage")
        };
    }

    const maxWindKmh = Number.isFinite(riskWindow.maxWindKmh)
        ? Math.max(riskWindow.maxWindKmh, Number.isFinite(windKmh) ? windKmh : Number.NEGATIVE_INFINITY)
        : windKmh;
    const maxGustKmh = Number.isFinite(riskWindow.maxGustKmh)
        ? Math.max(riskWindow.maxGustKmh, Number.isFinite(gustKmh) ? gustKmh : Number.NEGATIVE_INFINITY)
        : gustKmh;

    if ((Number.isFinite(maxWindKmh) && maxWindKmh >= 75) || (Number.isFinite(maxGustKmh) && maxGustKmh >= 85)) {
        return {
            level: "is-critical",
            message: t("severeWindExtremeMessage")
        };
    }

    if (Number.isFinite(maxWindKmh) && maxWindKmh >= 60) {
        return {
            level: "is-warning",
            message: t("severeWindMessage")
        };
    }

    if (Number.isFinite(maxGustKmh) && maxGustKmh >= 70) {
        return {
            level: "is-warning",
            message: t("severeGustMessage")
        };
    }

    const hasHeavyRainRisk = rainAlertData && rainAlertData.chance >= 85;
    const hasUpcomingHeavyRain = Number.isFinite(riskWindow.maxRainChance) && riskWindow.maxRainChance >= 85;

    if (hasHeavyRainRisk || hasUpcomingHeavyRain) {
        return {
            level: "is-warning",
            message: t("severeRainMessage", {
                chance: hasHeavyRainRisk ? rainAlertData.chance : riskWindow.maxRainChance
            })
        };
    }

    return null;
}

function showSevereAlert(message, level = "is-warning") {
    severeAlertBannerEl.classList.remove("hidden", "is-warning", "is-info", "is-critical");
    severeAlertBannerEl.classList.add(level);
    severeAlertBannerEl.textContent = message;
}

function hideSevereAlert() {
    severeAlertBannerEl.classList.add("hidden");
    severeAlertBannerEl.classList.remove("is-warning", "is-info", "is-critical");
    severeAlertBannerEl.textContent = "";
}

function setLoadingState(isLoading) {
    weatherCardEl.classList.toggle("is-loading", isLoading);

    if (isLoading) {
        renderForecastSkeleton();
        hourlyChartEl.classList.add("is-loading");
        hourlyChartEl.innerHTML = "";
    } else {
        forecastListEl.classList.remove("is-loading");
        hourlyChartEl.classList.remove("is-loading");
    }
}

function toggleRetryButton(shouldShow) {
    retryButton.classList.toggle("hidden", !shouldShow);
}

function handleFavoriteToggle() {
    if (!currentCityName) {
        return;
    }

    const favorites = getStoredCityList(STORAGE_KEY_FAVORITES);
    const index = favorites.findIndex((city) => city.toLowerCase() === currentCityName.toLowerCase());

    if (index >= 0) {
        favorites.splice(index, 1);
    } else {
        favorites.unshift(currentCityName);
    }

    saveStoredCityList(STORAGE_KEY_FAVORITES, uniqueCityList(favorites).slice(0, MAX_FAVORITES));
    renderSavedCityLists();
    updateFavoriteButtonState();
}

function handleQuickCityClick(event) {
    const chipButton = event.target.closest(".city-chip");
    if (!chipButton) {
        return;
    }

    const city = chipButton.dataset.city;
    if (!city) {
        return;
    }

    selectedCitySuggestion = null;
    hideCitySuggestions(true);
    cityInput.value = city;
    fetchWeatherByCity(city);
}

function clearHistory() {
    saveStoredCityList(STORAGE_KEY_HISTORY, []);
    renderSavedCityLists();
}

function addToHistory(city) {
    if (!city) {
        return;
    }

    const history = getStoredCityList(STORAGE_KEY_HISTORY);
    history.unshift(city);
    saveStoredCityList(STORAGE_KEY_HISTORY, uniqueCityList(history).slice(0, MAX_HISTORY));
}

function updateFavoriteButtonState() {
    if (!currentCityName) {
        favoriteToggleButton.disabled = true;
        favoriteToggleButton.textContent = t("favoriteAdd");
        return;
    }

    const favorites = getStoredCityList(STORAGE_KEY_FAVORITES);
    const isFavorite = favorites.some((city) => city.toLowerCase() === currentCityName.toLowerCase());

    favoriteToggleButton.disabled = false;
    favoriteToggleButton.textContent = isFavorite
        ? t("favoriteRemove")
        : t("favoriteAdd");
}

function renderSavedCityLists() {
    renderCityChipList(
        favoritesListEl,
        getStoredCityList(STORAGE_KEY_FAVORITES),
        t("favoritesEmpty")
    );

    renderCityChipList(
        historyListEl,
        getStoredCityList(STORAGE_KEY_HISTORY),
        t("historyEmpty")
    );

    renderTravelTimePanel();
}

function renderTravelTimePanel() {
    if (!travelTimeListEl) {
        return;
    }

    const favoriteCities = getStoredCityList(STORAGE_KEY_FAVORITES);
    travelTimeListEl.innerHTML = "";

    if (!favoriteCities.length) {
        const empty = document.createElement("p");
        empty.className = "travel-time-empty";
        empty.textContent = t("travelTimeEmpty");
        travelTimeListEl.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();

    favoriteCities.forEach((city) => {
        const cacheKey = getCityCacheKey(city);
        const card = document.createElement("article");
        card.className = "travel-time-card";
        card.dataset.cityKey = cacheKey;

        const cityLabel = document.createElement("p");
        cityLabel.className = "travel-time-city";
        cityLabel.textContent = city;

        const timeValue = document.createElement("p");
        timeValue.className = "travel-time-value";
        timeValue.textContent = Number.isFinite(travelTimezoneCache[cacheKey])
            ? "--:--"
            : t("travelTimeLoading");

        card.append(cityLabel, timeValue);
        fragment.appendChild(card);
    });

    travelTimeListEl.appendChild(fragment);
    updateTravelTimeValues();
    void ensureFavoriteTimezoneOffsets();
}

function updateTravelTimeValues() {
    if (!travelTimeListEl) {
        return;
    }

    const nowUnix = Math.floor(Date.now() / 1000);
    const cards = travelTimeListEl.querySelectorAll(".travel-time-card");

    cards.forEach((card) => {
        const cacheKey = card.dataset.cityKey;
        const timeEl = card.querySelector(".travel-time-value");
        if (!timeEl) {
            return;
        }

        const timezoneOffset = travelTimezoneCache[cacheKey];
        if (!Number.isFinite(timezoneOffset)) {
            timeEl.textContent = t("travelTimeLoading");
            return;
        }

        timeEl.textContent = formatTimeFromUnix(nowUnix, timezoneOffset);
    });
}

function startTravelClock() {
    stopTravelClock();
    updateTravelTimeValues();
    travelClockIntervalId = window.setInterval(updateTravelTimeValues, 1000);
}

function stopTravelClock() {
    if (travelClockIntervalId === null) {
        return;
    }

    window.clearInterval(travelClockIntervalId);
    travelClockIntervalId = null;
}

function syncTravelTimezoneFromSnapshot(city, timezoneOffset) {
    if (!city || !Number.isFinite(timezoneOffset)) {
        return;
    }

    const cacheKey = getCityCacheKey(city);
    travelTimezoneCache[cacheKey] = timezoneOffset;
    saveTravelTimezoneCache();
    updateTravelTimeValues();
}

async function ensureFavoriteTimezoneOffsets() {
    if (isTravelTimezoneSyncInProgress || !isApiKeyConfigured()) {
        return;
    }

    const favoriteCities = getStoredCityList(STORAGE_KEY_FAVORITES);
    const missingCities = favoriteCities.filter((city) => {
        const cacheKey = getCityCacheKey(city);
        return !Number.isFinite(travelTimezoneCache[cacheKey]);
    });

    if (!missingCities.length) {
        return;
    }

    isTravelTimezoneSyncInProgress = true;

    try {
        for (const city of missingCities) {
            const timezoneOffset = await fetchTimezoneOffsetForCity(city);
            if (!Number.isFinite(timezoneOffset)) {
                continue;
            }

            travelTimezoneCache[getCityCacheKey(city)] = timezoneOffset;
            updateTravelTimeValues();
        }

        saveTravelTimezoneCache();
    } finally {
        isTravelTimezoneSyncInProgress = false;
    }
}

async function fetchTimezoneOffsetForCity(city) {
    if (typeof city !== "string" || !city.trim()) {
        return null;
    }

    try {
        const lang = getWeatherApiLanguage();
        const url = buildOpenWeatherRequestUrl("/api/weather", BASE_URL, {
            q: city.trim(),
            units: "metric",
            lang
        });
        const result = await requestJsonWithPolicy(url, {
            scope: "timezone",
            cacheKey: `timezone:${normalizeCityToken(city)}:${lang}`,
            allowStaleOnError: true
        });
        if (!result.ok) {
            return null;
        }

        const payload = result.data;
        return Number.isFinite(payload?.timezone) ? payload.timezone : null;
    } catch {
        return null;
    }
}

function getCityCacheKey(cityName) {
    return normalizeCityToken(cityName);
}

function renderCityChipList(container, cities, emptyMessage) {
    container.innerHTML = "";

    if (!cities.length) {
        const empty = document.createElement("p");
        empty.className = "empty-chip";
        empty.textContent = emptyMessage;
        container.appendChild(empty);
        return;
    }

    const fragment = document.createDocumentFragment();
    cities.forEach((city) => {
        const chip = document.createElement("button");
        chip.type = "button";
        chip.className = "city-chip";
        chip.dataset.city = city;
        chip.textContent = city;
        fragment.appendChild(chip);
    });
    container.appendChild(fragment);
}

function uniqueCityList(cities) {
    const map = new Map();
    cities.forEach((city) => {
        const normalized = city.trim();
        if (!normalized) {
            return;
        }
        map.set(normalized.toLowerCase(), normalized);
    });
    return Array.from(map.values());
}

function getStoredCityList(storageKey) {
    try {
        const raw = localStorage.getItem(storageKey);
        const parsed = JSON.parse(raw || "[]");
        return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
    } catch {
        return [];
    }
}

function saveStoredCityList(storageKey, cities) {
    try {
        localStorage.setItem(storageKey, JSON.stringify(cities));
    } catch {
        // Ignora erro de storage para manter a experiência funcional.
    }
}

function getCommuteCityStorageKey(context) {
    const city = normalizeCityToken(context?.cityName);
    const country = normalizeCityToken(context?.country);
    if (!city) {
        return "";
    }

    return `${city}|${country || "--"}`;
}

function getStoredCommuteEtaHistory() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY_COMMUTE_ETA_HISTORY);
        const parsed = JSON.parse(raw || "[]");
        if (!Array.isArray(parsed)) {
            return [];
        }

        return parsed.filter((entry) => {
            return entry
                && typeof entry === "object"
                && typeof entry.cityKey === "string"
                && typeof entry.modeKey === "string"
                && Number.isFinite(entry.targetHour)
                && Number.isFinite(entry.etaSeconds)
                && Number.isFinite(entry.createdAt);
        });
    } catch {
        return [];
    }
}

function saveStoredCommuteEtaHistory(entries) {
    try {
        localStorage.setItem(STORAGE_KEY_COMMUTE_ETA_HISTORY, JSON.stringify(entries || []));
    } catch {
        // Ignora erro de storage para manter a experiencia funcional.
    }
}

function recordCommuteEtaHistory(assessment) {
    if (!assessment || !Number.isFinite(assessment.etaSeconds) || !Number.isFinite(assessment.targetUnix)) {
        return;
    }

    const context = getCommuteCityContext();
    const cityKey = getCommuteCityStorageKey(context);
    if (!cityKey) {
        return;
    }

    const timezoneOffset = Number.isFinite(assessment?.conditions?.timezoneOffset)
        ? assessment.conditions.timezoneOffset
        : (currentWeatherSnapshot?.timezoneOffset ?? 0);
    const targetHour = getLocationHour(assessment.targetUnix, timezoneOffset);
    const nextEntry = {
        cityKey,
        cityLabel: context?.cityName || currentCityName || "",
        destinationLabel: assessment.destinationLabel,
        modeKey: assessment.modeKey,
        targetHour,
        etaSeconds: assessment.etaSeconds,
        adjustedRiskScore: assessment.adjustedRiskScore,
        createdAt: Date.now()
    };

    const history = getStoredCommuteEtaHistory();
    history.unshift(nextEntry);
    saveStoredCommuteEtaHistory(history.slice(0, MAX_COMMUTE_HISTORY));
}

function saveLastCity(city) {
    try {
        localStorage.setItem(STORAGE_KEY_LAST_CITY, city);
    } catch {
        // Ignora falha de armazenamento no navegador.
    }
}

function getLastCity() {
    try {
        return localStorage.getItem(STORAGE_KEY_LAST_CITY);
    } catch {
        return null;
    }
}

function formatCityForStorage(weatherData, locationOverride = null) {
    if (typeof locationOverride?.name === "string" && locationOverride.name.trim()) {
        return locationOverride.name.trim();
    }

    return weatherData?.name || DEFAULT_CITY;
}

function formatTimeFromUnix(timestamp, timezoneOffset) {
    if (!Number.isFinite(timestamp)) {
        return "--:--";
    }

    const localDate = toLocationDate(timestamp, timezoneOffset);
    const hours = String(localDate.getUTCHours()).padStart(2, "0");
    const minutes = String(localDate.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
}

function formatDayLabel(timestamp, timezoneOffset) {
    const weekdays = [
        t("weekdaySun"),
        t("weekdayMon"),
        t("weekdayTue"),
        t("weekdayWed"),
        t("weekdayThu"),
        t("weekdayFri"),
        t("weekdaySat")
    ];
    const locationDate = toLocationDate(timestamp, timezoneOffset);
    const weekday = weekdays[locationDate.getUTCDay()];
    const day = String(locationDate.getUTCDate()).padStart(2, "0");
    const month = String(locationDate.getUTCMonth() + 1).padStart(2, "0");
    return `${weekday} ${day}/${month}`;
}

function getLocationDayKey(timestamp, timezoneOffset) {
    const locationDate = toLocationDate(timestamp, timezoneOffset);
    const year = locationDate.getUTCFullYear();
    const month = String(locationDate.getUTCMonth() + 1).padStart(2, "0");
    const day = String(locationDate.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}

function getLocationHour(timestamp, timezoneOffset) {
    return toLocationDate(timestamp, timezoneOffset).getUTCHours();
}

function pickClosestEntryByHour(entries, targetHour, timezoneOffset) {
    return entries.reduce((closest, current) => {
        const closestDistance = Math.abs(getLocationHour(closest.dt, timezoneOffset) - targetHour);
        const currentDistance = Math.abs(getLocationHour(current.dt, timezoneOffset) - targetHour);
        return currentDistance < closestDistance ? current : closest;
    });
}

function toLocationDate(timestamp, timezoneOffset = 0) {
    return new Date((timestamp + timezoneOffset) * 1000);
}

function extractRainChanceFromForecast(forecastData, referenceTimestamp, oneCallInsights = null) {
    const targetTimestamp = Number.isFinite(referenceTimestamp)
        ? referenceTimestamp
        : Math.floor(Date.now() / 1000);

    let forecastChance = null;
    const entries = forecastData?.list;
    if (Array.isArray(entries) && entries.length) {
        const validEntries = entries.filter((entry) => Number.isFinite(entry?.dt) && Number.isFinite(entry?.pop));
        if (validEntries.length) {
            const closestEntry = validEntries.reduce((closest, current) => {
                const closestDistance = Math.abs(closest.dt - targetTimestamp);
                const currentDistance = Math.abs(current.dt - targetTimestamp);
                return currentDistance < closestDistance ? current : closest;
            });
            forecastChance = closestEntry.pop * 100;
        }
    }

    let hourlyChance = null;
    const hourlyEntries = Array.isArray(oneCallInsights?.hourlyWeather)
        ? oneCallInsights.hourlyWeather.filter((entry) => Number.isFinite(entry?.dt) && Number.isFinite(entry?.pop))
        : [];
    if (hourlyEntries.length) {
        const closestHourly = hourlyEntries.reduce((closest, current) => {
            const closestDistance = Math.abs(closest.dt - targetTimestamp);
            const currentDistance = Math.abs(current.dt - targetTimestamp);
            return currentDistance < closestDistance ? current : closest;
        });
        hourlyChance = closestHourly.pop * 100;
    }

    if (Number.isFinite(forecastChance) && Number.isFinite(hourlyChance)) {
        // Weighted blend: forecast (3h source) + hourly signal (higher temporal resolution).
        return (forecastChance * 0.55) + (hourlyChance * 0.45);
    }

    if (Number.isFinite(hourlyChance)) {
        return hourlyChance;
    }

    return Number.isFinite(forecastChance) ? forecastChance : null;
}

function updateIcon(iconCode, weatherMain) {
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    weatherIconEl.setAttribute("crossorigin", "anonymous");
    weatherIconEl.referrerPolicy = "no-referrer";
    weatherIconEl.src = iconUrl;
    weatherIconEl.alt = t("weatherIconAlt", { weatherMain });
    weatherIconEl.hidden = false;
}

function mapWeatherIdToMood(weatherId) {
    if (weatherId >= 200 && weatherId < 600) {
        return "rainy";
    }

    if (weatherId >= 600 && weatherId < 700) {
        return "snowy";
    }

    if (weatherId === 800) {
        return "sunny";
    }

    if ((weatherId >= 700 && weatherId < 800) || (weatherId > 800 && weatherId < 900)) {
        return "cloudy";
    }

    return "default";
}

function resolveWeatherUiProfileKey(weatherId, isDayPeriod = true, context = {}) {
    const suffix = isDayPeriod ? "day" : "night";
    const numericWeatherId = Number(weatherId);
    const uvIndex = Number(context?.uvIndex);
    const windSpeedKmh = Number(context?.windSpeedKmh);

    if (!Number.isFinite(numericWeatherId)) {
        return `default-${suffix}`;
    }

    if (numericWeatherId >= 200 && numericWeatherId < 300) {
        return `storm-${suffix}`;
    }

    if (numericWeatherId >= 300 && numericWeatherId < 600) {
        if ((numericWeatherId >= 500 && numericWeatherId < 600) && Number.isFinite(windSpeedKmh) && windSpeedKmh >= 44) {
            return `storm-${suffix}`;
        }

        return `rain-${suffix}`;
    }

    if (numericWeatherId >= 600 && numericWeatherId < 700) {
        return `snow-${suffix}`;
    }

    if (numericWeatherId >= 700 && numericWeatherId < 800) {
        return `mist-${suffix}`;
    }

    if (numericWeatherId === 800) {
        if (isDayPeriod && Number.isFinite(uvIndex) && uvIndex >= 8) {
            return "heat-day";
        }

        return `clear-${suffix}`;
    }

    if (numericWeatherId > 800 && numericWeatherId < 900) {
        return `cloud-${suffix}`;
    }

    return `default-${suffix}`;
}

function applyWeatherUiProfile(profileKey) {
    const fallbackProfile = WEATHER_UI_PROFILES[DEFAULT_WEATHER_UI_PROFILE_KEY];
    const profile = WEATHER_UI_PROFILES[profileKey] || fallbackProfile;
    const resolvedProfileKey = WEATHER_UI_PROFILES[profileKey] ? profileKey : DEFAULT_WEATHER_UI_PROFILE_KEY;
    const mergedVars = {
        ...WEATHER_UI_BASE_CSS_VARS,
        ...(profile?.vars || {})
    };

    document.body.dataset.weatherProfile = resolvedProfileKey;
    document.body.dataset.weatherFamily = profile?.family || "default";

    Object.entries(mergedVars).forEach(([cssVarName, cssVarValue]) => {
        document.body.style.setProperty(cssVarName, cssVarValue);
    });

    if (themeColorMetaEl && typeof profile?.themeColor === "string") {
        themeColorMetaEl.setAttribute("content", profile.themeColor);
    }
}

function applyThemeByCondition(weatherId, isDayPeriod = true, context = {}) {
    const mood = mapWeatherIdToMood(weatherId);
    const classToApply = THEME_CLASS_MAP[mood] || THEME_CLASS_MAP.default;
    const profileKey = resolveWeatherUiProfileKey(weatherId, isDayPeriod, context);

    Object.values(THEME_CLASS_MAP).forEach((themeClass) => {
        document.body.classList.remove(themeClass);
    });

    document.body.classList.add(classToApply);
    applyDayPeriodClass(isDayPeriod);
    applyWeatherUiProfile(profileKey);
}

function applyDayPeriodClass(isDayPeriod) {
    Object.values(PERIOD_CLASS_MAP).forEach((periodClass) => {
        document.body.classList.remove(periodClass);
    });

    document.body.classList.add(isDayPeriod ? PERIOD_CLASS_MAP.day : PERIOD_CLASS_MAP.night);
}

function isDaytimeAtLocation(weatherData, iconCode) {
    const dataTimestamp = weatherData?.dt;
    const sunrise = weatherData?.sys?.sunrise;
    const sunset = weatherData?.sys?.sunset;

    if (
        Number.isFinite(dataTimestamp)
        && Number.isFinite(sunrise)
        && Number.isFinite(sunset)
    ) {
        return dataTimestamp >= sunrise && dataTimestamp < sunset;
    }

    if (typeof iconCode === "string") {
        if (iconCode.endsWith("d")) {
            return true;
        }

        if (iconCode.endsWith("n")) {
            return false;
        }
    }

    return true;
}

function createRainDrops(amount) {
    if (!rainLayerEl) {
        return;
    }

    const fragment = document.createDocumentFragment();

    for (let index = 0; index < amount; index += 1) {
        const drop = document.createElement("span");
        const xPosition = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = 0.7 + Math.random() * 0.9;
        const opacity = 0.2 + Math.random() * 0.6;

        drop.className = "rain-drop";
        drop.style.left = `${xPosition}%`;
        drop.style.animationDelay = `${delay}s`;
        drop.style.animationDuration = `${duration}s`;
        drop.style.opacity = `${opacity}`;

        fragment.appendChild(drop);
    }

    rainLayerEl.appendChild(fragment);
}

function createSceneMistPuffs(amount) {
    if (!sceneMistLayerEl) {
        return;
    }

    sceneMistLayerEl.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < amount; index += 1) {
        const puff = document.createElement("span");
        const left = Math.random() * 100;
        const top = 8 + Math.random() * 78;
        const delay = Math.random() * 7;
        const duration = 15 + Math.random() * 20;
        const opacity = 0.12 + Math.random() * 0.3;

        puff.className = "scene-mist-puff";
        puff.style.left = `${left}%`;
        puff.style.top = `${top}%`;
        puff.style.animationDelay = `${delay}s`;
        puff.style.animationDuration = `${duration}s`;
        puff.style.opacity = `${opacity}`;

        fragment.appendChild(puff);
    }

    sceneMistLayerEl.appendChild(fragment);
}

function createSceneSparkParticles(amount) {
    if (!sceneSparkLayerEl) {
        return;
    }

    sceneSparkLayerEl.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (let index = 0; index < amount; index += 1) {
        const spark = document.createElement("span");
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 4.8;
        const duration = 1.2 + Math.random() * 2.1;

        spark.className = "scene-spark";
        spark.style.left = `${left}%`;
        spark.style.top = `${top}%`;
        spark.style.animationDelay = `${delay}s`;
        spark.style.animationDuration = `${duration}s`;

        fragment.appendChild(spark);
    }

    sceneSparkLayerEl.appendChild(fragment);
}

function resetWeatherState() {
    stopLocalClock();
    currentWeatherSnapshot = null;
    cityNameEl.textContent = "--";
    weatherDescriptionEl.textContent = t("weatherDescriptionEmpty");
    temperatureEl.textContent = "--";
    feelsLikeEl.textContent = "--";
    humidityEl.textContent = "--";
    windSpeedEl.textContent = "--";
    windGustEl.textContent = "--";
    pressureEl.textContent = "--";
    visibilityEl.textContent = "--";
    rainChanceEl.textContent = "--";
    updateUvCard(null);
    localTimeEl.textContent = "--:--";
    sunriseTimeEl.textContent = "--:--";
    sunsetTimeEl.textContent = "--:--";

    updateAqiCard(null);
    resetOutdoorSuggestion();
    hideWindSmartAlert();
    dailySummaryTextEl.textContent = t("dailySummaryIdle");
    dailySummaryListEl.classList.add("hidden");
    dailySummaryListEl.innerHTML = "";
    setCinematicSceneState(getDefaultCinematicSceneState());
    resetDepartureAssistantResult();
    resetCommuteDestinationSuggestionsState();
    resetCommuteState();
    resetSafeWindowState();
    resetForecastReliabilityState();
    resetRainRadarState();
    resetHealthContextState();
    resetWeeklyInsightsState();
    weatherIconEl.hidden = true;
    weatherIconEl.src = "";
    weatherIconEl.alt = "";
    currentSharePayload = null;
    updateShareButtonsState(false);
    resetCompareState();
    applyThemeByCondition(-1, true);
}

function startLocalClock(timezoneOffset = 0) {
    stopLocalClock();

    const safeTimezoneOffset = Number.isFinite(timezoneOffset) ? timezoneOffset : 0;
    const renderClock = () => {
        const nowUnix = Math.floor(Date.now() / 1000);
        localTimeEl.textContent = formatTimeFromUnix(nowUnix, safeTimezoneOffset);
    };

    renderClock();
    localClockIntervalId = window.setInterval(renderClock, 1000);
}

function stopLocalClock() {
    if (localClockIntervalId === null) {
        return;
    }

    window.clearInterval(localClockIntervalId);
    localClockIntervalId = null;
}

function setStatus(message, type) {
    statusMessage.textContent = message;
    statusMessage.classList.remove("is-error", "is-loading");

    if (type === "error") {
        statusMessage.classList.add("is-error");
        return;
    }

    if (type === "loading") {
        statusMessage.classList.add("is-loading");
    }
}

void init();