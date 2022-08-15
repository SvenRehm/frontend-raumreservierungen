<script setup>
import { VueFinalModal } from 'vue-final-modal'

import { ModalStore } from '../stores/ModalStore'
import { sceduledEvents } from '../stores/sceduledEvents'
import { ref } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';




const eventStore = sceduledEvents()
const modalStore = ModalStore()


// const startTime = ref("2022-08-17 18:00")
// const endTime = ref("2022-08-16 10:00")
const startTime = ref(null)
const endTime = ref(null)

// watchEffect(() => eventStore.changeRoom(room.value));


const chekifTimeisAvail = () => {

    const date = new Date(startTime.value);
    const dateEnd = new Date(endTime.value);
    const filterByClass = eventStore.events.filter(item => {
        return item.class.toLowerCase() == eventStore.selectedEvent.class.toLowerCase()
    })
    const filterId = filterByClass.filter(item => {

        return item.id !== eventStore.selectedEvent.id
    })

    const startDateExistsAlready = filterId.some((item) => {
        const start = new Date(item.start)
        const end = new Date(item.end)
        if (date >= start && date <= end) {
            return true
        }
    })

    const endDateExistsAlready = filterId.some((item) => {
        const start = new Date(item.start)
        const end = new Date(item.end)
        if (dateEnd >= start && dateEnd <= end) {
            return true
        }
    })

    if (startDateExistsAlready || endDateExistsAlready) {
        alert("event exists already in that time")
        return true
    }

}


const handleSubmit = () => {
    if (chekifTimeisAvail()) return
    eventStore.editTime(startTime.value, endTime.value)
    eventStore.editEvent(eventStore.selectedEvent.id)
    eventStore.changeName("")
    eventStore.fetchEvents()
    modalStore.closeModal()
}

const handleDelete = () => {
    eventStore.deleteEvent(eventStore.selectedEvent.id)
    eventStore.changeName("")
    modalStore.closeModal()
    // eventStore.fetchEvents()
}




const config = {
    enableTime: true,
    time_24hr: true,

}




</script>

<template>
    <div>

        <vue-final-modal v-model="modalStore.showModal" :click-to-close="false" classes="modal-container"
            content-class="modal-content">

            <button class="modal__close" @click="modalStore.closeModal()">
                X
            </button>
            <span class="modal__title">{{ eventStore.selectedEvent?.class }}</span>
            <div class="modal__content">
                <div class="modal-inner">
                    <p>NAME:{{ eventStore.selectedEvent?.title }}</p>
                    <p>STATUS:{{ eventStore.selectedEvent?.status }}</p>
                    <label for="name">Name</label>
                    <input type="text" id="name" :value="eventStore.selectedEvent?.title"
                        @input="event => eventStore.changeName(event.target.value)">



                    <select value="title.value" @input="event => eventStore.changeRoom(event.target.value)">
                        <option value="Raum 1">Raum 1</option>
                        <option value="Raum 2">Raum 2</option>
                        <option value="Raum 3">Raum 3</option>
                    </select>

                    <flat-pickr v-model="startTime" :config="config"> </flat-pickr>
                    <flat-pickr v-model="endTime" :config="config"> </flat-pickr>



                    <button @click="handleSubmit">Save</button>
                    <button @click="handleDelete">Delete</button>

                </div>

            </div>



        </vue-final-modal>
        <!-- <button @click="modalStore.openModal()">Open Modal</button> -->
    </div>

</template>






<style scoped>
:deep(.modal-container) {
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.modal-content) {
    position: relative;
    display: flex;
    flex-direction: column;
    margin: 0 1rem;
    padding: 1rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: rgb(75, 75, 75);
}

.modal-inner {
    display: flex;
    flex-direction: column;
}

.modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
}

.modal__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
}
</style>



