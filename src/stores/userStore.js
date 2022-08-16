import { defineStore } from 'pinia'
import axios from "axios"

const USER_API_URL= "http://localhost:3000"

export const userStore = defineStore("userStore",{
    state: () => ({
        user:null,
        accessToken:"",
        error:""
    }),

    actions: {
        async loginUser(user) {
            try {
              const data = await axios.post(`${USER_API_URL}/login`, {
                ...user
              });
                this.user = data.data.user
                this.accessToken=data.data.accessToken
                this.error=""
                this.router.push('/');
              }
              catch (error) {
                this.error=error.response.data
            }
          },
          async registerUser(user) {
            try {
              const data = await axios.post(`${USER_API_URL}/register`, {
                ...user
              });
                this.user =data.data.user
                this.accessToken=data.data.accessToken
              }
              catch (error) {
                this.error=error
                alert(error)
            }
          },

          logUserOut(){
            this.user={},
            this.accessToken=""
          },
          
       
    },
})