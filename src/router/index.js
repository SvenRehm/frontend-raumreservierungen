import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import AboutView from "../views/AboutView.vue"
// import LoginView from "../views/LoginView.vue"
import RoomDetails from "../components/RoomDetails.vue"
const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes: [
      {
         path: "/",
         name: "home",
         component: HomeView,
      },
      {
         path: "/about",
         name: "about",
         component: AboutView,
      },
      {
         path: "/room/:id",
         name: "room-details",
         component: RoomDetails,
      },
   ],
})

export default router
