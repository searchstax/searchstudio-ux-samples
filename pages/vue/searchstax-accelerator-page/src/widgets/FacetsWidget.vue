<template>
  <div>
    <SearchstaxFacetsWidget :facetingType="'or'" :itemsPerPageDesktop="3" :itemsPerPageMobile="99">
      <template
        #desktopFacets="{
          facetsTemplateDataDesktop,
          isNotDeactivated,
          toggleFacetGroup,
          isChecked,
          selectFacet,
          showMoreLessDesktop,
          facetContainers
        }"
      >
        <div
          v-if="facetsTemplateDataDesktop?.hasResultsOrExternalPromotions"
          class="searchstax-facets-container-desktop"
        >
          <div
            v-for="facet in facetsTemplateDataDesktop.facets"
            :key="facet"
            class="searchstax-facet-container"
            :class="{ active: isNotDeactivated(facet.name) }"
          >
            <div>
              <div class="searchstax-facet-title-container" @click="toggleFacetGroup(facet.name)">
                <div class="searchstax-facet-title">{{ facet.label }}</div>
                <div class="searchstax-facet-title-arrow active"></div>
              </div>
              <div class="searchstax-facet-values-container">
                <div
                  v-for="(facetValue, key) in facet.values"
                  :key="facetValue.value + facetValue.parentName"
                  class="searchstax-facet-value-container"
                  :class="{ 'searchstax-facet-value-disabled': facetValue.disabled }"
                  :ref="
                    (el) => {
                      facetContainers[key + facet.name] = el
                    }
                  "
                >
                  <div class="searchstax-facet-input">
                    <input
                      type="checkbox"
                      class="searchstax-facet-input-checkbox"
                      :checked="isChecked(facetValue)"
                      :disabled="facetValue.disabled"
                      @click="selectFacet(key + facet.name, $event, facetValue, true)"
                    />
                  </div>
                  <div
                    class="searchstax-facet-value-label"
                    @click="selectFacet(key + facet.name, $event, facetValue, false)"
                  >
                    {{ facetValue.value }}
                  </div>
                  <div
                    class="searchstax-facet-value-count"
                    @click="selectFacet(key + facet.name, $event, facetValue, false)"
                  >
                    ({{ facetValue.count }})
                  </div>
                </div>
                <div class="searchstax-facet-show-more-container" v-if="facet.hasMoreFacets">
                  <div
                    class="searchstax-facet-show-more-container"
                    @click="showMoreLessDesktop($event, facet)"
                  >
                    <div
                      v-if="facet.showingAllFacets"
                      class="searchstax-facet-show-less-button searchstax-facet-show-button"
                    >
                      less
                    </div>
                    <div
                      v-else
                      class="searchstax-facet-show-more-button searchstax-facet-show-button"
                    >
                      more
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template
        #mobileFacets="{
          facetsTemplateDataMobile,
          selectedFacetsCheckboxes,
          isNotDeactivated,
          toggleFacetGroup,
          isChecked,
          selectFacet,
          showMoreLessDesktop,
          facetContainers,
          openOverlay,
          unselectFacet,
          unselectAll,
          closeOverlay
        }"
      >
        <div
          class="searchstax-facets-container-mobile"
          v-if="facetsTemplateDataMobile?.hasResultsOrExternalPromotions"
        >
          <div class="searchstax-facets-pills-container">
            <div
              class="searchstax-facets-pill searchstax-facets-pill-filter-by"
              @click="openOverlay"
            >
              <div class="searchstax-facets-pill-label">Filter By</div>
            </div>
            <div class="searchstax-facets-pills-selected">
              <div
                class="searchstax-facets-pill searchstax-facets-pill-facets"
                v-for="facet in selectedFacetsCheckboxes"
                :key="facet.value"
                @click="unselectFacet(facet)"
              >
                <div class="searchstax-facets-pill-label">
                  {{ facet.value }} ({{ facet.count }})
                </div>
                <div class="searchstax-facets-pill-icon-close"></div>
              </div>
            </div>
            <div
              class="searchstax-facets-pill searchstax-clear-filters searchstax-facets-pill-clear-all"
              v-if="selectedFacetsCheckboxes.length"
              @click="unselectAll"
            >
              <div class="searchstax-facets-pill-label">Clear Filters</div>
            </div>
          </div>
          <div
            class="searchstax-facets-mobile-overlay"
            :class="{ 'searchstax-show': facetsTemplateDataMobile?.overlayOpened }"
          >
            <div class="searchstax-facets-mobile-overlay-header">
              <div class="searchstax-facets-mobile-overlay-header-title">Filter By</div>
              <div class="searchstax-search-close" @click="closeOverlay"></div>
            </div>
            <div class="searchstax-facets-container-mobile">
              <div
                v-for="facet in facetsTemplateDataMobile?.facets"
                :key="facet"
                class="searchstax-facet-container"
                :class="{ active: isNotDeactivated(facet.name) }"
              >
                <div>
                  <div
                    class="searchstax-facet-title-container"
                    @click="toggleFacetGroup(facet.name)"
                  >
                    <div class="searchstax-facet-title">{{ facet.label }}</div>
                    <div class="searchstax-facet-title-arrow active"></div>
                  </div>
                  <div class="searchstax-facet-values-container">
                    <div
                      v-for="(facetValue, key) in facet.values"
                      :key="facetValue.value + facetValue.parentName"
                      class="searchstax-facet-value-container"
                      :class="{ 'searchstax-facet-value-disabled': facetValue.disabled }"
                      :ref="
                        (el) => {
                          facetContainers[key + facet.name] = el
                        }
                      "
                    >
                      <div class="searchstax-facet-input">
                        <input
                          type="checkbox"
                          class="searchstax-facet-input-checkbox"
                          :checked="isChecked(facetValue)"
                          :disabled="facetValue.disabled"
                          @click="selectFacet(key + facet.name, $event, facetValue, true)"
                        />
                      </div>
                      <div
                        class="searchstax-facet-value-label"
                        @click="selectFacet(key + facet.name, $event, facetValue, false)"
                      >
                        {{ facetValue.value }}
                      </div>
                      <div
                        class="searchstax-facet-value-count"
                        @click="selectFacet(key + facet.name, $event, facetValue, false)"
                      >
                        ({{ facetValue.count }})
                      </div>
                    </div>
                    <div class="searchstax-facet-show-more-container" v-if="facet.hasMoreFacets">
                      <div
                        class="searchstax-facet-show-more-container"
                        @click="showMoreLessDesktop($event, facet)"
                      >
                        <div
                          v-if="facet.showingAllFacets"
                          class="searchstax-facet-show-less-button searchstax-facet-show-button"
                        >
                          less
                        </div>
                        <div
                          v-else
                          class="searchstax-facet-show-more-button searchstax-facet-show-button"
                        >
                          more
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <button class="searchstax-facets-mobile-overlay-done" @click="closeOverlay">
              Done
            </button>
          </div>
        </div>
      </template>
    </SearchstaxFacetsWidget>
  </div>
</template>

<script>
import { SearchstaxFacetsWidget } from '@searchstax-inc/searchstudio-ux-vue'
export default {
  components: {
    SearchstaxFacetsWidget
  }
}
</script>

<style scoped></style>
