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
        limit: 4,
        totalPages: 0,
        logo: require('@/assets/images/logo-1.svg.png')
    },
    getters: {
        getPosts: (state) => state.posts,
        getPost: (state) => state.post,
        getTelefon: (state) => state.settings.telefon,
        getEmail: (state) => state.settings.mail,
        getTitle: (state) => state.settings.title,
        getLogo: (state) => state.logo
    },
    mutations: {
        setPosts(state, posts) { state.posts = posts },
        setPost(state, post) { state.post = post },
        setSettings(state, settings) {state.settings = settings}
    },
    actions: {
        setPosts : ({commit, state}) => {
            axios.get(`${api}/posts`, {
               params: { _page: state.page, _limit: state.limit }
           }).then(responce => {commit('setPosts', responce.data);
                                console.log('== 0 ==> ',responce.data);
                                console.log('== 1 ==> ',responce.data.length);
                                console.log('== 2 ==> ',responce.headers);
                                console.log('== 4 ==> ', Math.ceil(responce.data.length / state.limit));
                                // console.log('== 3 ==> ',responce.headers['x-auth-token']);
           })
                console.log(state.totalPages);
            },
        // eslint-disable-next-line no-unused-vars
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



