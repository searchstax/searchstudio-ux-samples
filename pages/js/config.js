const initConfig = {
  acceleratorSample: {
        language: 'en',
    searchURL: 'https://searchcloud-django5-staging-27-us-east-1.searchstax.co/138/corpsiteappdonotdelete-4588/emselect',
    suggesterURL: 'https://searchcloud-django5-staging-27-us-east-1.searchstax.co/138/corpsiteappdonotdelete-4588_suggester/emsuggest',
    trackApiKey: 'ynDxQycRAG5NKtztf9LURH15uPEWA8BN7XV24bybe1k',
    searchAuth: 'a1cede71fad5ae41dc8efc99f96c647e3dbdd38d',
    authType: "token",
    relatedSearchesURL: "https://staging.searchstax.co/api/v1/4588/related-search/",
    relatedSearchesAPIKey: "e514efc3776ab13bda2ce5984085010073078009",
    analyticsBaseUrl: 'https://analytics-us-west-staging.searchstax.co',
    questionURL: "https://search-ai-us-west-staging.searchstax.co/api/v1/4588/answer/"
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
