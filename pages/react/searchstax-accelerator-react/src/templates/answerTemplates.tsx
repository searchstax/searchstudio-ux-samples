import { ISearchstaxAnswerData } from "@searchstax-inc/searchstudio-ux-js";

export function answerTemplate(
  answerData: null | ISearchstaxAnswerData,
  showMore: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
) {
  return (
    <>
      {answerData && (
        <div>
          <div
            className={
              "searchstax-answer-container" +
              (answerData.showMoreButtonVisible === true ? "how-more" : "")
            }
          >
            <div className="searchstax-answer-title">Answer</div>

            <div className="searchstax-answer-description">
              {answerData.showMoreButtonVisible === true
                ? answerData.answerTruncated
                : answerData.answer}

              {answerData.answerLoading && (
                <div className="searchstax-answer-loading"></div>
              )}
            </div>
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
      )}
    </>
  );
}
