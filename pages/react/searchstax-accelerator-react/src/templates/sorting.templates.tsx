import { ISearchstaxSearchSortingData } from "@searchstax-inc/searchstudio-ux-js";

export function searchSortingTemplate(
    sortingData: null | ISearchstaxSearchSortingData,
    orderChange: (value: string) => void,
    selectedSorting: string
  ) {
    return (
      <>
        {sortingData &&
          sortingData?.searchExecuted &&
          sortingData?.hasResultsOrExternalPromotions && (
            <div className="searchstax-sorting-container">
              <label className="searchstax-sorting-label" htmlFor="searchstax-search-order-select">
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
                {sortingData.sortOptions.map(function (sortOption) {
                  return (
                    <option key={sortOption.key} value={sortOption.key}>
                      {sortOption.value}
                    </option>
                  );
                })}
              </select>
            </div>
          )}
      </>
    );
  }