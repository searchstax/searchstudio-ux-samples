"use client";
import "./../../node_modules/@searchstax-inc/searchstudio-ux-js/dist/styles/mainTheme.css";
import "./style.css";
import {
  SearchstaxWrapper,
  SearchstaxInputWidget,
  SearchstaxResultWidget,
  SearchstaxPaginationWidget,
  SearchstaxOverviewWidget,
  SearchstaxSortingWidget,
  SearchstaxRelatedSearchesWidget,
  SearchstaxExternalPromotionsWidget,
  SearchstaxFacetsWidget,
  SearchstaxAnswerWidget,
  //@ts-ignore
} from "@searchstax-inc/searchstudio-ux-react";

import type {
  ISearchObject,
  ISearchstaxParsedResult,
  ISearchstaxSuggestProps,
  ISearchstaxSuggestResponse,
  Searchstax,
} from "@searchstax-inc/searchstudio-ux-js";

//@ts-ignore
import { config, renderConfig } from "./../../../config.js";
import {
  noResultTemplate,
  resultsTemplate,
} from "./templates/resultsTemplates";
import {
  infiniteScrollTemplate,
  paginationTemplate,
} from "./templates/paginationTemplates";
import { searchRelatedSearchesTemplate } from "./templates/relatedSearchesTemplates";
import { searchExternalPromotionsTemplate } from "./templates/externalPromotionsTemplates";
import {
  facetsTemplateDesktop,
  facetsTemplateMobile,
} from "./templates/facetTemplates";
import { searchSortingTemplate } from "./templates/sorting.templates";
import { searchOverviewTemplate } from "./templates/searchOverviewTemplates";
import { InputTemplate } from "./templates/inputTemplates";
import { answerTemplate } from "./templates/answerTemplates";
import { useState } from "react";
// @ts-ignore
function searchstaxEmailOverride() {
  return "";
}
const feedbackConfig = {
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
}

function beforeSearch(props: ISearchObject) {
  const propsCopy = { ...props };
  return propsCopy;
}

function afterSearch(results: ISearchstaxParsedResult[]) {
  const copy = [...results];
  return copy;
}

function afterAutosuggest(result: ISearchstaxSuggestResponse) {
  const copy = { ...result };
  return copy;
}
function beforeAutosuggest(props: ISearchstaxSuggestProps) {
  // gets suggestProps, if passed along further autosuggest will execute, if null then event gets canceled
  // props can be modified and passed along
  const propsCopy = { ...props };
  return propsCopy;
}
function afterLinkClick(result: ISearchstaxParsedResult) {
  // gets result that was clicked, if passed along further functions will execute, if null then event gets canceled
  const resultCopy = { ...result };

  return resultCopy;
}

const renderConfTyped = renderConfig as any;
const confTyped = config as any;

export default function Home() {
  const [searchstaxInstance, setSearchstaxInstance] = useState(
    // eslint-disable-line
    null as null | Searchstax
  );
  let feedbackModule: any = null;

  function initialized(searchstax: Searchstax) {
    //@ts-ignore
    import(/* webpackIgnore: true */ "https://static.searchstax.com/studio-js/v4/js/feedbackWidget.mjs").then((module) => {
      feedbackModule = module.default;
      setTimeout(() => {
        //@ts-ignore
        new feedbackModule({
          analyticsKey: config.trackApiKey,
          model: config.model,
          containerId: "searchstax-feedback-container",
          lightweight: false,
        });
      }, 300);
    });

    setSearchstaxInstance(searchstax);
  }
  return (
    <>
      <main>
        <h1 style={{ display: "none" }} className="searchstax-main-page-title">
          Searchstax Search Page
        </h1>
        <SearchstaxWrapper
          searchURL={confTyped.searchURL}
          suggesterURL={confTyped.suggesterURL}
          trackApiKey={confTyped.trackApiKey}
          searchAuth={confTyped.searchAuth}
          initialized={initialized}
          beforeSearch={beforeSearch}
          afterSearch={afterSearch}
          authType={confTyped.authType as "token" | "basic" | undefined} // eslint-disable-line
          analyticsBaseUrl={confTyped.analyticsBaseUrl}
          router={{ enabled: true }}
          questionURL={config.questionURL}
          language={confTyped.language}
          model={confTyped.model}
        >
          <div className="searchstax-page-layout-container">
            <div id="searchstax-feedback-container"></div>
            <SearchstaxInputWidget
              inputTemplate={InputTemplate}
              suggestAfterMinChars={
                renderConfTyped.inputWidget.suggestAfterMinChars
              }
              afterAutosuggest={afterAutosuggest}
              beforeAutosuggest={beforeAutosuggest}
            ></SearchstaxInputWidget>

            <SearchstaxAnswerWidget
              searchAnswerTemplate={answerTemplate}
              showShowMoreAfterWordCount={100}
              feedbackwidget={feedbackConfig}
            ></SearchstaxAnswerWidget>

            <div className="search-details-container">
              <SearchstaxOverviewWidget
                searchOverviewTemplate={searchOverviewTemplate}
              ></SearchstaxOverviewWidget>
              <SearchstaxSortingWidget
                searchSortingTemplate={searchSortingTemplate}
              ></SearchstaxSortingWidget>
            </div>

            <div className="searchstax-page-layout-facet-result-container">
              <div className="searchstax-page-layout-facet-container">
                <SearchstaxFacetsWidget
                  facetingType={renderConfTyped.facetsWidget.facetingType} // eslint-disable-line
                  itemsPerPageDesktop={
                    renderConfTyped.facetsWidget.itemsPerPageDesktop
                  }
                  itemsPerPageMobile={
                    renderConfTyped.facetsWidget.itemsPerPageMobile
                  }
                  specificFacets={undefined}
                  facetsTemplateDesktop={facetsTemplateDesktop}
                  facetsTemplateMobile={facetsTemplateMobile}
                ></SearchstaxFacetsWidget>
              </div>

              <div className="searchstax-page-layout-result-container">
                <SearchstaxExternalPromotionsWidget
                  searchExternalPromotionsTemplate={
                    searchExternalPromotionsTemplate
                  }
                ></SearchstaxExternalPromotionsWidget>
                <SearchstaxResultWidget
                  afterLinkClick={afterLinkClick}
                  renderMethod={renderConfTyped.resultsWidget.renderMethod} // eslint-disable-line
                  noResultTemplate={noResultTemplate}
                  resultsTemplate={resultsTemplate}
                ></SearchstaxResultWidget>
                <SearchstaxRelatedSearchesWidget
                  relatedSearchesURL={confTyped.relatedSearchesURL}
                  relatedSearchesAPIKey={confTyped.relatedSearchesAPIKey}
                  searchRelatedSearchesTemplate={searchRelatedSearchesTemplate}
                ></SearchstaxRelatedSearchesWidget>
                <SearchstaxPaginationWidget
                  infiniteScrollTemplate={infiniteScrollTemplate}
                  paginationTemplate={paginationTemplate}
                ></SearchstaxPaginationWidget>
              </div>
            </div>
          </div>
        </SearchstaxWrapper>
      </main>
    </>
  );
}
