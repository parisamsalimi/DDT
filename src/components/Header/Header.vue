<script setup>
import logo from "@/assets/logo.png";
import "./Header.css";
import Container from "../Container/Container.vue";
</script>

<template>
  <div class="header-bg">
    <Container>
      <div class="header">
        <router-link :to="{ name: 'Home' }" class="nav-link">
          <img class="logo" :src="logo" alt="logo"
        /></router-link>

        <!-- Go to Home -->
        <router-link :to="{ name: 'Home' }" class="nav-link"
          >Houses</router-link
        >

        <!-- Go to About  -->
        <router-link
          :to="{ name: 'AboutUs', params: { id: 1 } }"
          class="nav-link"
        >
          About
        </router-link>
      </div>
    </Container>
  </div>
</template>
 <!-- header component and Provides navigation links -->