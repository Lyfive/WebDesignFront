import {
    createStore,
    createLogger
} from 'vuex'

// Create a new store instance.
const store = createStore({
    plugins: [createLogger()],
    state() {
        return {
            username: 'LyFive',
            avatar: '',
        }
    },
    mutations: {
        setUsername(state, username) {
            state.username = username
        },
        setAvatar(state, avatar) {
            state.avatar = avatar
        }
    }
})

export default store