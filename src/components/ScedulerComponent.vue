<script setup >
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import 'vue-cal/dist/i18n/de.es.js'
import { ref } from 'vue'


const events = ref([
    {
        start: '2022-8-12 10:30',
        end: '2022-8-12 22:30',
        // You can also define event dates with Javascript Date objects:
        // start: new Date(2018, 11 - 1, 16, 10, 30),
        // end: new Date(2018, 11 - 1, 16, 11, 30),
        title: 'Room 1',
        content: '<i class="icon material-icons">local_hospital</i>',
        class: 'room1',

        deletable: true,
        resizable: false,
        draggable: false
    }])
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
    // You can modify event here and return it.
    // You can also return false to reject the event creation.
    // alert("not allowed")

    // if (1 === 1) {
    //     // alert("allowed")
    //     return true
    // }
    // else {
    //     alert("not allowed")
    //     return false
    // }


    const date = new Date(event.start);
    // const dateEnd = new Date(event.end);

    const start = new Date(events.value[0].start);
    const end = new Date(events.value[0].end);

    if (date > start && date < end) {
        console.log('✅ date is between the 2 dates');
        return false
    } else {
        console.log('⛔️ date is not in the range');
    }
    events.value.push(event)
    // console.log(events.value[0].start, events.value[0].end)



    return true
}



// @cell-click=

</script>

<template>
    <!-- <VueCal style="height: 500px" locale="de" :events="events" :on-event-click="onEventClick"
        :on-event-create="onEventCreate"
        :editable-events="{ title: true, drag: false, resize: false, delete: true, create: true }"
        class="vuecal--full-height-delete"></VueCal> -->


    <vue-cal ref="vuecal" hide-weekends hide-title-bar :events="events" :cell-click-hold="false"
        :drag-to-create-event="false" :on-event-create="onEventCreate" @cell-click="$refs.vuecal.createEvent(
            $event,
            120,
            { title: 'New Event', class: 'blue-event' }
        )" editable-events>
    </vue-cal>


</template>



<style scoped>
</style>