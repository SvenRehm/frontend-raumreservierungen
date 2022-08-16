<script setup>
import { VueFinalModal } from 'vue-final-modal'

import { ModalStore } from '@/stores/ModalStore'
import { sceduledEvents } from '../stores/sceduledEvents'

import { ref, onMounted } from 'vue';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { userStore } from '@/stores/userStore'



const user = userStore()
const eventStore = sceduledEvents()
const modalStore = ModalStore()


console.log(eventStore.selectedEvent)


const timeSlotAvailable = () => {

    const date = new Date(eventStore.selectedEvent.start);
    const dateEnd = new Date(eventStore.selectedEvent.end);
    if (dateEnd <= date) {
        alert("Start Zeit > End Zeit")
        return true
    }
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
    if (!user.accessToken) return
    if (!eventStore.selectedEvent.start || !eventStore.selectedEvent.end) { alert("Zeit auswählen"); return }
    if (timeSlotAvailable()) return
    eventStore.editTime(eventStore.selectedEvent.start, eventStore.selectedEvent.end)
    eventStore.editEvent(eventStore.selectedEvent.id)

    // eventStore.fetchEvents()
    modalStore.closeModal()
}

const handleDelete = () => {
    if (!user.accessToken) return
    eventStore.deleteEvent(eventStore.selectedEvent.id)
    // eventStore.changeName("")
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
                    <p>Name: {{ eventStore.selectedEvent?.title }}</p>
                    <p>Status: {{ eventStore.selectedEvent?.status }}</p>
                    <label for="name">Name</label>
                    <!-- <input type="text" id="name" :value="eventStore.selectedEvent?.title"
                        @input="event => eventStore.changeName(event.target.value)"> -->


                    <input v-model="eventStore.selectedEvent.title">

                    <select v-model="eventStore.selectedEvent.class">
                        <option value="raum1">Raum 1</option>
                        <option value="raum2">Raum 2</option>
                        <option value="raum3">Raum 3</option>
                    </select>

                    <flat-pickr v-model="eventStore.selectedEvent.start" :config="config"> </flat-pickr>
                    <flat-pickr v-model="eventStore.selectedEvent.end" :config="config"> </flat-pickr>

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



