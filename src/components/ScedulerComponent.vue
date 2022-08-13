<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'
import { ref, watch } from 'vue'
// import { useUserStore } from '../stores/users'
import { sceduledEvents } from '../stores/sceduledEvents'
import { ModalStore } from '../stores/ModalStore'

const store = sceduledEvents()
const modalStore = ModalStore()

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
    modalStore.openModal()
    selectedEvent.value = event
    showDialog.value = true
    e.stopPropagation()


}


const onEventCreate = (event, deleteEventFunction) => {

    const newEvent = {
        ...event, start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),
        blac: event.start,
        black: event.end,

    }
    const date = new Date(newEvent.start);
    const dateEnd = new Date(newEvent.end);

    // const start = new Date(store.events[0].start);
    // const end = new Date(store.events[0].end);





    const compareClasses = store.events.filter(item => {
        return item.class.toLowerCase() == event.class.toLowerCase()
    })

    const startDateExistsAlready = compareClasses.some((item) => {
        const start = new Date(item.start)
        const end = new Date(item.end)
        if (date >= start && date <= end) {
            return true
        }
    })
    const endDateExistsAlready = compareClasses.some((item) => {
        const start = new Date(item.start)
        const end = new Date(item.end)
        if (dateEnd > start && dateEnd < end) {
            return true
        }
    })

    if (startDateExistsAlready || endDateExistsAlready) {
        alert("event exists already in that time")
        deleteEventFunction
        return false
    } else {
        store.addEvent(newEvent)
    }

}




</script>
 <!-- :split-days="[{ id: 1, label: 'Room 1' }, { id: 2, label: 'Room 2' },]" -->
<template>
    <!-- <VueCal style="height: 500px" locale="de" :events="events" :on-event-click="onEventClick"
        :on-event-create="onEventCreate"
        :editable-events="{ title: true, drag: false, resize: false, delete: true, create: true }"
        class="vuecal--full-height-delete"></VueCal> -->

    <!-- :on-event-dblclick="onEventClick" -->
    <vue-cal ref="vuecal" hide-weekends hide-title-bar :events="store.events" :on-event-dblclick="onEventClick"
        :cell-click-hold="false" :drag-to-create-event="false" :on-event-create="onEventCreate" @cell-dblclick="$refs.vuecal.createEvent(
        $event,
        120,
        { title: 'New Event', class: 'room 2', label: 'Room 2', })"
        :editable-events="{ title: false, drag: false, resize: false, delete: true, create: true }">
    </vue-cal>


</template>



<style >
.vuecal__event {
    cursor: pointer
}
</style>