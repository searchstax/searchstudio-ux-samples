import { ISearchstaxAnswerData } from "@searchstax-inc/searchstudio-ux-js";

export function answerTemplate(
  answerData: null | ISearchstaxAnswerData,
  showMore: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  submitConversationQuestion: (question: string) => void,
  exitConversation: () => void,
  conversationInputRef: React.RefObject<HTMLInputElement>
) {
  function handleConversationInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    submitConversationQuestion(e.currentTarget.value);
  }

  function handleConversationSubmitClick() {
    submitConversationQuestion(conversationInputRef.current?.value ?? "");
  }

  return (
    <>
      {answerData && (
        <div className="searchstax-answer-wrap">
        <div className="searchstax-answer-icon"></div>
        <div>
          <div
            className={
              "searchstax-answer-container " +
              (answerData.showMoreButtonVisible === true ? "searchstax-answer-show-more" : "")
            }
          >
            <div className="searchstax-answer-title">Smart Answers</div>
              {answerData.shouldShowAnswerError && (
                <div className="searchstax-answer-error" dangerouslySetInnerHTML={{__html:answerData.answerErrorMessage}}></div>
              )}
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
                Show More
              </button>
            </div>
          )}
        </div>
        {!answerData.answerLoading && !answerData.showMoreButtonVisible && answerData.isConversation && (
          <div className={`searchstax-conversation-container${answerData.isFullScreenConversation ? " searchstax-conversation-container-full-screen" : ""}`}>
            {answerData.showConversationHeader && (
              <div className="searchstax-conversation-full-screen-header">
                <button
                  type="button"
                  className="searchstax-conversation-back-to-results"
                  onClick={() => exitConversation()}
                >
                  Back to results
                </button>
                <div className="searchstax-conversation-full-screen-title">Ask SearchStax</div>
              </div>
            )}
            {answerData.showConversationMessages && answerData.conversationMessages?.length ? (
              <div className="searchstax-conversation-messages-container">
                {answerData.conversationMessages.map((message, index) => (
                  <div
                    className={`searchstax-conversation-messages-container-message${message.messageClass ? ` ${message.messageClass}` : ""}`}
                    key={message.conversationMessageId ?? index}
                    dangerouslySetInnerHTML={{ __html: message.formattedMessage }}
                  />
                ))}
              </div>
            ) : null}
            {answerData.showConversationInput && (
              <div className="searchstax-conversation-input-container">
                <input
                  type="text"
                  id="searchstax-conversation-input"
                  className="searchstax-conversation-input"
                  placeholder="Ask a follow-up question"
                  ref={conversationInputRef}
                  onKeyDown={handleConversationInputKeyDown}
                />
                <button
                  type="button"
                  className="searchstax-conversation-search-icon searchstax-search-icon"
                  aria-label="Submit follow-up question"
                  onClick={handleConversationSubmitClick}
                ></button>
              </div>
            )}
          </div>
        )}
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
