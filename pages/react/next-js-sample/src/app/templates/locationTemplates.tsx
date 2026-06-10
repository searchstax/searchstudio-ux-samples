import { ISearchstaxLocationRenderData } from "@searchstax-inc/searchstudio-ux-js";



export function LocationTemplate(
    locationData: null | ISearchstaxLocationRenderData,
    locationChange: (value: string) => void,
    locationBlur: (value: string) => void,
    radiusChange: (value: string | number) => void,
    getCurrentLocation: () => void,
    inputValue?: string | null,
    selectValue?: string | number | undefined,
    locationError?: boolean
  ): React.ReactElement {
    return (
     <>
        {locationData && (
          <div
            className="searchstax-location-input-container"
            data-test-id="searchstax-location-input-container"
          >
            <div className="searchstax-location-input-wrapper">
              <span className="searchstax-location-input-label">NEAR</span>
              <div className="searchstax-location-input-wrapper-inner">
                <input
                  type="text"
                  id="searchstax-location-input"
                  className={"searchstax-location-input" + (locationError ? " searchstax-input-location-error" : "")}
                  placeholder="Zip, Postal Code or City..."
                  aria-label="Search Location Input"
                  data-test-id="searchstax-location-input"
                  value={inputValue ?? ""}
                  onChange={(e) => locationChange(e.target.value)}
                  onBlur={(e) => locationBlur(e.target.value)}
                />
                <button onClick={getCurrentLocation} className="searchstax-get-current-location-button">Use my current location</button>
              </div>
              {locationData.shouldShowLocationDistanceDropdown && (
                <span className="searchstax-location-input-label">WITHIN</span>
              )}
              {locationData.shouldShowLocationDistanceDropdown && (
                <select
                  id="searchstax-location-radius-select"
                  className="searchstax-location-radius-select"
                  aria-label="Search Location Radius Select"
                  data-test-id="searchstax-location-radius-select"
                  onChange={(e) => radiusChange(e.target.value)}
                  value={selectValue}
                >
                  {locationData.locationSearchDistanceValues.map(
                    ({ value, label }) => (
                      <option value={value} key={value}>
                        {label}
                      </option>
                    )
                  )}
                </select>
              )}
            </div>
          </div>
        )}
    </>)
  }