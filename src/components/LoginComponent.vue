<script setup>
import {
    ref,
} from 'vue';
import { userStore } from '../stores/userStore'


const user = userStore()

const loginInfo = ref({
    email: "",
    password: "",
}

)
const loginUser = () => {
    user.loginUser(loginInfo.value)

}
</script>

<template>
    <div class="container">
        <h1>Einloggen</h1>
        <span class="error" v-if="user.error">{{ user.error }}</span>

        <div class="form">
            <span>
                email: test2@test <br />
                passwort: test2<br />
                admin: true
            </span>
            <label for="email">Email</label>
            <input id="email" type="text" v-model="loginInfo.email" required>
            <label for="password">Password</label>
            <input id="password" type="password" v-model="loginInfo.password" required>

            <button @click="loginUser()">Login</button>
        </div>
        <div>


        </div>

    </div>
</template >
   
<style scoped>
.container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

span {
    margin-bottom: 1em;
    margin-top: .5em;
    color: rgb(252, 252, 252);
}

span.error {
    margin-top: .5em;
    color: red;
}



.form {
    width: 400px;
    margin-top: 2em;
    display: flex;
    flex-direction: column;
    align-items: start;

}

input {
    width: 100%;
    margin: .5em 0 2em 0;
    padding: .6em 1.4em;

}

button {

    margin-top: 1em;
    cursor: pointer;
    border: none;
    padding: .6em 2.3em;
}
</style>