<script setup>
import { useRoute } from 'vue-router'
// import { ref, watch } from 'vue'

const route = useRoute()
// const userData = ref()

// watch(
//     () => route.params.id,
//     async newId => {
//         userData.value = await fetchUser(newId)
//     }
// )

// console.log(route.params.id)
</script>

<template>
    <h1>Room Details</h1>
    <router-link :to="{
        name: 'home'
    }">home
    </router-link>
</template>


<style scoped>
</style>