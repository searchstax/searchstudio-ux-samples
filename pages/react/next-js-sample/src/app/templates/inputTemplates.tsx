import { ISearchstaxLocation, ISearchstaxSuggestion } from "@searchstax-inc/searchstudio-ux-js";
import {
  SearchstaxLocationWidget
  //@ts-ignore
} from "@searchstax-inc/searchstudio-ux-react";
import { LocationTemplate } from "./locationTemplates";
import {renderConfig} from "./../../../../config.js";


export function InputTemplate(
    suggestions: ISearchstaxSuggestion[],
    onMouseLeave: () => void,
    onMouseOver: (suggestion: ISearchstaxSuggestion) => void,
    onMouseClick: () => void
  ): React.ReactElement {
    return (
      <>
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
                          tabIndex={0}
                          dangerouslySetInnerHTML={{ __html: suggestion.term }}
                          onMouseOver={() => {
                            onMouseOver(suggestion);
                          }}
                          onClick={() => {
                            onMouseClick();
                          }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <SearchstaxLocationWidget searchLocationTemplate={LocationTemplate} hooks={ {locationDecode: renderConfig.locationWidget.locationDecode,
          locationDecodeCoordinatesToAddress: renderConfig.locationWidget.locationDecodeCoordinatesToAddress,} } locationSearchEnabled={renderConfig.locationWidget.locationSearchEnabled} locationValuesOverride={renderConfig.locationWidget.locationValuesOverride} />
              <button
                className="searchstax-spinner-icon"
                id="searchstax-search-input-action-button"
                aria-label="search"
              ></button>
            </>
    );
  }