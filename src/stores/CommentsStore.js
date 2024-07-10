import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCommentsStore = defineStore("commentsStore", () => {
    const count = ref(1)
    const comments = ref([])
    const link = ref("https://0dcbaa7980873478.mokky.dev/comments")

    const fetchingComments = async() => {
        try {
            const { data } = await axios.get(link.value)
            comments.value = data
        } catch(err){
            console.log(err)
        }
    }
    
    return {
        count,
        comments,
        fetchingComments,
    }
})