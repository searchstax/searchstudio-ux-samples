import { ISearchstaxRelatedSearchResult, ISearchstaxRelatedSearchesData } from "@searchstax-inc/searchstudio-ux-js";

export function searchRelatedSearchesTemplate(
    relatedData: null | ISearchstaxRelatedSearchesData,
    executeSearch: (result: ISearchstaxRelatedSearchResult) => void
  ) {
    return (
      <>
        {relatedData &&
          relatedData?.searchExecuted &&
          relatedData?.hasRelatedSearches && (
            <div
              className="searchstax-related-searches-container"
              id="searchstax-related-searches-container"
            >
              {" "}
              Related searches: <span id="searchstax-related-searches"></span>
              {relatedData.relatedSearches && (
                <span className="searchstax-related-search">
                  {relatedData.relatedSearches.map((related) => (
                    <span
                      key={related.related_search}
                      onClick={() => {
                        executeSearch(related);
                      }}
                      onKeyDown={(e) => {
                        if(e.key === 'Enter' || e.key === ' ') {
                          executeSearch(related);
                        }
                      }}
                      tabIndex={0}
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