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
searchstax.initialize( initConfig.acceleratorSample );


// Add Widgets

// 1. Input Widget
searchstax.addSearchInputWidget("searchstax-input-container", {
    suggestAfterMinChars: 3,
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
    resultsPerPage: 9,
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

