import { defineStore } from "pinia";
import { ref } from "vue";
const API_KEY = import.meta.env.VITE_API_KEY;

export const useHousesStore = defineStore("houses", () => {
  const houses = ref([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  // Fetch all houses
  const fetchHouses = async () => {
    isLoading.value = true;
    errorMessage.value = "";
    try {
      const res = await fetch("https://api.intern.d-tt.nl/api/houses/", {
        headers: { "X-Api-Key": API_KEY },
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      houses.value = await res.json();
    } catch (err) {
      errorMessage.value = err.message;
    } finally {
      isLoading.value = false;
    }
  };

  return { houses, isLoading, errorMessage, fetchHouses };
});
