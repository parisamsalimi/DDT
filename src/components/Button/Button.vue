<script setup>
import { computed } from "vue";
import "./Button.css";


// define props: to (router-link), href (anchor), type (button)
const props = defineProps({
  to: String, 
  href: String, 
  type: {
    type: String,
    default: "button",
  },
});

// choose element type based on props

const tag = computed(() => {
  if (props.to) return "router-link";
  if (props.href) return "a";
  return "button";
});

const attrs = computed(() => {
  if (props.to) return { to: props.to };
  if (props.href) return { href: props.href, target: "_blank" };
  return { type: props.type };
});
</script>


<template>
  <component :is="tag" v-bind="attrs" class="button">
    <slot />
  </component>
</template>
