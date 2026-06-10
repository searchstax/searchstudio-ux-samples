import './main.scss'
import '@searchstax-inc/searchstudio-ux-js/dist/styles/mainTheme.css'
import { Searchstax } from '@searchstax-inc/searchstudio-ux-js'

const searchstax = new Searchstax();

searchstax.initialize({
    language: "en",
    searchURL: "https://ss849763-cvrfzabx-us-east-1-aws.searchstax.com/solr/ss849763-SearchStudioCorpSite/emselect",
    suggesterURL: "https://ss849763-cvrfzabx-us-east-1-aws.searchstax.com/solr/ss849763-CORPSITE-suggester-1/emsuggest",
    searchAuth: "YXBwNDAtYXBpOmdUSG8xNyNrdXU4",
    trackApiKey: "",
    authType: "basic"
});

searchstax.addSearchInputWidget("searchstax-input-container", {

    templates: {
    mainTemplate: {
        template: `
        <div class="searchstax-search-input-container">
            <div class="searchstax-search-input-wrapper">
                <input type="text" id="searchstax-search-input" class="searchstax-search-input" placeholder="Search for... example: Drupal" />
                <button class="searchstax-spinner-icon" id="searchstax-search-input-action-button" role="button"></button>
            </div>
        </div>
        `,
        searchInputId: "searchstax-search-input"
    },
    autosuggestItemTemplate: {
        template: `
        <div class="searchstax-autosuggest-item-term-container">{{{term}}}</div>
        `,
    }
    },
  });

  searchstax.addRelatedSearchesWidget("searchstax-related-searches-container", {
    relatedSearchesURL: "https://app.searchstax.com/api/v1/40/related-search/",
    relatedSearchesAPIKey: "81c09977fedb7e89310c87df81d7bc787301155e",
   templates: {
     main: {
         template: `
       {{#hasRelatedSearches}}
           <div class="searchstax-related-searches-container" id="searchstax-related-searches-container">
               <h3>Related searches:</h3>  <span id="searchstax-related-searches"></span>
               {{#relatedSearches}}
               <span class="searchstax-related-search">

               </span>
           {{/relatedSearches}}
           </div>
       {{/hasRelatedSearches}}
       {{^hasRelatedSearches}}
        There are no related searches for this term. Try searching for terms with related searches. <b>Example: <em>drupal</em></b>
       {{/hasRelatedSearches}}

       `,
         relatedSearchesContainerClass: `searchstax-related-search`,
     },
     relatedSearch: {
         template: `
       <span class="searchstax-related-search searchstax-related-search-item" aria-label="Related search: {{related_search}}" role="link">
           {{ related_search }}{{^last}}<span>,</span>{{/last}}
       </span>
       `,
         relatedSearchContainerClass: `searchstax-related-search-item`,
     },
   },
 });