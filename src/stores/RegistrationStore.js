import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios"

export const useRegistrationStore =  defineStore("registrationStore", () => {
    const username = ref('')
    const email = ref('')
    const password = ref('')

    const register = async(userData) => {
        try {
            await axios.post('https://0dcbaa7980873478.mokky.dev/register', {
                userData
            })
            console.log('yesssss!')

        } catch (err) {
            console.log(err)
        }
    }

    return {
        username,
        email,
        password,
        register
    }
})