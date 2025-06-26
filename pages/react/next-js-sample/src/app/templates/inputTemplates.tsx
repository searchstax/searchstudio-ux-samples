import { ISearchstaxLocation, ISearchstaxSuggestion } from "@searchstax-inc/searchstudio-ux-js";
import {
  SearchstaxLocationWidget
  //@ts-ignore
} from "@searchstax-inc/searchstudio-ux-react";
import { LocationTemplate } from "./locationTemplates";

function locationDecode(term: string): Promise<ISearchstaxLocation>{
        return new Promise((resolve) => {
          // make a request to google geocoding API to retrieve lat, lon and address

          const geocodingAPIKey = "AIzaSyDK5wQQaz7kmP60_DViAto5rTQ301eVBFs";
          const geocodingURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            term
          )}&key=${geocodingAPIKey}`;
          fetch(geocodingURL)
            .then((response) => response.json())
            .then((data) => {
              if (data.status === "OK" && data.results.length > 0) {
                const result = data.results[0];
                const location = {
                  lat: result.geometry.location.lat,
                  lon: result.geometry.location.lng,
                  address: result.formatted_address,
                };
                resolve(location);
              } else {
                resolve({
                  address: undefined,
                  lat: undefined,
                  lon: undefined,
                  error: true
                });
              }
            })
            .catch(() => {
              resolve({
                address: undefined,
                lat: undefined,
                lon: undefined,
                error: true
              });
            });
        });
  }

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
              <SearchstaxLocationWidget searchLocationTemplate={LocationTemplate} hooks={{locationDecode:locationDecode} } />
              <button
                className="searchstax-spinner-icon"
                id="searchstax-search-input-action-button"
                aria-label="search"
              ></button>
            </>
    );
  }