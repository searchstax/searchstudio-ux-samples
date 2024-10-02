const initConfig = {
  acceleratorSample: {
    language: "en",
    searchURL:
      "https://ss764687-aiypyk27-us-east-2-aws.searchstax.co/solr/accessibilityjuliatestdonotdelete-3182/emselect",
    suggesterURL:
      "https://ss764687-aiypyk27-us-east-2-aws.searchstax.co/solr/accessibilityjuliatestdonotdelete-3182-suggester/emsuggest",
    searchAuth: "YXBwMzE4Mi1hcGk6U29sbmNlXzIy",
    trackApiKey: "feqWatajyMvdrpvMyFIMwdHtRdkjPqqHMttUCnVpRss",
    authType: "basic",
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/3182/related-search/",
    relatedSearchesAPIKey: "055651fc679c8492ab98badd08ee6c6f2d8e25ce",
    analyticsBaseUrl: 'https://analytics-us-west-staging.searchstax.co'
  },
  acceleratorRelatedSearchSample: {
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/3182/related-search/",
    relatedSearchesAPIKey: "055651fc679c8492ab98badd08ee6c6f2d8e25ce",
  },
  jobSearchSample: {
    language: "en",
    searchURL:
      "https://ss764687-aiypyk27-us-east-2-aws.searchstax.co/solr/accessibilityjuliatestdonotdelete-3182/emselect",
    suggesterURL:
      "https://ss764687-aiypyk27-us-east-2-aws.searchstax.co/solr/accessibilityjuliatestdonotdelete-3182-suggester/emsuggest",
    searchAuth: "YXBwMzE4Mi1hcGk6U29sbmNlXzIy",
    trackApiKey: "feqWatajyMvdrpvMyFIMwdHtRdkjPqqHMttUCnVpRss",
    authType: "basic",
    analyticsBaseUrl: 'https://analytics-us-west-staging.searchstax.c'
  },
  jobSearchRelatedSearchSample: {
    relatedSearchesURL:
      "https://staging.searchstax.co/api/v1/3182/related-search/",
    relatedSearchesAPIKey: "055651fc679c8492ab98badd08ee6c6f2d8e25ce",
    analyticsBaseUrl: 'https://analytics-us-west-staging.searchstax.c'
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
