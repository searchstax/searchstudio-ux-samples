import { Component, OnInit } from '@angular/core';
import {
  ISearchObject,
  ISearchstaxParsedResult,
  ISearchstaxSuggestProps,
  ISearchstaxSuggestResponse,
  Searchstax,
} from '@searchstax-inc/searchstudio-ux-js';
// @ts-ignore
import { config, renderConfig } from './../../../config.js';
// @ts-ignore

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'searchstax-accelerator-page';
  config = config;
  renderConfig = renderConfig;
  sessionId = this.makeId(25);
  searchstaxInstance: Searchstax | null = null;
  feedbackInstance: any = null;

  ngOnInit() {
    //@ts-ignore
    import(/* webpackIgnore: true */ 'https://static-staging.searchstax.co/studio-js/v4/js/feedbackWidget.mjs').then((module) => {
      this.feedbackInstance = module.default;
      setTimeout(() => {
        new this.feedbackInstance({
          analyticsKey: config.trackApiKey,
          containerId: 'searchstax-feedback-container',
          lightweight: false,
        });
      }, 300);
    });
  }

  searchstaxEmailOverride() {
    return 'testEmailOverride@gmail.com';
  }

  searchstaxFeedbackTextAreaOverride() {
    if (!this.searchstaxInstance) {
      return '';
    } else {
      return (
        (this.searchstaxInstance.dataLayer.searchObject.query === 'undefined'
          ? ''
          : this.searchstaxInstance.dataLayer.searchObject.query) +
        ' ' +
        this.searchstaxInstance.dataLayer.parsedData.getAnswerData
      );
    }
  }

  initializeWidget() {
    // get the container element
    const container = document.getElementById('feedbackWidgetContainer');
    if (container && this.feedbackInstance && !this.searchstaxInstance?.dataLayer.answerLoading) {
      new this.feedbackInstance({
        analyticsKey: config.trackApiKey,
        containerId: 'feedbackWidgetContainer',
        lightweight: true,
        emailOverride: this.searchstaxEmailOverride.bind(this),
        feedbackTextAreaOverride: this.searchstaxFeedbackTextAreaOverride.bind(this),
        thumbsUpValue: 10,
        thumbsDownValue: 1,
      });
    }
  }

  beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props };
    return propsCopy;
  }
  afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results];
    return copy;
  }

  makeId(length: number) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  afterAutosuggest(result: ISearchstaxSuggestResponse) {
    const copy = { ...result };
    return copy;
  }

  beforeAutosuggest(props: ISearchstaxSuggestProps) {
    const propsCopy = { ...props };
    return propsCopy;
  }

  afterLinkClick(results: ISearchstaxParsedResult): ISearchstaxParsedResult {
    const copy = { ...results };
    return copy;
  }

  initialized(searchstax: Searchstax) {
    searchstax.dataLayer.$answer.subscribe((data) => {
      this.searchstaxInstance = searchstax;
      if (data) {
        setTimeout(() => {
          this.initializeWidget();
        }, 300);
      }
    });

    searchstax.dataLayer.$searchResults.subscribe((data) => {
      if (data && searchstax.dataLayer.$answer.getValue()) {
        setTimeout(() => {
          this.initializeWidget();
        }, 300);
      }
    });
  }
}
