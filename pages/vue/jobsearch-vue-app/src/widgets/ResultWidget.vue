<template>
  <div>
    <SearchstaxResultWidget>
      <template #results="{ searchResults, resultClicked }">
        <div class="searchstax-search-results" v-if="searchResults && searchResults.length">
          <div
            class="searchstax-search-result"
            :class="{ 'has-thumbnail': searchResult.thumbnail, promoted: searchResult.promoted }"
            :key="searchResult.uniqueId"
            v-for="searchResult in searchResults"
            @click="resultClicked(searchResult, $event)"
          >
            <div class="searchstax-search-result-content">
              <div class="searchstax-search-result-title-wrapper">
                <div class="searchstax-search-result-title-container">
                  <h3 class="searchstax-search-result-title">{{ searchResult.title }}</h3>
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
                <b>Description:</b> <br />
                {{ searchResult.description }}
              </p>
              <b class="date">{{ searchResult.date }}</b>

              <div :key="unmappedField.key" v-for="unmappedField in searchResult.unmappedFields">
                <div
                  v-if="unmappedField.isImage && typeof unmappedField.value === 'string'"
                  class="searchstax-search-result-image-container"
                >
                  <img :src="unmappedField.value" class="searchstax-result-image" />
                </div>
                <div class="skills" v-else>
                  <label>Skills required:</label>
                  <p class="searchstax-search-result-common">
                    {{ unmappedField.value }}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <button v-if="searchResult.url" class="btn-primary apply-btn">Apply</button>
            </div>

            
          </div>
        </div>
      </template>
    </SearchstaxResultWidget>
  </div>
</template>

<script>
import { SearchstaxResultWidget } from '@searchstax-inc/searchstudio-ux-vue'

export default {
  data() {
    return {}
  },
  methods: {
    skillValues(values) {
      return values.length > 200 ? 'See Job Description' : values
    }
  },
  components: {
    SearchstaxResultWidget
  }
}
</script>

<style scoped>
.date {
  color: #2196f3;
}
</style>
