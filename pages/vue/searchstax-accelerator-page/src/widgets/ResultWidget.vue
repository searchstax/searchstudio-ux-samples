<template>
  <div>
    <SearchstaxResultWidget :afterLinkClick="afterLinkClick" :resultsPerPage="renderConfig.resultsWidget.itemsPerPage" :renderMethod="renderConfig.resultsWidget.renderMethod">
      <template #results="{ searchResults, resultClicked }">
        <div class="searchstax-search-results" v-if="searchResults && searchResults.length">
          <a
            :key="searchResult.uniqueId"
            v-for="searchResult in searchResults"
            :href="searchResult.url"
            :data-searchstax-unique-result-id="searchResult.uniqueId"
            @click="resultClicked(searchResult, $event)"
            @keyup.enter="resultClicked(searchResult, $event)"
            @keyup.space="resultClicked(searchResult, $event)"
            class="searchstax-result-item-link searchstax-result-item-link-wrapping"
            tabindex="0"
          >
            <div
              class="searchstax-search-result"
              :class="{
                'has-thumbnail': searchResult.thumbnail,
                promoted: searchResult.promoted,
              }"
            >
              <div
                v-if="searchResult.promoted"
                class="searchstax-search-result-promoted"
              ></div>
              <div
                v-if="searchResult.ribbon"
                class="searchstax-search-result-ribbon"
              >
                {{ searchResult.ribbon }}
              </div>
              <img
                v-if="searchResult.thumbnail"
                :src="searchResult.thumbnail"
                class="searchstax-thumbnail"
              />
              <div class="searchstax-search-result-title-container">
                <span class="searchstax-search-result-title">{{
                  searchResult.title
                }}</span>
              </div>
              <p
                v-if="searchResult.paths"
                class="searchstax-search-result-common"
              >
                {{ searchResult.paths }}
              </p>
              <p
                v-if="searchResult.description"
                class="searchstax-search-result-description searchstax-search-result-common"
              >
                {{ searchResult.description }}
              </p>
              <div
                :key="unmappedField.key"
                v-for="unmappedField in searchResult.unmappedFields"
              >
                <div
                  v-if="
                    unmappedField.isImage &&
                    typeof unmappedField.value === 'string'
                  "
                  class="searchstax-search-result-image-container"
                >
                  <img
                    :src="unmappedField.value"
                    class="searchstax-result-image"
                  />
                </div>
                <div v-else>
                  <p class="searchstax-search-result-common">
                    {{ unmappedField.value }}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </template>
    </SearchstaxResultWidget>
  </div>
</template>

<script>
import { SearchstaxResultWidget } from '@searchstax-inc/searchstudio-ux-vue'
import {renderConfig} from '../../../config';


export default {
  components: {
    SearchstaxResultWidget
  },
  data(){
    return{
      renderConfig
    }
  },
}
</script>

<style scoped></style>
