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

  searchstax.addFacetsWidget("searchstax-facets-container", {
    facetingType: "and", // Available Options": "and" | "or" | "showUnavailable" | "tabs";
    itemsPerPageDesktop: 4,
    itemsPerPageMobile: 99,
    templates: {
        mainTemplateDesktop: {
            template: `
      {{#hasResultsOrExternalPromotions}}
        <div class="searchstax-facets-container-desktop"></div>
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
            closeOverlayTriggerClasses: ["searchstax-facets-mobile-overlay-done","searchstax-search-close",],
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
        <div class="searchstax-facet-values-container" aria-live="polite"></div>
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
            checkTriggerClasses: ["searchstax-facet-value-label","searchstax-facet-value-count",],
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