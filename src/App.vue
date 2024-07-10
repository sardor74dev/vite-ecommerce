<script setup>
import { reactive } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

const tabs = reactive([
  {id: 1, text: 'Shop', route: '/'},
  {id: 2, text: 'On Sale', route: '/on-sale'},
  {id: 3, text: 'New Arrivals', route: '/new-arrivals'},
  {id: 4, text: 'Brands', route: '/'},
])

</script>

<template>
  <div class="flex flex-col min-h-full overflow-hidden">
    <Header :tabs="tabs" />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<style scoped>

</style>
