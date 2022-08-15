<script setup>
import { onMounted } from 'vue';
import { sceduledEvents } from '../stores/sceduledEvents'
import router from '../router';
import { userStore } from '@/stores/userStore'


const user = userStore()


const eventStore = sceduledEvents()

onMounted(() => {
   if (!user.accessToken) {
      router.push('/login');
   }
   eventStore.fetchEvents()
})

</script>

<template>
   <div class="container">
      <h1>Pending Events</h1>
      <div class=" list-container">
         <div v-for="event in eventStore.events" :key="event.id">
            <h1>{{ event.title }}</h1>
            <p>{{ event.class }}</p>
            <p>{{ event.status }}</p>

            <p>{{ event.id }}</p>
            <button>confirm status</button>
         </div>
      </div>
   </div>
</template >
   
<style scoped>
h1 {
   display: inline-block;
}

p {
   display: inline-block;
}

.list-container {
   display: flex;
   flex-direction: column;
}
</style>