<script setup>
import {
   ref,
} from 'vue';
import data from '../allRooms.json';


const allRooms = ref(data)


</script>

<template>
   <h1>List of Rooms</h1>
   <div v-for="room in allRooms" :key="room.id">
      <h1>{{ room.roomName }}</h1>
      <p>{{ room.description }}</p>
      <router-link :to="{
         name: 'room-details'
         , params: { id: room.roomId }
      }">Room Details
      </router-link>
   </div>
</template >
   
<style scoped>
</style>