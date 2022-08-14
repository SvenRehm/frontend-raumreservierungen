import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"



const API_URL="http://localhost:3000"
export const sceduledEvents = defineStore("event",{
    state: () => ({
        events: [],
        error:null,
        startId:0,
        selectedEvent:{},
        allRooms: ['raum 1', 'raum 2', 'raum 3'],
        selectedRoom:"",
        deleteEventFunction :null,
        defaultNewEvent:{ title: 'Ihr Name', class: 'Raum 1', label: 'Raum 1', content:"content" }
    }),
   
    getters: { },

  
    actions: {
      async fetchEvents() {
        try {
          const data = await axios.get(`${API_URL}/events`)
            this.events = data.data
          }
          catch (error) {
            alert(error)
            // console.log(error)
        }
      },
      changeName(newtitle){
    this.selectedEvent.title=newtitle

      },
      changeRoom(newRoom){
    
    this.selectedEvent.label=newRoom
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
              const filterEvents = this.events.filter((item)=>{ 
                return item.id!==id;
            });
            this.events=filterEvents
             
                }).catch(error => {
                    // alert(error)
                    
                });
    
            },
               editEvent(id){
               
                const index = this.events.findIndex(object => {
                  return object.id === id;
                }); 
    
                if (index !== -1) {
                  this.events[index].title = this.selectedEvent.title;
                  this.events[index].label = this.selectedEvent.label;
                }
                axios.put(`${API_URL}/events/${id}`, {
                  ...this.selectedEvent
              }).then(resp => {
       
              console.log(resp);

              }).catch(error => {
              
                  console.log(error);
              });
    
            }
            
           
    },
    
})