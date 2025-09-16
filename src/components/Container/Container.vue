<script setup>
import "./Container.css";
const props = defineProps({
  noPadding: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="container" :class="{ noPadding: noPadding }">
    <slot></slot>
  </div>
</template>

<!--  container component to keep content aligned and responsive -->
