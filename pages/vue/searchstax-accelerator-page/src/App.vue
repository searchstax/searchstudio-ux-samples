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
    >
      <template #default>
        <div class="searchstax-page-layout-container">
          <SearchInputWidget />
          <!--- Search Input Widget -->
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

<script setup>
import { config } from '../../config'
import { SearchstaxWrapper } from '@searchstax-inc/searchstudio-ux-vue'
import SearchInputWidget from '@/widgets/SearchInputWidget.vue'
import ResultWidget from '@/widgets/ResultWidget.vue'
import FacetsWidget from '@/widgets/FacetsWidget.vue'
import SearchFeedbackWidget from '@/widgets/SearchFeedbackWidget.vue'
import SortingWidget from '@/widgets/SortingWidget.vue'
import ExternalPromotionsWidget from '@/widgets/ExternalPromotionsWidget.vue'
import PaginationWidget from '@/widgets/PaginationWidget.vue'
import RelatedSearchesWidget from '@/widgets/RelatedSearchesWidget.vue'

function makeId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const sessionId = makeId(25);
</script>

<style scoped></style>
