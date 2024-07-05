import "@searchstax-inc/searchstudio-ux-js/dist/styles/mainTheme.css";
import "./main.scss";
import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
import { initConfig } from "../../config";

const searchstax = new Searchstax();
function makeId(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
searchstax.initialize({...initConfig.jobSearchSample, sessionId: makeId(25)});

searchstax.addSearchFeedbackWidget("search-feedback-container", {
  templates: {
    main: {
      template: `
        {{#searchExecuted}}
            <div class="searchstax-feedback-container">
            <h3>{{totalResults}} Jobs found </b> {{#searchTerm}} for <b>{{searchTerm}}</b> {{/searchTerm}} </h3>
                <div class="searchstax-feedback-container-suggested">
                  {{#autoCorrectedQuery}}
                    Search instead for <a href="#" class="searchstax-feedback-original-query">{{originalQuery}}</a>
                  {{/autoCorrectedQuery}}
                </div>
            </div>
        {{/searchExecuted}}
        `,
      originalQueryClass: `searchstax-feedback-original-query`,
    },
  },
});

searchstax.addSearchInputWidget("searchstax-input-container", {
  suggestAfterMinChars: 3,
  templates: {
    mainTemplate: {
      template: `
          <input type="text" autocomplete="off" id="searchstax-search-input" class="searchstax-search-input" placeholder="Search for job posts, companies" />
        `,
      searchInputId: "searchstax-search-input",
    },
    autosuggestItemTemplate: {
      template: `
        <div class="searchstax-autosuggest-item-term-container">{{{term}}}</div>
        `,
    },
  },
});

searchstax.addFacetsWidget("searchstax-facets-container", {
  facetingType: "and",
  itemsPerPageDesktop: 3,
  itemsPerPageMobile: 99,
  templates: {
    mainTemplateDesktop: {
      template: `
      {{#hasResultsOrExternalPromotions}}
        <div class="searchstax-facets-container-desktop">
          <h3>Filters</h3>
        </div>
      {{/hasResultsOrExternalPromotions}}
      `,
      facetsContainerId: "",
    },
    mainTemplateMobile: {
      template: `
        <div class="searchstax-facets-pills-container">
          <div class="searchstax-facets-pills-selected">
          </div>
        </div>

        <div class="searchstax-facets-mobile-overlay {{#overlayOpened}} searchstax-show{{/overlayOpened}}" >
          <div class="searchstax-facets-mobile-overlay-header">
            <div class="searchstax-facets-mobile-overlay-header-title">Filter By</div>
            <div class="searchstax-search-close"></div>
          </div>
          <div class="searchstax-facets-container-mobile"></div>
          <button class="searchstax-facets-mobile-overlay-done">Done</button>
        </div>
      `,
      facetsContainerClass: `searchstax-facets-container-mobile`,
      closeOverlayTriggerClasses: [
        "searchstax-facets-mobile-overlay-done",
        "searchstax-search-close",
      ],
      filterByContainerClass: `searchstax-facets-pills-container`,
      selectedFacetsContainerClass: `searchstax-facets-pills-selected`,
    },
    showMoreButtonContainerTemplate: {
      template: `
      <div class="searchstax-facet-show-more-container">
      {{#showingAllFacets}}
        <div class="searchstax-facet-show-less-button searchstax-facet-show-button">less</div>
      {{/showingAllFacets}}
      {{^showingAllFacets}}
        <div class="searchstax-facet-show-more-button  searchstax-facet-show-button">more {{onShowMoreLessClick}}</div>
      {{/showingAllFacets}}
    </div>
      `,
      showMoreButtonClass: `searchstax-facet-show-more-container`,
    },
    facetItemContainerTemplate: {
      template: `
      <div>
        <div class="searchstax-facet-title-container">
            <div class="searchstax-facet-title">
            {{label}}
            </div>
            <div class="searchstax-facet-title-arrow active"></div>
        </div>
        <div class="searchstax-facet-values-container"></div>
      </div>
      `,
      facetListTitleContainerClass: `searchstax-facet-title-container`,
      facetListContainerClass: `searchstax-facet-values-container`,
    },
    clearFacetsTemplate: {
      template: `
      {{#shouldShow}}}
        <div class="searchstax-facets-pill searchstax-clear-filters searchstax-facets-pill-clear-all">
        <div class="searchstax-facets-pill-label">Clear Filters</div>
        </div>
      {{/shouldShow}}
      `,
      containerClass: `searchstax-facets-pill-clear-all`,
    },
    facetItemTemplate: {
      template: `
      <div class="searchstax-facet-input">
        <input type="checkbox" class="searchstax-facet-input-checkbox" {{#disabled}}disabled{{/disabled}} {{#isChecked}}checked{{/isChecked}}/>
      </div>
      <div class="searchstax-facet-value-label">{{value}}</div>
      <div class="searchstax-facet-value-count">({{count}})</div>
      `,
      inputCheckboxClass: `searchstax-facet-input-checkbox`,
      checkTriggerClasses: [
        "searchstax-facet-value-label",
        "searchstax-facet-value-count",
      ],
    },
    filterByTemplate: {
      template: `
      <div class="searchstax-facets-pill searchstax-facets-pill-filter-by">
        <div class="searchstax-facets-pill-label">Filter By</div>
      </div>
      `,
      containerClass: `searchstax-facets-pill-filter-by`,
    },
    selectedFacetsTemplate: {
      template: `
      <div class="searchstax-facets-pill searchstax-facets-pill-facets">
        <div class="searchstax-facets-pill-label">{{value}} ({{count}})</div>
        <div class="searchstax-facets-pill-icon-close"></div>
      </div>
      `,
      containerClass: `searchstax-facets-pill-facets`,
    },
  },
});

searchstax.addSearchSortingWidget("search-sorting-container", {
  templates: {
    main: {
      template: `
      {{#searchExecuted}}
        {{#hasResultsOrExternalPromotions}}
        <div class="searchstax-sorting-container">
            <label class="searchstax-sorting-label" for="sort-by">Sort By</label>
            <select id="searchstax-search-order-select" class="searchstax-search-order-select">
            {{#sortOptions}}
            <option value="{{key}}">
              {{value}}
            </option>
          {{/sortOptions}}
            </select>
        </div>
        {{/hasResultsOrExternalPromotions}}
      {{/searchExecuted}}
      `,
      selectId: `searchstax-search-order-select`,
    },
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
                  <div class="searchstax-search-result-content">
                    <div class="searchstax-search-result-title-wrapper">
                        <div class="searchstax-search-result-title-container">
                          <h2 class="searchstax-search-result-title">{{title}}</h2>
                        </div>
                    </div>
                    {{#description}}
                    <p class="searchstax-search-result-description searchstax-search-result-common">
                        {{description}}
                    </p>
                    {{/description}}

                    {{#ribbon}}
                          <span class="pill">{{ribbon}}</span>
                    {{/ribbon}}
                  </div>
                  <div class="searchstax-search-result-action">
                    <button class="btn-outline">Save For Later</button>
                    <button class="btn-primary">Apply</button>

                  </div>
              </div>
            `,
      searchResultUniqueIdAttribute: "data-searchstax-unique-result-id",
    },
    noSearchResultTemplate: {
      template: `
            <div class="searchstax-no-results">
                We're sorry, we couldn't find any results for <strong>"{{ searchTerm }}"</strong>
                <br>
                {{#spellingSuggestion}}
                    <span>&nbsp;Did you mean <a href="#" class="searchstax-suggestion-term">{{ spellingSuggestion }}</a>?</span>
                {{/spellingSuggestion}}

                <br>
                <div>
                  <p>Search Help:</p>
                  <li> Check for typos and spelling errors </li>
                  <li> User more general search terms </li>
                  <li> Use different search terms </li>
                </div>

            </div>
            `,
    },
  },
});

searchstax.addRelatedSearchesWidget("searchstax-related-searches-container", {
  relatedSearchesURL:
    initConfig.jobSearchRelatedSearchSample.relatedSearchesURL,
  relatedSearchesAPIKey:
    initConfig.jobSearchRelatedSearchSample.relatedSearchesAPIKey,
  templates: {
    main: {
      template: `
       {{#hasRelatedSearches}}
           <div class="searchstax-related-searches-container" id="searchstax-related-searches-container">
               <h3>Also search for: </h3> <span id="searchstax-related-searches"></span>
               {{#relatedSearches}}
               <span class="searchstax-related-search">

               </span>
           {{/relatedSearches}}
           </div>
       {{/hasRelatedSearches}}
       `,
      relatedSearchesContainerClass: `searchstax-related-search`,
    },
    relatedSearch: {
      template: `
       <p class="searchstax-related-search-item">
           {{ related_search }}
       </p>
       `,
      relatedSearchContainerClass: `searchstax-related-search-item`,
    },
  },
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
      nextButtonClass: "searchstax-pagination-next",
    },
  },
});
