import { SearchstaxRelatedSearchesWidget } from "@searchstax-inc/searchstudio-ux-react";
//@ts-ignore
import { config } from '../../../config.js';

import type {
    ISearchstaxRelatedSearchesData,
    ISearchstaxRelatedSearchResult
} from "@searchstax-inc/searchstudio-ux-js";

function searchRelatedSearchesTemplate(
    relatedData: null | ISearchstaxRelatedSearchesData,
    executeSearch: (result: ISearchstaxRelatedSearchResult) => void
  ) {
    return (
      <>
        {relatedData && relatedData?.searchExecuted && relatedData?.hasRelatedSearches && (
          <div className="searchstax-related-searches-container" id="searchstax-related-searches-container">
            {" "}
            <h1>Related searches:</h1> <span id="searchstax-related-searches"></span>
            {relatedData.relatedSearches && (
              <span className="searchstax-related-search">
                {relatedData.relatedSearches.map((related) => (
                  <span
                    key={related.related_search}
                    onClick={() => {
                      executeSearch(related);
                    }}
                    className="searchstax-related-search searchstax-related-search-item"
                  >
                    {" "}
                    {related.related_search}
                    {!related.last && <span>,</span>}
                  </span>
                ))}
              </span>
            )}
          </div>
        )}
      </>
    );
  }


  const RelatedSearchesWidget: React.FC = () => {
    return (
        <SearchstaxRelatedSearchesWidget
            relatedSearchesURL={config.relatedSearchesURL}
            relatedSearchesAPIKey={config.relatedSearchesAPIKey}
            searchRelatedSearchesTemplate={searchRelatedSearchesTemplate}
        ></SearchstaxRelatedSearchesWidget>
    );
  };
  
  export default RelatedSearchesWidget;

