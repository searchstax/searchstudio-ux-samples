<template>
  <div>
    <SearchstaxRelatedSearchesWidget
              :relatedSearchesURL="config.relatedSearchesURL"
              :relatedSearchesAPIKey="config.relatedSearchesAPIKey"
            >
            <template #related="{ relatedData, executeSearch }">
                <div
                  class="searchstax-related-searches-container"
                  id="searchstax-related-searches-container"
                  v-if="relatedData && relatedData?.searchExecuted && relatedData?.hasRelatedSearches"
                > Related searches: <span id="searchstax-related-searches"></span>
                  <span
                    class="searchstax-related-search"
                    v-if="relatedData.relatedSearches"
                  >
                    <span
                      v-for="related in relatedData.relatedSearches"
                      :key="related.related_search"
                      @click="executeSearch(related)"
                      @keyup.enter="executeSearch(related)"
                      @keyup.space="executeSearch(related)"
                      tabindex="0"
                      class="searchstax-related-search searchstax-related-search-item"
                      :aria-label="'Related search: ' + related.related_search"
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
import { config } from '../../../config';
export default {
  components: {
    SearchstaxRelatedSearchesWidget
  },
  data(){
    return{
      config
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
