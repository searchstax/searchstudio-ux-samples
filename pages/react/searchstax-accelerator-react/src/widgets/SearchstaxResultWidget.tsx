import { SearchstaxResultWidget } from "@searchstax-inc/searchstudio-ux-react";

import type {
    ISearchstaxSearchMetadata,
    ISearchstaxParsedResult
} from "@searchstax-inc/searchstudio-ux-js";

function afterLinkClick(result: ISearchstaxParsedResult) {
    const propsCopy = { ...result };
    return propsCopy;
  }

  function noResultTemplate(searchTerm: string, metaData: ISearchstaxSearchMetadata | null): React.ReactElement {
    return (
      <div>
        <div className="searchstax-no-results">
          {" "}
          Showing <strong>no results</strong> for <strong>"{searchTerm}"</strong>
          <br />
          {metaData?.spellingSuggestion && (
            <span>
              &nbsp;Did you mean{" "}
              <a href="#" className="searchstax-suggestion-term">
                {metaData?.spellingSuggestion}
              </a>
              ?
            </span>
          )}
        </div>
        <div>
          <p>
            {" "}
            Try searching for search related terms or topics. We offer a wide variety of content to help you get the
            information you need.{" "}
          </p>
          <p>Lost? Click on the ‘X” in the Search Box to reset your search.</p>
        </div>
      </div>
    );
  }

  function resultsTemplate(
    searchResults: ISearchstaxParsedResult[],
    resultClicked: (results: ISearchstaxParsedResult, event: any) => ISearchstaxParsedResult[]
  ): React.ReactElement {
    return (
      <div className="searchstax-search-results">
        {searchResults &&
          searchResults.length > 0 &&
          searchResults.map(searchResult => (
            <div
              className={`searchstax-search-result ${searchResult.thumbnail ? "has-thumbnail" : ""}`}
              key={searchResult.uniqueId}
            >
              {searchResult.unmappedFields.map(unmappedField => (
                <div key={unmappedField.key}>
                  {unmappedField.isImage && typeof unmappedField.value === "string" ? (
                    <div className="searchstax-search-result-image-container">
                      <img src={unmappedField.value} className="searchstax-result-image" />
                    </div>
                  ) : (
                    <div>
                      <p className="searchstax-search-result-common">{unmappedField.value}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="searchstax-search-result-content">
                <div className="searchstax-search-result-title-wrapper">
                  <div className="searchstax-search-result-title-container">
                    <h2 className="searchstax-search-result-title">{searchResult.title}</h2>
                  </div>

                  {searchResult.ribbon && (
                    <div className="searchstax-search-result-ribbon">
                      <span className="pill">{searchResult.ribbon}</span>
                      {searchResult.promoted && <div className="searchstax-search-result-promoted" />}
                    </div>
                  )}
                </div>

                {searchResult.description && (
                  <p className="searchstax-search-result-description searchstax-search-result-common">
                    {searchResult.description}
                  </p>
                )}
              </div>

              {searchResult.url && (
                <a
                  href={searchResult.url}
                  data-searchstax-unique-result-id={searchResult.uniqueId}
                  onClick={event => {
                    resultClicked(searchResult, event);
                  }}
                  className="searchstax-result-item-link"
                />
              )}
            </div>
          ))}
      </div>
    );
  }


const ResultWidget: React.FC = () => {
    return (
        <SearchstaxResultWidget
        afterLinkClick={afterLinkClick}
        resultsPerPage={10}
        noResultTemplate={noResultTemplate}
        resultsTemplate={resultsTemplate}
        ></SearchstaxResultWidget>
    );
  };

  export default ResultWidget;
