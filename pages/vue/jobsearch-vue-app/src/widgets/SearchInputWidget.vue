<template>
    <SearchstaxInputWidget
      :suggestAfterMinChars="3"
    >
      <template #input="{ suggestions, onMouseLeave, onMouseOver, onMouseClick }">
          <input
            type="text"
            id="searchstax-search-input"
            class="searchstax-search-input"
            placeholder="Search by title, skill or company"
            aria-label="search"
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
                tabindex="0"
                @mouseover="onMouseOver(suggestion)"
                @click.stop="onMouseClick()"
              ></div>
            </div>
          </div>
          <button
            class="searchstax-spinner-icon"
            id="searchstax-search-input-action-button"
            aria-label="search"
            role="button"
          ></button>
      </template>
    </SearchstaxInputWidget>
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
