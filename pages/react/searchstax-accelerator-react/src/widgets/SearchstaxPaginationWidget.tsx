import { SearchstaxPaginationWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    IPaginationData
} from "@searchstax-inc/searchstudio-ux-js";

function paginationTemplate(
    paginationData: IPaginationData | null,
    nextPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void,
    previousPage: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
  ) {
    return (
      <>
        {paginationData && paginationData?.totalResults !== 0 && (
          <div className="searchstax-pagination-container">
            <div className="searchstax-pagination-content">
              <a
                className="searchstax-pagination-previous"
                style={paginationData?.isFirstPage ? { pointerEvents: "none" } : {}}
                onClick={(e) => {
                  previousPage(e);
                }}
                id="searchstax-pagination-previous"
              >
                {" "}
                &lt; Previous{" "}
              </a>
              <div className="searchstax-pagination-details">
                {" "}
                {paginationData?.startResultIndex} - {paginationData?.endResultIndex} of {paginationData?.totalResults}
              </div>
              <a
                className="searchstax-pagination-next"
                style={paginationData?.isLastPage ? { pointerEvents: "none" } : {}}
                onClick={(e) => {
                  nextPage(e);
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

  const PaginationWidget: React.FC = () => {
    return (
        <SearchstaxPaginationWidget paginationTemplate={paginationTemplate}></SearchstaxPaginationWidget>
    );
  };
  
  export default PaginationWidget;

