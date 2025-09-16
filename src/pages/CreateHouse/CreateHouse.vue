]
<script setup>
import "./CreateHouse.css";
import { computed, onMounted, ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import Header from "@/components/Header/Header.vue";
import Main from "@/components/Main/Main.vue";
import Container from "@/components/Container/Container.vue";
import InputWithLabel from "@/components/InputWithLabel/InputWithLabel.vue";
import Select from "@/components/Select/Select.vue";
import Button from "@/components/Button/Button.vue";

import imgback from "@/assets/imgback.png";

import clear from "@/assets/clear.png";
import back from "@/assets/back.png";

const route = useRoute();
const router = useRouter();
const houseImage = ref(""); // Stores uploaded house image
const garageOptions = ["yes", "no"]; // Garage dropdown options
const isSubmitted = ref(false); // Tracks form submission
const houseId = route.params.id;
const isEditPage = route.path.includes("/edit");
const errors = ref({}); // Validation errors

// Form fields
const form = reactive({
  street: "",
  houseNumber: "",
  numberAddition: "",
  postalCode: "",
  city: "",
  price: "",
  size: "",
  garage: "",
  bedrooms: "",
  bathrooms: "",
  construction: "",
  description: "",
});

// Computed properties
const pageTitle = computed(() =>
  isEditPage ? "Edit listing" : "Create new listing"
);
const buttonTitle = computed(() => (isEditPage ? "Save" : "Post"));
const backButtonTitle = computed(() =>
  isEditPage ? "Back to detail page" : "Back to overview"
);

// Navigate back depending on page type
const goBack = () => {
  if (isEditPage) {
    router.push({ name: "HouseDetails", params: { id: houseId } });
  } else {
    router.push({ name: "Home" });
  }
};

// Handle image upload
function handleFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    houseImage.value = file;
  }
}
// Trigger hidden file input
function triggerFileInput() {
  document.getElementById("fileInput").click();
}
// Remove uploaded image
function removeImage() {
  houseImage.value = "";
}

// Simple required field validation
function validateField(field) {
  if (!form[field]) {
    errors.value[field] = "Required field missing";
  } else {
    delete errors.value[field];
  }
}

// Lifecycle hooks
onMounted(async () => {
  if (isEditPage) {
    try {
      const res = await fetch(
        `https://api.intern.d-tt.nl/api/houses/${houseId}`,
        {
          headers: { "X-Api-Key": "Jd3eR4Uz0cAPOQ8Ifr_ka5yoZwlVXMhb" },
        }
      );
      if (!res.ok) throw new Error("Failed to load house details");
      const data = await res.json();
      const house = data[0];

      Object.assign(form, {
        street: house.location.street,
        houseNumber: house.location.houseNumber,
        numberAddition: house.location.numberAddition || "",
        postalCode: house.location.zip,
        city: house.location.city,
        price: house.price,
        size: house.size,
        garage: house.hasGarage ? "yes" : "no",
        bedrooms: house.rooms.bedrooms,
        bathrooms: house.rooms.bathrooms,
        construction: house.constructionYear,
        description: house.description,
      });

      houseImage.value = house.image;
    } catch (err) {
      console.error(err);
    }
  }
});

// Form submission
async function handleSubmit() {
  isSubmitted.value = true;
  errors.value = {};

  const requiredFields = [
    "street",
    "houseNumber",
    "postalCode",
    "city",
    "price",
    "size",
    "bedrooms",
    "bathrooms",
    "construction",
    "description",
  ];

  requiredFields.forEach((field) => {
    if (!form[field]) errors.value[field] = "Required field missing";
  });

  if (!houseImage.value) errors.value.picture = "Required field missing";

  if (Object.keys(errors.value).length > 0) return; // Stop if errors exist

  try {
    const formData = new FormData();
    formData.append("streetName", form.street);
    formData.append("houseNumber", form.houseNumber);
    formData.append("numberAddition", form.numberAddition || "");
    formData.append("zip", form.postalCode);
    formData.append("city", form.city);
    formData.append("price", form.price);
    formData.append("size", form.size);
    formData.append("bedrooms", form.bedrooms);
    formData.append("bathrooms", form.bathrooms);
    formData.append("constructionYear", form.construction);
    formData.append("hasGarage", form.garage === "yes");
    formData.append("description", form.description);

    // If houseImage is a File (new upload), append it
    if (houseImage.value instanceof File) {
      formData.append("image", houseImage.value);
    }

    const res = await fetch("https://api.intern.d-tt.nl/api/houses", {
      method: "POST",
      headers: { "X-Api-Key": "Jd3eR4Uz0cAPOQ8Ifr_ka5yoZwlVXMhb" },
      body: formData,
    });

    if (!res.ok) throw new Error("Failed to create house");
    const data = await res.json();
    router.push({ name: "HouseDetails", params: { id: data.id } });
  } catch (err) {
    console.error(err);
    alert("Error creating house.");
  }
}

const previewUrl = computed(() =>
  houseImage.value instanceof File
    ? URL.createObjectURL(houseImage.value)
    : houseImage.value
);

console.log("111", previewUrl);
</script>

<template>
  <Header />
  <!-- Main content wrapper -->
  <Main>
    <div class="background" :style="{ backgroundImage: `url(${imgback})` }">
      <Container>
        <!-- Back button -->
        <div class="back-button" @click="goBack">
          <img :src="back" alt="back" />
          <span>{{ backButtonTitle }}</span>
        </div>
        <!-- Page title with back icon -->
        <div class="page_title">
          <img :src="back" alt="back" @click="goBack" class="back-icon" />
          <h1>{{ pageTitle }}</h1>
          <div></div>
        </div>

        <!-- Form for creating/editing house -->
        <form
          novalidate
          class="create-house-wrap"
          @submit.prevent="handleSubmit"
        >
          <!-- Street input -->
          <InputWithLabel
            isRequired
            title="Street name"
            :error="isSubmitted ? errors.street : ''"
            v-model="form.street"
            @input="validateField('street')"
            placeholder="Enter the street name"
          />
          <!-- House number + addition -->
          <div class="double-input-wrapper">
            <InputWithLabel
              isRequired
              title="House number"
              :error="isSubmitted ? errors.houseNumber : ''"
              v-model="form.houseNumber"
              @input="validateField('houseNumber')"
              placeholder="Enter house number"
            />
            <InputWithLabel
              title="Addition (optional)"
              v-model="form.numberAddition"
              placeholder="e.g.A"
            />
          </div>
          <!-- Postal code -->
          <InputWithLabel
            isRequired
            title="Postal code"
            :error="isSubmitted ? errors.postalCode : ''"
            v-model="form.postalCode"
            @input="validateField('postalCode')"
            placeholder="e.g. 1000AA"
          />
          <!-- City -->
          <InputWithLabel
            isRequired
            title="City"
            :error="isSubmitted ? errors.city : ''"
            v-model="form.city"
            @input="validateField('city')"
            placeholder="e.g. Utrecht"
          />
          <!-- Image upload -->
          <div class="file-input-wrap">
            <label>Upload picture (PNG or JPG)*</label>
            <div
              v-if="!previewUrl"
              class="file-input"
              @click="triggerFileInput"
              :class="{ error: errors.picture }"
            >
              <span>+</span>
            </div>
            <input
              id="fileInput"
              type="file"
              accept="image/png, image/jpeg"
              style="display: none"
              @change="handleFileChange"
            />
            <div v-if="previewUrl" class="house-image-wrap">
              <img
                :src="clear"
                alt="delete-image"
                @click="removeImage"
                class="clear-icon"
              />
              <img :src="previewUrl" alt="preview" class="house-image" />
            </div>
            <p v-if="errors.picture && !houseImage" class="error-message">
              {{ errors.picture }}
            </p>
          </div>
          <!-- Price -->
          <InputWithLabel
            isRequired
            title="Price"
            :error="isSubmitted ? errors.price : ''"
            v-model="form.price"
            @input="validateField('price')"
            placeholder="e.g. €1000"
          />
          <!-- Size + Garage select -->
          <div class="double-input-wrapper">
            <InputWithLabel
              isRequired
              title="Size"
              :error="isSubmitted ? errors.size : ''"
              v-model="form.size"
              @input="validateField('size')"
              placeholder="e.g. 60m2"
            />
            <Select
              placeholder="Select"
              isRequired
              title="Garage"
              :options="garageOptions"
              v-model="form.garage"
            />
          </div>
          <!-- Bedrooms + Bathrooms -->
          <div class="double-input-wrapper">
            <InputWithLabel
              isRequired
              title="Bedrooms"
              :error="isSubmitted ? errors.bedrooms : ''"
              v-model="form.bedrooms"
              @input="validateField('bedrooms')"
              placeholder="Enter amount"
            />
            <InputWithLabel
              isRequired
              title="Bathrooms"
              :error="isSubmitted ? errors.bathrooms : ''"
              v-model="form.bathrooms"
              @input="validateField('bathrooms')"
              placeholder="Enter amount"
            />
          </div>
          <!-- Construction date -->
          <InputWithLabel
            isRequired
            title="Construction date"
            :error="isSubmitted ? errors.construction : ''"
            v-model="form.construction"
            @input="validateField('construction')"
            placeholder="e.g. 1990"
          />
          <!-- Description -->
          <InputWithLabel
            isRequired
            title="Description"
            :error="isSubmitted ? errors.description : ''"
            v-model="form.description"
            @input="validateField('description')"
            placeholder="Enter description"
          />
          <!-- Submit button -->
          <div class="button-wrap">
            <Button type="submit">{{ buttonTitle }}</Button>
          </div>
        </form>
      </Container>
    </div>
  </Main>
  <!-- Navigation bar footer -->
  <NavigationBar />
</template>
