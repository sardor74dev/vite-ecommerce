<script setup>
import { useRegistrationStore } from '../stores/RegistrationStore'

const registrationStore = useRegistrationStore()

const handleSubmit = () => {
    const userData = {
        username: registrationStore.username,
        email: registrationStore.email,
        password: registrationStore.password
    }
    registrationStore.register(userData)
}
</script>
<template>
    <h1>Registration</h1>
    <form @submit.prevent="handleSubmit">
        <input id="username" type="text" placeholder="username" v-model="registrationStore.username" required>
        <input id="email" type="email" placeholder="email" v-model="registrationStore.email" required>
        <input id="password" type="password" placeholder="password" v-model="registrationStore.password" required>
        <button type="submit">Register</button>
    </form>
</template>