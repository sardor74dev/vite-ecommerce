<script setup>
defineProps([
    'title', 
    'option1', 
    'option2', 
    'option3', 
    'option4'
])
</script>

<template>
    <ul class="flex flex-col gap-[26px]">
        <li class="text-black text-base font-semibold uppercase">
            {{ title }}
        </li>
        <li class="max-w-[248px] text-base font-normal text-[#000000e6] opacity-70 hover:opacity-100 cursor-pointer">
            {{ option1 }}
        </li>
        <li class="max-w-[248px] text-base font-normal text-[#000000e6] opacity-70 hover:opacity-100 cursor-pointer">
            {{ option2 }}
        </li>
        <li class="max-w-[248px] text-base font-normal text-[#000000e6] opacity-70 hover:opacity-100 cursor-pointer">
            {{ option3 }}
        </li>
        <li class="max-w-[248px] text-base font-normal text-[#000000e6] opacity-70 hover:opacity-100 cursor-pointer">
            {{ option4 }}
        </li>
    </ul>
</template>