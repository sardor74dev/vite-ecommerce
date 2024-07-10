<script setup>
import { ref } from 'vue'
import FooterList from './FooterList.vue';

const socialMediaIcons = ref(["/twitter.svg", "/facebook.svg", "/instagram.svg", "/github.svg"])
const socialMediaBadges = ref(["/visa.svg", "/mastercard.svg", "/paypal.svg", "/applepay.svg", "/gpay.svg"])

</script>

<template>
    <div class="bg-[#f0f0f0] flex flex-col mt-[153px]">
        <div class="relative m-auto w-[86.1vw] flex flex-col justify-between">
            <div class="absolute top-[-90px] flex flex-row flex-wrap justify-between bg-black w-full py-9 px-16 rounded-[20px]">
                <h2 class="flex items-center max-w-[551px] leading-[45px] text-white text-4xl font-bold font-integral-cf">
                    STAY UPTO DATE ABOUT OUR LATEST OFFERS
                </h2>
                <div class="relative flex flex-col gap-[14px] w-[349px]">
                    <img class="absolute top-[16.13px] left-[17.88px] bottom-[16.13px]" src="/email.svg" alt="email icon">
                    <input class="w-full h-[48px] pl-[52px] pr-[12px] px-[16px] rounded-[62px] font-satoshi outline-none" placeholder="Enter your email address">
                    <button class="bg-white w-full h-[48px] rounded-[62px]">
                        <p class="text-base font-medium font-satoshi cursor-pointer">
                            Subscribe to Newsletter
                        </p>
                    </button>
                </div>
            </div>
            <div class="flex flex-row justify-between pt-[140px] pb-[49.5px]">
                <div class="flex flex-col">
                    <h1 class="text-3xl font-bold font-integral-cf mb-[25px]">SHOP.CO</h1>
                    <p class="max-w-[248px] text-[14px] font-normal text-[#00000099]">
                        We have clothes that suits your style and which you are proud to wear. From women to men.
                    </p>
                    <div class="flex flex-row gap-[12px] mt-[35px] max-w-[172px]">
                        <img 
                            v-for="(icon, index) in socialMediaIcons" 
                            :key="index" :src="`${icon}`" 
                            alt="icon" 
                            class="cursor-pointer"
                        >
                    </div>
                </div>
                <FooterList title="company" option1="About" option2="Features" option3="Works" option4="Careers" />
                <FooterList title="help" option1="Customer Support" option2="Delivery Details" option3="Terms & Conditions" option4="Privacy & Policy" />
                <FooterList title="faq" option1="Account" option2="Manage Deliveries" option3="Orders" option4="Payments" />
                <FooterList title="resources" option1="Free eBooks" option2="Development Tutorial" option3="How to - Blog" option4="Youtube Playlist" />
            </div>
            <div class="h-[1px] w-full bg-[#00000019]"></div>
            <div class="flex flex-row justify-between mt-[20.5px] mb-[88px]">
                <p class="text-[14px] font-normal text-[#00000099]">
                    Shop.co © 2000-2023, All Rights Reserved
                </p>
                <div class="flex flex-row gap-3">
                    <img v-for="badge in socialMediaBadges" :key="badge" :src="`${badge}`" alt="badge">
                </div>
            </div>
        </div>
    </div>
</template>