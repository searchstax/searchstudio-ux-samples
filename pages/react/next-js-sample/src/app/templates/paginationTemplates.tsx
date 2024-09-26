import { IPaginationData } from "@searchstax-inc/searchstudio-ux-js";

export function paginationTemplate(
    paginationData: IPaginationData | null,
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    previousPage: (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => void
  ) {
    return (
      <>
        {paginationData && paginationData?.totalResults !== 0 && (
          <div className="searchstax-pagination-container">
            <div className="searchstax-pagination-content">
              <a
                className={`searchstax-pagination-previous ${paginationData.isFirstPage ? "disabled" : ""}`}
                style={
                  paginationData?.isFirstPage ? { pointerEvents: "none" } : {}
                }
                onClick={(e) => {
                  previousPage(e);
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' || e.key === ' ') {
                    previousPage(e as any);
                  }
                }}
                tabIndex={0}

                id="searchstax-pagination-previous"
              >
                {" "}
                &lt; Previous{" "}
              </a>
              <div className="searchstax-pagination-details">
                {" "}
                {paginationData?.startResultIndex} -{" "}
                {paginationData?.endResultIndex} of{" "}
                {paginationData?.totalResults}
              </div>
              <a
                className={`searchstax-pagination-next ${paginationData.isLastPage ? "disabled" : ""}`}
                tabIndex={0}
                style={
                  paginationData?.isLastPage ? { pointerEvents: "none" } : {}
                }
                onClick={(e) => {
                  nextPage(e);
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' || e.key === ' ') {
                    nextPage(e as any);
                  }
                }}
                id="searchstax-pagination-next"
              >
                Next &gt;
              </a>
            </div>
          </div>
        )}
      </>
    );
  }

  export function infiniteScrollTemplate(
    paginationData: IPaginationData | null,
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  ) {
    return (
      <>
        {paginationData &&
          paginationData.isInfiniteScroll &&
          paginationData?.totalResults !== 0 &&
          !paginationData?.isLastPage && (
            <div className="searchstax-pagination-container">
              <a
                className="searchstax-pagination-load-more"
                onClick={(e) => {
                  nextPage(e);
                }}
                onKeyDown={(e) => {
                  if(e.key === 'Enter' || e.key === ' ') {
                    nextPage(e as any);
                  }
                }}
                tabIndex={0}
              >
                Show More &gt;
              </a>
            </div>
          )}
      </>
    );
  }