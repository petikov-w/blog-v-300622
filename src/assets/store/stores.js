import {createStore} from "vuex";
//import {ref} from "vue";
import axios from "axios";

export default createStore({
        state: {
            posts:  [];
            /*const telefon = ref("79094282452");
            const contentHeader=  {
                logo: require('@/assets/images/logo-2.jpg'),
                telefon: telefon.value,
                subtitle: "Срочный вопрос"
            }*/
            /*const main_content = {
                title: "Качественный газ для газгольдера",
                subtitle: "Доставка в любое время дня и ночи вне зависимости от погодных условий"
            };*/


        },
        mutations: {
            SET_POSTS_TO_STATE: (state, posts) => state.posts=posts;
        },
        actions: {
            GET_POSTS_FROM_API({commit}) {
                return axios('http://api.blog.loc/posts',{ method: "GET"})
                     .then((posts) => {
                         commit(SET_POSTS_TO_STATE, posts);
                     })
        },
        getters: {
            POSTS(state) {
                return state.posts;
            }
        }
        }
    }
    )
