<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'

import { onMounted } from 'vue'
// import { useUserStore } from '../stores/users'
import { sceduledEvents } from '../stores/sceduledEvents'


import { ModalStore } from '../stores/ModalStore'
import { userStore } from '../stores/userStore'
import { ref } from 'vue'

const user = userStore()

const eventStore = sceduledEvents()
const modalStore = ModalStore()

const view = ref("")

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
    // eventStore.fetchEvents()

}

const onEventCreate = (event) => {
    if (!user.accessToken) return
    if (view.value) return
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

const onViewChange = (e) => {
    console.log(e.view === "day")
    view.value = e.view !== "day"
}


</script>
 <!-- :split-days="[{ id: 1, label: 'Room 1' }, { id: 2, label: 'Room 2' },]" -->
<template>


    <!-- :on-event-dblclick="onEventClick" -->
    <vue-cal ref="vuecal" hide-weekends locale="de" :events="eventStore.events" style="width: 70vw;  margin: 0 auto;"
        :on-event-dblclick="onEventClick" :cell-click-hold="false" :on-event-create="onEventCreate"
        @view-change="onViewChange"
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

.vuecal__flex .vuecal__title button {
    color: rgb(175, 175, 175);
}

.angle {
    /* background-color: rgb(175, 175, 175); */
    color: rgb(175, 175, 175);
}

/* .vuecal__menu,
.vuecal__cell-events-count {
    background-color: #42b983;
}

.vuecal__title-bar {
    background-color: #e4f5ef;
}

.vuecal__cell--today,
.vuecal__cell--current {
    background-color: rgba(240, 240, 255, 0.4);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
    background-color: rgba(235, 255, 245, 0.4);
}

.vuecal__cell--selected:before {
    border-color: rgba(66, 185, 131, 0.5);
}


.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
    background-color: rgba(136, 236, 191, 0.25);
} */
</style>