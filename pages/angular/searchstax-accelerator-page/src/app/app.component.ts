import { Component } from '@angular/core';
import { ISearchObject, ISearchstaxParsedResult, ISearchstaxSuggestProps, ISearchstaxSuggestResponse, Searchstax } from '@searchstax-inc/searchstudio-ux-js';
// @ts-ignore
import {config, renderConfig} from './../../../config.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'searchstax-accelerator-page';
  config = config
  renderConfig = renderConfig
  sessionId = this.makeId(25)
  beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props }
    return propsCopy
  }
  afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results]
    return copy
  }

  makeId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
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
