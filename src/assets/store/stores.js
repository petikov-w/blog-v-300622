import {createStore} from "vuex";
// import axios from "axios";
const axios = require('axios').default;
const api = 'http://api.blog.loc'; // локальный сервер
// const api = 'https://api.blog.kroxdev.ru'; // хостинг
export default createStore({
//==========================================================================
    state: {
        posts: [],
        post: [],
        settings: [],
        page: 1,
        limit: 3,
        totalPages: 0,
        totalItems: 0,
        logo: require('@/assets/images/logo-1.svg.png')
    },
    getters: {
        getPosts: (state) => state.posts,
        getPost: (state) => state.post,
        getTelefon: (state) => state.settings.telefon,
        getEmail: (state) => state.settings.mail,
        getTitle: (state) => state.settings.title,
        getLogo: (state) => state.logo,
        getTotalPages : (state) => state.totalPages,
        getTotalItems : (state) => state.totalItems,
        getPostsPage : (state) => state.limit,
        getCurrentPage : state => state.page
    },
    mutations: {
        // setPosts(state, posts) {
        //     posts.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1)
        //     state.posts = posts },
        setPosts(state, posts) { state.posts = posts },
        setPost(state, post) { state.post = post },
        setSettings(state, settings) {state.settings = settings}
    },
    actions: {
        setPosts : ({commit, state}) => {
            axios.get(`${api}/posts`, {
               params: { page: state.page, limit: state.limit }
           }).then(responce => {commit('setPosts', responce.data);
                                state.totalItems = responce.data.length;
                                state.totalPages = Math.ceil(responce.data.length / state.limit);
           })},
        setPost : ({commit}, id) => {
            axios.get(`${api}/posts/${id}`)
                .then(responce => {commit('setPost', responce.data)})
        },
        setSettings : ({commit}) => {
            axios.get(`${api}/settings`)
                .then(responce => {commit('setSettings', responce.data)})

        }
    }
//===========================================================================
})
//===========================================================================



