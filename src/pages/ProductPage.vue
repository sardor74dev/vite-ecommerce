<script setup>
import { onMounted, ref, watch } from 'vue'
import { useAllProductsStore } from '../stores/AllProductsStore'
import { useCommentsStore } from '../stores/CommentsStore'
import { useCartProductsStore } from '../stores/CartProductsStore'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import Products from '../components/Products.vue'
import StarRating from 'vue-star-rating'
import Comment from '../components/Comment.vue'
import BackButton from '../components/BackButton.vue'

const allProductsStore = useAllProductsStore()
const commentsStore = useCommentsStore()
const cartProductsStore = useCartProductsStore()

const route = useRoute()

const product = ref({})

const fetchProductDetails = () => {
    const productId = route.params.id
    const fetchedProduct = allProductsStore.products.find((p) => p.title === productId)
    product.value = { ...fetchedProduct }
}

let selectedOption = ref('')
let selectedOption2 = ref('')
let selectedProduct = ref()
let selectedProduct2 = ref()

const updateProductSizeProperty = (product) => {
    selectedProduct.value = allProductsStore.products.find((obj) => obj.title === product.title)
    selectedProduct.value.size = selectedOption.value
    allProductsStore.settingSizeProperty(selectedProduct.value.size, selectedProduct.value.id)
    console.log(selectedProduct.value.size, selectedProduct.value.title)
}
const updateProductColorProperty = (product) => {
    selectedProduct2.value = allProductsStore.products.find((obj) => obj.title === product.title)
    selectedProduct2.value.color = selectedOption2.value
    allProductsStore.settingColorProperty(selectedProduct2.value.color, selectedProduct2.value.id)
    console.log(selectedProduct2.value.color, selectedProduct2.value.title)
}

const isClicked = ref(false)

const clicked = () => {
    isClicked.value = true
}

const cartProductQuantity = (quantity) => {
    return quantity
}

const productCheck = (product) => {
    return product.isAddedToCart
}

const productStatus = (product) => {
    allProductsStore.settingStatusProperty(true, product.id)
}

watch(() => route.params.id, () => {
    fetchProductDetails()
    selectedOption = ref('')
    selectedOption2 = ref('')
})

onMounted(async() => {
    await allProductsStore.fetchingProducts()
    fetchProductDetails()
    await commentsStore.fetchingComments()
})
</script>

<template>
    <div class="m-auto w-[86.1vw]">
        <div class="w-full h-[1px] bg-[#00000019]"></div>
        <BackButton />
    </div>
    <div class="m-auto w-[86.1vw] mt-[36px] flex flex-col">
        <div class="flex flex-row gap-[40px]">
            <div class="flex flex-row gap-[14px]">
                <div class="flex flex-col justify-between">
                    <img class="w-[210px]" :src="`${product.imgSrc}`">
                    <img class="w-[210px]" :src="`${product.imgSrc}`">
                    <img class="w-[210px]" :src="`${product.imgSrc}`">
                </div>
                <img class="w-[444px] rounded-[20px]" :src="`${product.roundedImgSrc}`">
            </div>
            <div class="flex flex-col">
                <h1 class="max-w-[469px] leading-[48px] text-[40px] font-bold font-integral-cf">
                    {{ product.title }}
                </h1>
                <div class="flex items-center my-[15px]">
                    <star-rating 
                        :star-size="30" 
                        active-color="#ffc633" 
                        :increment="0.5"
                        :rating="`${product.rating}`" 
                        @update:rating="allProductsStore.patchingProducts($event, product.id)"
                    />/5
                </div>
                <div class="flex flex-row gap-[10px]">
                    <h3 class="leading-[43px] text-[32px] font-bold font-satoshi">
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
                <p class="max-w-[590px] mt-[25px] text-sm font-normal text-[#00000099] font-satoshi">
                    {{ product.description }}
                </p>
                <div class="w-full h-[1px] bg-[#00000019] mt-[23.5px] mb-[24.5px]"></div>
                <div class="flex flex-col gap-[16px]">
                    <p class="text-base text-[#00000099] font-normal font-satoshi">Select Colors</p>
                    <div class="flex gap-2">
                        <label class="flex items-center justify-center bg-red-600 w-[37px] h-[37px] rounded-full cursor-pointer">
                            <input @change="updateProductColorProperty(product)" class="hidden" type="radio" name="option" value="red" v-model="selectedOption2">
                            <img v-if="selectedOption2 === 'red'" src="/checked-frame.svg" alt="Checked" />
                        </label>
                        <br>
                        <label class="flex items-center justify-center bg-yellow-400 w-[37px] h-[37px] rounded-full cursor-pointer">
                            <input @change="updateProductColorProperty(product)" class="hidden" type="radio" name="option" value="yellow" v-model="selectedOption2">
                            <img v-if="selectedOption2 === 'yellow'" src="/checked-frame.svg" alt="Checked" />
                        </label>
                        <br>
                        <label class="flex items-center justify-center bg-blue-800 w-[37px] h-[37px] rounded-full cursor-pointer">
                            <input @change="updateProductColorProperty(product)" class="hidden" type="radio" name="option" value="blue" v-model="selectedOption2">
                            <img v-if="selectedOption2 === 'blue'" src="/checked-frame.svg" alt="Checked" />
                        </label>
                    </div>
                </div>
                <div class="w-full h-[1px] bg-[#00000019] mt-[23.5px] mb-[24.5px]"></div>
                <div class="flex flex-col gap-[16px]">
                    <p class="text-base text-[#00000099] font-normal font-satoshi">Select Size</p>
                    <div class="flex gap-[12px]">
                        <input 
                            type="radio" 
                            id="small" 
                            name="radio-group" 
                            value="small" 
                            v-model="selectedOption" 
                            class="hidden"
                            @change="updateProductSizeProperty(product)"
                        >
                        <label 
                            for="small" 
                            class="bg-[#00000019] py-[12px] px-[24px] rounded-[62px] cursor-pointer text-[#00000099] text-base font-semibold font-satoshi" 
                            :class="{ 'radio-button-selected': selectedOption === 'small' }">
                            Small
                        </label>
                        <input 
                            type="radio" 
                            id="medium" 
                            name="radio-group" 
                            value="medium" 
                            v-model="selectedOption" 
                            class="hidden"
                            @change="updateProductSizeProperty(product)"  
                        >
                        <label 
                            for="medium"  
                            class="bg-[#00000019] py-[12px] px-[24px] rounded-[62px] cursor-pointer text-[#00000099] text-base font-semibold font-satoshi" 
                            :class="{ 'radio-button-selected': selectedOption === 'medium' }">
                            Medium
                        </label>
                        <input 
                            type="radio" 
                            id="large" 
                            name="radio-group" 
                            value="large" 
                            v-model="selectedOption" 
                            class="hidden"
                            @change="updateProductSizeProperty(product)"   
                        >
                        <label
                            for="large" 
                            class="bg-[#00000019] py-[12px] px-[24px] rounded-[62px] cursor-pointer text-[#00000099] text-base font-semibold font-satoshi" 
                            :class="{ 'radio-button-selected': selectedOption === 'large' }">
                            Large
                        </label>
                        <input 
                            type="radio" 
                            id="x-large" 
                            name="radio-group"  
                            value="x-large" 
                            v-model="selectedOption"
                            class="hidden"
                            @change="updateProductSizeProperty(product)"   
                        >
                        <label
                            for="x-large"
                            class="bg-[#00000019] py-[12px] px-[24px] rounded-[62px] cursor-pointer text-[#00000099] text-base font-semibold font-satoshi" 
                            :class="{ 'radio-button-selected': selectedOption === 'x-large' }">
                            X-Large
                        </label>
                    </div>
                </div>
                <div class="w-full h-[1px] bg-[#00000019] mt-[23.5px] mb-[24.5px]"></div>
                <div class="flex gap-[20px]">
                    <div class="bg-[#00000019] flex gap-[38px] py-[16px] px-[20px] rounded-[62px]">
                        <img @click="allProductsStore.decrement(product, 'products')" class="cursor-pointer" src="/minus.svg" alt="minus">
                        <p class="text-black text-base font-semibold font-satoshi">{{ cartProductQuantity(product.quantity) }}</p>
                        <img @click="allProductsStore.increment(product, 'products')" class="cursor-pointer" src="/plus.svg" alt="plus">
                    </div>
                    <button
                        class="bg-black flex gap-[38px] max-w-[400px] w-full py-[16px] justify-center rounded-[62px] cursor-pointer"
                        @click="
                            cartProductsStore.postingCartItems(product.title, product.imgSrc, product.price, selectedProduct.size, selectedProduct2.color, 
                            cartProductQuantity(product.quantity)); 
                            productStatus(product)
                            clicked()"  
                        :disabled="isClicked"
                    >
                        <p class="text-white text-base font-semibold font-satoshi">{{ productCheck(product) || isClicked ? 'Added to Your Cart' : 'Add to Cart' }}</p>
                    </button>
                </div>
            </div>
        </div>
        <div class="flex flex-col">
            <div class="flex mt-[80px]">
                <div class="flex items-top w-[33.3%] h-[33px] justify-center border-b-2 border-solid border-[#00000019] ">
                    <h3 class="leading-[22px] text-[#00000099] text-xl font-normal font-satoshi">Product Details</h3>
                </div>
                <div class="flex items-top w-[33.3%] h-[33px] justify-center border-b-2 border-solid border-black ">
                    <h3 class="leading-[22px] text-black text-xl font-normal font-satoshi">Rating & Reviews</h3>
                </div>
                <div class="flex items-top w-[33.3%] h-[33px] justify-center border-b-2 border-solid border-[#00000019] ">
                    <h3 class="leading-[22px] text-[#00000099] text-xl font-normal font-satoshi">FAQs</h3>
                </div>
            </div>
            <div class="flex justify-between my-[24px]">
                <div class="flex items-center">
                    <h2 class="text-black text-2xl font-bold font-satoshi">
                        All Reviews
                    </h2>
                    <h3 class="leading-[22px] text-[#00000099] text-xl font-normal font-satoshi"> ({{ commentsStore.comments.length }})</h3>
                </div>
                <div class="flex gap-[10px]">
                    <button class="bg-[#00000019] rounded-[62px] py-[16px] px-[20px]">
                        <img src="/shuffle.svg" alt="shiffle icon">
                    </button>
                    <button class="bg-[#00000019] rounded-[62px] py-[16px] px-[20px]">
                        <p class="leading-[22px] text-black text-base font-medium font-satoshi">Latest</p>
                    </button>
                    <button class="bg-black rounded-[62px] py-[16px] px-[20px]">
                        <p class="leading-[22px] text-white text-base font-medium">Write a Review</p>
                    </button>
                </div>
            </div>
            <div class="flex flex-wrap gap-[16px]">
                <Comment
                    v-for="comment in commentsStore.comments" 
                    :key="comment.id" 
                    :author="comment.author"
                    :text="comment.text"
                    :date="comment.date"   
                    :rating="comment.rating"
                />
            </div>
            <div class="flex items-center justify-center mt-[36px]">
                <button class="max-w-[210px] py-[16px] px-[54px] bg-white border-2 border-solid border-[#00000019] rounded-[62px]">
                    <p class="text-black text-base font-semibold font-satoshi">Load More</p>
                </button>
            </div>
            <div class="flex items-center justify-center my-[72px]">
                <h1 class="text-black capitalize text-5xl font-bold font-integral-cf">you might also like</h1>
            </div>
            <div class="flex flex-row flex-wrap justify-center gap-[19px] mb-[30px]">
                <Products category="most liked"/>
            </div>
        </div>
    </div>
</template>

<style scoped>
.radio-button-selected {
  background-color: #000000;
  color: #fff;
}
</style>