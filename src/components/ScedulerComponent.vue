<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/users'
import { sceduledEvents } from '../stores/sceduledEvents'

const store = sceduledEvents()

store.fetchEvents()


watch(
    () => store.events,
    () => {
        store.fetchEvents()
        // fires only when state.someObject is replaced
    }
)
// console.log(store.events)

// const events = ref([
//     {
//         start: '2022-8-12 10:30',
//         end: '2022-8-12 22:30',
//         title: 'Room 1',
//         content: " local_hospital",
//         class: 'room1',

//     }])
const selectedEvent = ref(null)
const showDialog = ref(true)

const onEventClick = (event, e) => {
    selectedEvent.value = event
    showDialog.value = true

    // Prevent navigating to narrower view (default vue-cal behavior).
    e.stopPropagation()
    // console.log(e)
}

const onEventCreate = (event, deleteEventFunction) => {
    const newEvent = {
        ...event, start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),

    }

    const date = new Date(newEvent.start);
    const dateEnd = new Date(newEvent.end);

    const start = new Date(store.events[0].start);
    const end = new Date(store.events[0].end);


    const compareClasses = store.events.filter(item => {
        item.class.toLowerCase() === "room 2"
    })
    console.log(compareClasses)








}




</script>

<template>
    <!-- <VueCal style="height: 500px" locale="de" :events="events" :on-event-click="onEventClick"
        :on-event-create="onEventCreate"
        :editable-events="{ title: true, drag: false, resize: false, delete: true, create: true }"
        class="vuecal--full-height-delete"></VueCal> -->


    <vue-cal ref="vuecal" hide-weekends hide-title-bar :events="store.events" :cell-click-hold="false"
        :drag-to-create-event="false" :on-event-create="onEventCreate" @cell-dblclick="$refs.vuecal.createEvent(
            $event,
            120,
            { title: 'New Event', class: 'room 2' }
        
        )" :editable-events="{ title: true, drag: false, resize: false, delete: true, create: true }">
    </vue-cal>


</template>



<style scoped>
</style>