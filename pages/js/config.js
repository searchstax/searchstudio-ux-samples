const initConfig = {
  acceleratorSample: {
    language: "en",
    searchURL:
      "https://searchcloud-2-us-east-1.searchstax.com/29847/corpsiteuxsamples-1442/emselect",
    suggesterURL:
      "https://searchcloud-2-us-east-1.searchstax.com/29847/corpsiteuxsamples-1442_suggester/emsuggest",
    searchAuth: "b065448ad1484e205f4851f0ce89d128e704e2f4",
    trackApiKey: "DPAOKNB9c5chZZDwN1Il9dLUCLMGF1ggehy0dWewZwk",
    authType: "token",
    relatedSearchesURL:
      "https://app.searchstax.com/api/v1/1442/related-search/",
    relatedSearchesAPIKey: "fac98ad405cc50e0c0693331e8d2119de592f0e3",
    analyticsBaseUrl: "https://analytics-us.searchstax.com",
    questionURL: "https://search-ai-us.searchstax.com/api/v1/1442/answer/",
    model: "Default",
    appId: "1442",
  },
  acceleratorRelatedSearchSample: {
    relatedSearchesURL:
      "https://app.searchstax.com/api/v1/1442/related-search/",
    relatedSearchesAPIKey: "fac98ad405cc50e0c0693331e8d2119de592f0e3",
    model: "Default",
  },
  jobSearchSample: {
    language: "en",
    searchURL:
      "https://searchcloud-2-us-east-1.searchstax.com/29847/jobsearchuxsample-1447/emselect",
    suggesterURL:
      "https://searchcloud-2-us-east-1.searchstax.com/29847/jobsearchuxsample-1447_suggester/emsuggest",
    searchAuth: "9c77f740418413b6701fe7a98cc7c640987a9af1",
    trackApiKey: "Cnpe2IL7uXaztPzavTIuDAiAmfydOa12f0iAGE0hLlY",
    authType: "token",
    analyticsBaseUrl: "https://analytics-us.searchstax.com",
    model: "Default",
  },
  jobSearchRelatedSearchSample: {
    relatedSearchesURL:
      "https://app.searchstax.com/api/v1/1447/related-search/",
    relatedSearchesAPIKey: "3014f9d0276906ac17fff16c500e5ee75b20d73c",
    analyticsBaseUrl: "https://analytics-us.searchstax.com",
    model: "Default",
  },
};

const renderConfig = {
  inputWidget: {},
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

        const geocodingAPIKey = "AIzaSyDK5wQQaz7kmP60_DViAto5rTQ301eVBFs";// Replace with your actual API key
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
                  `https://geocoding.searchstax.com/reverse?location=${lat},${lon}&components=country:US&app_id=${initConfig.acceleratorSample.appId}`,
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Token ${initConfig.acceleratorSample.relatedSearchesAPIKey}`,
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

export { initConfig, renderConfig };
