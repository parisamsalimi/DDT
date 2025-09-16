import { defineStore } from "pinia";
import { ref } from "vue";
const API_KEY = import.meta.env.VITE_API_KEY;

export const useHouseStore = defineStore("house", () => {
  const houses = ref([]);
  const currentHouse = ref(null);
  const isLoading = ref(false);
  // NEW: sort state
  const sortBy = ref("price"); // default sort field
  function setSortBy(val) {
    sortBy.value = val;
  }

  // 🔹 Fetch one house by id
  async function fetchHouse(id) {
    try {
      isLoading.value = true;
      const res = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        headers: { "X-Api-Key": API_KEY },
      });
      if (!res.ok) throw new Error("Failed to fetch house");
      currentHouse.value = await res.json();
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      isLoading.value = false;
    }
  }

  // 🔹 Update house
  async function updateHouse(id) {
    try {
      const res = await fetch(`https://api.intern.d-tt.nl/api/houses/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY,
        },
        body: JSON.stringify({
          streetName: currentHouse.value.location.street,
          houseNumber: currentHouse.value.location.houseNumber,
          numberAddition: currentHouse.value.location.addition,
          zip: currentHouse.value.location.zip,
          city: currentHouse.value.location.city,
          price: Number(currentHouse.value.price),
          size: Number(currentHouse.value.size),
          bedrooms: Number(currentHouse.value.rooms.bedrooms),
          bathrooms: Number(currentHouse.value.rooms.bathrooms),
          constructionYear: Number(currentHouse.value.constructionYear),
          hasGarage: Boolean(currentHouse.value.hasGarage),
          description: currentHouse.value.description,
          image: currentHouse.value.image, // keep image if present
        }),
      });

      return res.ok;
    } catch (err) {
      console.error("❌ Update error:", err);
      return false;
    }
  }

  // ✅ Important: RETURN inside defineStore, not outside!
  return {
    houses,
    currentHouse,
    isLoading,
    setSortBy,
    sortBy,
    fetchHouse,
    updateHouse,
  };
});
