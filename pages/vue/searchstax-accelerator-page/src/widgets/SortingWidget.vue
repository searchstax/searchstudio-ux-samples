<template>
  <div>
    <SearchstaxSortingWidget>
            <template #sorting="{ sortingData, orderChange, selectedSorting }">
              <div
                class="searchstax-sorting-container"
                v-if="sortingData && sortingData?.searchExecuted && sortingData?.hasResultsOrExternalPromotions"
              >
                <label
                  class="searchstax-sorting-label"
                  for="sort-by"
                >Sort By</label>
                <select
                  id="searchstax-search-order-select"
                  class="searchstax-search-order-select"
                  :value="selectedSorting"
                  @change="orderChange($event)"
                >
                  <option value=""> Relevance </option>
                  <option value="date desc"> Newest Content </option>
                  <option value="date asc"> Oldest Content </option>
                </select>
              </div>
            </template>
          </SearchstaxSortingWidget>
  </div>
</template>

<script>
import { SearchstaxSortingWidget } from '@searchstax-inc/searchstudio-ux-vue';
export default {
  components: {
    SearchstaxSortingWidget
  }
}
</script>

<style scoped></style>
