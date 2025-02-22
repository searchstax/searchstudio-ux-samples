<template>
  <div>
    <SearchstaxAnswerWidget :showShowMoreAfterWordCount="100">
      <template #answer="{ answerData, showMore }">
        <div
          v-if="
            answerData &&
            answerData?.searchExecuted &&
            answerData.shouldShowAnswer
          "
        >
          <div>
            <div
              :class="
                'searchstax-answer-container' + answerData.showMoreButtonVisible
                  ? 'searchstax-answer-show-more'
                  : ''
              "
            >
              <div class="searchstax-answer-title">Answer</div>
              <div class="searchstax-answer-description">
                {{
                  answerData.showMoreButtonVisible ? answerData.answerTruncated : answerData.answer
                }}
                <div v-if="answerData.answerLoading" class="searchstax-answer-loading"></div>
              </div>
            </div>
            <div
              v-if="answerData.showMoreButtonVisible"
              class="searchstax-answer-load-more-button-container"
            >
              <button class="searchstax-answer-load-more-button" @click="showMore">
                Show More...
              </button>
            </div>
          </div>
        </div>
      </template>
    </SearchstaxAnswerWidget>
  </div>
</template>

<script>
import { SearchstaxAnswerWidget } from '@searchstax-inc/searchstudio-ux-vue'
export default {
  components: {
    SearchstaxAnswerWidget
  }
}
</script>
