<template>
  <div>
    <SearchstaxWrapper
      :language="jobSearchConfig.language"
      :searchURL="jobSearchConfig.searchURL"
      :suggesterURL="jobSearchConfig.suggesterURL"
      :trackApiKey="jobSearchConfig.trackApiKey"
      :searchAuth="jobSearchConfig.searchAuth"
      :authType="jobSearchConfig.authType"
    >
      <template #default>
          <nav>
            <div>
              <a href="#"><h3>HOME</h3></a>
            </div>
            <div>
              <!--- Search Input Widget -->
              <SearchInputWidget />
            </div>
            <div></div>
          </nav>

          <div class="searchstax-page-layout-container">
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
import { jobSearchConfig } from '../../config'
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

<style scoped>
.container {
  width: 100%;
  margin: auto;
  height: 100vh;
}
</style>
