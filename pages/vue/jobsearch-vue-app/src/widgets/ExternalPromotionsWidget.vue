<template>
  <div>
    <SearchstaxExternalPromotionsWidget>
              <template #externalPromotions="{ externalPromotionsData, trackClick }">
                <div
                  class="searchstax-external-promotions-container"
                  id="searchstax-external-promotions-container"
                  v-if="externalPromotionsData && externalPromotionsData?.searchExecuted && externalPromotionsData?.hasExternalPromotions"
                >
                  <div
                    class="searchstax-external-promotion searchstax-search-result"
                    v-for="externalPromotion in externalPromotionsData.externalPromotions"
                    :key="externalPromotion.id"
                  >
                    <div class="icon-elevated"></div>
                    <a
                      v-if="externalPromotion.url"
                      href="{{externalPromotion.url}}"
                      @click="trackClick(externalPromotion, $event)"
                      class="searchstax-result-item-link"
                    ></a>
                    <div class="searchstax-search-result-title-container">
                      <span class="searchstax-search-result-title">{{ externalPromotion.name }}</span>
                    </div>
                    <p
                      v-if="externalPromotion.description"
                      class="searchstax-search-result-description searchstax-search-result-common"
                    > {{ externalPromotion.description }} </p>
                    <p
                      v-if="externalPromotion.url"
                      class="searchstax-search-result-description searchstax-search-result-common"
                    > {{ externalPromotion.url }} </p>
                  </div>
                </div>
              </template>
            </SearchstaxExternalPromotionsWidget>
  </div>
</template>

<script>
import { SearchstaxExternalPromotionsWidget } from '@searchstax-inc/searchstudio-ux-vue';
export default {
  components: {
    SearchstaxExternalPromotionsWidget
  }
}
</script>

<style scoped></style>
