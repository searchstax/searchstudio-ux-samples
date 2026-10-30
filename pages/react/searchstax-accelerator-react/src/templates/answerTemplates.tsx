import type { ISearchstaxAnswerData } from "@searchstax-inc/searchstudio-ux-js";

export function answerTemplate(
  answerData: null | ISearchstaxAnswerData,
  showMore: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  submitConversationQuestion: (question: string) => void,
  exitConversation: () => void,
  conversationInputRef: React.RefObject<HTMLInputElement>
) {
  return (
    <>
      {answerData && (
        <div className="searchstax-answer-wrap">
          <div className="searchstax-answer-icon"></div>
          <div>
            <div
              className={
                "searchstax-answer-container " +
                (answerData.showMoreButtonVisible ? "searchstax-answer-show-more" : "")
              }
            >
              <h2 className="searchstax-answer-title">Smart Answers</h2>
              {answerData.shouldShowAnswerError && (
                <div
                  className="searchstax-answer-error"
                  dangerouslySetInnerHTML={{ __html: answerData.answerErrorMessage }}
                ></div>
              )}
              <div className="searchstax-answer-description">
                <div dangerouslySetInnerHTML={{ __html: answerData.fullAnswerFormatted }} />
                {!answerData.showMoreButtonVisible && answerData.answerLoading && (
                  <div className="searchstax-answer-loading"></div>
                )}
              </div>
            </div>

            {answerData.showMoreButtonVisible && (
              <div className="searchstax-answer-load-more-button-container">
                {answerData.answerLoading && <div className="searchstax-answer-loading"></div>}
                <button className="searchstax-answer-load-more-button" onClick={showMore}>
                  Show More
                </button>
              </div>
            )}
          </div>
          <div className="searchstax-answer-footer">
            <div id="feedbackWidgetContainer"></div>
            <div className="searchstax-lightweight-widget-separator-inline"></div>
            <p className="searchstax-disclaimer">Generative AI is Experimental</p>
          </div>

          {!answerData.answerLoading && !answerData.showMoreButtonVisible && answerData.isConversation && (
            answerData.isFullScreenConversation ? (
              <dialog
                className="searchstax-conversation-container searchstax-conversation-container-full-screen"
                aria-label="Ask SearchStax"
              >
                {conversationContent(answerData, submitConversationQuestion, exitConversation, conversationInputRef)}
              </dialog>
            ) : (
              <div className="searchstax-conversation-container">
                {conversationContent(answerData, submitConversationQuestion, exitConversation, conversationInputRef)}
              </div>
            )
          )}
        </div>
      )}
    </>
  );
}

function conversationContent(
  answerData: ISearchstaxAnswerData,
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
      {answerData.showConversationHeader && (
        <div className="searchstax-conversation-full-screen-header">
          <button
            onClick={() => exitConversation()}
            type="button"
            className="searchstax-conversation-back-to-results"
          >
            Back to results
          </button>
          <h1 className="searchstax-conversation-full-screen-title">Ask SearchStax</h1>
          <div className="searchstax-conversation-full-screen-header-spacer" aria-hidden="true"></div>
        </div>
      )}
      {answerData.showConversationMessages && (
        <div
          className="searchstax-conversation-messages-container"
          role="log"
          aria-label="Conversation history"
          aria-relevant="additions"
          aria-atomic="false"
        >
          {answerData.conversationMessages?.map((message, index) => (
            <div
              key={index}
              className={"searchstax-conversation-messages-container-message " + (message.messageClass ?? "")}
              aria-hidden={message.isStreaming ? true : undefined}
              dangerouslySetInnerHTML={{ __html: message.formattedMessage }}
            />
          ))}
        </div>
      )}
      {answerData.showConversationInput && (
        <>
          {answerData.showConversationMessages && <div className="searchstax-conversation-separator"></div>}
          <div className="searchstax-conversation-input-container">
            <input
              onKeyDown={handleConversationInputKeyDown}
              type="text"
              id="searchstax-conversation-input"
              className="searchstax-conversation-input"
              placeholder="Ask a follow-up question"
              autoFocus={answerData.isFullScreenConversation}
              ref={conversationInputRef}
            />
            <button
              onClick={handleConversationSubmitClick}
              type="button"
              className="searchstax-conversation-search-icon searchstax-search-icon"
              aria-label="Submit follow-up question"
            ></button>
          </div>
        </>
      )}
    </>
  );
}
