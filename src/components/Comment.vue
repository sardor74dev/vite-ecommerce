<script setup>
import StarRating from 'vue-star-rating'

defineProps(['author', 'text', 'date', 'rating'])
</script>

<template>
    <div class="flex flex-col py-[28px] px-[32px] rounded-[20px] w-[49.3%] border-2 border-solid border-[#00000019]">
        <div class="flex flex-col gap-[18px]">
            <div class="flex justify-between">
                <star-rating :star-size="30" active-color="#ffc633" :read-only="true" :rating="`${rating}`" :increment="0.5" :show-rating="false" />
                <img class="cursor-pointer" src="/three-dots.svg" alt="dots">
            </div>
            <h2 class="flex leading-[22px] text-xl font-bold">
                {{ author }}
                <img class="ml-2" src="/checked.svg" alt="checked icon">
            </h2>
            <p class="max-w-[522px] mb-[24px] text-sm font-normal text-[#00000099] font-satoshi">
                {{ text }}
            </p>
        </div>
        <p class="text-sm font-medium text-[#00000099] font-satoshi">
            Posted on {{ date }}
        </p>
    </div>
</template>