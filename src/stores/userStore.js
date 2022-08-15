import { defineStore } from 'pinia'

import axios from "axios"
import { useRouter } from 'vue-router'

const USER_API_URL= "http://localhost:3000"
const router = useRouter()

export const userStore = defineStore("userStore",{

    state: () => ({
        user:{},
        accessToken:"",
        error:""
    }),
    getters: {},
    actions: {

        async loginUser(user) {
            try {
              const data = await axios.post(`${USER_API_URL}/login`, {
                ...user
              });
                this.user =data.data.user
                this.accessToken=data.data.accessToken
                this.error=""
                this.router.push('/');
              }
              catch (error) {
                this.error=error.response.data
                // console.log(error.response)
                // alert(error)
              
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
                console.log(error)
                alert(error)
            }
          },

          logUserOut(){
            this.user={},
            this.accessToken=""
          },
          
       
    },
})