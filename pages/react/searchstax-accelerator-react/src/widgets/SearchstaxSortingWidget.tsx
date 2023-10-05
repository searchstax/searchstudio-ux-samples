import { SearchstaxSortingWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    ISearchstaxSearchSortingData
} from "@searchstax-inc/searchstudio-ux-js";

function searchSortingTemplate(
    sortingData: null | ISearchstaxSearchSortingData,
    orderChange: (value: string) => void,
    selectedSorting: string
  ) {
    return (
      <>
        {sortingData && sortingData?.searchExecuted && sortingData?.hasResultsOrExternalPromotions && (
          <div className="searchstax-sorting-container">
            <label className="searchstax-sorting-label" htmlFor="sort-by">
              Sort By
            </label>
            <select
              id="searchstax-search-order-select"
              className="searchstax-search-order-select"
              value={selectedSorting}
              onChange={(e) => {
                orderChange(e.target.value);
              }}
            >
              <option value=""> Relevance </option>
              <option value="date desc"> Newest Content </option>
              <option value="date asc"> Oldest Content </option>
            </select>
          </div>
        )}
      </>
    );
  }


  const SortingWidget: React.FC = () => {
    return (
        <SearchstaxSortingWidget searchSortingTemplate={searchSortingTemplate}></SearchstaxSortingWidget>
    );
  };
  
  export default SortingWidget;

