<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'
import { onMounted } from 'vue'
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


const newTimeSlotAvailable = (newEvent, event) => {
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
}

const onEventCreate = (event) => {
    if (!user.accessToken) return
    if (view.value) return
    const newEvent = {
        ...event,
        start: new Date(event.start).format("YYYY-MM-DD HH:MM"),
        end: new Date(event.end).format("YYYY-MM-DD HH:MM"),
        status: "pending",
        name: "Name"
    }

    newTimeSlotAvailable(newEvent, event)
    eventStore.addEvent(newEvent)
}

const onViewChange = (e) => {
    view.value = e.view !== "day"
}


</script>

<template>
    <vue-cal ref="vuecal" hide-weekends locale="de" :events="eventStore.events" style="width: 70vw;  margin: 0 auto;"
        :on-event-dblclick="onEventClick" :cell-click-hold="false" :on-event-create="onEventCreate"
        @view-change="onViewChange"
        @cell-dblclick="$refs.vuecal.createEvent(
        $event,
        120,
        { title: eventStore.selectedEvent.title, class: eventStore.selectedEvent.class, label: eventStore.selectedEvent.label, content: eventStore.selectedEvent.content })"
        :editable-events="{ title: false, drag: false, resize: false, delete: true, create: false }"
        :disable-views="['years']">

        <template #event="{ event }">
            <div class="vuecal__event-title" v-html="event.title" />
            <div class="vuecal__event-title" v-html="event.class" />
            <!-- <span v-if="$slots.actions" class="divider"></span> -->
            <div v-if="event.status == 'approved'" class="vuecal__event-approved" v-html="event.status" />
            <div v-if="event.status == 'pending'" class="vuecal__event-pending" v-html="event.status" />
            <small class="vuecal__event-time">
                <!-- Using Vue Cal Date prototypes -->
                <span>{{ event.start.formatTime("HH:mm") }}</span> -
                <span>{{ event.end.formatTime("HH:mm") }}</span>
            </small>
        </template>
    </vue-cal>
</template>


<style >
.vuecal__event-title::first-letter {
    text-transform: capitalize;
}

.vuecal__event {
    cursor: pointer
}

.vuecal__event.raum1 {
    background-color: rgb(255, 227, 133);
}

.vuecal__event.raum2 {
    background-color: rgb(65, 211, 255);
}

.vuecal__event.raum3 {
    background-color: rgb(233, 124, 255)
}

.vuecal__flex .vuecal__title button {
    color: rgb(175, 175, 175);
}

.angle {
    color: rgb(175, 175, 175);
}

.vuecal__event-pending {
    color: rgb(255, 161, 20)
}

.vuecal__event-approved {
    color: green
}
</style>