import {createStore} from "vuex";
//import {ref} from "vue/dist/vue";
// import axios from "axios";
const axios = require('axios').default;
const api = 'http://api.blog.loc'; // локальный сервер
// const api = 'https://api.blog.kroxdev.ru'; // хостинг
export default createStore({
//==========================================================================
    state: {
        logo: require('@/assets/images/logo-1.svg.png'),
        posts: [],
        post: [],
        settings: [],
        page: 1,
        limit: 3,
        totalPages: 0,
        totalItems: 0,
        loadingStatus: false,
        new_post: true,
        update_post: false,
        current_post: []
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
        getCurrentPage : state => state.page,
        getLoadingStatus: state => state.loadingStatus,
        getIsNewPost: state => state.new_post,
        getIsUpdatePost: state => state.update_post,
        getCurrentPost: state => state.current_post
    },
    mutations: {
        // setPosts(state, posts) {
        //     posts.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1)
        //     state.posts = posts },
        setPosts(state, posts) { state.posts = posts },
        setPost(state, post) { state.post = post },
        setSettings(state, settings) {state.settings = settings},
        setLoadingStatus(state, loadingStatus) {state.loadingStatus = loadingStatus},
        setIsNewPost(state, payload) {state.new_post = payload},
        setIsUpdatePost(state, payload) {state.update_post = payload},
        setCurrentPost(state, payload) {state.current_post = payload}
    },
    actions: {
        setPosts : ({commit, state}) => {
            commit('setLoadingStatus',true);
            axios.get(`${api}/posts`).then(responce => {
                      commit('setPosts', responce.data);
                      state.totalItems = responce.data.length;
                      state.totalPages = Math.ceil(responce.data.length / state.limit);
                      })
                  .catch((err) => {console.log("Ошибка загрузки списка постов ===> ", err)})
                  .finally(()=>{commit('setLoadingStatus',false);
                                        // console.log("СПИСОК ПОСТОВ ==> Oо-оО!!!")
                  })},

        setPost : ({commit}, id) => {
            commit('setLoadingStatus',true);
            axios.get(`${api}/posts/${id}`)
                .then(responce => {commit('setPost', responce.data);
                commit('setLoadingStatus',false)})
                .catch((err) => {console.log("Ошибка загрузки отдельного поста ===> ", err)})
                .finally(()=>{commit('setLoadingStatus',false),
                                      console.log("ПОСТ ==> Oо-оО!!!")})},

        setSettings : ({commit}) => {
            commit('setLoadingStatus',true);
            axios.get(`${api}/settings`)
                .then(responce => {commit('setSettings', responce.data);
                commit('setLoadingStatus',false)})
                .catch((err) => {console.log("Ошибка загрузки списка настроек ===> ", err)})
                .finally(()=>{commit('setLoadingStatus',false);
                    // console.log("СПИСОК НАСТРОЕК ==> Oо-оО!!!")
                })},

        setIsNewPost : ({commit}, payload) => {
            commit('setIsNewPost', payload);
        },
        setIsUpdatePost : ({commit}, payload) => {
            commit('setIsUpdatePost', payload);
        },
        setCurrentPost : ({commit}, payload) => {
            commit('setCurrentPost', payload);
        }
    }
//===========================================================================
})
//===========================================================================



