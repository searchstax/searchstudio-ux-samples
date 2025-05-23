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

  searchstax.addSearchResultsWidget("searchstax-results-container", {
    templates: {
      mainTemplate: {
      template: `
            <div class="searchstax-search-results-container">
                <div class="searchstax-search-results" id="searchstax-search-results"></div>
            </div>
            `,
        searchResultsContainerId: "searchstax-search-results",
      },
      searchResultTemplate: {
        template: `
            <div class="searchstax-search-result {{#thumbnail}} has-thumbnail {{/thumbnail}}">
                {{#promoted}}
                    <div class="searchstax-search-result-promoted"></div>
                {{/promoted}}

                {{#url}}
                    <a href="{{url}}" data-searchstax-unique-result-id="{{uniqueId}}" class="searchstax-result-item-link"></a>
                {{/url}}

                {{#ribbon}}
                    <div class="searchstax-search-result-ribbon">
                    {{ribbon}}
                    </div>
                {{/ribbon}}

                {{#thumbnail}}
                    <img alt="" src="{{thumbnail}}" class="searchstax-thumbnail">
                {{/thumbnail}}
                <div class="searchstax-search-result-title-container">
                    <span class="searchstax-search-result-title">{{title}}</span>
                </div>

                {{#paths}}
                    <p class="searchstax-search-result-common">
                        {{paths}}
                    </p>
                {{/paths}}

                {{#description}}
                    <p class="searchstax-search-result-description searchstax-search-result-common">
                        {{description}}
                    </p>
                {{/description}}

                {{#unmappedFields}}
                    {{#isImage}}
                        <div class="searchstax-search-result-image-container">
                        <img alt="" src="{{value}}" class="searchstax-result-image">
                        </div>
                    {{/isImage}}
                    {{^isImage}}
                        <p class="searchstax-search-result-common">
                        {{value}}
                        </p>
                    {{/isImage}}
                {{/unmappedFields}}
            </div>
            `,
        searchResultUniqueIdAttribute: "data-searchstax-unique-result-id"
      },
      noSearchResultTemplate: {
        template: `
            <div class="searchstax-no-results">
                Showing <strong>no results</strong> for <strong>"{{ searchTerm }}"</strong>
                <br>
                {{#spellingSuggestion}}
                    <span>&nbsp;Did you mean <a href="#" aria-label="Did you mean: {{originalQuery}}" class="searchstax-suggestion-term">{{ spellingSuggestion }}</a>?</span>
                {{/spellingSuggestion}}
            </div>
            <div>
                <p>Try searching for search related terms or topics. We offer a wide variety of content to help you get the information you need.</p>
                <p>Lost? Click on the ‘X” in the Search Box to reset your search.</p>
            </div>
            `
      }
    }
  });

  searchstax.addPaginationWidget("searchstax-pagination-container", {
    templates: {
        mainTemplate: {
            template: `
      {{#results.length}}
        <div class="searchstax-pagination-container">
          <div class="searchstax-pagination-content">
            <a class="searchstax-pagination-previous {{#isFirstPage}}disabled{{/isFirstPage}}" id="searchstax-pagination-previous">< Previous</a>
            <div class="searchstax-pagination-details">
              {{startResultIndex}} - {{endResultIndex}} of {{totalResults}}
            </div>
              <a class="searchstax-pagination-next {{#isLastPage}}disabled{{/isLastPage}}" id="searchstax-pagination-next">Next ></a>
          </div>
        </div>
      {{/results.length}}
      `,
            previousButtonClass: "searchstax-pagination-previous",
            nextButtonClass: "searchstax-pagination-next"
        }
    },
  });