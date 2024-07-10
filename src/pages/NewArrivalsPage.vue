<script setup>
import Products from '../components/Products.vue';

</script>

<template>
    <div class="flex flex-col">
        <div class="bg-white flex">
            <div class="m-auto w-[86.1vw] flex flex-col">
                <div class="flex items-center justify-center my-[72px]">
                    <h1 class="text-black uppercase text-5xl font-bold font-integral-cf">new arrivals</h1>
                </div>
                <div class="flex flex-row flex-wrap justify-center gap-[19px] mb-[30px]">
                    <Products category="new arrivals" />
                </div>
                <div class="flex items-center justify-center mt-[36px] mb-[64px]">
                    <button class="max-w-[210px] py-[16px] px-[54px] bg-white border-2 border-solid border-[#00000019] rounded-[62px]">
                        <p class="text-black text-base font-semibold font-satoshi">View All</p>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>