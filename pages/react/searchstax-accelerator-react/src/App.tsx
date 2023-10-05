import { useState } from "react";
import "./App.scss";
import { SearchstaxWrapper } from "@searchstax-inc/searchstudio-ux-react";
import  InputWidget from './widgets/SearchstaxInputWidget.tsx';
import ResultWidget from "./widgets/SearchstaxResultWidget.tsx";

import type {
  ISearchObject,
  ISearchstaxParsedResult,

} from "@searchstax-inc/searchstudio-ux-js";
import { Searchstax } from "@searchstax-inc/searchstudio-ux-js";
//@ts-ignore
import { config }  from '../../config.js';
import PaginationWidget from "./widgets/SearchstaxPaginationWidget.tsx";
import OverviewWidget from "./widgets/SearchstaxOverviewWidget.tsx";
import SortingWidget from "./widgets/SearchstaxSortingWidget.tsx";
import RelatedSearchesWidget from "./widgets/SearchstaxRelatedSearchesWidget.tsx";
import ExternalPromotionsWidget from "./widgets/SearchstaxExternalPromotionsWidget.tsx";
import FacetsWidget from "./widgets/SearchstaxFacetsWidget.tsx";

function App() {
  //@ts-ignore
  const [searchstaxInstance, setSearchstaxInstance] = useState(null as null | Searchstax);

  function beforeSearch(props: ISearchObject) {
    const propsCopy = { ...props };
    return propsCopy;
  }
  function afterSearch(results: ISearchstaxParsedResult[]) {
    const copy = [...results];
    return copy;
  }

  function initialized(searchstax: Searchstax) {
    setSearchstaxInstance(searchstax);
  }

  return (
    <>
      <SearchstaxWrapper
        searchURL={config.searchURL}
        suggesterURL={config.suggesterURL}
        trackApiKey={config.trackApiKey}
        searchAuth={config.searchAuth}
        initialized={initialized}
        beforeSearch={beforeSearch}
        afterSearch={afterSearch}
        authType={config.authType}
        router={{ enabled: true }}
        language={config.language}
      >
        <div className="searchstax-page-layout-container">
          <InputWidget />

          <div className="search-details-container">
            <OverviewWidget />
            <SortingWidget />
          </div>

          <div className="searchstax-page-layout-facet-result-container">
            <div className="searchstax-page-layout-facet-container">
              <FacetsWidget />
            </div>

            <div className="searchstax-page-layout-result-container">
            <ResultWidget />
              <ExternalPromotionsWidget />
              <RelatedSearchesWidget />
              <PaginationWidget />
            </div>
          </div>
        </div>
      </SearchstaxWrapper>
    </>
  );
}

export default App;