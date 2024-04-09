
const facetsTemplate = `
    {{#hasResultsOrExternalPromotions}}
        <div class="searchstax-facets-container-desktop">
        </div>
    {{/hasResultsOrExternalPromotions}}
`;

const facetItemTemplate = {
    template: `
        <div class="searchstax-facet-input">
            <input type="checkbox" class="searchstax-facet-input-checkbox" {{#disabled}}disabled{{/disabled}} {{#isChecked}}checked{{/isChecked}}/>
        </div>
        
        <div class="searchstax-facet-value-label">{{value}}</div>
        <div class="searchstax-facet-value-count">({{count}})</div>
    `,
    checkTriggerClasses: ["searchstax-facet-value-label","searchstax-facet-value-count"],
}

const facetItemContainerTemplate ={
    template: `
        <div>
            <div class="searchstax-facet-title-container">
               
            </div>
            <div class="searchstax-facet-values-container">
                
            </div>
        </div>
    `,
    facetListTitleContainerClass: `searchstax-facet-title-container`,
    facetListContainerClass: `searchstax-facet-values-container`,
}

export { facetsTemplate, facetItemTemplate, facetItemContainerTemplate };
