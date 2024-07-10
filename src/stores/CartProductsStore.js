import axios from "axios";
import { defineStore } from "pinia";
import { computed, ref, watch } from "vue";
import { useAllProductsStore } from "./AllProductsStore";

const allProductsStore = useAllProductsStore()

export const useCartProductsStore = defineStore("cartProductsStore", () => {
    const cartProducts = ref([])

    const postingCartItems = async(productTitle, productImgSrc, productPrice, productSize, productColor, productQuantity) => {
        const product = {
            title: productTitle,
            imgSrc: productImgSrc,
            price: productPrice,
            size: productSize,
            color: productColor,
            quantity: productQuantity,
        }
        try {
            await axios.post(`https://0dcbaa7980873478.mokky.dev/cart-products`, product)
        } catch (err) {
            console.log(err)
        }
    }
    
    const fetchingCartProducts = async() => {
        try {
            const { data } = await axios.get("https://0dcbaa7980873478.mokky.dev/cart-products")
            cartProducts.value = data
            console.log(cartProducts.value)
        } catch (err) {
            console.log(err)
        }
    }

    const deletingFromCart = async(product, productId) => {
        try {
            await axios.delete(`https://0dcbaa7980873478.mokky.dev/cart-products/${productId}`)
            cartProducts.value = cartProducts.value.filter(p => p.id !== productId)
            const deletedProduct = allProductsStore.products.find((obj) => obj.title === product.title)
            await axios.patch(`https://0dcbaa7980873478.mokky.dev/products/${deletedProduct.id}`, {
                size: "",
                color: "",
                quantity: 1,
                isAddedToCart: false  
            })
        } catch (err) {
            console.log(err)
        }
    }

    const subTotalPrice = computed(() => {
        if (cartProducts.value.length === 0){
            return 0
        }
        return cartProducts.value.reduce((accumulator, addedEl) => {
            return accumulator + (addedEl.price * addedEl.quantity) }, 0
        )
    })

    const discount = computed(() => {
        if (cartProducts.value.length === 0){
            return 0
        }
        return parseFloat((20 * subTotalPrice.value) / 100).toFixed(2)
    })

    const deliveryFee = computed(() => {
        if (cartProducts.value.length === 0){
            return 0
        }
        return 15
    })

    const totalPrice = computed(() => {
        if (cartProducts.value.length === 0){
            return 0
        }
        return parseFloat(subTotalPrice.value - discount.value + deliveryFee.value).toFixed(2)
    })

    return {
        cartProducts,
        subTotalPrice,
        discount,
        deliveryFee,
        totalPrice,
        postingCartItems,
        fetchingCartProducts,
        deletingFromCart
    }
})