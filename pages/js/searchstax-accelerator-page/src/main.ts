import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
// @ts-ignore
import { initConfig, renderConfig } from "./../../config.js";
//@ts-ignore
import SearchstaxFeedbackWidget from "https://static-staging.searchstax.co/studio-js/v4/js/feedbackWidget.mjs";

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
  return "testEmailOverride@gmail.com";
}

function searchstaxFeedbackTextAreaOverride() {
  if (!searchstax) {
    return "";
  } else {
    return (
      (searchstax.dataLayer.searchObject.query === "undefined"
        ? ""
        : searchstax.dataLayer.searchObject.query) +
      " " +
      searchstax.dataLayer.parsedData.getAnswerData
    );
  }
}

function initializeWidget() {
  // get the container element
  const container = document.getElementById("feedbackWidgetContainer");
  if (container) {
    new SearchstaxFeedbackWidget({
      analyticsKey: initConfig.acceleratorSample.trackApiKey,
      containerId: "feedbackWidgetContainer",
      lightweight: true,
      emailOverride: searchstaxEmailOverride,
      feedbackTextAreaOverride: searchstaxFeedbackTextAreaOverride,
      thumbsUpValue: 10,
      thumbsDownValue: 1,
    });
  }
}


searchstax.initialize({
  ...initConfig.acceleratorSample,
  sessionId: makeId(25),
});
searchstax.addAnswerWidget("searchstax-answer-container", {
  showShowMoreAfterWordCount: 100,
  templates: {
    main: {
      template: `
    {{#shouldShowAnswer}}
      <div>
        <div class="searchstax-answer-container {{#showMoreButtonVisible}}searchstax-answer-show-more{{/showMoreButtonVisible}}">
          <div class="searchstax-answer-title">Answer</div>
          <div class="searchstax-answer-description">
            {{#showMoreButtonVisible}}
              {{answerTruncated}}
            {{/showMoreButtonVisible}}
            {{^showMoreButtonVisible}}
              {{answer}}
            {{/showMoreButtonVisible}}

            {{#answerLoading}}
               <div class="searchstax-answer-loading"></div>
            {{/answerLoading}}
          </div>
          <div id="feedbackWidgetContainer"></div>
        </div>


        {{#showMoreButtonVisible}}
          <div class="searchstax-answer-load-more-button-container">
            <button class="searchstax-answer-load-more-button">Show More...</button>
          </div>
        {{/showMoreButtonVisible}}
      </div>
    {{/shouldShowAnswer}}
        `,
    },
  },
});
searchstax.dataLayer.$answer.subscribe((data) => {
  if (data) {
    setTimeout(() => {
      initializeWidget();
    }, 300);
  }
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
      <div class="searchstax-search-input-container">
        <div class="searchstax-search-input-wrapper">
          <input type="text" id="searchstax-search-input" class="searchstax-search-input" placeholder="SEARCH FOR..." aria-label="Search" />
          <button class="searchstax-spinner-icon" id="searchstax-search-input-action-button" aria-label="search" role="button"></button>
        </div>
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
