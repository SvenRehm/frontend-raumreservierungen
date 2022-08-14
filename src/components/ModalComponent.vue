<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { ModalStore } from '../stores/ModalStore'
import { sceduledEvents } from '../stores/sceduledEvents'
import { ref } from 'vue';


const eventStore = sceduledEvents()

const modalStore = ModalStore()
const room = ref("Raum 1")
const title = ref("Ihr Name")

// onMounted(() => {

// })

const handleSubmit = () => {

    eventStore.changeRoom(room.value)
    eventStore.changeName(title.value)
    eventStore.editEvent(eventStore.selectedEvent.id)
    title.value = eventStore.selectedEvent.title
    // eventStore.fetchEvents()
}

const handleDelete = () => {
    eventStore.deleteEvent(eventStore.selectedEvent.id)
    modalStore.closeModal()
    // eventStore.fetchEvents()
}


</script>

<template>
    <div>
        <vue-final-modal v-model="modalStore.showModal" :click-to-close="false" classes="modal-container"
            content-class="modal-content">

            <button class="modal__close" @click="modalStore.closeModal()">
                X
            </button>
            <span class="modal__title">{{ eventStore.selectedEvent?.title }}</span>
            <div class="modal__content">
                <p>{{ eventStore.selectedEvent?.label }}</p>

                <form>
                    <input v-model="title">
                    <select v-model="room">
                        <option value="Raum 1">Raum 1</option>
                        <option value="Raum 2">Raum 2</option>
                        <option value="Raum 3">Raum 3</option>
                    </select>
                </form>
                <button @click="handleSubmit">Save</button>
                <button @click="handleDelete">Delete</button>
                <!-- <input type="text" :v-modal="eventStore.selectedEvent?.title"> -->
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



