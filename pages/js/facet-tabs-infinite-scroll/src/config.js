const initConfig = {
    acceleratorSample: {
        language: "en",
        searchURL: "https://searchcloud-2-us-east-1.searchstax.com/29847/corpsiteuxsamples-1442/emselect",
        suggesterURL: "https://searchcloud-2-us-east-1.searchstax.com/29847/corpsiteuxsamples-1442_suggester/emsuggest",
        searchAuth: "b065448ad1484e205f4851f0ce89d128e704e2f4",
        trackApiKey: "DPAOKNB9c5chZZDwN1Il9dLUCLMGF1ggehy0dWewZwk",
        authType: "token",
        hooks: {
            beforeSearch: function (props) {
                const propsCopy = { ...props};
                //When "All" Facet Value is clicked, we can just remove the facets as everything needs to be shown
                if(propsCopy.facets.length > 0 && propsCopy.facets[0].value == 'All') {
                   propsCopy.facets = []
                 }
                return propsCopy
            }
        }
    },
    acceleratorRelatedSearchSample:{
        relatedSearchesURL: "https://app.searchstax.com/api/v1/1442/related-search/",
        relatedSearchesAPIKey: "fac98ad405cc50e0c0693331e8d2119de592f0e3",
    }
}

export { initConfig };