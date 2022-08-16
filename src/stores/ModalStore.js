import { defineStore } from 'pinia'

export const ModalStore = defineStore("modal",{
    state: () => ({
        showModal:false
    }),
    actions: {
        openModal(){
            this.showModal=true
        },
        closeModal(){
            this.showModal=false
        },

    },
})