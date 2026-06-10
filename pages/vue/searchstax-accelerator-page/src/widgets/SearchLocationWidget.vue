<template>
  <SearchstaxLocationWidget :locationDecode="renderConfig.locationWidget.locationDecode" :locationDecodeCoordinatesToAddress="renderConfig.locationWidget.locationDecodeCoordinatesToAddress" :locationSearchEnabled="renderConfig.locationWidget.locationSearchEnabled" :locationValuesOverride="renderConfig.locationWidget.locationValuesOverride">
    <template
      #location="{
        locationData,
        inputValue,
        locationBlur,
        radiusChange,
        selectValue,
        inputChange,
        locationError,
        getCurrentLocation
      }"
    >
      <div
        class="searchstax-location-input-container"
        data-test-id="searchstax-location-input-container"
      >
        <div class="searchstax-location-input-wrapper">
          <span class="searchstax-location-input-label">NEAR</span>
          <div class="searchstax-location-input-wrapper-inner">
            <input
              type="text"
              id="searchstax-location-input"
              class="searchstax-location-input"
              :class="{ 'searchstax-input-location-error': locationError }"
              placeholder="Zip, Postal Code or City..."
              aria-label="Search Location Input"
              data-test-id="searchstax-location-input"
              @change="inputChange"
              :value="inputValue"
              @blur="locationBlur"
            />
            <button @click="getCurrentLocation" class="searchstax-get-current-location-button">
              Use my current location
            </button>
          </div>
          <span
            v-if="locationData.shouldShowLocationDistanceDropdown"
            class="searchstax-location-input-label"
            >WITHIN</span
          >
          <select
            v-if="locationData.shouldShowLocationDistanceDropdown"
            id="searchstax-location-radius-select"
            class="searchstax-location-radius-select"
            aria-label="Search Location Radius Select"
            data-test-id="searchstax-location-radius-select"
            @change="radiusChange"
            :value="selectValue"
          >
            <option
              v-for="value in locationData.locationSearchDistanceValues"
              :value="value.value"
              :key="value.value"
            >
              {{ value.label }}
            </option>
          </select>
        </div>
      </div>
    </template>
  </SearchstaxLocationWidget>
</template>

<script>
import { SearchstaxLocationWidget } from '@searchstax-inc/searchstudio-ux-vue'
import { renderConfig } from '../../../config'

export default {
  components: {
    SearchstaxLocationWidget
  },
  data() {
    return {
      renderConfig
    }
  }
}
</script>

<style scoped></style>
