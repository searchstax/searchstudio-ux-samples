# Widgets Implementation - Javascript

## Description



Each widget is implemented using JavaScript and organized into separate folders under the `widgets/js` directory.

<br/>

## File Structure


```
widgets/
    ├── js/
    │   ├── widget_name/
    │   │   ├── index.html
    │   │   ├── index.js
    │   │   ├── main.scss
    │   │   ├── package.json
    │   ├── ...
    └── ...

```

 - Each widget has its folder under the js directory, named after the widget's name. Inside each widget folder, there are specific files for the widget implementation:

- `index.html`: This HTML file serves as the main template for the widget.

- `index.js`: The JavaScript file containing the widget's logic and functionality.

- `main.scss`: The main SCSS (Sass) file for styling the widget.

- `package.json`: A JSON file that contains metadata about the widget, such as name, version, dependencies, etc.

<br/>

## Included Widgets


| Widget Name         | Description                                                                                          | Implementation                          |
|---------------------|------------------------------------------------------------------------------------------------------|-----------------------------------------|
| Input Widget        | Renders the search input box and handles search suggestions/auto-complete.                         | `widgets/js/input-widget/`             |
| Result Widget       | Displays the core search results with titles, descriptions, images, etc.                            | `widgets/js/result-widget/`            |
| Facets Widget       | Displays faceted filters that allow drilling down search results.                                    | `widgets/js/facets-widget/`            |
| Pagination Widget   | Provides pagination controls and status for search result pages.                                    | `widgets/js/pagination-widget/`        |
| SearchFeedback Widget | Shows search feedback message with the number of results and corrected queries.                    | `widgets/js/search-feedback-widget/`   |
| RelatedSearches Widget | Displays algorithmically generated related searches for the current query.                          | `widgets/js/related-searches-widget/`  |
| Sorting Widget      | Provides controls to sort search results by predefined options like date, relevance, etc.          | `widgets/js/sorting-widget/`           |


<br/>

## How to Navigate

To use the widgets library, follow these steps:

1. Clone this repository.

2. Go to the desired widget example

3. Run `npm install`. This will install the required dependencies.

4. Run `npm run dev` to start the server.

5. Open http://localhost:1234 in your browser to view the widget.

<br/><br/>
 

### Happy coding! 💻
If you have any questions or need assistance, feel free to reach out to us.
We appreciate your interest in using the SearchStudio-UX-JS Library.