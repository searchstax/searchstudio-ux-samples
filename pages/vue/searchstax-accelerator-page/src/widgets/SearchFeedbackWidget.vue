<template>
  <div>
    <SearchstaxSearchFeedbackWidget>
            <template #searchFeedback="{ searchFeedbackData, onOriginalQueryClick }">
              <div
                class="searchstax-feedback-container"
                v-if="searchFeedbackData && searchFeedbackData?.searchExecuted && searchFeedbackData?.totalResults"
              > Showing <b>{{ searchFeedbackData.startResultIndex }} - {{ searchFeedbackData.endResultIndex }}</b> of
                <b>{{ searchFeedbackData.totalResults }}</b> results <span v-if="searchFeedbackData.searchTerm">for "<b>{{
                  searchFeedbackData.searchTerm }}</b>" </span>
                <div class="searchstax-feedback-container-suggested">
                  <div v-if="searchFeedbackData.autoCorrectedQuery"> Search instead for <a
                      href="#"
                      @click.prevent="onOriginalQueryClick($event)"
                      class="searchstax-feedback-original-query"
                    >{{ searchFeedbackData.originalQuery }}</a>
                  </div>
                </div>
              </div>
            </template>
          </SearchstaxSearchFeedbackWidget>
  </div>
</template>

<script>
import { SearchstaxSearchFeedbackWidget } from '@searchstax-inc/searchstudio-ux-vue';
export default {
  components: {
    SearchstaxSearchFeedbackWidget
  }
}
</script>

<style scoped></style>
