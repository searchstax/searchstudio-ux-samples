<template>
  <div>
    <SearchstaxInputWidget
      :afterAutosuggest="afterAutosuggest"
      :beforeAutosuggest="beforeAutosuggest"
      :suggestAfterMinChars="renderConfig.inputWidget.suggestAfterMinChars"
    >
    <template #input="{ suggestions, onMouseLeave, onMouseOver, onMouseClick }">
            <div class="searchstax-search-input-wrapper">
              <input
                type="text"
                id="searchstax-search-input"
                class="searchstax-search-input"
                placeholder="SEARCH FOR..."
                aria-label="search"
              />
              <div
                class="searchstax-autosuggest-container"
                :class="{ 'hidden': suggestions.length === 0 }"
                @mouseleave="onMouseLeave"
              >
                <div
                  class="searchstax-autosuggest-item"
                  v-for="suggestion in suggestions"
                  :key="suggestion.term"
                >
                  <div
                    class="searchstax-autosuggest-item-term-container"
                    v-html="suggestion.term"
                    tabindex="0"
                    @mouseover="onMouseOver(suggestion)"
                    @click.stop="onMouseClick()"
                  ></div>
                </div>
              </div>
            </div>
            <SearchstaxLocationWidget />
            <button
              class="searchstax-spinner-icon"
              id="searchstax-search-input-action-button"
              aria-label="search"
              role="button"
            >
            </button>
          </template>
    </SearchstaxInputWidget>
  </div>
</template>

<script>
import { SearchstaxInputWidget } from '@searchstax-inc/searchstudio-ux-vue'
import SearchstaxLocationWidget from '@/widgets/SearchLocationWidget.vue';
import {renderConfig} from '../../../config';


export default {
  components: {
    SearchstaxInputWidget,
    SearchstaxLocationWidget
  },
  data(){
    return{
      renderConfig
    }
  },
}
</script>

<style scoped></style>
