<template>
  <div>
    <SearchstaxPaginationWidget>
      <template #pagination="{ paginationData, previousPage, nextPage }">
                <div
                  class="searchstax-pagination-container"
                  v-if="paginationData"
                >
                  <div class="searchstax-pagination-content">
                    <a
                      class="searchstax-pagination-previous"
                      :disabled="paginationData?.isFirstPage"
                      @click="previousPage"
                      id="searchstax-pagination-previous"
                    > &lt; Previous </a>
                    <div class="searchstax-pagination-details"> {{ paginationData?.startResultIndex }} - {{
                      paginationData?.endResultIndex }} of {{ paginationData?.totalResults }} </div>
                    <a
                      class="searchstax-pagination-next"
                      :disabled="paginationData?.isLastPage"
                      @click="nextPage"
                      id="searchstax-pagination-next"
                    >Next ></a>
                  </div>
                </div>
              </template>
               <template #infiniteScroll="{ nextPage }">
                <div className="searchstax-pagination-container">
                <a class="searchstax-pagination-load-more"
                  @click="nextPage"
                >Load More override</a>
              </div>
              </template>
    </SearchstaxPaginationWidget>
  </div>
</template>

<script>
import { SearchstaxPaginationWidget } from '@searchstax-inc/searchstudio-ux-vue';
export default {
  components: {
    SearchstaxPaginationWidget
  }
}
</script>
