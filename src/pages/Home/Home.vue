<script setup>
import "./Home.css";
import { ref, computed, onMounted } from "vue";

import { useHousesStore } from "@/stores/houses.js";
import { useHouseStore } from "@/stores/houseStore"; // single house store for edit
import DeleteListing from "@/components/DeleteModal/DeleteModal.vue";
import HouseCard from "@/components/HouseCard/HouseCard.vue";
import Main from "@/components/Main/Main.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import Container from "@/components/Container/Container.vue";
import Header from "@/components/Header/Header.vue";
import NotFound from "@/components/NotFound/NotFound.vue";
import SearchAndSort from "@/components/SearchAndSort/SearchAndSort.vue";
import Button from "@/components/Button/Button.vue";
import HouseCardPlaceholder from "@/components/HouseCardPlaceholder/HouseCardPlaceholder.vue";

const housesStore = useHousesStore();
const houseStore = useHouseStore(); // track edited house
const searchQuery = ref("");
const sortBy = ref("");
// Delete modal state
const isDeleteModalOpen = ref(false);
const houseToDelete = ref(null);

// Fetch houses on mount
onMounted(() => {
  housesStore.fetchHouses();
});

// Open delete modal
const openDeleteModal = (id) => {
  houseToDelete.value = id;
  isDeleteModalOpen.value = true;
};

// Confirm delete
const confirmDelete = async () => {
  isDeleteModalOpen.value = false;
};

// Cancel delete
const cancelDelete = () => {
  isDeleteModalOpen.value = false;
  houseToDelete.value = null;
};

// Filter + sort
const filteredHouses = computed(() => {
  let list = housesStore.houses.sort((a, b) => a.price - b.price);

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    list = list
      .filter(
        (h) =>
          h.location?.street?.toLowerCase().includes(query) ||
          h.location?.city?.toLowerCase().includes(query) ||
          h.location?.zip?.toLowerCase().includes(query) ||
          h.price?.toString().includes(query) ||
          h.size?.toString().includes(query)
      )
      .sort((a, b) => a.price - b.price);
  }

  list = [...list].sort((a, b) => {
    if (houseStore.sortBy === "price") {
      return a.price - b.price;
    } else if (houseStore.sortBy === "size") {
      return a.size - b.size;
    }
    return 0;
  });

  return list;
});
</script>

<template>
  <Header />
  <Main>
    <Container padding>
      <div class="page-title-wrap">
        <h1>Houses</h1>
        <router-link to="/create" class="create-button-link">+</router-link>
        <Button to="/create">+ CREATE NEW</Button>
      </div>

      <SearchAndSort
        v-model:searchQuery="searchQuery"
        @change-sort="(val) => (sortBy = val)"
      />

      <!-- Results count -->
      <div
        v-if="
          searchQuery &&
          filteredHouses.length &&
          !housesStore.isLoading &&
          !housesStore.errorMessage
        "
      >
        {{ filteredHouses.length }} result(s) found
      </div>

      <!--esm in components ashghal ast , ino avaz kon -->
      <NotFound
        v-if="
          searchQuery &&
          filteredHouses.length === 0 &&
          !housesStore.isLoading &&
          !housesStore.errorMessage
        "
      />

      <!-- ✅ Placeholders while loading -->
      <div v-if="housesStore.isLoading">
        <HouseCardPlaceholder v-for="n in 3" :key="n" />
      </div>

      <!-- Error -->
      <div v-else-if="housesStore.errorMessage">
        {{ housesStore.errorMessage }}
      </div>

      <!-- Houses list -->
      <HouseCard v-else :items="filteredHouses" :onDelete="openDeleteModal" />
    </Container>
  </Main>
  <NavigationBar />
  <!-- Delete modal -->
  <DeleteListing
    v-if="isDeleteModalOpen"
    @confirm="confirmDelete"
    @cancel="cancelDelete"
  />
</template>
