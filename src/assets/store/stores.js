import {createStore} from "vuex";
import axios from "axios";
const api = 'http://api.blog.loc'; // локальный сервер
// const api = 'https://api.blog.kroxdev.ru'; // хостинг
export default createStore({
//==========================================================================
    state: {
        posts: [],
        post: [],
        settings: [],
        page: 2,
        limit: 6,
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
        setPosts : async({commit, state}) => {
           await axios.get(`${api}/posts`, {
               params: { _page: state.page, _limit: state.limit }
           }).then(responce => {commit('setPosts', responce.data)})
             .then(responce => {state.totalPages = responce.headers.get('x-total-count')});
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



