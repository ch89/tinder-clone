import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./assets/css/app.css"
import { initializeApp } from "firebase/app"

initializeApp({
	apiKey: "AIzaSyBbs27sVvSlQLpxiWRl9wwW0OXh-AwpdK4",
	authDomain: "tinder-clone-fd63f.firebaseapp.com",
	projectId: "tinder-clone-fd63f",
	storageBucket: "tinder-clone-fd63f.appspot.com",
	messagingSenderId: "47042854973",
	appId: "1:47042854973:web:088800becb8b46387a2a54",
	measurementId: "G-YYJC9JQ98S"
})

const app = createApp(App)

app.use(router).use(store)

app.mount("#app")