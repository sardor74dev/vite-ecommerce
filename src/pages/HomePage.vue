<script setup>
import { onMounted, reactive } from 'vue';
import Products from '../components/Products.vue'
import Comment from '../components/Comment.vue';
import { useAllProductsStore } from '../stores/AllProductsStore'
import { useCommentsStore } from '../stores/CommentsStore';

const allProductsStore = useAllProductsStore()
const commentsStore = useCommentsStore()

const companiesLogo = reactive([
    { id: 1, imgSrc: '/versace.svg' },
    { id: 2, imgSrc: '/zara.svg' },
    { id: 3, imgSrc: '/gucci.svg' },
    { id: 4, imgSrc: '/prada.svg' },
    { id: 5, imgSrc: '/calvin-klein.svg' },
])

onMounted(async() => {
  await allProductsStore.fetchingProducts()
  await commentsStore.fetchingComments()
})
</script>

<template>
  <div class="relative flex flex-col">
    <div class="m-auto w-[86.1vw] flex flex-row flex-wrap justify-between">
      <div class="flex flex-col gap-[48px] my-[90px]">
        <div class="flex flex-col gap-[32px]">
          <h1 class="max-w-[577px] leading-[64px] text-[64px] font-integral-cf font-bold">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p class="max-w-[545px] text-sm font-normal text-[#00000099]">
            Browse through our diverse range of meticulously crafted garments, 
            designed to bring out your individuality and cater to your sense of style.
          </p>
          <button class="max-w-[210px] py-[16px] px-[54px] bg-black rounded-[62px]">
            <p class="text-white text-base font-semibold">Shop Now</p>
          </button>
        </div>
        <div class="flex flex-row gap-[32px]">
          <div class="flex flex-col">
            <h2 class="leading-[54px] text-[40px] font-bold">200+</h2>
            <p class="text-base text-[#00000099] font-normal">International Brands</p>
          </div>
          <div class="w-[1px] h-full bg-[#00000019]"></div>
          <div class="flex flex-col">
            <h2 class="leading-[54px] text-[40px] font-bold">2,000+</h2>
            <p class="text-base text-[#00000099] font-normal">High-Quality Products</p>
          </div>
          <div class="w-[1px] h-full bg-[#00000019]"></div>
          <div class="flex flex-col">
            <h2 class="leading-[54px] text-[40px] font-bold">30,000+</h2>
            <p class="text-base text-[#00000099] font-normal">Happy Customers</p>
          </div>
        </div>
      </div>
      <img class="h-[663px]" src="/Rectangle_2-removebg-preview.png">
      <img class="absolute top-[297px] right-[634px]" src="/Vector (4).svg" alt="vector">
      <img class="absolute top-[86px] right-[81px]" src="/Vector (5).svg" alt="vector">
    </div>
  </div>
  <div class="bg-black flex">
    <div class="m-auto w-[86.1vw] flex flex-col">
      <div class="flex flex-wrap gap-[100px] items-center justify-center my-11">
        <div v-for="logo in companiesLogo" :key="logo.id">
          <img class="cursor-pointer" :src="`${logo.imgSrc}`" alt="logo">
        </div>
      </div>
    </div>
  </div>
  
  <div class="flex flex-col">
    <div class="bg-white flex">
      <div class="m-auto w-[86.1vw] flex flex-col">
        <div class="flex items-center justify-center my-[72px]">
          <h1 class="text-black uppercase text-5xl font-bold font-integral-cf">new arrivals</h1>
        </div>
        <div class="flex flex-row flex-wrap justify-center gap-[19px] mb-[30px]">
          <Products category="new arrivals"/>
        </div>
        <div class="flex items-center justify-center mt-[36px] mb-[64px]">
          <button class="max-w-[210px] py-[16px] px-[54px] bg-white border-2 border-solid border-[#00000019] rounded-[62px]">
            <p class="text-black text-base font-semibold font-satoshi">View All</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col">
    <div class="bg-white flex">
      <div class="m-auto w-[86.1vw] flex flex-col">
        <div class="w-full h-[1px] bg-[#00000019]"></div>
        <div class="flex items-center justify-center my-[72px]">
          <h1 class="text-black uppercase text-5xl font-bold font-integral-cf">top selling</h1>
        </div>
        <div class="flex flex-row flex-wrap justify-center gap-[19px] mb-[30px]">
          <Products category="top selling"/>
        </div>
        <div class="flex items-center justify-center mt-[36px]">
          <button class="max-w-[210px] py-[16px] px-[54px] bg-white border-2 border-solid border-[#00000019] rounded-[62px]">
            <p class="text-black text-base font-semibold font-satoshi">View All</p>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="m-auto w-[86.1vw] flex flex-col">
    <h1 class="text-black uppercase text-5xl font-bold font-integral-cf mt-[80px] mb-[40px]">our happy customers</h1>
    <div class="flex flex-wrap gap-[16px]">
      <Comment 
        v-for="comment in commentsStore.comments" 
        :key="comment.id" 
        :author="comment.author"
        :text="comment.text"
        :date="comment.date"   
        :rating="comment.rating" 
      />
    </div>
  </div>
</template>