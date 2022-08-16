import { defineStore } from 'pinia'
import axios from "axios"

const API_URL="http://localhost:3000"


export const sceduledEvents = defineStore("sceduledEvents",{

    state: () => ({
        events: [],
        error:null,
        selectedEvent:{ class:"raum1"},
        selectedRoom:"",
        
    }),
    actions: {
      async fetchEvents() {
        try {
          const data = await axios.get(`${API_URL}/events`)
            this.events = data.data
          }
          catch (error) {
            alert(error)
        }
      },
      changeName(newtitle){
        this.selectedEvent.title=newtitle

      },
   
      editTime(startTime,endTime){
        this.selectedEvent.start=startTime
        this.selectedEvent.end=endTime
       
          },
      updateSelectedEvent(updatedEvent){
        this.selectedEvent=updatedEvent
          },
 
      addEvent(event){
        axios.post(`${API_URL}/events`, {
            ...event,
            }).then(resp => {
              this.selectedEvent=resp.data
              this.events.push(resp.data)
            }).catch(error => {
                alert(error)
            });
        },
        deleteEvent(id){
            axios.delete(`${API_URL}/events/${id}`).then(res=> {
              const filterEvents = this.events.filter(item=> item.id!==id)
              this.events=filterEvents
                }).catch(error => {
                     alert(error)
                });
            },
        editEvent(id){
            const index = this.events.findIndex(object => {
              return object.id === id;
            }); 
    
            if (index !== -1) {
              this.events[index]=this.selectedEvent
            
            }
            axios.put(`${API_URL}/events/${id}`, {
                ...this.selectedEvent
                    }).catch(error => {
                console.log(error);
            });
          },
        adminEditEvent(id,editedEvent){
            const index = this.events.findIndex(object => {
              return object.id === id;
            }); 
            if (index !== -1) {
              this.events[index].status = editedEvent.status
              this.selectedEvent.status = editedEvent.status
            }
            axios.put(`${API_URL}/events/${id}`, {
              ...editedEvent
            }).catch(error => {
                console.log(error);
            });
          }
    },
    
})