<script setup>
import { onMounted, ref } from 'vue';
import { sceduledEvents } from '../stores/sceduledEvents'
import router from '../router';
import { userStore } from '@/stores/userStore'


const user = userStore()


const eventStore = sceduledEvents()
const pendinEvents = ref(null)

onMounted(() => {
   if (!user.accessToken) {
      router.push('/login');
   }
   eventStore.fetchEvents()
   filterPendingEvents()
})

const filterPendingEvents = () => {
   pendinEvents.value = eventStore.events.filter(event => event.status.toLowerCase() === "pending")
}

const editEvent = (id, arg) => {
   const newStatus = "approved"
   const newEvent = { ...arg, status: newStatus }
   eventStore.adminEditEvent(id, newEvent)
   filterPendingEvents()
}

</script>

<template>
   <div class="container">
      <h1 v-if="!pendinEvents?.length">Currently no pending Events</h1>
      <h1 v-if="pendinEvents?.length">Pending Events</h1>

      <div class="list-container">
         <ul v-if="pendinEvents?.length" class="title-list">
            <li>Name </li>
            <li>Raum</li>
            <li>Status</li>
            <li>Start</li>
            <li>Ende </li>
         </ul>
         <div v-for="event in pendinEvents" :key="event.id">
            <ul>
               <li>{{ event.title }}</li>
               <li>{{ event.class }}</li>
               <li> {{ event.status }}</li>
               <li>{{ event.start }}</li>
               <li> {{ event.end }}</li>
               <button @click="editEvent(event.id, event)">confirm status</button>
            </ul>
         </div>
      </div>
   </div>
</template >
   
<style scoped>
.container {
   margin: 0 auto;
   max-width: 900px;
}

h1 {
   text-align: center;
   margin-bottom: 2em;
}

.title-list {
   margin: 0;
   padding: 0;
   width: 510px;
   display: flex;
}

.title-list li {
   margin-right: 20px;
}

.title-list li:last-child {
   margin-left: 85px;
}

.title-list li:nth-child(4) {
   margin-left: 10px;
}

ul li {
   display: inline-block;
   margin-right: 1em;
   margin-bottom: 1em;
}

.list-container {
   display: flex;
   flex-direction: column;
   align-items: center;
}
</style>