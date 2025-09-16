<script setup>
import "./AboutUs.css";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import Header from "@/components/Header/Header.vue";
</script>
<template>
  <Header />
  <div class="about-container">
    <!-- App Info -->
    <section class="about-section">
      <h1 class="title">About This App</h1>
      <p>
        This app is a house management platform built with Vue 3, Pinia, and
        modern web technologies. It provides a smooth and responsive interface
        for both desktop and mobile users to browse, search, and manage house
        listings with ease.
      </p>
    </section>

    <!-- Features -->
    <section class="about-section">
      <h2 class="subtitle">Features</h2>
      <ul>
        <li>
          Full <b>CRUD functionality</b> (Create, Read, Update, Delete) for
          managing house listings.
        </li>
        <li>
          <b>House Listing (HousePage.vue):</b> View all houses, search, sort by
          price/size and manage listings. Displays “No result
          found” when no matches exist.
        </li>
        <li>
          <b>House Details (DetailPage.vue):</b> View complete details of a
          house, including recommended houses and placeholders while loading.
        </li>
        <li>
          <b>Create / Edit House:</b> Add or edit houses with form validation
          and error handling.
        </li>
        <li>
          <b>Delete House:</b> Secure delete functionality with a confirmation
          modal.
        </li>
        <li><b>About Page:</b> Information about the app and the developer.</li>
        <li>
          <b>Responsive Design:</b> Works seamlessly on both desktop and mobile.
        </li>
      </ul>
    </section>

    <!-- Developer Info -->
    <section class="about-section">
      <h2 class="subtitle">About the Developer</h2>
      <p>
        Hi, I’m Parisa — a passionate and eager Junior Front-End Developer with
        skills in HTML, CSS, JavaScript, Vue.js, and Nuxt.js. I enjoy building
        responsive, user-friendly interfaces and have hands-on experience
        creating full CRUD applications with API integration and Pinia for state
        management.
      </p>
      <p>
        My goal is to grow as a developer and contribute to collaborative,
        innovative teams.
      </p>
    </section>

    <!-- Contact Info -->
    <section class="about-section contact">
      <h2 class="subtitle">📬 Get in Touch</h2>
      <ul>
        <li>
          📧 Email:
          <a href="mailto:parisasalimi159@gmail.com"
            >parisasalimi159@gmail.com</a
          >
        </li>
        <li>
          💼 LinkedIn:
          <a
            href="https://www.linkedin.com/in/parisa-salimi-7233ba325/"
            target="_blank"
          >
            linkedin.com/in/parisa-salimi
          </a>
        </li>
        <li>
          🖥️ GitHub:
          <a href="https://github.com/parisamsalimi" target="_blank">
            github.com/parisamsalimi
          </a>
        </li>
      </ul>
    </section>
    <NavigationBar />
  </div>
</template>
