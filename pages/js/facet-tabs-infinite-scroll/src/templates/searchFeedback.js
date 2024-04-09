const searchFeedback = `
        {{#searchExecuted}}
              {{#autoCorrectedQuery}}
                  <div class="searchstax-feedback-container">
                      Showing <b>{{startResultIndex}} - {{endResultIndex}}</b> of <b>{{totalResults}}</b> results {{#searchTerm}} 
                      for "<b>{{searchTerm}}</b>" {{/searchTerm}}. Search instead for <a href="#" class="searchstax-feedback-original-query">{{originalQuery}}</a>
                      </div>
                  </div>
              {{/autoCorrectedQuery}}
        {{/searchExecuted}}
              `;

export { searchFeedback }