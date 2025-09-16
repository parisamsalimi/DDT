<script setup>
import "./HouseCardPlaceholder.css";
</script>

<template>
  <div class="house-card-placeholder">
    <div class="house-card-image">
      <div class="skeleton-btn"></div>
      <div class="skeleton-btn"></div>
    </div>
    <div class="details">
      <!-- Text skeletons -->
      <div class="skeleton-text title"></div>
      <div class="skeleton-text price"></div>
      <div class="skeleton-text subtitle"></div>

      <div class="details-home">
        <div class="skeleton-icon"></div>
        <div class="skeleton-icon"></div>
        <div class="skeleton-icon"></div>
      </div>
    </div>
  </div>
</template>
