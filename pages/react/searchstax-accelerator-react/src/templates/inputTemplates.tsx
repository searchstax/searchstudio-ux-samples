import { ISearchstaxSuggestion } from "@searchstax-inc/searchstudio-ux-js";

export function InputTemplate(
    suggestions: ISearchstaxSuggestion[],
    onMouseLeave: () => void,
    onMouseOver: (suggestion: ISearchstaxSuggestion) => void,
    onMouseClick: () => void
  ): React.ReactElement {
    return (
      <div className="searchstax-search-input-wrapper">
        <input
          type="text"
          id="searchstax-search-input"
          className="searchstax-search-input"
          placeholder="SEARCH FOR..."
          aria-label="search"
        />
        <div
          className={`searchstax-autosuggest-container ${
            suggestions.length === 0 ? "hidden" : ""
          }`}
          onMouseLeave={onMouseLeave}
        >
          {suggestions.map(function (suggestion) {
            return (
              <div
                className="searchstax-autosuggest-item"
                key={suggestion.term}
              >
                <div
                  className="searchstax-autosuggest-item-term-container"
                  dangerouslySetInnerHTML={{ __html: suggestion.term }}
                  onMouseOver={() => {
                    onMouseOver(suggestion);
                  }}
                  tabIndex={0}
                  onClick={() => {
                    onMouseClick();
                  }}
                ></div>
              </div>
            );
          })}
        </div>

        <button
          className="searchstax-spinner-icon"
          id="searchstax-search-input-action-button"
          aria-label="search"
          role="button"
        ></button>
      </div>
    );
  }