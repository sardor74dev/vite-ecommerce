import { defineStore } from "pinia";
import { onMounted, reactive, ref, watch } from "vue";
import axios from "axios";

export const useAllProductsStore = defineStore("AllProductsStore", () => {
    const count = ref(1)
    const products = ref([])
    const searchedProducts = ref([])
    const results = ref([])
    const link = ref("https://0dcbaa7980873478.mokky.dev/products") 
    const fetchingProducts = async() => {
        try {
            const { data } = await axios.get(link.value)
            console.log(data)
            products.value = data
            console.log(products.value)
        } catch (err) {
            console.log(err)
        }
    }

    const patchingProducts = async(rating, productId) => {
        try {
            await axios.patch(`https://0dcbaa7980873478.mokky.dev/products/${productId}`, {
                rating
            })
        } catch (err) {
            console.log(err)
        }
    }

    const settingSizeProperty = async(size, productId) => {
        try {
            await axios.patch(`https://0dcbaa7980873478.mokky.dev/products/${productId}`, {
                size
            })
        } catch (err){
            console.log(err)
        }
    }

    const settingColorProperty = async(color, productId) => {
        try {
            await axios.patch(`https://0dcbaa7980873478.mokky.dev/products/${productId}`, {
                color
            })
        } catch (err){
            console.log(err)
        }
    }

    const settingStatusProperty = async(status, productId) => {
        try {
            await axios.patch(`https://0dcbaa7980873478.mokky.dev/products/${productId}`, {
                isAddedToCart: status
            })
        } catch (err){
            console.log(err)
        }
    }

    const increment = (product, store) => {
        product.quantity++
        changingProductQuantity(product.quantity, product.id, store)
    }
    const decrement = (product, store) => {
        product.quantity--
        changingProductQuantity(product.quantity, product.id, store)
    }

    const changingProductQuantity = async(quantity, id, store) => {
        try {
            await axios.patch(`https://0dcbaa7980873478.mokky.dev/${store}/${id}`, {
                quantity
            })
        } catch (err) {
            console.log(err)
        }
    }

    const productsInLC = localStorage.getItem("results")
    if (productsInLC) {
        results.value = JSON.parse(productsInLC)._value
    }

    const getCategoryProducts = (category) => {
        return products.value.filter((product) => product.category === category)
    }
    const getOnSaleProducts = () => {
        return products.value.filter((product) => product.discount > 0)
    }

    const searchQuery = ref('')

    const searchProduct = (event) => {
        searchQuery.value = event.target.value
        console.log(searchQuery.value)
    }

    const resetInputValue = () => {
        searchQuery.value = ''
    }

    const searchedResults = async() => {
        try {
            const data = await axios.get(`https://0dcbaa7980873478.mokky.dev/products?title=*${searchQuery.value}*`)
            results.value = data.data
            console.log(results.value)
        } catch (err){
            console.log(err)
        }
    }

    watch(searchQuery, async() => {
        try {
            if(!searchQuery.value){
                searchedProducts.value.length = 0
                console.log(searchedProducts.value)
            } else {
                const linkValue = `https://0dcbaa7980873478.mokky.dev/products?title=*${searchQuery.value}*`
                console.log(linkValue)
                const searchedData = await axios.get(linkValue)
                searchedProducts.value = searchedData.data
            }

            console.log(searchedProducts.value)
        } catch (err){
            console.log(err)
        }
    })

    watch(() => results, (state) => {
          localStorage.setItem("results", JSON.stringify(state))
        }, { deep: true }
      )

    return {
        count,
        searchQuery,
        products,
        searchedProducts,
        results,
        fetchingProducts,
        patchingProducts,
        getCategoryProducts,
        getOnSaleProducts,
        settingSizeProperty,
        settingColorProperty,
        settingStatusProperty,
        increment,
        decrement,
        searchProduct,
        searchedResults,
        resetInputValue
    }
})