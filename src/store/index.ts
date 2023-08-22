import { createStore } from 'vuex'

export default createStore({
    state() {
        return {
            pid: null,
            aid: null
        }
    },
    mutations: {
        selectProject(state, payload) {
            state.pid = payload.pid
        },
        selectInterface(state, payload) {
            state.aid = payload.aid
        }
    }
})