<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'

import { onMounted } from 'vue'
// import { useUserStore } from '../stores/users'
import { sceduledEvents } from '../stores/sceduledEvents'
import { ModalStore } from '../stores/ModalStore'


const eventStore = sceduledEvents()
const modalStore = ModalStore()



onMounted(() => {
    eventStore.fetchEvents()

})



const onEventClick = (event, e) => {
    // const findEventClicked = eventStore.events.filter(item => item.id == event.id)
    // console.log(findEventClicked)
    const newEvent = {
        ...event,
        start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),
    }

    modalStore.openModal()
    e.stopPropagation()
    eventStore.updateSelectedEvent(newEvent)
    // eventStore.fetchEvents()

}

const onEventCreate = (event) => {

    const newEvent = {
        ...event,
        start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),
        status: "pending",

    }


    const date = new Date(newEvent.start);
    const dateEnd = new Date(newEvent.end);

    const compareClasses = eventStore.events.filter(item => {
        return item.class.toLowerCase() == event.class.toLowerCase()
    })

    const startDateExistsAlready = compareClasses.some((item) => {
        const start = new Date(item.start)
        const end = new Date(item.end)

        if (date > start && date < end) {
            return true
        }
    })
    const endDateExistsAlready = compareClasses.some((item) => {
        const start = new Date(item.start)
        const end = new Date(item.end)
        if (dateEnd >= start && dateEnd <= end) {
            return true
        }
    })

    if (startDateExistsAlready || endDateExistsAlready) {
        alert("event exists already in that time")
        return false
    }

    eventStore.addEvent(newEvent)
    // modalStore.openModal()

}




</script>
 <!-- :split-days="[{ id: 1, label: 'Room 1' }, { id: 2, label: 'Room 2' },]" -->
<template>


    <!-- :on-event-dblclick="onEventClick" -->
    <vue-cal ref="vuecal" hide-weekends locale="de" :events="eventStore.events" :on-event-dblclick="onEventClick"
        :cell-click-hold="false" :on-event-create="onEventCreate"
        @cell-dblclick="$refs.vuecal.createEvent(
        $event,
        120,
        { title: eventStore.selectedEvent.title, class: eventStore.selectedEvent.class, label: eventStore.selectedEvent.label, content: eventStore.selectedEvent.content })"
        :editable-events="{ title: false, drag: false, resize: false, delete: true, create: false }"
        :disable-views="['years']">
    </vue-cal>


</template>



<style >
.vuecal__event {
    cursor: pointer
}
</style>