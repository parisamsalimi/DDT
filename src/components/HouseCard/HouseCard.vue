<script setup>
import "./HouseCard.css";
import { useRouter } from "vue-router";
import homeIcon from "@/assets/home.png";
import bedIcon from "@/assets/bed.png";
import bathIcon from "@/assets/bath.png";
import sizeIcon from "@/assets/size.png";
import editIcon from "@/assets/edit.png";
import delIcon from "@/assets/del.png";
const router = useRouter();

// Props for houses list, recommended mode, and delete callback
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  recommended: {
    type: Boolean,
    required: false,
  },
  onDelete: {
    type: Function,
    required: false,
  },
});
</script>
<template>
  <div
    v-for="(house, index) in items"
    :key="index"
    class="card"
    @click="router.push({ name: 'HouseDetails', params: { id: house.id } })"
  >
    <!-- House image (fallback to default home icon if missing) -->

    <img class="house-card-image" :src="house.image || homeIcon" alt="house" />
    <div class="house-card-details">
      <div class="card-title">
        <strong
          >{{ house.location?.street }}
          {{ house.location?.houseNumber }}</strong
        >

        <!-- Edit/Delete icons (hidden if recommended mode is true) -->
        <div v-if="!recommended" class="card-icons">
          <!-- Edit button (stop propagation to prevent opening details page) -->

          <button
            type="button"
            @click.stop="
              router.push({ name: 'EditHouse', params: { id: house.id } })
            "
          >
            <img class="icon edit" :src="editIcon" alt="edit" />
          </button>

          <!-- Delete button (triggers onDelete callback) -->
          <button type="button" @click.stop="onDelete(house.id)">
            <img class="icon delete" :src="delIcon" alt="delete" />
          </button>
        </div>
      </div>
      
      <!-- Price and city/zip info -->
      <span>€ {{ house.price }}</span>
      <span>{{ house.location?.zip }} {{ house.location?.city }}</span>
      <div class="house-more-details">
        <div class="more-details-item">
          <img :src="bedIcon" alt="bed" />
          <span class="spn">{{ house.rooms?.bedrooms }}</span>
        </div>
        <div class="more-details-item">
          <img :src="bathIcon" alt="bath" />
          <span class="spn">{{ house.rooms?.bathrooms }}</span>
        </div>
        <div class="more-details-item">
          <img :src="sizeIcon" alt="size" />
          <span class="spn">{{ house.size }} m²</span>
        </div>
      </div>
    </div>
  </div>
</template>
