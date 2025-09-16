<script setup>
import { computed } from "vue";
import "./Select.css";

// Props for configuring the select dropdown

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  isRequired: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: "",
  },
  id: {
    type: [String, Number],
    default: "",
  },
});

// Emits updates for v-model
const emit = defineEmits(["update:modelValue"]);

// Add "*" if field is required
const requiredSign = computed(() => (props.isRequired ? "*" : ""));
</script>

<template>
  <div class="select-wrap">
    <!-- Label with required sign if needed -->
    <label>{{ title }} {{ requiredSign }}</label>

    <!-- Select dropdown bound to v-model -->

    <select
      :name="name"
      :id="id"
      :required="isRequired"
      :value="modelValue"
      @change="emit('update:modelValue', $event.target.value)"
    >
      <!-- Placeholder option (disabled so user must pick another) -->
      <option value="" disabled>
        {{ placeholder || "Select an option" }}
      </option>
      <option v-for="opt in options" :key="opt" :value="opt.toLowerCase()">
        {{ opt }}
      </option>
    </select>
  </div>
</template>
