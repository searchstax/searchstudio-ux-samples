import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
// @ts-ignore
import { initConfig, renderConfig } from "./../../config.js";

const searchstax = new Searchstax();

function makeId(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function searchstaxEmailOverride() {
  return "";
}

searchstax.initialize({
  ...initConfig.acceleratorSample,
  sessionId: makeId(25),
  hooks: {
    beforeSearch: (props) => {
      const propsCopy = { ...props };
      return propsCopy;
    },
    afterSearch: (results) => {
      const copy = [...results];
      return copy;
    },
  },
});
searchstax.addAnswerWidget("searchstax-answer-container", {
  showShowMoreAfterWordCount: 100,
  templates: {
    main: {
      template: `
        {{#shouldShowAnswer}}
        <div class="searchstax-answer-wrap">
        <div class="searchstax-answer-icon"></div>
            <div>
                <div class="searchstax-answer-container {{#showMoreButtonVisible}}searchstax-answer-show-more{{/showMoreButtonVisible}}">
                    <div class="searchstax-answer-title">Smart Answers</div>
                    {{#shouldShowAnswerError}}
                        <div class="searchstax-answer-error">{{{answerErrorMessage}}}</div>
                    {{/shouldShowAnswerError}}
                    <div class="searchstax-answer-description">
                        {{{fullAnswerFormatted}}}
                        {{^showMoreButtonVisible}}
                          {{#answerLoading}}
                              <div class="searchstax-answer-loading"></div>
                          {{/answerLoading}}
                        {{/showMoreButtonVisible}}
                    </div>

                </div>

                {{#showMoreButtonVisible}}
                    <div class="searchstax-answer-load-more-button-container">
                        {{#answerLoading}}
                            <div class="searchstax-answer-loading"></div>
                        {{/answerLoading}}
                        <button class="searchstax-answer-load-more-button">Read More</button>
                    </div>
                {{/showMoreButtonVisible}}
            </div>
            <div class="searchstax-answer-footer">
                <div id="feedbackWidgetContainer"></div>
                <div class="searchstax-lightweight-widget-separator-inline"></div>
                <p class="searchstax-disclaimer">Generative AI is Experimental</p>
            </div>
            </div>
        {{/shouldShowAnswer}}
        `,
    },
  },
  feedbackwidget: {
    renderFeedbackWidget: true,
    emailOverride: searchstaxEmailOverride,
    thumbsUpValue: 10,
    thumbsDownValue: 0,
    lightweightTemplateOverride: `
     <div class="searchstax-lightweight-widget-container">
     <div class="searchstax-lightweight-widget-thumbs-up {{#thumbsUpActive}}active{{/thumbsUpActive}}">
     <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.85079 7.59996L7.83141 1C8.4243 1 8.9929 1.23178 9.41213 1.64436C9.83136 2.05694 10.0669 2.61651 10.0669 3.19999V6.1333H14.2845C14.5005 6.13089 14.7145 6.17474 14.9116 6.26179C15.1087 6.34885 15.2842 6.47704 15.426 6.63747C15.5677 6.79791 15.6723 6.98676 15.7326 7.19094C15.7928 7.39513 15.8072 7.60975 15.7748 7.81996L14.7465 14.4199C14.6926 14.7696 14.5121 15.0884 14.2382 15.3175C13.9643 15.5466 13.6156 15.6706 13.2562 15.6666H4.85079M4.85079 7.59996V15.6666M4.85079 7.59996H2.61531C2.22006 7.59996 1.84099 7.75448 1.5615 8.02953C1.28201 8.30458 1.125 8.67763 1.125 9.06661V14.1999C1.125 14.5889 1.28201 14.9619 1.5615 15.237C1.84099 15.512 2.22006 15.6666 2.61531 15.6666H4.85079"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
</div>
     <div class="searchstax-lightweight-widget-separator"></div>
     <div class="searchstax-lightweight-widget-thumbs-down {{#thumbsDownActive}}active{{/thumbsDownActive}}">
      <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.1492 9.06801L9.16859 15.668C8.5757 15.668 8.0071 15.4362 7.58787 15.0236C7.16864 14.611 6.93311 14.0515 6.93311 13.468V10.5347H2.71552C2.4995 10.5371 2.28552 10.4932 2.08842 10.4062C1.89132 10.3191 1.71581 10.1909 1.57405 10.0305C1.43229 9.87006 1.32766 9.6812 1.26743 9.47702C1.2072 9.27284 1.19279 9.05822 1.22521 8.84801L2.25353 2.24806C2.30742 1.89833 2.48793 1.57955 2.76179 1.35046C3.03566 1.12136 3.38443 0.997398 3.74384 1.0014H12.1492M12.1492 9.06801V1.0014M12.1492 9.06801H14.3847C14.7799 9.06801 15.159 8.91349 15.4385 8.63844C15.718 8.36339 15.875 7.99034 15.875 7.60135V2.46805C15.875 2.07907 15.718 1.70602 15.4385 1.43097C15.159 1.15592 14.7799 1.0014 14.3847 1.0014H12.1492"  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

     </div>
     </div>
      `,
  },
});
searchstax.addSearchFeedbackWidget("search-feedback-container", {
  templates: {
    main: {
      template: `
          {{#searchExecuted}}
          <a href="#searchstax-search-results" class="searchstax-skip">Skip to results section</a>

          <h2 class="searchstax-feedback-container" aria-live="polite">
            {{#hasResults}}
            <span aria-live="polite">Showing <b>{{startResultIndex}} - {{endResultIndex}}</b> </span> of <b>{{totalResults}}</b> results {{#searchTerm}} for "<b>{{searchTerm}}</b>" {{/searchTerm}}
                <div class="searchstax-feedback-container-suggested">
                  {{#autoCorrectedQuery}}
                    Search instead for <a href="#" aria-label="Search instead for: {{originalQuery}}" class="searchstax-feedback-original-query">{{originalQuery}}</a>
                  {{/autoCorrectedQuery}}
                </div>
              {{/hasResults}}
          </h2>
      {{/searchExecuted}}
        `,
      originalQueryClass: `searchstax-feedback-original-query`,
    },
  },
});

searchstax.addSearchInputWidget("searchstax-input-container", {
  suggestAfterMinChars: renderConfig.inputWidget.suggestAfterMinChars,
  templates: {
    mainTemplate: {
      template: `
      <div class="searchstax-search-input-container searchstax-search-input-container-new {{#locationEnabled}}searchstax-alternative-render{{/locationEnabled}}">
          <div class="searchstax-search-input-wrapper">
            <input type="text" id="searchstax-search-input" class="searchstax-search-input" placeholder="SEARCH FOR..." aria-label="Search" />
          </div>
          <div id="searchstax-location-container" class="searchstax-location-container"></div>
          <button class="searchstax-spinner-icon" id="searchstax-search-input-action-button" aria-label="search" role="button"></button>
        </div>
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

searchstax.addSearchLocationWidget("searchstax-location-container", {
  templates:{
    mainTemplate: {
      template:
`
      <div class="searchstax-location-input-container" data-test-id="searchstax-location-input-container">
            <div class="searchstax-location-input-wrapper">
                <span class="searchstax-location-input-label">NEAR</span>
                <input type="text" id="searchstax-location-input" class="searchstax-location-input" placeholder="Zip, Postal Code or City..." aria-label="Search Location Input" data-test-id="searchstax-location-input" />
                {{#shouldShowLocationDistanceDropdown}}
                  <span class="searchstax-location-input-label">WITHIN</span>
                  <select id="searchstax-location-radius-select" class="searchstax-location-radius-select" aria-label="Search Location Radius Select" data-test-id="searchstax-location-radius-select">
                    {{#locationSearchDistanceValues}}
                      <option value="{{value}}" {{#isSelected}}selected{{/isSelected}}>{{label}}</option>
                    {{/locationSearchDistanceValues}}
                  </select>
                {{/shouldShowLocationDistanceDropdown}}
            </div>
        </div>
      `,
      locationInputId: "searchstax-location-input",
      radiusInputId: "searchstax-location-radius-select"
    },
  },
  hooks: {
    locationDecode: (term) => {
        return new Promise((resolve) => {
          // make a request to google geocoding API to retrieve lat, lon and address

          const geocodingAPIKey = "AIzaSyDK5wQQaz7kmP60_DViAto5rTQ301eVBFs";
          const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            term
          )}&key=${geocodingAPIKey}`;
          fetch(geocodingURL)
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "OK" && data.results.length > 0) {
                const result = data.results[0];
                const location = {
                  lat: result.geometry.location.lat,
                  lon: result.geometry.location.lng,
                  address: result.formatted_address,
                };
                resolve(location);
              } else {
                resolve({
                  address: undefined,
                  lat: undefined,
                  lon: undefined,
                  error: true
                });
              }
            })
            .catch(() => {
              resolve({
                address: undefined,
                lat: undefined,
                lon: undefined,
                error: true
              });
            });
        });
    },
  },
});

searchstax.addFacetsWidget("searchstax-facets-container", {
  facetingType: renderConfig.facetsWidget.facetingType,
  itemsPerPageDesktop: renderConfig.facetsWidget.itemsPerPageDesktop,
  itemsPerPageMobile: renderConfig.facetsWidget.itemsPerPageMobile,
  templates: {
    mainTemplateDesktop: {
      template: `
      {{#hasResultsOrExternalPromotions}}
        <div class="searchstax-facets-container-desktop"></div>
      {{/hasResultsOrExternalPromotions}}
      `,
      facetsContainerClass: `searchstax-facets-container-desktop`,
      selectedFacetsContainerClass: `searchstax-facets-pills-selected`,
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
            <div class="searchstax-search-close" tabindex="0" aria-label="close overlay" role="button"></div>
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
        <div class="searchstax-facet-show-less-button searchstax-facet-show-button" tabindex="0" role="button">less</div>
      {{/showingAllFacets}}
      {{^showingAllFacets}}
        <div class="searchstax-facet-show-more-button  searchstax-facet-show-button" tabindex="0" role="button">more {{onShowMoreLessClick}}</div>
      {{/showingAllFacets}}
    </div>
      `,
      showMoreButtonClass: `searchstax-facet-show-more-container`,
    },
    facetItemContainerTemplate: {
      template: `
      <div>
        <div class="searchstax-facet-title-container">
            <div class="searchstax-facet-title" aria-label="Facet group: {{label}}" tabindex="0">
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
        <div class="searchstax-facets-pill searchstax-clear-filters searchstax-facets-pill-clear-all" tabindex="0" role="button">
        <div class="searchstax-facets-pill-label" >Clear Filters</div>
        </div>
      {{/shouldShow}}
      `,
      containerClass: `searchstax-facets-pill-clear-all`,
    },
    facetItemTemplate: {
      template: `
      <div class="searchstax-facet-input">
        <input type="checkbox" class="searchstax-facet-input-checkbox" {{#disabled}}disabled{{/disabled}} {{#isChecked}}checked{{/isChecked}} aria-label="{{value}} {{count}}" tabindex="0"/>
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
      <div class="searchstax-facets-pill searchstax-facets-pill-filter-by" tabindex="0" role="button">
        <div class="searchstax-facets-pill-label">Filter By</div>
      </div>
      `,
      containerClass: `searchstax-facets-pill-filter-by`,
    },
    selectedFacetsTemplate: {
      template: `
      <div class="searchstax-facets-pill searchstax-facets-pill-facets" tabindex="0" role="button">
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
              <label class="searchstax-sorting-label" for="searchstax-search-order-select">Sort By</label>
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
      selectId: "searchstax-search-order-select",
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
      searchResultsContainerId: `searchstax-search-results`,
    },
    searchResultTemplate: {
      template: `
      <a href="{{url}}" data-searchstax-unique-result-id="{{uniqueId}}" class="searchstax-result-item-link searchstax-result-item-link-wrapping" tabindex="0">
      <div class="searchstax-search-result searchstax-search-result-wrapping {{#thumbnail}} has-thumbnail {{/thumbnail}}">
          {{#promoted}}
              <div class="searchstax-search-result-promoted"></div>
          {{/promoted}}

          {{#ribbon}}
              <div class="searchstax-search-result-ribbon">
              {{{ribbon}}}
              </div>
          {{/ribbon}}

          {{#thumbnail}}
              <img alt="" src="{{thumbnail}}" alt="image" class="searchstax-thumbnail">
          {{/thumbnail}}
          <div class="searchstax-search-result-title-container">
              <h3 class="searchstax-search-result-title">{{{title}}}</h3>
          </div>

          {{#paths}}
              <p class="searchstax-search-result-common">
                  {{{paths}}}
              </p>
          {{/paths}}

          {{#description}}
              <p class="searchstax-search-result-description searchstax-search-result-common">
                  {{{description}}}
              </p>
          {{/description}}

          {{#unmappedFields}}
              {{#isImage}}
                  <div class="searchstax-search-result-image-container">
                  <img alt="" src="{{value}}" alt="image" class="searchstax-result-image">
                  </div>
              {{/isImage}}
              {{^isImage}}
                  <p class="searchstax-search-result-common">
                  {{{value}}}
                  </p>
              {{/isImage}}
          {{/unmappedFields}}
          {{#distance}}
            <p class="searchstax-search-result-distance searchstax-search-result-common" data-test-id="searchstax-search-result-distance">
                {{distance}} {{unit}}
            </p>
        {{/distance}}
          </div>
          </a>
              `,
      searchResultUniqueIdAttribute: `data-searchstax-unique-result-id`,
    },
    noSearchResultTemplate: {
      template: `
            {{#searchExecuted}}
              <div class="searchstax-no-results-wrap">
                <div class="searchstax-no-results">
                    Showing <strong>no results</strong> for <strong>"{{ searchTerm }}"</strong>
                    <br>
                    {{#spellingSuggestion}}
                        <span>&nbsp;Did you mean <a href="#" aria-label="Did you mean: {{originalQuery}}" class="searchstax-suggestion-term" onclick="searchCallback('{{ spellingSuggestion }}')">{{ spellingSuggestion }}</a>?</span>
                    {{/spellingSuggestion}}
                </div>
                <ul class="searchstax-no-results-list">
                    <li>Try searching for search related terms or topics. We offer a wide variety of content to help you get the information you need.</li>
                    <li>Lost? Click on the ‘X” in the Search Box to reset your search.</li>
                </ul>
              </div>
            {{/searchExecuted}}
              `,
    },
  },
  renderMethod: renderConfig.resultsWidget.renderMethod,
});

searchstax.addPaginationWidget("searchstax-pagination-container", {
  templates: {
    mainTemplate: {
      template: `
        {{#results.length}}
          <div class="searchstax-pagination-container">
            <div class="searchstax-pagination-content">
              <a class="searchstax-pagination-previous {{#isFirstPage}}disabled{{/isFirstPage}}" id="searchstax-pagination-previous" tabindex="0" aria-label="previous page">< Previous</a>
              <div class="searchstax-pagination-details">
                {{startResultIndex}} - {{endResultIndex}} of {{totalResults}}
              </div>
                <a class="searchstax-pagination-next {{#isLastPage}}disabled{{/isLastPage}}" id="searchstax-pagination-next" tabindex="0" aria-label="next page">Next ></a>
            </div>
          </div>
        {{/results.length}}
        `,
      nextButtonClass: `searchstax-pagination-next`,
      previousButtonClass: `searchstax-pagination-previous`,
    },
    infiniteScrollTemplate: {
      template: `
        {{#results.length}}
          {{^isLastPage}}
            <a class="searchstax-pagination-load-more" tabindex="0">Show More</a>
          {{/isLastPage}}
        {{/results.length}}
        `,
      loadMoreButtonClass: `searchstax-pagination-load-more`,
    },
  },
});

searchstax.addRelatedSearchesWidget("searchstax-related-searches-container", {
  relatedSearchesURL:
    initConfig.acceleratorRelatedSearchSample.relatedSearchesURL,
  relatedSearchesAPIKey:
    initConfig.acceleratorRelatedSearchSample.relatedSearchesAPIKey,
  templates: {
    main: {
      template: `
          {{#hasRelatedSearches}}
              <div class="searchstax-related-searches-container" id="searchstax-related-searches-container">
                  Related searches: <span id="searchstax-related-searches"></span>
                  {{#relatedSearches}}
                    <span class="searchstax-related-search"></span>
                  {{/relatedSearches}}
              </div>
          {{/hasRelatedSearches}}
          `,
      relatedSearchesContainerClass: "searchstax-related-search",
    },
    relatedSearch: {
      template: `
          <span class="searchstax-related-search searchstax-related-search-item" aria-label="Related search: {{related_search}}" tabindex="0" role="button">
              {{ related_search }}{{^last}}<span>,</span>{{/last}}
          </span>
          `,
      relatedSearchContainerClass: "searchstax-related-search-item",
    },
  },
});

searchstax.addExternalPromotionsWidget(
  "searchstax-external-promotions-layout-container",
  {
    templates: {
      mainTemplate: {
        template: `
        {{#hasExternalPromotions}}
            <div class="searchstax-external-promotions-container" id="searchstax-external-promotions-container">
                 External promotions go here
            </div>
        {{/hasExternalPromotions}}
    `,
        externalPromotionsContainerId:
          "searchstax-external-promotions-container",
      },
      externalPromotion: {
        template: `
        <div class="searchstax-external-promotion searchstax-search-result">
            <div class="icon-elevated"></div>
            {{#url}}
            <a href="{{url}}" class="searchstax-result-item-link"></a>
            {{/url}}
            <div class="searchstax-search-result-title-container">
                <span class="searchstax-search-result-title">{{name}}</span>
            </div>
            {{#description}}
            <p class="searchstax-search-result-description searchstax-search-result-common">
            {{description}}
            </p>
            {{/description}}
            {{#url}}
            <p class="searchstax-search-result-description searchstax-search-result-common">
            {{url}}
            </p>
            {{/url}}
        </div>
        `,
      },
    },
  }
);

document.addEventListener("click", function (event) {
  // @ts-ignore
  if (event.target.classList.contains("searchstax-related-search-item")) {
    scrollToTop();
  }
});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
