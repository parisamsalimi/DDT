<script setup>
import "./DeleteModal.css";
const emit = defineEmits(["confirm", "cancel"]);
</script>

<template>
  <div class="modal-overlay">
    <div class="modal">
      <h2>Delete Listing</h2>
      <p>
        Are you sure you want to delete this listing? This action cannot be
        undone.
      </p>
      <div class="buttons">
        <button class="btn-delete" @click="emit('confirm')">YES, DELETE</button>
        <button class="btn-cancel" @click="emit('cancel')">GO BACK</button>
      </div>
    </div>
  </div>
</template>
<!-- deletemodal components and define event can emit -->
