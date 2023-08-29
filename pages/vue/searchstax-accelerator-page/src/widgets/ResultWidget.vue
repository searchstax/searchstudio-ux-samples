<template>
  <div>
    <SearchstaxResultWidget :afterLinkClick="afterLinkClick">
      <template #results="{ searchResults, resultClicked }">
        <div class="searchstax-search-results" v-if="searchResults && searchResults.length">
          <div
            class="searchstax-search-result"
            :class="{ 'has-thumbnail': searchResult.thumbnail }"
            :key="searchResult.uniqueId"
            v-for="searchResult in searchResults"
          >

            <div :key="unmappedField.key" v-for="unmappedField in searchResult.unmappedFields">
                <div
                  v-if="unmappedField.isImage && typeof unmappedField.value === 'string'"
                  class="searchstax-search-result-image-container"
                >
                  <img :src="unmappedField.value" class="searchstax-result-image" />
                </div>
                <div v-else>
                  <p class="searchstax-search-result-common">{{ unmappedField.value }}</p>
                </div>
            </div>

            <div class="searchstax-search-result-content">

                <div class="searchstax-search-result-title-wrapper">

                    <div class="searchstax-search-result-title-container">
                      <h2 class="searchstax-search-result-title">{{ searchResult.title }}</h2>
                    </div>

                    
                    <div v-if="searchResult.ribbon" class="searchstax-search-result-ribbon">
                      <span class="pill">{{ searchResult.ribbon }}</span>
                      <div v-if="searchResult.promoted" class="searchstax-search-result-promoted"></div>
                    </div>
                </div>
                <p
                  v-if="searchResult.description"
                  class="searchstax-search-result-description searchstax-search-result-common"
                >
                  {{ searchResult.description }}
                </p>
            </div>

            
            <a
              v-if="searchResult.url"
              :href="searchResult.url"
              :data-searchstax-unique-result-id="searchResult.uniqueId"
              @click="resultClicked(searchResult, $event)"
              class="searchstax-result-item-link"
            ></a>

          </div>
        </div>
      </template>
    </SearchstaxResultWidget>
  </div>
</template>

<script>
import { SearchstaxResultWidget } from '@searchstax-inc/searchstudio-ux-vue'

export default {
  components: {
    SearchstaxResultWidget
  }
}
</script>

<style scoped></style>
