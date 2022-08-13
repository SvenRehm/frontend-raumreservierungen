import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"

export const sceduledEvents = defineStore("event",{
 
    state: () => ({
        events: [],
    }),
   
    getters: {
      getEvents(state){
          return state.events
        }
    },
  

    actions: {
      async fetchEvents() {
        try {
          const data = await axios.get('http://localhost:3000/events')
            this.events = data.data
          }
          catch (error) {
            alert(error)
            // console.log(error)
        }
      },
      addEvent(event,e){
        this.events.push(event)
        axios.post('http://localhost:3000/events', {
    ...event

}).then(resp => {
    // console.log(resp.data);
}).catch(error => {
    // console.log(error);
});

      }
    },
})