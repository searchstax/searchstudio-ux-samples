# Searchstax React Accelerator
This project provides an example integration using the `@searchstax-inc/searchstudio-ux-react` component library with a React application.

### Overview
The `@searchstax-inc/searchstudio-ux-react` library exports React components that can be used to build search interfaces.

Some key capabilities:

- Plug and play components for search input, results, facets etc
- Connects to Searchstax search APIs
- Customizable templates and styling
- Search analytics and tracking

This example app demonstrates:

- Setting up the search configuration
- Importing and using the main widget components
- Passing callbacks for search events
- Overriding default templates
- Applying styling

### Getting Started
Follow these steps to run the sample app:

```
Clone the repository
$ cd searchstax-accelerator-react
$ npm install
```

### Configuration
Update the config object in src/config.js with your Searchstax credentials:

```
const config = {
  searchURL: "<search_api_url>",
  suggesterURL: "<suggester_api_url>",
  trackApiKey: "<analytics_write_key>", 
  searchAuth: "<base64_encoded_api_key>:"   
}
```

Run the app


```
npm run dev
```
The app will start on http://localhost:5173

### Usage
The SearchstaxWrapper component acts as the main wrapper that needs to contain all the other widgets.

#### `App.tsx` shows sample usage of the main widgets:

`SearchstaxInputWidget` - Renders the search input
`SearchstaxResultWidget` - Renders search results
`SearchstaxFacetsWidget` - Renders faceted filters
`SearchstaxPaginationWidget` - Renders pagination control

#### It also shows how to:

- Override default templates
- Pass callbacks for search events like beforeSearch, afterSearch etc
- Import styling from the library

Refer to the [`@searchstax-inc/searchstudio-ux-react`](https://www.npmjs.com/package/@searchstax-inc/searchstudio-ux-react) documentation for the full API reference and capabilities.

### Customizing
Each widget allows customizing its rendering by passing template functions. For example:

```
function resultsTemplate(data) {
  // return custom JSX
}

<SearchstaxResultWidget
  resultsTemplate={resultsTemplate}
/>
```

The parameters passed to each template function are documented in the component API docs.

Styles can be customized by overriding the CSS rules imported from the library.