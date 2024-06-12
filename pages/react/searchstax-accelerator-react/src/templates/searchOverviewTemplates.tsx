import { ISearchstaxSearchFeedbackData } from "@searchstax-inc/searchstudio-ux-js";

export function searchOverviewTemplate(
    searchFeedbackData: null | ISearchstaxSearchFeedbackData,
    onOriginalQueryClick: (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void
  ) {
    return (
      <>
        {searchFeedbackData &&
          searchFeedbackData?.searchExecuted &&
          searchFeedbackData?.totalResults > 0 && (
            <>
              Showing{" "}
              <b>
                {searchFeedbackData.startResultIndex} -{" "}
                {searchFeedbackData.endResultIndex}
              </b>{" "}
              of
              <b> {searchFeedbackData.totalResults}</b> results
              {searchFeedbackData.searchTerm && (
                <span>
                  &nbsp;for "<b>{searchFeedbackData.searchTerm}</b>"{" "}
                </span>
              )}
              <div className="searchstax-feedback-container-suggested">
                {searchFeedbackData.autoCorrectedQuery && (
                  <div>
                    {" "}
                    Search instead for{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        onOriginalQueryClick(e);
                      }}
                      className="searchstax-feedback-original-query"
                    >
                      {searchFeedbackData.originalQuery}
                    </a>
                  </div>
                )}
              </div>
            </>
          )}
      </>
    );
  }