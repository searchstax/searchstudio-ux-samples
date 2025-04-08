<template>
  <div>
    <SearchstaxWrapper
      :language="config.language"
      :searchURL="config.searchURL"
      :suggesterURL="config.suggesterURL"
      :trackApiKey="config.trackApiKey"
      :searchAuth="config.searchAuth"
      :authType="config.authType"
      :sessionId="sessionId"
      :analyticsBaseUrl="config.analyticsBaseUrl"
      @initialized="initialized"
      :questionURL="config.questionURL"
    >
      <template #default>
        <div class="searchstax-page-layout-container">
          <div id="searchstax-feedback-container"></div>
          <SearchInputWidget />
          <!--- Search Input Widget -->
          <SearchstaxAnswerWidget />
          <div class="search-details-container">
            <SearchFeedbackWidget />
            <!--- Search Feedback Widget -->
            <SortingWidget />
            <!--- Sorting Widget -->
          </div>
          <div class="searchstax-page-layout-facet-result-container">
            <div class="searchstax-page-layout-facet-container">
              <FacetsWidget />
              <!--- Facets Widget -->
            </div>
            <div class="searchstax-page-layout-result-container">
              <ResultWidget />
              <!--- Results Widget -->
              <div id="searchstax-external-promotions-layout-container">
                <ExternalPromotionsWidget />
                <!--- External Promotion Widget -->
              </div>
              <div id="searchstax-related-searches-container">
                <RelatedSearchesWidget />
                <!---Related Searches Widget -->
              </div>
              <PaginationWidget />
              <!--- Pagination Widget -->
            </div>
          </div>
        </div>
      </template>
    </SearchstaxWrapper>
  </div>
</template>

<script lang="ts" setup>
import { config } from '../../config'
import { onMounted } from 'vue'
import { SearchstaxWrapper } from '@searchstax-inc/searchstudio-ux-vue'
import SearchInputWidget from '@/widgets/SearchInputWidget.vue'
import ResultWidget from '@/widgets/ResultWidget.vue'
import FacetsWidget from '@/widgets/FacetsWidget.vue'
import SearchFeedbackWidget from '@/widgets/SearchFeedbackWidget.vue'
import SortingWidget from '@/widgets/SortingWidget.vue'
import ExternalPromotionsWidget from '@/widgets/ExternalPromotionsWidget.vue'
import PaginationWidget from '@/widgets/PaginationWidget.vue'
import RelatedSearchesWidget from '@/widgets/RelatedSearchesWidget.vue'
import SearchstaxAnswerWidget from '@/widgets/AnswerWidget.vue'
import SearchstaxFeedbackWidget from 'https://static-staging.searchstax.co/studio-js/v4/js/feedbackWidget.mjs'

let searchstaxInstance = null
onMounted(() => {
  setTimeout(() => {
    new SearchstaxFeedbackWidget({
      analyticsKey: config.trackApiKey,
      containerId: 'searchstax-feedback-container',
      lightweight: false
    })
  }, 300)
})

function searchstaxEmailOverride() {
  return 'testEmailOverride@gmail.com'
}

function searchstaxFeedbackTextAreaOverride() {
  if (!searchstaxInstance) {
    return ''
  } else {
    return (
      (searchstaxInstance.dataLayer.searchObject.query === 'undefined'
        ? ''
        : searchstaxInstance.dataLayer.searchObject.query) +
      ' ' +
      searchstaxInstance.dataLayer.parsedData.getAnswerData
    )
  }
}

function initializeWidget() {
  // get the container element
  const container = document.getElementById('feedbackWidgetContainer')
  if (container) {
    new SearchstaxFeedbackWidget({
      analyticsKey: config.trackApiKey,
      containerId: 'feedbackWidgetContainer',
      lightweight: true,
      emailOverride: searchstaxEmailOverride,
      feedbackTextAreaOverride: searchstaxFeedbackTextAreaOverride,
      thumbsUpValue: 10,
      thumbsDownValue: 1
    })
  }
}

function makeId(length) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

function initialized(searchstax) {
  searchstaxInstance = searchstax
  searchstaxInstance.dataLayer.$answer.subscribe((data) => {
    console.log('data', data);
    if (data) {
      setTimeout(() => {
        initializeWidget()
      }, 300)
    }
  })
}

const sessionId = makeId(25)
</script>

<style scoped>
#searchstax-feedback-container {
  width: calc(50% - 5px) !important;
  margin-left: auto !important;
  margin-right: auto !important;
  margin-bottom: 5px;
}

@media (max-width: 767px) {
  #searchstax-feedback-container {
    width: calc(100%) !important;
  }
}
</style>
