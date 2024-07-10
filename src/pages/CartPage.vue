<script setup>
import { onMounted } from 'vue';
import { useCartProductsStore } from '../stores/CartProductsStore';
import { useAllProductsStore } from '../stores/AllProductsStore';
import BackButton from '../components/BackButton.vue';

const cartProductsStore = useCartProductsStore(),
    allProductsStore = useAllProductsStore()

const cartProductQuantity = (quantity) => {
    return quantity
}

onMounted(async() => {
    await cartProductsStore.fetchingCartProducts()
})
</script>

<template>
    <div class="m-auto w-[86.1vw]">
        <div class="w-full h-[1px] bg-[#00000019]"></div>
        <BackButton />
    </div>
    <div class="m-auto w-[86.1vw] flex flex-col">
        <h1 class="my-[24px] leading-[48px] text-[40px] font-bold font-integral-cf">
            My Cart
        </h1>
        <div v-if="cartProductsStore.cartProducts.length === 0">You don't have any products in your cart yet.</div>
        <div v-else class="flex flex-row gap-5">
            <div v-auto-animate class="flex flex-col px-6 border-2 border-solid border-[#00000019] rounded-[20px] divide-y-2 divide-[#00000019] divide-solid w-[57.66%] h-fit">
                <div v-for="product in cartProductsStore.cartProducts" :key="product.id" class="flex flex-row justify-between py-6">
                    <div class="flex flex-row justify-between w-full">
                        <router-link :to="`/product-details/${product.title}`">
                            <div class="flex flex-row gap-4">
                                <img class="h-[124px]" :src="`${product.imgSrc}`" alt="cart product image">
                                <div class="flex flex-col">
                                    <h1 class="max-w-[469px] text-xl font-bold font-satoshi">
                                    {{ product.title }}
                                    </h1>
                                    <div class="flex flex-col gap-1 mt-[2px] mb-4">
                                        <div class="flex gap-1">
                                            <p class="text-sm text-black font-normal font-satoshi">Size:</p>
                                            <p class="text-sm text-[#00000099] font-normal font-satoshi capitalize">{{ product.size }}</p>
                                        </div>
                                        <div class="flex gap-1">
                                            <p class="text-sm text-black font-normal font-satoshi">Color:</p>
                                            <p class="text-sm text-[#00000099] font-normal font-satoshi capitalize">{{ product.color }}</p>
                                        </div>
                                    </div>
                                    <div class="flex flex-row gap-[10px]">
                                        <h3 class="text-2xl font-bold font-satoshi">
                                            ${{ product.price }}
                                        </h3>
                                        <h3
                                            v-if="product.discount" 
                                            class="leading-[43px] text-[32px] text-[#00000066] font-bold font-satoshi line-through"
                                        >
                                            ${{ Math.round((product.price * 100) / (100 - product.discount)) }}
                                        </h3>
                                        <div v-if="product.discount" class="bg-[#ff333319] rounded-[62px] py-[8px] px-[14px]">
                                            <h3 class="text-[#ff3333] text-base font-medium">
                                                -{{ product.discount }}%
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                        <div class="flex flex-col items-end justify-between">
                            <img @click="cartProductsStore.deletingFromCart(product, product.id)" class="w-5 cursor-pointer opacity-75 hover:opacity-100" src="/bin.svg" alt="bin">
                            <div class="bg-[#00000019] flex gap-[38px] py-[16px] px-[20px] rounded-[62px]">
                                <img @click="allProductsStore.decrement(product, 'cart-products')" class="opacity-60 hover:opacity-100 cursor-pointer" src="/minus.svg" alt="minus">
                                <p class="text-black text-base font-semibold font-satoshi">{{ cartProductQuantity(product.quantity) }}</p>
                                <img @click="allProductsStore.increment(product, 'cart-products')" class="opacity-60 hover:opacity-100 cursor-pointer" src="/plus.svg" alt="plus">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col py-5 px-6 border-2 border-solid border-[#00000019] rounded-[20px] w-[40.725%] h-fit">
                <h1 class="text-2xl font-bold font-satoshi mb-[24px]">
                    Order Summary
                </h1>
                <div class="flex flex-col gap-5 mb-5">
                    <div class="flex justify-between">
                        <p class="text-xl text-[#00000099] font-normal font-satoshi">Subtotal</p>
                        <h1 class="max-w-[469px] text-xl font-bold font-satoshi">${{ cartProductsStore.subTotalPrice }}</h1>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-xl text-[#00000099] font-normal font-satoshi">Discount (-20%)</p>
                        <h1 class="max-w-[469px] text-xl text-[#FF3333] font-bold font-satoshi">-${{ cartProductsStore.discount }}</h1>
                    </div>
                    <div class="flex justify-between">
                        <p class="text-xl text-[#00000099] font-normal font-satoshi">Delivery Fee</p>
                        <h1 class="max-w-[469px] text-xl font-bold font-satoshi">${{ cartProductsStore.deliveryFee }}</h1>
                    </div>
                </div>
                <div class="w-full h-[1px] bg-[#00000019]"></div>
                <div class="flex flex-col gap-6 mt-5">
                    <div class="flex justify-between">
                        <p class="text-xl text-black font-normal font-satoshi">Total</p>
                        <h1 class="text-2xl font-bold font-satoshi">${{ cartProductsStore.totalPrice }}</h1>
                    </div>
                </div>
                <div class="flex flex-col gap-5 py-5">
                    <div class="flex gap-3 relative">
                        <input class="w-[71.3%] py-3 pl-12 pr-3 text-base font-normal font-satoshi rounded-[62px] bg-stone-100 outline-none" placeholder="Add promo code">
                        <img class="absolute top-4 left-4 w-[20px] height-[20px]" src="/promocode.svg" alt="icon">
                        <button
                            class="bg-black flex gap-[38px] w-[26%] py-[16px] justify-center rounded-[62px] cursor-pointer"
                            @click="cartProductsStore.postingCartItems(product.title, product.imgSrc, product.price)"  
                        >
                            <p class="text-white text-base font-semibold font-satoshi">Apply</p>
                        </button>
                    </div>
                    <button
                            class="bg-black flex gap-3.5 items-center w-full py-[16px] justify-center rounded-[62px] cursor-pointer"
                            @click="cartProductsStore.postingCartItems(product.title, product.imgSrc, product.price)"  
                        >
                        <p class="text-white text-base font-semibold font-satoshi">Go to Checkout</p>
                        <img src="/checkout-arrow.svg" alt="arrow">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>