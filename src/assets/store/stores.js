import {createStore} from "vuex";
import axios from "axios";

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
        getTelefon: (state) => state.settings.telefon,
        getTitle: (state) => state.settings.title,
        getLogo: (state) => state.logo
    },
    mutations: {
        setPosts(state, posts) { state.posts = posts },
        setPost(state, post) { state.post = post },
        setSettings(state, settings) {state.settings = settings; console.log('>>> 00 >>>  ',settings)}
    },
    actions: {
        setPosts : ({commit}) => {
            axios.get('http://api.blog.loc/posts')
                .then(responce => {commit('setPosts', responce.data)})
            },
        setPost : ({commit, id}) => {
            axios.get('http://api.blog.loc/posts/'+id)
                .then(responce => {commit('setPost', responce.data)})
        },
        setSettings : ({commit}) => {
            axios.get('http://api.blog.loc/settings')
                .then(responce => {commit('setSettings', responce.data)})
        }
    }
//===========================================================================
})
//===========================================================================



