// Import SearchStax UX JS
import { Searchstax } from '@searchstax-inc/searchstudio-ux-js';

// Config required with Endpoints and API Keys
import { initConfig } from './config';

// Widgets Import
import { searchInput } from './templates/searchInput';
import { facetsTemplate, facetItemTemplate, facetItemContainerTemplate } from './templates/facets';
import { searchFeedback } from './templates/searchFeedback';
import { searchResultsTemplate, noSearchResultsTemplate } from './templates/results'
// Styling Imports
import '@searchstax-inc/searchstudio-ux-js/dist/styles/mainTheme.css'
import './main.scss'

// Initialize SearchStax with config
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

searchstax.initialize( {...initConfig.acceleratorSample, sessionId: makeId(25)} );


// Add Widgets

// 1. Input Widget
searchstax.addSearchInputWidget("searchstax-input-container", {

    templates: {
    mainTemplate: {
        template: searchInput,
        searchInputId: "searchstax-search-input"
    },
    },
  });

// 2. Facets Widget
searchstax.addFacetsWidget("searchstax-facets-container", {
    facetingType: "tabs", // and, or,
    itemsPerPageDesktop: 99999,
    itemsPerPageMobile: 99,
    templates: {
        mainTemplateDesktop: {
            template: facetsTemplate,
        },
        facetItemTemplate: facetItemTemplate,
        facetItemContainerTemplate: facetItemContainerTemplate
    },

});

searchstax.addFacetsWidget("searchstax-facets-container2", {
  facetingType: "or",
  specificFacets: ["content_type"],
  itemsPerPageDesktop: 99999,
  itemsPerPageMobile: 99,
  templates: {
    mainTemplateDesktop: {
      template: `
      {{#hasResultsOrExternalPromotions}}
        OR
        <br />
        <br />
        <div class="searchstax-facets-container-desktop"></div>
      {{/hasResultsOrExternalPromotions}}
      `,
      facetsContainerClass: `searchstax-facets-container-desktop`,
      selectedFacetsContainerClass: `searchstax-facets-pills-selected`,
    },
    facetItemContainerTemplate: {
      template: `
      <div>
        <div class="searchstax-facet-title-container2">
            <div class="searchstax-facet-title" aria-label="Facet group: {{label}}" tabindex="0" role="button">
            {{label}}
            </div>
            <div class="searchstax-facet-title-arrow active"></div>
        </div>
        <div class="searchstax-facet-values-container searchstax-facet-values-container2"></div>
      </div>
      `,
      facetListTitleContainerClass: `searchstax-facet-title-container`,
      facetListTitleContainerInner: `searchstax-facet-title`,
      facetListContainerClass: `searchstax-facet-values-container`,
    },
  }
});

// 3. Search Feedback Widget
searchstax.addSearchFeedbackWidget("search-feedback-container", {
    templates: {
      main: {
         template: searchFeedback,
          originalQueryClass: `searchstax-feedback-original-query`
      }
    },
  });

  // Search Results Widget
  searchstax.addSearchResultsWidget("searchstax-results-container", {
    renderMethod: "infiniteScroll",
    templates: {
      mainTemplate: {
      template: `
            <section aria-label="search results container" tabindex="0">
            <div class="searchstax-search-results-container" id="searchstax-search-results-container">
                <div class="searchstax-search-results" id="searchstax-search-results"></div>
            </div>
            </section>
            `,
        searchResultsContainerId: "searchstax-search-results",
      },
      searchResultTemplate: {
        template: searchResultsTemplate,
        searchResultUniqueIdAttribute: "data-searchstax-unique-result-id"
      },
      noSearchResultTemplate: {
        template: noSearchResultsTemplate
      }
    },

  });

// 4. Pagination Widget
searchstax.addPaginationWidget("searchstax-pagination-container", {
    templates: {
        infiniteScrollTemplate: {
            template: `
                {{#results.length}}
                    <div class="searchstax-pagination-container">
                      <div class="searchstax-pagination-content">
                        Showing  {{endResultIndex}} of {{totalResults}} results
                        <a class="searchstax-pagination-next {{#isLastPage}}disabled{{/isLastPage}}" id="searchstax-pagination-next">Show more</a>
                      </div>
                    </div>
                {{/results.length}}

                `,
            loadMoreButtonClass: "searchstax-pagination-load-more"
        }
    },
  });

  //After we get the facet values, process them to add a "All" value
  searchstax.dataLayer.$facetsTemplateData.subscribe((facets) => {
    // console.log(`Facets: ${facets}`);
    if(facets) {
      let data = facets.facets[0].values;
      let sum = data.reduce((acc, item) => acc + item.count, 0);
      // form a similar object as the data with sum as the count and value as 'All'
      let allObj = {
          count: sum,
          value: 'All',
          parentName: 'content_type',
          type: 'checkbox',
      };
      //push the all object to the front of data
      data.unshift(allObj);

      // replace facets with the new data
      facets.facets[0].values = data;
    }
    // console.log(data);
  });

