div<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { ModalStore } from '@/stores/ModalStore'
import { sceduledEvents } from '../stores/sceduledEvents'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { userStore } from '@/stores/userStore'



const user = userStore()
const eventStore = sceduledEvents()
const modalStore = ModalStore()





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
    modalStore.closeModal()
}

const handleDelete = () => {
    if (!user.accessToken) return
    eventStore.deleteEvent(eventStore.selectedEvent.id)
    modalStore.closeModal()
}

const adminEditEvent = () => {
    const newStatus = "approved"
    const newEvent = { ...eventStore.selectedEvent, status: newStatus }
    eventStore.adminEditEvent(eventStore.selectedEvent.id, newEvent)

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
            <div class="modal__content">
                <button class="modal__close" @click="modalStore.closeModal()">
                    X
                </button>
                <div class="modal-inner">
                    <h1 class="modal__title">{{ eventStore.selectedEvent?.class }}</h1>
                    <h3>Name:</h3>
                    <h3> {{ eventStore.selectedEvent?.title }}</h3>
                    <br />
                    <h3>Status:</h3>
                    <h3> {{ eventStore.selectedEvent?.status }}</h3> <br />

                    <label for="name">Name</label>
                    <input maxlength="20" id="name" v-model="eventStore.selectedEvent.title">
                    <div class="raum">
                        <label for="raum">Raum</label>
                        <select id="raum" v-model="eventStore.selectedEvent.class">
                            <option value="raum1">Raum 1</option>
                            <option value="raum2">Raum 2</option>
                            <option value="raum3">Raum 3</option>
                        </select>
                    </div>

                    <label for="startdate">Start</label>
                    <flat-pickr id="startdate" v-model="eventStore.selectedEvent.start" :config="config"> </flat-pickr>
                    <div>
                        <label for="enddate">Ende</label>
                        <flat-pickr id="enddate" v-model="eventStore.selectedEvent.end" :config="config"> </flat-pickr>
                    </div>
                    <button @click="handleSubmit">Save</button>
                    <button @click="handleDelete">Delete</button>
                    <button v-if="user.user?.admin" @click="adminEditEvent">Confirm Status</button>
                </div>

            </div>
        </vue-final-modal>
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
    margin: 0 1rem;

    border: 1px solid #e2e8f0;
    border-radius: 0.25rem;
    background: rgb(75, 75, 75);
}

.modal-inner {
    padding: 2em 4.5em;
}

label {
    display: inline-block;
    width: 60px;
    margin-top: 1em;
}

input {
    padding: .3em 1.4em;
}

select {
    padding: .3em 1.4em;
    cursor: pointer;
}




.modal__title {
    margin: 0 2rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
}

h3 {
    display: inline-block;
    margin-right: .3em;
    white-space: nowrap;
    max-width: 200px;
}

h1::first-letter,
h3::first-letter {
    text-transform: capitalize;

}

.raum {
    display: block;
}

.modal__close {
    position: absolute;
    top: 0em;
    right: 0em;
    cursor: pointer;
    border: none;
    padding: .5em .6em;
    z-index: 2;
}

button {
    margin-top: 2em;
    margin-right: 2em;
    cursor: pointer;
    border: none;
    padding: .4em 2em;
}
</style>



