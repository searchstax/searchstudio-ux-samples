const searchFeedback = `
        {{#searchExecuted}}
              {{#autoCorrectedQuery}}
                  <h2 class="searchstax-feedback-container">
                      Showing <b>{{startResultIndex}} - {{endResultIndex}}</b> of <b>{{totalResults}}</b> results {{#searchTerm}}
                      for "<b>{{searchTerm}}</b>" {{/searchTerm}}. Search instead for <a href="#" aria-label="Search instead for: {{originalQuery}}" class="searchstax-feedback-original-query">{{originalQuery}}</a>
                  </h2>
              {{/autoCorrectedQuery}}
        {{/searchExecuted}}
              `;

export { searchFeedback }