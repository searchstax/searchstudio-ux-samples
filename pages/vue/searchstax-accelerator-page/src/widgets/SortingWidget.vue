<template>
  <div>
    <SearchstaxSortingWidget>
      <template #sorting="{ sortingData, orderChange, selectedSorting }">
              <div
                class="searchstax-sorting-container"
                v-if="sortingData && sortingData?.searchExecuted && sortingData?.hasResultsOrExternalPromotions && sortingData?.sortOptions.length > 0"
              >
                <label
                  class="searchstax-sorting-label"
                  for="searchstax-search-order-select"
                >Sort By</label>
                <select
                  id="searchstax-search-order-select"
                  class="searchstax-search-order-select"
                  :value="selectedSorting"
                  @change="orderChange($event)"
                >
                <option v-for="sortOption in sortingData.sortOptions"
                :key="sortOption.key" :value="sortOption.key"> {{ sortOption.value }} </option>
                </select>
              </div>
            </template>
          </SearchstaxSortingWidget>
  </div>
</template>

<script>
import { SearchstaxSortingWidget } from '@searchstax-inc/searchstudio-ux-vue';
import {renderConfig} from '../../../config';
export default {
  components: {
    SearchstaxSortingWidget
  },
  data(){
    return{
      renderConfig
    }
  },
}
</script>

<style scoped></style>
