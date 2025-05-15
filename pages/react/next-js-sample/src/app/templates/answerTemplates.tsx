import { ISearchstaxAnswerData } from "@searchstax-inc/searchstudio-ux-js";

export function answerTemplate(
  answerData: null | ISearchstaxAnswerData,
  showMore: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) {
  return (
    <>
      {answerData && (
        <div className="searchstax-answer-wrap">
        <div className="searchstax-answer-icon"></div>
        <div>
          <div
            className={
              "searchstax-answer-container" +
              (answerData.showMoreButtonVisible === true ? "searchstax-answer-show-more" : "")
            }
          >
            <div className="searchstax-answer-title">Smart Answers</div>
              <div className="searchstax-answer-description" dangerouslySetInnerHTML={{__html:answerData.fullAnswerFormatted}}>
              </div>
                {answerData.answerLoading && (
                  <div className="searchstax-answer-loading"></div>
                )}
          </div>

          {answerData.showMoreButtonVisible === true && (
            <div className="searchstax-answer-load-more-button-container">
              <button
                className="searchstax-answer-load-more-button"
                onClick={(e) => {
                  showMore(e);
                }}
              >
                Show More...
              </button>
            </div>
          )}
        </div>
        <div className="searchstax-answer-footer">
            <div id="feedbackWidgetContainer"></div>
            <div className="searchstax-lightweight-widget-separator-inline"></div>
            <p className="searchstax-disclaimer">Generative AI is Experimental</p>
        </div>
        </div>
      )}
    </>
  );
}
