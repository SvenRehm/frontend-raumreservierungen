<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'
import { ref, watch, onMounted } from 'vue'
// import { useUserStore } from '../stores/users'
import { sceduledEvents } from '../stores/sceduledEvents'
import { ModalStore } from '../stores/ModalStore'


const eventStore = sceduledEvents()
const modalStore = ModalStore()



onMounted(() => {
    eventStore.fetchEvents()

})



const onEventClick = (event, e) => {

    const newEvent = {
        ...event,
        start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),
    }


    modalStore.openModal()
    e.stopPropagation()
    eventStore.updateSelectedEvent(newEvent)
    eventStore.fetchEvents()

}


const onEventCreate = (event, deleteEventFunction) => {
    const newEvent = {
        ...event,
        start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),

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
        deleteEventFunction()
        return false
    }


    eventStore.addEvent(newEvent)


}




</script>
 <!-- :split-days="[{ id: 1, label: 'Room 1' }, { id: 2, label: 'Room 2' },]" -->
<template>
    <!-- <VueCal style="height: 500px" locale="de" :events="events" :on-event-click="onEventClick"
        :on-event-create="onEventCreate"
        :editable-events="{ title: true, drag: false, resize: false, delete: true, create: true }"
        class="vuecal--full-height-delete"></VueCal> -->

    <!-- :on-event-dblclick="onEventClick" -->
    <vue-cal ref="vuecal" hide-weekends locale="de" :events="eventStore.events" :on-event-dblclick="onEventClick"
        :cell-click-hold="false" :drag-to-create-event="true" :on-event-create="onEventCreate" @cell-dblclick="$refs.vuecal.createEvent(
        $event,
        120,
        eventStore.defaultNewEvent)"
        :editable-events="{ title: false, drag: false, resize: false, delete: true, create: true }"
        :disable-views="['years']">
    </vue-cal>


</template>



<style >
.vuecal__event {
    cursor: pointer
}
</style>