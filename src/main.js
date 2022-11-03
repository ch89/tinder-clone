import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { initializeApp } from "firebase/app"

initializeApp({
	apiKey: "AIzaSyBLlTuRyzXz-e2evr31GludqWpqML7b6ns",
	authDomain: "tinder-clone-200ef.firebaseapp.com",
	projectId: "tinder-clone-200ef",
	storageBucket: "tinder-clone-200ef.appspot.com",
	messagingSenderId: "219148809044",
	appId: "1:219148809044:web:0612c65ae1a0289fce4ec1"
})

const app = createApp(App)

app.use(router)

app.mount('#app')