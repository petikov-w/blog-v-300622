import {createStore} from "vuex";
import axios from "axios";
// const api = 'http://api.blog.loc'; // локальный сервер
const api = 'https://api.blog.kroxdev.ru'; // хостинг
export default createStore({
//==========================================================================
    state: {
        posts: [],
        post: [],
        settings: [],
        logo: require('@/assets/images/logo-1.svg.png')
    },
    getters: {
        getPosts: (state) => state.posts,
        getPost: (state) => state.post,
        getTelefon: (state) => state.settings.telefon,
        getTitle: (state) => state.settings.title,
        getLogo: (state) => state.logo
    },
    mutations: {
        setPosts(state, posts) { state.posts = posts },
        setPost(state, post) { state.post = post },
        setSettings(state, settings) {state.settings = settings}
    },
    actions: {
        setPosts : ({commit}) => {
            // axios.get('http://api.blog.loc/posts')
            axios.get(`${api}/posts`)
                .then(responce => {commit('setPosts', responce.data)})
            },
        // eslint-disable-next-line no-unused-vars
        setPost : ({commit}, id) => {
            // axios.get(`http://api.blog.loc/posts/${id}`)
            axios.get(`${api}/posts/${id}`)
                .then(responce => {commit('setPost', responce.data)})
        },
        setSettings : ({commit}) => {
            // axios.get('http://api.blog.loc/settings')
            axios.get(`${api}/settings`)
                .then(responce => {commit('setSettings', responce.data)})
        }
    }
//===========================================================================
})
//===========================================================================



