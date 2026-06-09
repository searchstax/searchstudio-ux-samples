## Searchstax Smart Answers Standalone Page

This sample shows how to add the SearchStax Smart Answers widget to a custom search implementation using the SearchStax JavaScript UX library.

Smart Answers lets visitors ask natural-language questions and receive AI-generated answers based on the site’s indexed content. The answer appears above the standard search results and can include citations and visitor feedback controls.


### Smart Answers 
![Smart Answers](./screenshots/smart-answers-standalone-expanded.png?v=1 "Smart Answers")

### Smart Answers with Show More
![Smart Answers](./screenshots/smart-answers-standalone-showmore.png "Smart Answers with Show More") |


## When to use this sample

Use this sample when a client has a custom search results page and wants to add Smart Answers without using the hosted SearchStax search experience.

Typical use cases include:

- Custom HTML, JavaScript, or CMS search pages
- Client-owned search UI implementations
- Proof-of-concept demos for Smart Answers
- Sites that already use SearchStax Site Search APIs or widgets

## Prerequisites

Before using this sample, confirm that:

1. Smart Answers is enabled for the client’s SearchStax account.
2. Smart Answers is enabled and published for the target Search Profile.
3. The site’s search relevance is already tuned enough to return high-quality results.
4. The client has the Smart Answers API endpoint and read-only token from SearchStax.

The Smart Answers endpoint is available in:

`Site Search > App Settings > All APIs > Search & Indexing > Smart Answers API`


## Installation

Install dependencies:
```bash
npm install
```

Run the local development server:
```bash
npm run dev
```
- Open [http://localhost:1234](http://localhost:1234) / The link shown on your console

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## How the sample works

The main HTML file is [index.html](./index.html). It has the following block of custom implementation of search input that does not fire search, just imitates custom implementations where `custom-query-input` is the input search box and search is fired on the click of `custom-search-button`.
```html
<input id="custom-query-input"></input>
<button id="custom-search-button">Search</button>
```

The Smart Answers Widget and Feedback Widget can be included in your Custom App by including this minimal HTML:
```html
<div id="searchstax-answer-container"></div>
<div class="search-details-container">
   <div id="search-feedback-container"></div>
   <div id="search-sorting-container"></div>
</div>
```

On Javascript side, you would need to import the SearchStax JavaScript UX library:
```typescript
import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
```

You then create a SearchStax instance and initializes it using for Answers and Analytics to track the Answers as shown below:
```typescript
const searchstax = new Searchstax();

searchstax.initialize({
  searchURL: "",
  suggesterURL: "",
  language: "en",
  questionURL: "https://search-ai-us.searchstax.com/api/v1/XXXX/answer/",
  searchAuth: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authType: "token",
  analyticsBaseUrl: "https://analytics-us.searchstax.com",
  trackApiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXX",
  model: "Default",
  sessionId: makeId(25),
});
```
The Smart Answers widget is then attached to the HTML container:

```typescript
searchstax.addAnswerWidget("searchstax-answer-container", {
  showMoreAfterWordCount: 100,
  templates: {
    main: {
      template: `...`,
    },
  },
  feedbackwidget: {
    renderFeedbackWidget: true,
    thumbsUpValue: 10,
    thumbsDownValue: 0,
  },
});
```

Above code is all included in [main.ts](./src/main.ts).  There is a `window.onload` function which adds custom implementation for these elements and `triggerSearchStaxReload` function which connects your Search Input to trigger reload on answers wigget.
```typescript
function triggerSearchStaxReload(query: string) {
  searchstax.dataLayer.setSearchObject({
    ...searchstax.dataLayer.searchObject,
    query: query,
    page: 1,
  });
}

// ondocument load
window.onload = function () {
  const customQueryInput = document.getElementById("custom-query-input") as HTMLInputElement;
  const customSearchButton = document.getElementById("custom-search-button") as HTMLButtonElement;

  customSearchButton.addEventListener("click", function () {
    const query = customQueryInput.value;
    triggerSearchStaxReload(query);
  });
```
