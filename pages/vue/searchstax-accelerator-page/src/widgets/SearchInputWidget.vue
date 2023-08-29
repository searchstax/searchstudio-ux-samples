<template>
  <div>
    <SearchstaxInputWidget
      :afterAutosuggest="afterAutosuggest"
      :beforeAutosuggest="beforeAutosuggest"
      :suggestAfterMinChars="3"
    >
      <template #input="{ suggestions, onMouseLeave, onMouseOver, onMouseClick }">
        <div class="searchstax-search-input-wrapper">
          <input
            type="text"
            id="searchstax-search-input"
            class="searchstax-search-input"
            placeholder="SEARCH FOR..."
          />
          <div
            class="searchstax-autosuggest-container"
            :class="{ hidden: suggestions.length === 0 }"
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
                @mouseover="onMouseOver(suggestion)"
                @click.stop="onMouseClick()"
              ></div>
            </div>
          </div>
          <button
            class="searchstax-spinner-icon"
            id="searchstax-search-input-action-button"
          ></button>
        </div>
      </template>
    </SearchstaxInputWidget>
  </div>
</template>

<script>
import { SearchstaxInputWidget } from '@searchstax-inc/searchstudio-ux-vue'

export default {
  components: {
    SearchstaxInputWidget
  }
}
</script>

<style scoped></style>
