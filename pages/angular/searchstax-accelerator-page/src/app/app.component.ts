import { Component } from '@angular/core';
import { ISearchObject, ISearchstaxParsedResult, ISearchstaxSuggestProps, ISearchstaxSuggestResponse, Searchstax } from '@searchstax-inc/searchstudio-ux-js';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'searchstax-accelerator-page';
  config: any = {
    language: "en",
    searchURL: "https://searchcloud-2-us-east-1.searchstax.com/29847/corpsiteuxsamples-1442/emselect",
    suggesterURL: "https://searchcloud-2-us-east-1.searchstax.com/29847/corpsiteuxsamples-1442_suggester/emsuggest",
    searchAuth: "b065448ad1484e205f4851f0ce89d128e704e2f4",
    trackApiKey: "DPAOKNB9c5chZZDwN1Il9dLUCLMGF1ggehy0dWewZwk",
    authType: "token",
    relatedSearchesURL: "https://app.searchstax.com/api/v1/1442/related-search/",
    relatedSearchesAPIKey: "fac98ad405cc50e0c0693331e8d2119de592f0e3",
  }

  beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props }
    return propsCopy
  }
  afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results]
    return copy
  }

  afterAutosuggest(result: ISearchstaxSuggestResponse) {
    const copy = { ...result }
    return copy
  }

  beforeAutosuggest(props: ISearchstaxSuggestProps) {
    const propsCopy = { ...props }
    return propsCopy
  }

  afterLinkClick(results: ISearchstaxParsedResult): ISearchstaxParsedResult {
    const copy = { ...results }
    return copy
  }

  initialized(searchstax: Searchstax) {
    console.log('searchstax', searchstax);
  }
}
