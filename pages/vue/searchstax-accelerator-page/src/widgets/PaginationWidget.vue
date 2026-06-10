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
                      :class="paginationData.isFirstPage ? 'disabled' : ''"
                      tabindex="0"
                      :disabled="paginationData?.isFirstPage"
                      @click="previousPage"
                      @keyup.enter="previousPage"
                      @keyup.space="previousPage"
                      id="searchstax-pagination-previous"
                    > &lt; Previous </a>
                    <div class="searchstax-pagination-details"> {{ paginationData?.startResultIndex }} - {{
                      paginationData?.endResultIndex }} of {{ paginationData?.totalResults }} </div>
                    <a
                      class="searchstax-pagination-next"
                      :class="paginationData.isLastPage ? 'disabled' : ''"
                      tabindex="0"
                      :disabled="paginationData?.isLastPage"
                      @click="nextPage"
                      @keyup.enter="nextPage"
                      @keyup.space="nextPage"
                      id="searchstax-pagination-next"
                    >Next ></a>
                  </div>
                </div>
              </template>
               <template #infiniteScroll="{ nextPage }">
                <div className="searchstax-pagination-container">
                <a class="searchstax-pagination-load-more"
                tabindex="0"
                  @click="nextPage"
                  @keyup.enter="nextPage"
                  @keyup.space="nextPage"
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
