import { ISearchstaxAnswerTemplateData } from "@searchstax-inc/searchstudio-ux-js";

export function answerTemplate(
  answerData: null | ISearchstaxAnswerTemplateData
) {
  return (
    <>
      {answerData && (
        <div className="searchstax-answer-container">
          <div className="searchstax-answer-title">Answer</div>
          <div className="searchstax-answer-description">
            {answerData.answer}
          </div>
        </div>
      )}
    </>
  );
}