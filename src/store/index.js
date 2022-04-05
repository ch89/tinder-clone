import { createStore } from "vuex"

export default createStore({
	state() {
		return {
			user: null,
			matches: []
		}
	},
	mutations: {
		auth(state, user) {
			state.user = user
		},
		getMatches(state, matches) {
			state.matches = matches
		}
	}
})