<script setup>
import "./HouseDetails.css";
import DeleteListing from "@/components/DeleteModal/DeleteModal.vue";
import back from "@/assets/back.png";
import home from "@/assets/home.png";
import edit from "@/assets/edit.png";
import del from "@/assets/del.png";
import locationIcon from "@/assets/location.png";
import priceIcon from "@/assets/price.png";
import builtIcon from "@/assets/built.png";
import sizeIcon from "@/assets/size.png";
import bedIcon from "@/assets/bed.png";
import bathIcon from "@/assets/bath.png";
import garageIcon from "@/assets/h.png";
import Recommended from "@/components/Recommended/Recommended.vue";
import editwhite from "@/assets/editwhite.png";
import backwhite from "@/assets/backwhite.png";
import deletewhite from "@/assets/deletewhite.png";

import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Main from "@/components/Main/Main.vue";
import Container from "@/components/Container/Container.vue";

import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import Header from "@/components/Header/Header.vue";
const API_KEY = import.meta.env.VITE_API_KEY;
const route = useRoute();
const router = useRouter();

const house = ref(null);
const recommended = ref([]);
const isLoading = ref(true);
const errorMessage = ref("");

// ✅ Modal state
const showDeleteModal = ref(false);

// Navigate to edit page
const goToEdit = () => {
  if (house.value?.id) {
    router.push({ name: "EditHouse", params: { id: house.value.id } });
  }
};

// ✅ Delete function
const confirmDelete = async () => {
  showDeleteModal.value = false;
  router.push({ name: "Home" });
};

const cancelDelete = () => {
  showDeleteModal.value = false;
};

// Fetch house details and recommended houses
async function fetchHouseAndRecommendations(id) {
  isLoading.value = true;
  errorMessage.value = "";
  house.value = null;
  recommended.value = [];

  try {
    const [detailRes, listRes] = await Promise.all([
      fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers: { "X-Api-Key": API_KEY },
      }),
      fetch(`https://api.intern.d-tt.nl/api/houses`, {
        headers: { "X-Api-Key": API_KEY },
      }),
    ]);

    if (!detailRes.ok) throw new Error(`Detail error: ${detailRes.status}`);
    if (!listRes.ok) throw new Error(`List error: ${listRes.status}`);

    const detailData = await detailRes.json();
    house.value = Array.isArray(detailData)
      ? detailData[0] ?? null
      : detailData;

    const all = await listRes.json();

    let rec = Array.isArray(all)
      ? all.filter((h) => h.id !== house.value?.id)
      : [];
    if (house.value?.location?.city) {
      const city = house.value.location.city;
      const sameCity = rec.filter((h) => h.location?.city === city);
      const others = rec.filter((h) => h.location?.city !== city);
      rec = [...sameCity, ...others];
    }
    recommended.value = rec.slice(0, 3);
  } catch (e) {
    console.error(e);
    errorMessage.value = e.message || "Failed to load";
  } finally {
    isLoading.value = false;
  }
}

// Watch route changes to refetch house data

watch(
  () => route.params.id,
  (newId) => {
    if (newId) fetchHouseAndRecommendations(newId);
  },
  { immediate: true }
);

// Navigate back to overview
const goBack = () => router.push({ name: "Home" });
</script>

<template>
  <Header />

  <Main>
    <Container noPadding>
      <div class="back-button" @click="goBack">
        <img :src="back" alt="back" />
        <span>Back to overview</span>
        <div></div>
      </div>

      <div v-if="errorMessage">{{ errorMessage }}</div>
      <div v-else-if="house" class="house-details-wrapper">
        <!-- Left: Details -->
        <div class="house-details">
          <div class="house-details-image">
            <img :src="house.image || home" alt="home" />

            <!-- Mobile action buttons -->
            <div class="action_mobile">
              <img
                class="action_mobile_img"
                :src="backwhite"
                alt="back"
                @click="goBack"
              />
              <div class="delet_edit_img">
                <img
                  class="action_mobile_img"
                  :src="editwhite"
                  alt="edit"
                  @click="goToEdit"
                />
                <img
                  class="action_mobile_img"
                  :src="deletewhite"
                  alt="delete"
                  @click="showDeleteModal = true"
                />
              </div>
            </div>
          </div>
          <div class="house-details-content">
            <div class="house-details-title">
              <h1>
                {{ house.location?.street }} {{ house.location?.houseNumber }}
              </h1>

              <div class="house-details-edit-delete">
                <img :src="edit" alt="edit" @click="goToEdit" />
                <img :src="del" alt="del" @click="showDeleteModal = true" />
              </div>
            </div>
            <div class="house-details-location">
              <img :src="locationIcon" alt="location" />
              <span>{{ house.location?.zip }} {{ house.location?.city }}</span>
            </div>
            <div class="house-more-details">
              <div class="more-details-item">
                <img :src="priceIcon" alt="price" />
                <span> {{ house.price }}</span>
              </div>
              <div class="more-details-item">
                <img :src="sizeIcon" alt="size" />
                <span>{{ house.size }} m²</span>
              </div>
              <div class="more-details-item">
                <img :src="builtIcon" alt="built" />
                <span>Built in {{ house.constructionYear }}</span>
              </div>
            </div>
            <div class="house-more-details">
              <div class="more-details-item">
                <img :src="bedIcon" alt="bed" />
                <span>{{ house.rooms?.bedrooms }}</span>
              </div>
              <div class="more-details-item">
                <img :src="bathIcon" alt="bath" />
                <span>{{ house.rooms?.bathrooms }}</span>
              </div>
              <div class="more-details-item">
                <img :src="garageIcon" alt="garage" />
                <span>{{ house.hasGarage ? "Yes" : "No" }}</span>
              </div>
            </div>
            <p v-if="house.description">{{ house.description }}</p>
          </div>
        </div>
        <Recommended :items="recommended" />
      </div>
    </Container>
  </Main>
  <NavigationBar />

  <!-- Delete Modal -->
  <DeleteListing
    v-if="showDeleteModal"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
