<script setup>
import { computed, reactive } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const showHeaderAndFooter = computed(() => route.path !== '/register' && route.path !== '/login')

const tabs = reactive([
  {id: 1, text: 'Shop', route: '/'},
  {id: 2, text: 'On Sale', route: '/on-sale'},
  {id: 3, text: 'New Arrivals', route: '/new-arrivals'},
  {id: 4, text: 'Brands', route: '/'},
])

</script>

<template>
  <div class="flex flex-col min-h-full overflow-hidden">
    <Header v-if="showHeaderAndFooter" :tabs="tabs" />
    <router-view></router-view>
    <Footer v-if="showHeaderAndFooter" />
  </div>
</template>

<style scoped>

</style>
