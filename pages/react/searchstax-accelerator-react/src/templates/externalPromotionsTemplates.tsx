import {
  IExternalPromotion,
  ISearchstaxExternalPromotionsData,
} from "@searchstax-inc/searchstudio-ux-js";

export function searchExternalPromotionsTemplate(
  externalPromotionsData: null | ISearchstaxExternalPromotionsData,
  trackClick: (
    externalPromotion: IExternalPromotion,
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => void
) {
  return (
    <>
      {externalPromotionsData &&
        externalPromotionsData?.searchExecuted &&
        externalPromotionsData?.hasExternalPromotions &&
        externalPromotionsData.externalPromotions.map((externalPromotion) => (
          <div
            className="searchstax-external-promotion searchstax-search-result"
            key={externalPromotion.id}
          >
            <div className="icon-elevated"></div>
            {externalPromotion.url && (
              <a
                href={externalPromotion.url}
                onClick={(event) => {
                  trackClick(externalPromotion, event);
                }}
                className="searchstax-result-item-link"
              ></a>
            )}
            <div className="searchstax-search-result-title-container">
              <span className="searchstax-search-result-title">
                {externalPromotion.name}
              </span>
            </div>
            {externalPromotion.description && (
              <p className="searchstax-search-result-description searchstax-search-result-common">
                {" "}
                {externalPromotion.description}{" "}
              </p>
            )}
            {externalPromotion.url && (
              <p className="searchstax-search-result-description searchstax-search-result-common">
                {" "}
                {externalPromotion.url}{" "}
              </p>
            )}
          </div>
        ))}
    </>
  );
}
