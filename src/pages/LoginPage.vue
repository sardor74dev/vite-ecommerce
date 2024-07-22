<script setup>
import { useRegistrationStore } from '../stores/RegistrationStore'

const registrationStore = useRegistrationStore()

// const handleSubmit = () => {
//     const userData = {
//         username: registrationStore.username,
//         email: registrationStore.email,
//         password: registrationStore.password
//     }
//     registrationStore.register(userData)
// }
</script>
<template>
    <div class="my-[10vw] sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="registrationStore.auth()" class="flex flex-col items-center gap-2">
            <h1 class="max-w-[469px] leading-[48px] text-[40px] font-bold font-integral-cf">
                Sign In
            </h1>
            <input
                id="email"
                type="email"
                class="w-full py-3 pl-12 pr-3 text-base font-normal font-satoshi rounded-3xl bg-stone-100 outline-none" 
                placeholder="email"
                v-model="registrationStore.email"
                required
            >
            <input
                id="password"
                type="password"
                class="w-full py-3 pl-12 pr-3 text-base font-normal font-satoshi rounded-3xl bg-stone-100 outline-none" 
                placeholder="password"
                v-model="registrationStore.password"
                required
            >
            <button
                class="bg-black flex gap-3.5 items-center w-full py-3 justify-center rounded-3xl cursor-pointer"  
            >
                <p class="text-white text-base font-semibold font-satoshi">Sign In</p>
                <img src="/checkout-arrow.svg" alt="arrow">
            </button>
        </form>
        <p class="mt-10 text-center text-sm text-black">
            Don't have an account yet?
            <router-link to="/register" class="font-semibold leading-6 text-black">Sign Up</router-link>
        </p>
    </div>
</template>