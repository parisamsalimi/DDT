<script setup>
import empty from "@/assets/empty.png";
import "./NotFound.css";
</script>
<template>
  <div class="not-found">
    <img :src="empty" alt="empty" />
    <span>No result found.</span>
    <span>Please try another keyword.</span>
  </div>
</template>
<!-- Displays an empty state with an image and message when no search results are found -->
