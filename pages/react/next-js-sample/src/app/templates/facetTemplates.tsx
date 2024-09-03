import {
  IFacetData,
  IFacetValue,
  IFacetValueData,
  IFacetsTemplateData,
} from "@searchstax-inc/searchstudio-ux-js";
import { createRef } from "react";

export function facetsTemplateDesktop(
  facetsTemplateDataDesktop: IFacetsTemplateData | null,
  facetContainers: {
    [key: string]: React.LegacyRef<HTMLDivElement> | undefined;
  },
  isNotDeactivated: (name: string) => boolean,
  toggleFacetGroup: (name: string) => void,
  selectFacet: (
    index: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: IFacetValueData,
    isInput: boolean
  ) => void,
  isChecked: (facetValue: IFacetValueData) => boolean | undefined,
  showMoreLessDesktop: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: IFacetData
  ) => void
) {
  return (
    <div className="searchstax-facets-container-desktop">
      {facetsTemplateDataDesktop?.facets.map((facet) => {
        return (
          <div
            className={`searchstax-facet-container ${
              isNotDeactivated(facet.name) ? "active" : ""
            }`}
            key={facet.name + "desktop"}
          >
            <div>
              <div
                className="searchstax-facet-title-container"
                onClick={() => {
                  toggleFacetGroup(facet.name);
                }}
              >
                <div className="searchstax-facet-title">
                  {" "}
                  {facet.label}
                </div>
                <div className="searchstax-facet-title-arrow active"></div>
              </div>
              <div className="searchstax-facet-values-container" aria-live="polite">
                {facet.values.map(
                  //@ts-ignore
                  (facetValue: IFacetValueData, key) => {
                    facetContainers[key + facet.name] = createRef();
                    return (
                      <div
                        key={facetValue.value + facetValue.parentName}
                        className={`searchstax-facet-value-container ${
                          facetValue.disabled
                            ? "searchstax-facet-value-disabled"
                            : ""
                        }`}
                        ref={facetContainers[key + facet.name]}
                      >
                        <div
                          className={
                            "searchstax-facet-input" +
                            " desktop-" +
                            key +
                            facet.name
                          }
                        >
                          <input
                            type="checkbox"
                            className="searchstax-facet-input-checkbox"
                            checked={isChecked(facetValue)}
                            readOnly={true}
                            aria-label={facetValue.value + ' ' + facetValue.count}
                            disabled={facetValue.disabled}
                            onClick={(e) => {
                              selectFacet(
                                key + facet.name,
                                e,
                                facetValue,
                                true
                              );
                            }}
                          />
                        </div>
                        <div
                          className="searchstax-facet-value-label"
                          onClick={(e) => {
                            selectFacet(key + facet.name, e, facetValue, false);
                          }}
                        >
                          {facetValue.value}
                        </div>
                        <div
                          className="searchstax-facet-value-count"
                          onClick={(e) => {
                            selectFacet(key + facet.name, e, facetValue, false);
                          }}
                        >
                          ({facetValue.count})
                        </div>
                      </div>
                    );
                  }
                )}

                {facet.hasMoreFacets && (
                  <div className="searchstax-facet-show-more-container">
                    <div
                      className="searchstax-facet-show-more-container"
                      onClick={(e) => {
                        showMoreLessDesktop(e, facet);
                      }}
                      onKeyDown={(e) => {
                        if(e.key === 'Enter' || e.key === ' ') {
                          showMoreLessDesktop(e as any, facet);
                        }
                      }}
                      tabIndex={0}
                    >
                      {facet.showingAllFacets && (
                        <div className="searchstax-facet-show-less-button searchstax-facet-show-button">
                          less
                        </div>
                      )}
                      {!facet.showingAllFacets && (
                        <div className="searchstax-facet-show-more-button  searchstax-facet-show-button">
                          more
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function facetsTemplateMobile(
  facetsTemplateDataMobile: IFacetsTemplateData | null,
  selectedFacetsCheckboxes: IFacetValue[],
  facetContainers: {
    [key: string]: React.LegacyRef<HTMLDivElement> | undefined;
  },
  isNotDeactivated: (name: string) => boolean,
  toggleFacetGroup: (name: string) => void,
  selectFacet: (
    index: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: IFacetValueData,
    isInput: boolean,
    isMobile?: boolean
  ) => void,
  isChecked: (facetValue: IFacetValueData) => boolean | undefined,
  unselectFacet: (facet: IFacetValue) => void,
  showMoreLessMobile: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    data: IFacetData
  ) => void,
  openOverlay: () => void,
  closeOverlay: () => void,
  unselectAll: () => void
) {
  return facetsTemplateDataMobile ? (
    <div className="searchstax-facets-container-mobile">
      <div className="searchstax-facets-pills-container">
        <div
          className="searchstax-facets-pill searchstax-facets-pill-filter-by"
          onClick={() => {
            openOverlay();
          }}
        >
          <div className="searchstax-facets-pill-label">Filter By</div>
        </div>
        <div className="searchstax-facets-pills-selected">
          {selectedFacetsCheckboxes.map((facet) => {
            return (
              <div
                className="searchstax-facets-pill searchstax-facets-pill-facets"
                key={facet.value}
                onClick={() => {
                  unselectFacet(facet);
                }}
              >
                <div className="searchstax-facets-pill-label">
                  {facet.value} ({facet.count})
                </div>
                <div className="searchstax-facets-pill-icon-close"></div>
              </div>
            );
          })}
          {selectedFacetsCheckboxes.length !== 0 && (
            <div
              className="searchstax-facets-pill searchstax-clear-filters searchstax-facets-pill-clear-all"
              onClick={() => {
                unselectAll();
              }}
            >
              <div className="searchstax-facets-pill-label">Clear Filters</div>
            </div>
          )}
        </div>
        <div
          className={`searchstax-facets-mobile-overlay ${
            //@ts-ignore
            facetsTemplateDataMobile.overlayOpened ? "searchstax-show" : ""
          }`}
        >
          <div className="searchstax-facets-mobile-overlay-header">
            <div className="searchstax-facets-mobile-overlay-header-title">
              Filter By
            </div>
            <div
              className="searchstax-search-close"
              onClick={() => {
                closeOverlay();
              }}
            ></div>
          </div>
          <div className="searchstax-facets-container-mobile">
            {facetsTemplateDataMobile?.facets.map((facet) => {
              return (
                <div
                  key={facet.name + "mobile"}
                  className={`searchstax-facet-container ${
                    isNotDeactivated(facet.name) ? `active` : ``
                  }`}
                >
                  <div>
                    <div
                      className="searchstax-facet-title-container"
                      onClick={() => {
                        toggleFacetGroup(facet.name);
                      }}
                    >
                      <div className="searchstax-facet-title">
                        {" "}
                        {facet.label}{" "}
                      </div>
                      <div className="searchstax-facet-title-arrow active"></div>
                    </div>
                    <div className="searchstax-facet-values-container" aria-live="polite">
                      {facet.values.map(
                        //@ts-ignore
                        (facetValue: IFacetValueData, key) => {
                          facetContainers[key + facet.name] = createRef();

                          return (
                            <div
                              key={facetValue.value + facetValue.parentName}
                              className={`searchstax-facet-value-container ${
                                facetValue.disabled
                                  ? `searchstax-facet-value-disabled`
                                  : ``
                              }`}
                              ref={facetContainers[key + facet.name]}
                            >
                              <div
                                className={
                                  "searchstax-facet-input" +
                                  " mobile-" +
                                  key +
                                  facet.name
                                }
                              >
                                <input
                                  type="checkbox"
                                  className="searchstax-facet-input-checkbox"
                                  checked={isChecked(facetValue)}
                                  readOnly={true}
                                  aria-label={facetValue.value + ' ' + facetValue.count}
                                  disabled={facetValue.disabled}
                                  onClick={(e) => {
                                    selectFacet(
                                      key + facet.name,
                                      e,
                                      facetValue,
                                      true,
                                      true
                                    );
                                  }}
                                />
                              </div>
                              <div
                                className="searchstax-facet-value-label"
                                onClick={(e) => {
                                  selectFacet(
                                    key + facet.name,
                                    e,
                                    facetValue,
                                    false
                                  );
                                }}
                              >
                                {facetValue.value}
                              </div>
                              <div
                                className="searchstax-facet-value-count"
                                onClick={(e) => {
                                  selectFacet(
                                    key + facet.name,
                                    e,
                                    facetValue,
                                    false
                                  );
                                }}
                              >
                                ({facetValue.count})
                              </div>
                            </div>
                          );
                        }
                      )}

                      <div
                        className="searchstax-facet-show-more-container"
                        v-if="facet.hasMoreFacets"
                      >
                        <div
                          className="searchstax-facet-show-more-container"
                          onClick={(e) => {
                            showMoreLessMobile(e, facet);
                          }}
                          onKeyDown={(e) => {
                            if(e.key === 'Enter' || e.key === ' ') {
                              showMoreLessMobile(e as any, facet);
                            }
                          }}
                          tabIndex={0}
                        >
                          {facet.showingAllFacets && (
                            <div className="searchstax-facet-show-less-button searchstax-facet-show-button">
                              less
                            </div>
                          )}
                          {!facet.showingAllFacets && (
                            <div className="searchstax-facet-show-more-button  searchstax-facet-show-button">
                              more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="searchstax-facets-mobile-overlay-done"
            onClick={() => {
              closeOverlay();
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
