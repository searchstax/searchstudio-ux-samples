<template>
  <div>
    <SearchstaxRelatedSearchesWidget
              :relatedSearchesURL="searchstaxConfig.relatedSearchesURL"
              :relatedSearchesAPIKey="searchstaxConfig.relatedSearchesAPIKey"
            >
              <template #related="{ relatedData, executeSearch }">
                <div
                  class="searchstax-related-searches-container"
                  id="searchstax-related-searches-container"
                  v-if="relatedData && relatedData?.searchExecuted && relatedData?.hasRelatedSearches"
                > <h3>Related searches: </h3> <span id="searchstax-related-searches"></span>
                  <span
                    class="searchstax-related-search"
                    v-if="relatedData.relatedSearches"
                  >
                    <span
                      v-for="related in relatedData.relatedSearches"
                      :key="related.related_search"
                      @click="relatedSearchClickHandler(related, executeSearch)"
                      class="searchstax-related-search searchstax-related-search-item"
                    > {{ related.related_search }}<span v-if="!related.last">,</span>
                    </span>
                  </span>
                </div>
              </template>
            </SearchstaxRelatedSearchesWidget>
  </div>
</template>

<script>
import { SearchstaxRelatedSearchesWidget } from '@searchstax-inc/searchstudio-ux-vue';
import { searchstaxConfig } from '../../../config';
export default {
  components: {
    SearchstaxRelatedSearchesWidget
  },
  data(){
    return{
      searchstaxConfig
    }
  },
  methods:{
    relatedSearchClickHandler(relatedTerm, executeSearch){
      executeSearch(relatedTerm);
      this.scrollToTop();
    },
    scrollToTop(){
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    }
  }
}
</script>

<style scoped></style>
