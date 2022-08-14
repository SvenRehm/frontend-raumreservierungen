import { defineStore } from 'pinia'


export const ModalStore = defineStore("modal",{
 
    state: () => ({
        showModal:false

    }),
    getters: {},
    actions: {

    openModal(){
        this.showModal=true
    },
    closeModal(){
        this.showModal=false
    },

    },
})