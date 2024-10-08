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
      "https://app.searchstax.com/api/v1/1447/related-search/",
    relatedSearchesAPIKey: "3014f9d0276906ac17fff16c500e5ee75b20d73c",
    analyticsBaseUrl: 'https://analytics-us.searchstax.com'
  },
  acceleratorRelatedSearchSample: {
    relatedSearchesURL:
      "https://app.searchstax.com/api/v1/1442/related-search/",
    relatedSearchesAPIKey: "fac98ad405cc50e0c0693331e8d2119de592f0e3",
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
    analyticsBaseUrl: 'https://analytics-us.searchstax.com'
  },
  jobSearchRelatedSearchSample: {
    relatedSearchesURL:
      "https://app.searchstax.com/api/v1/1447/related-search/",
    relatedSearchesAPIKey: "3014f9d0276906ac17fff16c500e5ee75b20d73c",
    analyticsBaseUrl: 'https://analytics-us.searchstax.com'
  },
};

const renderConfig = {
  inputWidget: {
    suggestAfterMinChars: 3,
  },
  facetsWidget: {
    itemsPerPageDesktop: 3,
    itemsPerPageMobile: 99,
    facetingType: "and", // "and" | "or" | "showUnavailable" | "tabs"
  },
  resultsWidget: {
    renderMethod: "pagination", //'infiniteScroll' or 'pagination'
  },
};

export { initConfig, renderConfig };
