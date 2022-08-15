<script setup>
import {
    ref,
} from 'vue';
import { userStore } from '../stores/userStore'


const user = userStore()


const loginInfo = ref({
    email: "",
    password: ""
}

)
const loginUser = () => {
    console.log(loginInfo.value)
    user.loginUser(loginInfo.value)
}
</script>

<template>
    <h1>Login</h1>
    <div>
        <input type="email" v-model="loginInfo.email" required>
        <input type="password" v-model="loginInfo.password" required>
        <button @click="loginUser()">Login</button>
    </div>
</template >
   
<style scoped>
</style>