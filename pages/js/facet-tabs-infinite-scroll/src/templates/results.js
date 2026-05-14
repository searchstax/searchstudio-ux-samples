const searchResultsTemplate = `
    <div class="searchstax-search-result {{#thumbnail}} has-thumbnail {{/thumbnail}}">
                {{#promoted}}
                    <div class="searchstax-search-result-promoted"></div>
                {{/promoted}}

                {{#url}}
                    <a href="{{url}}" data-searchstax-unique-result-id="{{uniqueId}}" class="searchstax-result-item-link"></a>
                {{/url}}

                {{#ribbon}}
                    <div class="searchstax-search-result-ribbon">
                    {{ribbon}}
                    </div>
                {{/ribbon}}

                {{#thumbnail}}
                    <img alt="" src="{{thumbnail}}" class="searchstax-thumbnail">
                {{/thumbnail}}
                <div class="searchstax-search-result-title-container">
                    <span class="searchstax-search-result-title">{{title}}</span>
                </div>

                {{#paths}}
                    <p class="searchstax-search-result-common">
                        {{paths}}
                    </p>
                {{/paths}}

                {{#description}}
                    <p class="searchstax-search-result-description searchstax-search-result-common">
                        {{description}}
                    </p>
                {{/description}}

                {{#unmappedFields}}
                    {{#isImage}}
                        <div class="searchstax-search-result-image-container">
                        <img alt="" src="{{value}}" class="searchstax-result-image">
                        </div>
                    {{/isImage}}
                    {{^isImage}}
                        <p class="searchstax-search-result-common">
                        {{value}}
                        </p>
                    {{/isImage}}
                {{/unmappedFields}}
            </div>

    `;

const noSearchResultsTemplate = `
{{#hasResultsOrExternalPromotions}}
            <div class="searchstax-no-results">
                We're sorry, we couldn't find any results for <strong>"{{ searchTerm }}"</strong>
                <br>
                {{#spellingSuggestion}}
                    <span>&nbsp;Did you mean <a href="#" aria-label="Did you mean: {{originalQuery}}" class="searchstax-suggestion-term">{{ spellingSuggestion }}</a>?</span>
                {{/spellingSuggestion}}

                <p>Search Help:</p>
                <li> Check for typos and spelling errors </li>
                <li> User more general search terms </li>
                <li> Use different search terms </li>
            </div>

{{/hasResultsOrExternalPromotions}}
 `;

export { searchResultsTemplate, noSearchResultsTemplate };