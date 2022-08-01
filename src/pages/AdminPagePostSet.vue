<template lang="pug">
Dialog(v-model:show="dialogVisible")
   include ../assets/pug/DialogDeletePost
.wrapper
  AdminPanel
   include ../assets/pug/AdminMenu
  .area-posts
    .new-post(v-if="newPost" )
      include ../assets/pug/FormNewPost
    .update-post(v-if="updatePost" )
      include ../assets/pug/FormUpdatePost
    .list-post
      span.title Список постов
      PaginationBox(@listPosts="handlePage" :list-main="posts" :order-sort="1" :limit-items-in-page="5"  )
        .list-posts
          .rec-post(v-for="value in posts_ps" :key="value.posts")
             span.post-title {{ value.title }}
             span.action-box
               p(style="color: green;" @click="clickPostUpdate(value)") &#9998
               p(style="color: red;" @click="showDialogDelete(value)") &#10006
               //p(style="color: red;" @click="clickPostDelete(value)") &#10006

</template>

<script>
import AdminPanel from "@/components/AdminPanel";
import {useStore} from "vuex";
import {ref, computed} from "vue";
import Dialog from "@/components/UI/Dialog";
import PaginationBox from "@/components/PaginationBox";
export default {

  name: "AdminPagePostSet",
  components: {AdminPanel, Dialog, PaginationBox},

  setup() {

    const store = useStore();
    store.dispatch('setPosts');
    const changeFlag = ref(false);
    const dialogVisible = ref(false);
    const newPost = ref(true);
    const updatePost = ref(false);
    const current_post = ref([]);
    const message = ref("");
    const posts_ps = ref([])    ;
    const posts = computed(() => store.getters.getPosts);

    const handlePage = (most) => {posts_ps.value=most;};
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
    const handleSaveUpdate = async() => {
      // console.log("==========> ", current_post.value.title);
      const data = {
         title: current_post.value.title,
         body: current_post.value.body
      };
      const res = await fetch(`http://api.blog.loc/posts/${current_post.value.id}`,
          {
            method: "PATCH",
            body: JSON.stringify(data)
          });
      if (res.ok === true)  await store.dispatch('setPosts');
      newPost.value = true;
      updatePost.value = false;
    };
    const clickPostUpdate = (value) => {
         newPost.value = false;
         updatePost.value = true;
         current_post.value = value;
         if (changeFlag.value) alert("привет")
      //console.log("==========> ", current_post.value);
    };
    const clickPostDelete = async (value) => {
         current_post.value = value;
         const res = await fetch(`http://api.blog.loc/posts/${current_post.value.id}`,
              { method: "DELETE" });
         if (res.ok === true)  await store.dispatch('setPosts');
         dialogVisible.value=false;
    };
    const hiddenDialog = () => {dialogVisible.value=false;}
    const showDialogDelete = (value) => {
      // if (changeFlag) {}
      dialogVisible.value=true;
      current_post.value=value;}
    const handleChange = () => changeFlag.value = true;

    return { handleSave, handleSaveUpdate, handlePage, clickPostUpdate, clickPostDelete, showDialogDelete, hiddenDialog,
      handleChange, changeFlag, dialogVisible, current_post, newPost, updatePost, message, posts, posts_ps }
  }
}
</script>

<style lang="scss" scoped>
.area-posts {
  display: flex;
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
  }
}


</style>