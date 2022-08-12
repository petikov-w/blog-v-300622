<template lang="pug">
Dialog(v-model:show="dialogVisibleDelete")
  include ../assets/pug/DialogDeletePost
.admin-body
  .sidebar-left
    .sidebar-top-box
      .admin-title  Панель администратора
      include ../assets/pug/AdminMenu
    .sidebar-bottom-box
      router-link(:to="{ name: 'home'}" class="admin-exit") Выйти
  .right-box
    include ../assets/pug/FormUpdateSettings
    include ../assets/pug/FormNewPost
    include ../assets/pug/ListPosts
    include ../assets/pug/FormUpdatePost
</template>

<script>
// import {useRoute, useRouter} from "vue-router";
import {useRoute} from "vue-router";
import {useStore} from "vuex";
import { ref, computed, onBeforeUpdate, onMounted} from "vue";
import Dialog from "@/components/UI/Dialog";
import {email, telefon, telefon_a, handleSaveSet} from "@/assets/js/setUpdate";
import {handleSaveNew} from "@/assets/js/postCreate";
import {dialogVisibleDelete, clickPostDelete, showDialogDelete, hiddenDialogDelete} from "@/assets/js/postDelete"
import {dialogVisibleUpdate, hiddenDialogUpdate, handleSaveUpdate, clickPostUpdate,
  handleChange} from "@/assets/js/postUpdate";
import PaginationBox from "@/components/PaginationBox";
// import stores from "@/assets/store/stores";


export default {
  name: "AdminPanel",
  components: {Dialog, PaginationBox},
  setup() {
    const route = useRoute();
    // const router = useRouter();
    const stores = useStore();
    // stores.dispatch('setPosts');
    // store.dispatch('setSettings');
    const current_route = computed(() => stores.getters.getCurrentRoute);
    const posts = computed(() => stores.getters.getPosts);
    const current_post = computed(() => stores.getters.getCurrentPost);
    const posts_ps = ref([]);
    // const isListPosts = computed(() => stores.getters.getIsListPosts);
    // const isUpdatePost = computed(() => stores.getters.getIsUpdatePost);

    const handlePage = (most) => {posts_ps.value=most;};
    const handleClickMenu = () => {
      const route_name = computed(() =>route.name);
      stores.dispatch('setCurrentRoute', route_name.value);
      // console.log("==== 00 ===>> ",current_route.value)
    }

    onMounted( stores.dispatch('setPosts'));
    onBeforeUpdate(stores.dispatch('setPosts'));

    return {handleClickMenu, handleSaveSet, handlePage,
      dialogVisibleUpdate, dialogVisibleDelete, clickPostUpdate, hiddenDialogUpdate,
      handleSaveUpdate, handleSaveNew, handleChange, clickPostDelete, showDialogDelete,
      hiddenDialogDelete, current_post, posts_ps, posts, current_route, telefon, telefon_a, email, }
  }
}
</script>

<style lang="scss" scoped>
.admin-body {
  display: flex;
  margin-top: 20px;
  .sidebar-left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 250px;
    background-color: #4468e0;
    height: 80vh;
    //margin-right: 40px;
    //border-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .admin-title {
      font-size: 16px;
      margin-top: 20px;
      margin-left: 25px;
      color: #ffffff;
      font-weight: 600;
      width: max-content;
      border-bottom: 2px solid #ffffff;
      padding-bottom: 10px;
    }
    .sidebar-bottom-box {
      border-top: 2px solid #ffffff;
      padding-top: 10px;
      margin-left: 25px;
      margin-bottom: 20px;
      width: 195px;
      .admin-exit {
        font-size: 16px;
        margin-bottom: 20px;
        color: #ffffff;
        font-weight: 600;
        border-top: 2px solid #ffffff;
        padding-top: 10px;
        &:hover {
          color: #a2b0b0;
          cursor: pointer;
        }
      }
    }
  }
  .right-box {
    padding-left: 40px;
    padding-top: 20px;
    padding-right: 40px;
    width: 80%;
    height:80vh;
    border: 1px solid #606266;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none;
    overflow: auto;
  }
}
</style>