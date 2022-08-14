import { defineStore } from 'pinia'
// Import axios to make HTTP requests
import axios from "axios"



const API_URL="http://localhost:3000"
export const sceduledEvents = defineStore("event",()=>{
const events=ref([])


const  fetchEvents = ()=> {
     try {
          const data = await axios.get(`${API_URL}/events`)
            this.events = data.data
          }
          catch (error) {
            alert(error)
            // console.log(error)
        }
      }


    // state: () => ({
    //     events: [],
    //     error:null,
    //     selectedEvent:null,
    //     allRooms: ['raum 1', 'raum 2', 'raum 3'],
    //     deleteEventFunction :null,
    //     defaultNewEvent:{ title: 'Raum 1', class: 'raum 1', label: 'raum 1', content:"Ihr Name" }
    // }),
   
   

  
    // actions: {
    //   async fetchEvents() {
    //     try {
    //       const data = await axios.get(`${API_URL}/events`)
    //         this.events = data.data
    //       }
    //       catch (error) {
    //         alert(error)
    //         // console.log(error)
    //     }
    //   },
 
    //   addEvent(event,e){
    //     this.events.push(event)
    //     axios.post(`${API_URL}/events`, {
    //         ...event
    //         }).then(resp => {
    //         // console.log(resp.data);
    //         }).catch(error => {
    //             alert(error)
    //             this.events=error
    //         });
    //     },
    //     deleteEvent(event, e){
    //         axios.delete(`${API_URL}/events/`).then(res=> {
    //             // console.log("deleted", res);
    //             }).catch(error => {
    //                 alert(error)
    //                 this.events=error
    //             });
    
    //         }
        
    // },
    
})