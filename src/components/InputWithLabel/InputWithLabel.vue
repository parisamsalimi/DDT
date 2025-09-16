<script setup>
import { computed } from "vue";
import "./InputWithLabel.css";

// Props for input field configuration
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  }, 
  title: { type: String, required: true },
  placeholder: { type: String, default: "" },
  isRequired: { type: Boolean, default: false },
  error: { type: String, default: "" },
});

// Emits input changes for v-model
const emit = defineEmits(["update:modelValue"]);

// Adds "*" sign if input is required
const requiredSign = computed(() => (props.isRequired ? "*" : ""));
</script>

<template>
  <div class="input-wrap">
        <!-- Label with optional required sign -->
    <label>{{ title }} {{ requiredSign }}</label>
        <!-- Input bound to v-model -->
    <input
      :placeholder="placeholder"
      :required="isRequired"
      type="text"
      :name="title"
      :id="title"
      :class="{ error: error }"
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value)"
    />
        <!-- Error message -->

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>
