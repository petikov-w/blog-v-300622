<template lang="pug">
.wrapper
  AdminPanel
    include ../assets/pug/AdminMenu
  .area-posts
    .new-post
      form.note-form(@submit.prevent="onSubmit") Новый пост
       .input
          //label(for="email") Адрес электронной почты
          input( required name="body-title" id="body-title" placeholder="Название поста")
       .input
          //label(for="Введите содержимое поста") Телефон в шапке сайта
          textarea(required name="body-post" id="body-post" placeholder="Содержимое поста")

       button(@click="handleSave()" type="submit") Сохранить
    .list-post
      span.title Список постов
      PaginationBox(@listPosts="handlePage" :list-main="posts" :order-sort="1" :limit-items-in-page="5"  )
        .list-posts
          .rec-post(v-for="value in posts_ps" :key="value.posts")
             span.post-title {{ value.title }}
             span.action-box
               p(style="color: green;" @click="") &#9998
               p(style="color: red;" @click="") &#10006

      //p(style="cursor: pointer;" @click="$emit('onRemove',index)") &#10005
      //.pagination-row
      //  button.arrow &#10140
      //  span(v-for="(item,index) in new Array(7)" :key="index" )
      //    button.pagination-button(v-if="index+1<=9") {{ index+1 }}
      //    button.pagination-button.pagination-button-fix(v-if="index+1>9") {{ index+1 }}
      //  button.arrow.arrow-fix &#10140
</template>

<script>
// import $router from "@/routers";
// import {useStore} from 'vuex'
// import { computed} from "vue";
import AdminPanel from "@/components/AdminPanel";
import {useStore} from "vuex";
import {ref, computed} from "vue";
import PaginationBox from "@/components/PaginationBox";
export default {

  name: "AdminPagePostSet",
  components: {AdminPanel, PaginationBox},

  setup() {
    // const store = useStore();
    // store.dispatch('setSettings');
    //
    // const telefon_a = computed(() => store.getters.getTelefon);
    // const email = computed(() => store.getters.getEmail);
    const store = useStore();
    store.dispatch('setPosts');
    const posts_ps = ref([]);
    const posts = computed(() => store.getters.getPosts);
    const handlePage = ((most) => {posts_ps.value=most;});
    const handleSave = async() => {
      const post_title = (document.getElementById('body-title').value.length===0
                       ? 'Ошибка 1'
                       : document.getElementById('body-title').value);
      const post_body = (document.getElementById('body-post').value.length===0
                       ? 'Ошибка 2'
                       : document.getElementById('body-post').value);
      let formData = new FormData();
      formData.append('title', post_title);
      formData.append('body', post_body);
      const res =await fetch('http://api.blog.loc/posts',
          {method: "POST", body: formData});
      // let resData = await res.json();
      // if (resData.status === true) { store.dispatch('setSettings');}

      const data = await res.json();
      console.log(data);
      document.getElementById('body-title').value = "";
      document.getElementById('body-post').value = "";
      await store.dispatch('setPosts');
    };
    return { handleSave, handlePage, posts, posts_ps }
  }
}
</script>

<style lang="scss" scoped>
.area-posts {
  display: flex;
  .new-post {
    .note-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      //padding: 15px;
      margin-right: 30px;
      font-family: $font-RobotoSlab;
      @include font(22px, 600, 26px, #4468e0);
      border-right: 1px solid #C8CDD2;
      padding-right: 40px;
      input {
        width: 500px;
        height: 40px;
        border-radius: 5px;
        padding: 3px 20px;
        margin: 10px 0;
        font-size: 18px;
        color: #EF5221;
        background-color: #c8cdd2;
        border: none;
        &::placeholder {
          font-family: sans-serif;
          text-transform: lowercase;
          @include font(16px, 500, 20px, #2D2D2D80);
        }
      }
      textarea {
        width: 500px;
        height: 250px;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        color: #126b05;
        background-color: #c8cdd2;
        border: none;
        &::placeholder {
          font-family: sans-serif;
          text-transform: lowercase;
          @include font(16px, 500, 20px, #2D2D2D80);
        }
      }
      button{
        margin-top: 30px!important;
        padding: 10px 30px;
        border-radius: 8px;
        border: 1px solid #EF6D00;
        cursor: pointer;
        background: #EF6D00;
        color: #f1f1f1;
        width: max-content;
        font-size: 16px;
        &:hover {
          background: #f1f1f1;
          color: #EF6D00;
          border: 1px solid #EF6D00;
        }
      }
    }

  }
  .list-post {
    margin-bottom: 20px;
    width: 550px;
    span.title {
      font-family: $font-RobotoSlab;
      @include font(22px, 600, 26px, #4468e0);
      margin-bottom: 20px!important;
    }
    .list-posts {
      display: flex;
      flex-direction: column;
      .rec-post {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid blue;
        border-radius: 8px;
        margin: 10px 0;
        padding: 10px 15px;
        width: auto;
        .post-title {
          color: #560b0b;
          font-weight: 500;
        }
        .action-box {
          display: flex;
          width: 50px;
          justify-content: space-between;
          p {
            font-size: 20px;
            cursor: pointer;
          }
        }
      }
    }

    .pagination-row {
      display: flex;
      align-items: center;
      margin-top: 20px!important;
      button.pagination-button {
        padding: 8px 13px;
        margin: 3px;
        background-color: blue;
        border-radius: 100%;
        color: #ffffff;
        font-weight: 600;
        border: 2px solid blue;
        &:hover {
          color: blue;
          background-color: #ffffff;
        }
      }
      button.pagination-button-fix {
        padding: 8px!important;
      }
      button.arrow {
        padding: 6px 9px;
        margin: 3px;
        background-color: blue;
        border-radius: 100%;
        color: #ffffff;
        font-weight: 600;
        border: 2px solid blue;
        &:hover {
          color: blue;
          background-color: #ffffff;
        }
      }
      button.arrow-fix {
        transform: scale(-1, 1);
      }
    }
    }
  }


</style>