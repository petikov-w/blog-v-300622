<template lang="pug">
.mask-preloader(v-if="loadingStatus")
  .preloader
.wrapper
  .post-content
    img.banner(:src="`${api}${post.image}`" logo="pic")
    .post-title {{ post.title }}
  p {{ post.body }}

</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router';
import {ref, computed} from "vue";

export default {
  name: "itemPost",
  setup(){
//------------------------------------
    const site = "Блог";
    const store = useStore();
    const route = useRoute();
    const api = 'http://api.blog.loc'; // локальный сервер
// const api = 'https://api.blog.kroxdev.ru'; // хостинг
    const id_post = route.fullPath.split('/')[2];

    // console.log("---->  ", route.fullPath, "======>  ", id_post);
    let post = ref("");
    store.dispatch('setPost', id_post);
    post = computed(() => store.getters.getPost);
    console.log("---->  ", post.value);
    // Состояние загрузки
    document.title = `${site} - ${post.value.title}`;
    const loadingStatus = computed(() => store.getters.getLoadingStatus);

//------------------------------------
    return {post, api, loadingStatus}
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.wrapper {
  .post-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    .banner {
      position: relative;
      z-index: 1;
      min-width: 100%;
      height: 400px;
      object-fit: cover;
      //transform: scale(1, 1);
      opacity: 0.9;
    }
    .post-title {
      position: absolute;
      z-index: 3;
      padding: 10px 15px;
      font-family: $font-RobotoSlab;
      @include font(44px, 800, 52px, #ffffff);
      border-radius: 10px;
      //background: linear-gradient(to left, rgba(0, 0, 0, 0.85), transparent);
      background: rgba(0, 0, 0, 0.3);
    }
  }
  p {
    max-width: 60vw;
    margin-bottom: 30px;
    white-space: pre-wrap;
  }
}


</style>
