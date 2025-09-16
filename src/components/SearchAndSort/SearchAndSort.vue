<script setup>
import { useHouseStore } from "@/stores/houseStore";
import "./SearchAndSort.css";
import searchIcon from "@/assets/search.png";
import clear from "@/assets/clearSearch.png";
// v-model for binding search input value
const searchQuery = defineModel("searchQuery", { type: String, default: "" });

// Emit event for sorting changes
const emit = defineEmits(["change-sort"]);

// Store instance to manage sorting state
const houseStore = useHouseStore();
</script>

<template>
  <!-- Search + Sort -->
  <section class="search-sort-wrap">
    <!-- Search input with icon -->
    <div class="search">
      <img :src="searchIcon" alt="search" />
      <input v-model="searchQuery" placeholder="Search for a house" />
      <img
        class="clear-search"
        :src="clear"
        v-if="searchQuery.length > 0"
        @click="searchQuery = ''"
        alt="search"
      />
    </div>

    <!-- Sorting buttons (Price / Size) -->
    <div class="row-btn">
      <button
        class="sort-button price"
        :class="{ active: houseStore.sortBy === 'price' }"
        @click="houseStore.setSortBy('price')"
      >
        Price
      </button>

      <!-- Sort by size -->
      <button
        class="sort-button size"
        :class="{ active: houseStore.sortBy === 'size' }"
        @click="houseStore.setSortBy('size')"
      >
        Size
      </button>
    </div>
  </section>
</template>
