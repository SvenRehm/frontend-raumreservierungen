import { defineStore } from 'pinia'

import axios from "axios"
import { useRouter } from 'vue-router'

const USER_API_URL= "http://localhost:3000"
const router = useRouter()

export const userStore = defineStore("userStore",{

    state: () => ({
        user:{},
        accessTokes:"",
        error:""
    }),
    getters: {},
    actions: {

        async loginUser(user) {
            try {
              const data = await axios.post(`${USER_API_URL}/login`, {
                ...user
              });
                this.router.push('/');
                this.user =data.data.user
                this.accessTokes=data.data.accessToken
           
              }
              catch (error) {
                this.error=error
                alert(error)
              
            }
          },
          async registerUser(user) {
            try {
              const data = await axios.post(`${USER_API_URL}/register`, {
                ...user
              });
                this.user =data.data.user
                this.accessTokes=data.data.accessToken
              }
              catch (error) {
                this.error=error
                console.log(error)
                alert(error)
            }
          },

          logUserOut(){
            this.user={},
            this.accessTokes=""
          }
       
    },
})