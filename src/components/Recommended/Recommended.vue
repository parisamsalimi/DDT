<script setup>
import HouseCard from "../HouseCard/HouseCard.vue";
import "./Recommended.css";
// array of house data passed from parent
const props = defineProps({
  items: {
    type: Array,
    default: [],
  },
});
</script>
<template>
  <!-- Recommended section wrapper -->
  <div class="recommended-wrap">
    <h2>Recommended for you</h2>

    <!-- Render houses using HouseCard in recommended mode -->
    <div class="recommended">
      <HouseCard recommended="true" :items="items" />
    </div>
  </div>
</template>
