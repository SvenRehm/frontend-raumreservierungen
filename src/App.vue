<script setup>
import { RouterLink, RouterView } from "vue-router"
import { userStore } from '@/stores/userStore'


const user = userStore()

const logUserOut = () => {
   user.logUserOut()
   alert("Du bist ausgeloggt worden")
}

</script>

<template>
   <header>
      <nav>
         <RouterLink to="/">Home</RouterLink>
         <RouterLink v-if="user.user?.admin" to="Admin">Admin</RouterLink>
         <a href="/" @click.prevent="logUserOut" v-if="user.accessToken">Ausloggen</a>
         <RouterLink to="Login" v-if="!user.accessToken">Einloggen</RouterLink>
      </nav>
   </header>

   <RouterView />
</template>

<style scoped>
nav {
   width: 100%;
   font-size: 16px;
   text-align: center;
   margin: 2rem 0;
}

nav a {
   color: rgb(119, 119, 119);
}

nav a.router-link-exact-active {
   color: white;
}

nav a {
   display: inline-block;
   padding: 0 1rem;
   border-left: 1px solid var(--color-border);
}
</style>
