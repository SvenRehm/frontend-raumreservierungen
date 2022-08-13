<script setup>
import { VueFinalModal } from 'vue-final-modal'
import { ModalStore } from '../stores/ModalStore'


const store = ModalStore()

</script>

<template>
    <div>
        <vue-final-modal v-model="store.showModal" :click-to-close="false" classes="modal-container"
            content-class="modal-content">

            <button class="modal__close" @click="store.closeModal()">
                <mdi-close>X</mdi-close>
            </button>
            <span class="modal__title">Hello, vue-final-modal</span>
            <div class="modal__content">
                <p>Vue Final Modal is a renderless, stackable, detachable and lightweight modal component.</p>
                <input type="text">
            </div>

        </vue-final-modal>
        <button @click="store.openModal()">Open Modal</button>
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



