<script setup>
import housemob from "@/assets/housemob.png";
import about from "@/assets/about.png";
import "./NavigationBar.css";
</script>

<template>
  <div class="footer">
    <div class="pic">
      <router-link to="/" class="nav-link">
        <img :src="housemob" alt="home" />
      </router-link>
      <router-link to="/about">
        <img :src="about" alt="about" />
      </router-link>
    </div>
  </div>
</template>
<!--Footer navigation with icons for Home and About pages in mobile-->

