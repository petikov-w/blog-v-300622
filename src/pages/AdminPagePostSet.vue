<template lang="pug">
Dialog(v-model:show="dialogVisibleDelete")
  include ../assets/pug/DialogDeletePost
Dialog(v-model:show="dialogVisibleUpdate")
  include ../assets/pug/DIalogUpadatePost
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
</template>

<script>
import AdminPanel from "@/components/AdminPanel";
import {useStore} from "vuex";
import {ref, computed, onMounted, onBeforeUpdate} from "vue";
import Dialog from "@/components/UI/Dialog";
import {handleSave} from "@/assets/js/postCreate";
import {dialogVisibleDelete, showDialogDelete, clickPostDelete, hiddenDialogDelete}
        from"@/assets/js/postDelete"
import {dialogVisibleUpdate, clickPostUpdate, hiddenDialogUpdate, handleSaveUpdate,
        handleChange} from "@/assets/js/postUpdate";

import PaginationBox from "@/components/PaginationBox";
import stores from "@/assets/store/stores";
export default {
  name: "AdminPagePostSet",
  components: {AdminPanel, Dialog, PaginationBox},
  setup() {
    const store = useStore();
    store.dispatch('setPosts');
    // const newPost = computed(() => stores.getters.getIsNewPost);
    // const updatePost = computed(() => stores.getters.getIsUpdatePost);
    const current_post = computed(() => stores.getters.getCurrentPost);
    const posts_ps = ref([]);
    const posts = computed(() => store.getters.getPosts);
    const handlePage = (most) => {posts_ps.value=most;};


    onMounted( store.dispatch('setPosts'));
    onBeforeUpdate(store.dispatch('setPosts'));

    return { handleSave, handleSaveUpdate, handlePage, clickPostUpdate, clickPostDelete, showDialogDelete, hiddenDialogDelete,
      hiddenDialogUpdate, handleChange, dialogVisibleUpdate, dialogVisibleDelete, current_post,  posts, posts_ps }
  }
}
</script>

<style lang="scss" scoped>
.area-posts {
  display: flex;
}
</style>