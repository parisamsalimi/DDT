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
  This application is a comprehensive house management platform designed using Vue 3, Pinia, and modern web technologies. It delivers a fast, intuitive, and fully responsive experience across desktop and mobile devices. Users can effortlessly browse, search, sort, and manage property listings, with robust features such as real-time form validation, secure CRUD operations, and dynamic recommendations, all optimized for a seamless and professional user experience.
</p>
    </section>

    <!-- Features -->
    <section class="about-section">
      <h2 class="subtitle">Features</h2>
<ul>
  <li>
    Full <b>CRUD functionality</b> (Create, Read, Update, Delete) for managing house listings.
  </li>
  <li>
    <b>Home Page:</b> View all houses with search and sorting options by price or size. Shows “No result found” when no matches exist.
  </li>
  <li>
    <b>House Details (DetailPage.vue):</b> View complete details of a house, including images, description, bedrooms, bathrooms, size, price, and recommended houses. Includes placeholders while loading.
  </li>
  <li>
    <b>Create / Edit House:</b> Add or edit houses using forms with <b>real-time validation</b> and error handling to ensure required fields are filled and data formats are correct.
  </li>
  <li>
    <b>DeleteModal:</b> Secure delete functionality with a confirmation modal to prevent accidental deletion.
  </li>
  <li>
    <b>Search and Sort:</b> Quickly find houses using search functionality and sort listings by price or size.
  </li>
  <li>
    <b>Responsive Design:</b> Fully responsive layout for seamless experience on desktop, tablet, and mobile devices.
  </li>
  <li>
    <b>State Management:</b> Uses <b>Pinia</b> for centralized state management to keep house data consistent across components.
  </li>
  <li>
    <b>Loading & Error Handling:</b> Graceful handling of API loading states and errors with informative messages.
  </li>
  <li>
    <b>Navigation:</b> Intuitive navigation with Header and Footer components for smooth browsing between pages.
  </li>
  <li>
    <b>Environment Variables (.env):</b> Securely store API keys and other sensitive configuration using `.env` files, keeping them out of the codebase and enabling different keys for development and production.
  </li>
  <li>
    <b>Form Validation:</b> Ensures that all required inputs are correctly filled, with immediate user feedback on missing or invalid data.
  </li>
  <li>
    <b>Skeleton / Loading Placeholders:</b> Improves UX by showing skeleton loaders while data is being fetched from the API, avoiding blank screens and indicating content is loading.
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
