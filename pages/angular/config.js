const config = {
  language: "en",
    model: "Main Profile",
    searchURL:
      "https://searchcloud-staging-3-us-east-1.searchstax.co/138/corpsitednrcrawlerdnd-6246/emselect",
    suggesterURL:
      "https://searchcloud-staging-3-us-east-1.searchstax.co/138/corpsitednrcrawlerdnd-6246_suggester/emsuggest",
    trackApiKey: "CKHcsBBTMKtH1xWxhw76Tt3bpgbMAbKwlnyHginyoGc",
    searchAuth: "7e6c816ba15a9f4917046f4d2967eef13d2a5a9f",
    authType: "token",
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/6246/related-search/",
    relatedSearchesAPIKey: "https://staging.searchstax.co/api/v1/6246/related-search/",
    analyticsBaseUrl: "https://analytics-us-west-staging.searchstax.co",
    analyticsSrc:
      "https://static-staging.searchstax.co/studio-js/v4/js/studio-analytics.js",
    questionURL:
      "https://search-ai-us-west-staging.searchstax.co/api/v1/6246/answer/",
    appId: "6246",
};

const renderConfig = {
  inputWidget: {
    // suggestAfterMinChars: 3,
  },
  facetsWidget: {
    itemsPerPageDesktop: 3,
    itemsPerPageMobile: 99,
    facetingType: "and", // "and" | "or" | "showUnavailable" | "tabs"
  },
  resultsWidget: {
    renderMethod: "pagination", //'infiniteScroll' or 'pagination'
  },
  locationWidget: {
    locationDecode: (term) => {
      return new Promise((resolve) => {
        // make a request to google geocoding API to retrieve lat, lon and address

        const geocodingAPIKey = "AIzaSyDK5wQQaz7kmP60_DViAto5rTQ301eVBFs";
        const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          term
        )}&key=${geocodingAPIKey}`;
        fetch(geocodingURL)
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "OK" && data.results.length > 0) {
              const result = data.results[0];
              const location = {
                lat: result.geometry.location.lat,
                lon: result.geometry.location.lng,
                address: result.formatted_address,
              };
              resolve(location);
            } else {
              resolve({
                address: undefined,
                lat: undefined,
                lon: undefined,
                error: true,
              });
            }
          })
          .catch(() => {
            resolve({
              address: undefined,
              lat: undefined,
              lon: undefined,
              error: true,
            });
          });
      });
    },
    locationDecodeCoordinatesToAddress: (lat, lon) => {
      return new Promise((resolve) => {
        fetch(
          `https://geocoding-staging.searchstax.co/reverse?location=${lat},${lon}&components=country:US&app_id=${config.appId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${config.relatedSearchesAPIKey}`,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "OK" && data.results.length > 0) {
              const result = data.results[0];
              resolve({
                address: result.formatted_address,
                lat: lat,
                lon: lon,
                error: false,
              });
            } else {
              resolve({
                address: undefined,
                lat: lat,
                lon: lon,
                error: true,
              });
            }
          })
          .catch(() => {
            resolve({
              address: undefined,
              lat: lat,
              lon: lon,
              error: true,
            });
          });
      });
    },
    locationSearchEnabled: true,
    locationValuesOverride: {
      locationDistanceEnabled: true,
      filterValues: ["any", "1000"],
      filterUnit: "miles",
      locationFilterDefaultValue: "any"
    },
  },
};

export { config, renderConfig };
