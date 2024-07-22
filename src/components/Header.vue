<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useAllProductsStore } from '../stores/AllProductsStore';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter()
const route = useRoute()

const allProductsStore = useAllProductsStore()

const search = () => {
  allProductsStore.searchedResults()
  allProductsStore.resetInputValue()
  router.push('/results')
}

const isVisible = ref(true)

watch(route, allProductsStore.resetInputValue)

defineProps({
    tabs: {
        type: Array,
        required: true
    }
})

</script>

<template>
  <div class="flex flex-col">
    <transition name="slide-fade">
      <div v-show="isVisible" class="relative bg-black flex transition">
        <div class="m-auto w-[86.1vw] flex flex-col">
          <div class="flex items-center justify-center my-2.5">
            <p class="text-white text-sm font-medium font-satoshi">Sign up and get 20% off to your first order. Sign Up Now</p>
          </div>
        </div>
        <img @click="isVisible = false" class="absolute text-white right-5 top-2.5 cursor-pointer" src="/x.svg" alt="x">
      </div>
    </transition>

    <div class="bg-white flex">
      <div class="m-auto w-[86.1vw] flex flex-col">
        <div class="flex items-center justify-between my-6">
          <router-link to="/">
            <h1 class="text-3xl font-bold font-integral-cf">SHOP.CO</h1>
          </router-link>
          <ul class="flex gap-6">
            <li 
              v-for="tab in tabs" :key="tab.id"
              @click="$router.push(`${tab.route}`)"
              class="text-base font-normal font-satoshi opacity-70 hover:opacity-100 cursor-pointer"
            >
              {{ tab.text }}
            </li>
          </ul>
          <div class="relative w-[46.53%]">
            <input
              @input="allProductsStore.searchProduct" 
              @keypress.enter="search" 
              v-model="allProductsStore.searchQuery"
              class="w-full py-3 pl-12 pr-3 text-base font-normal font-satoshi rounded-3xl bg-stone-100 outline-none" 
              placeholder="Search for products..."
            >
            <img class="absolute top-3.5 left-4 w-[20px] height-[20px]" src="/Vector (3).svg" alt="icon">
            <div v-if="allProductsStore.searchedProducts.length" class="absolute z-10 flex flex-col gap-2 w-full h-fit bg-white shadow-lg">
              <div
                v-for="product in allProductsStore.searchedProducts"
                :key="product.id"
                >
                <router-link :to="`/product-details/${product.title}`">
                  <div class="flex justify-between items-center gap-2 hover:bg-stone-100 p-2">
                    <div 
                      class=" flex gap-2 hover:bg-stone-100 p-3">
                      <img class="w-10" :src="`${product.imgSrc}`" alt="product image">
                      {{ product.title }}
                    </div>
                    <div class="pr-5">
                      <img src="/arrow.svg" alt="go to product">
                    </div>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2">
            <router-link to="/cart">
              <img class="opacity-50 hover:opacity-100" src="/Vector.svg" alt="icon">
            </router-link>
            <router-link to="/register">
              <img class="opacity-50 hover:opacity-100" src="/Vector (2).svg" alt="icon">
            </router-link>
            <span class="inline-flex items-center cursor-pointer rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">Log out</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template> 

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.5s ease;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style>