<script setup>
import { useAllProductsStore } from '../stores/AllProductsStore';
import BackButton from '../components/BackButton.vue';
import StarRating from 'vue-star-rating'

const allProductsStore = useAllProductsStore()
</script>
<template>
    <div class="m-auto w-[86.1vw]">
        <div class="w-full h-[1px] bg-[#00000019]"></div>
        <BackButton />
    </div>
    <div class="m-auto w-[86.1vw] flex flex-col">
        <div class="flex items-center my-[72px]">
            <h1 class="text-black capitalize text-5xl font-bold font-integral-cf">results ({{ allProductsStore.results.length }})</h1>
        </div>
        <div class="flex flex-row flex-wrap justify-center gap-[19px] mb-[30px]">
            <div class="flex flex-col gap-[16px] rounded-2xl" v-for="item in allProductsStore.results" :key="item.id">
                <router-link :to="`/product-details/${item.title}`">
                    <img  class="hover:opacity-75" :src="`${item.imgSrc}`" alt="image">
                    <h3 class="text-xl font-bold font-satoshi">{{ item.title }}</h3>
                    <div class="flex flex-row items-center">
                        <star-rating
                            :star-size="30"
                            active-color="#ffc633"  
                            :increment="0.5"
                            :rating="`${item.rating}`"
                            :read-only="true"
                        />/5
                    </div>
                    <div class="flex flex-row gap-[10px]">
                        <h3 class="text-2xl font-bold font-satoshi">
                            ${{ item.price}}
                        </h3>
                        <h3 v-if="item.discount" class="text-2xl text-[#00000066] font-bold font-satoshi line-through">
                            ${{ Math.round((item.price * 100) / (100 - item.discount)) }}
                        </h3> 
                        <div v-if="item.discount" class="bg-[#ff333319] rounded-[62px] py-[8px] px-[14px]">
                            <h3 class="text-[#ff3333] text-xs font-medium">
                                -{{ item.discount }}%
                            </h3>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </div>
</template>