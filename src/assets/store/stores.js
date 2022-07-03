import {createStore} from "vuex";
//import {ref} from "vue";
import axios from "axios";

export default createStore( {
        state: {
            posts:  [],
            // title: "Всем Большой Приветик",
            telefon: "79094282452"
            // const contentHeader=  {
            //     logo: require('@/assets/images/logo-2.jpg'),
            //     telefon: telefon.value,
            //     subtitle: "Срочный вопрос"
            // }*/
            // /*const main_content = {
            //     title: "Качественный газ для газгольдера",
            //     subtitle: "Доставка в любое время дня и ночи вне зависимости от погодных условий"
            // };*/


        },
        getters: {
            // POSTS(state) {
            //     return state.posts;
            // },
            getPosts: (state) => state.posts,
            getTelefon: (state) => state.telefon

            // TELEFON(state) {
            //     return state.telefon;
            // }
        },
        mutations: {
            SET_POSTS_TO_STATE(state, posts) {
                state.posts = posts
            }
        },
        actions: {
           async GET_POSTS_FROM_API(context) {
                // const data = await axios.get('http://api.blog.loc/posts')
                // this.posts = data.data;
                // console.log(this.posts)
               // then(responce => {this.posts = responce.data
               //     console.log(responce)
               //     console.log(this.posts)}
               // )


               try {
                   const data = await axios.get('http://api.blog.loc/posts');
                   context.commit('SET_POSTS_TO_STATE', data.data)


               }
               catch (error) {
                   alert(error)
                   console.log(error)
               }


            } //end ---
    } //actions end
  }
)



/*GET_POSTS_FROM_API({commit}) {
    return axios
        .get('http://api.blog.loc/posts')
        .then(responce => {this.posts = responce.data
            console.log(responce)
            console.log(this.posts)}
        ).then((posts) => { commit('SET_POSTS_TO_STATE', posts);
            return posts;
            // axios('http://api.blog.loc/posts',{ method: "GET"})
            //      .then((posts) => {
            //          commit('SET_POSTS_TO_STATE', posts);
            //          return posts;
        })

},*/

// axios
//     .get('http://api.blog.loc/posts')
//     .then(responce => {this.posts = responce.data
//         console.log(responce)
//         console.log(this.posts)}
//     )
//     .catch(e => {this.errors.push(e)})