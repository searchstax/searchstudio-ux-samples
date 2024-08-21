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
    suggestAfterMinChars: 3,
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

  searchstax.addSearchFeedbackWidget("search-feedback-container", {
    templates: {
      main: {
          template: `
        {{#searchExecuted}}
            <h4 class="searchstax-feedback-container">
                Showing <b>{{startResultIndex}} - {{endResultIndex}}</b> of <b>{{totalResults}}</b> results {{#searchTerm}} for "<b>{{searchTerm}}</b>" {{/searchTerm}}
                <div class="searchstax-feedback-container-suggested">
                  {{#autoCorrectedQuery}}
                    Search instead for <a href="#" class="searchstax-feedback-original-query">{{originalQuery}}</a>
                  {{/autoCorrectedQuery}}
                </div>
            </h4>
        {{/searchExecuted}}
        `,
          originalQueryClass: `searchstax-feedback-original-query`
      }
    },
  });