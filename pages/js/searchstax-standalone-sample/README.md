## Sample for Including SearchStax Widgets in Custom UX

If you have your own custom UX implementation, you can still use one of more of SearchStax Widgets for your implementation
This example shows how you can use SearchStax Asnwers Widget, Feedback Widget and Related Searches Widgets in your implementation.

### Usage

- Run the commands:
```shell
$ npm install
$ npm run dev
```
- Open [http://localhost:1234](http://localhost:1234)


### HTML Structure

The main HTML file is `src/index.html`.

You will at a minimum need to include the `searchstax-page-layout-container` div and then based on which component you are including, include the container for that Widget.
For Smart Answers, you would include the `searchstax-answer-container` within the `searchstax-page-layout-container`.

You would also want to include the CSS included in index.html. Since SearchStax uses its own custom nested classes, they would not interfere with your styles.

### JavaScript Code
The main JavaScript file is `src/main.js`. You can see how you need to initialize the `SearchStax` class
```JS
const searchstax = new Searchstax();
searchstax.initialize({
  ...initConfig.searchStandaloneSearchSample,
  sessionId: makeId(25),
});
```
and then add the specific widgets:
```JS
searchstax.addAnswerWidget("searchstax-answer-container", {
  showMoreAfterWordCount: 100,
  templates: {
  .....
  });
```

### Invoking Smart Answers when query is fired
As you have your own custom input box, you need to trigger SearchStax UX when search is fired. You can see in `src/main.js` how that is being done with the `triggerReload` method, where we pass the query to SearchStax. This method is being called in this custom UX on the click on the Search button.
```JS
function triggerReload(query: string, page: number) {
  searchstax.dataLayer.setSearchObject({
    ...searchstax.dataLayer.searchObject,
    query: query,
    page: page,
  });
}

window.onload = function () {
  const customQueryInput = document.getElementById(
    "custom-query-input"
  ) as HTMLInputElement;
  const customPageInput = document.getElementById(
    "custom-page-input"
  ) as HTMLInputElement;
  const customSearchButton = document.getElementById(
    "custom-search-button"
  ) as HTMLButtonElement;

  customSearchButton.addEventListener("click", function () {
    const query = customQueryInput.value;
    const page = parseInt(customPageInput.value) || 1;
    triggerReload(query, page);
  });
};
```
