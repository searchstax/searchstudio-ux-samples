const initConfig = {
  acceleratorSample: {
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
    relatedSearchesAPIKey: "0302d21778dbd2d6ff1b01b39169303bdcaad3a7",
    analyticsBaseUrl: "https://analytics-us-west-staging.searchstax.co",
    analyticsSrc:
      "https://static-staging.searchstax.co/studio-js/v4/js/studio-analytics.js",
    questionURL:
      "https://search-ai-us-west-staging.searchstax.co/api/v1/6246/answer/",
    appId: "6246",
  },
  acceleratorRelatedSearchSample: {
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/3182/related-search/",
    relatedSearchesAPIKey: "055651fc679c8492ab98badd08ee6c6f2d8e25ce",
  },
  jobSearchSample: {
    language: "en",
    searchURL:
      "https://ss128295-ag4l6w0z-us-west-1-aws.searchstax.co/solr/accessibilityjuliatestdonotdelete-3182/emselect",
    suggesterURL:
      "https://ss128295-ag4l6w0z-us-west-1-aws.searchstax.co/solr/accessibilityjuliatestdonotdelete-3182-suggester/emsuggest",
    searchAuth: "YXBwMzE4Mi1hcGk6V2VsY29tZTEhIQ==",
    trackApiKey: "feqWatajyMvdrpvMyFIMwdHtRdkjPqqHMttUCnVpRss",
    authType: "basic",
    analyticsBaseUrl: "https://analytics-us-west-staging.searchstax.c",
  },
  jobSearchRelatedSearchSample: {
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/3182/related-search/",
    relatedSearchesAPIKey: "055651fc679c8492ab98badd08ee6c6f2d8e25ce",
    analyticsBaseUrl: "https://analytics-us-west-staging.searchstax.c",
  },
  searchStandaloneSearchSample: {
    language: "en",
    model: "Main Profile",
    searchURL: "",
    suggesterURL: "",
    trackApiKey: "ynDxQycRAG5NKtztf9LURH15uPEWA8BN7XV24bybe1k",
    searchAuth: "",
    authType: "token",
    analyticsBaseUrl: "https://analytics-us-west-staging.searchstax.co",
    analyticsSrc:
      "https://static-staging.searchstax.co/studio-js/v4/js/studio-analytics.js",
    questionURL:
      "https://search-ai-us-west-staging.searchstax.co/api/v1/4588/answer/",
    router: { enabled: false },
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/4588/related-search/",
    relatedSearchesAPIKey: "e514efc3776ab13bda2ce5984085010073078009",
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
          `https://geocoding-staging.searchstax.co/reverse?location=${lat},${lon}&components=country:US&app_id=${initConfig.acceleratorSample.appId}`,
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
      locationFilterDefaultValue: "any",
    },
  },
};

export { initConfig, renderConfig };
