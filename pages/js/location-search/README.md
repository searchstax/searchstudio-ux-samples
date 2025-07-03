## Location Search with Google Maps Integration

### Setting up Google Maps Integration

- Create a project on [Google API Console](https://console.cloud.google.com)
- Enable `Maps JavaScript API` for map integration
- Enable `Places API` for geocoding integration
- Go to "Credentials" and create an API key
- Add API key to `googleMapsApiKey` field in config.js

### Usage

- Run the commands:
```shell
$ npm install
$ npm run dev
```
- Open [http://localhost:5173](http://localhost:5173)

### Search Page Layout

The search page layout and functionality is defined in `src/main.ts`. Map results are loaded into the `searchstax-location-map` element.

### JavaScript Functions

Google Maps are added to the page and configured using several functions:

- `loadGoogleMaps` adds the Google Maps code to the search page
- `clearMarkers` removes and resets map pins when search results change
- `processMapResults` looks for location results in the search response and creates map pins for each location

The `searchstax.dataLayer.$searchResults.subscribe` function is used to watch for updated search results. If a `location` field is found in the response `metadata` then the location results are sent to `processMapResults` to display the appropriate map pins.

```JS
searchstax.dataLayer.$searchResults.subscribe((results) => {
  const metadata = searchstax.dataLayer.$searchResultsMetadata.getValue();
  if (metadata?.location?.field) {
    locationField = metadata.location.field;
    processMapResults(results);
  } else {
    clearMarkers();
    locationField = '';
  }
  return results;
});
```