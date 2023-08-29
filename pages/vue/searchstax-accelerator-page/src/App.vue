<template>
  <div>
    <SearchstaxWrapper
      :language="searchstaxConfig.language"
      :searchURL="searchstaxConfig.searchURL"
      :suggesterURL="searchstaxConfig.suggesterURL"
      :trackApiKey="searchstaxConfig.trackApiKey"
      :searchAuth="searchstaxConfig.searchAuth"
      :authType="searchstaxConfig.authType"
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
import { searchstaxConfig } from '../../config'
import { SearchstaxWrapper } from '@searchstax-inc/searchstudio-ux-vue'
import SearchInputWidget from '@/widgets/SearchInputWidget.vue'
import ResultWidget from '@/widgets/ResultWidget.vue'
import FacetsWidget from '@/widgets/FacetsWidget.vue'
import SearchFeedbackWidget from '@/widgets/SearchFeedbackWidget.vue'
import SortingWidget from '@/widgets/SortingWidget.vue'
import ExternalPromotionsWidget from '@/widgets/ExternalPromotionsWidget.vue'
import PaginationWidget from '@/widgets/PaginationWidget.vue'
import RelatedSearchesWidget from '@/widgets/RelatedSearchesWidget.vue'
</script>

<style scoped></style>
