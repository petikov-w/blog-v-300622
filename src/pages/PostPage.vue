<template lang="pug">
.mask-preloader(v-if="loadingStatus")
  .preloader
.wrapper
  .post-content
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
    const store = useStore();
    const route = useRoute();
    store.dispatch('setPost', route.fullPath);
    let post = ref("");
    post = computed(() => store.getters.getPost);
    // Состояние загрузки
    const loadingStatus = computed(() => store.getters.getLoadingStatus);
//------------------------------------
    return {post, loadingStatus}
  }
}
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}

.post-content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .post-title {
    font-family: $font-RobotoSlab;
    @include font(34px, 800, 40px, #000000);
    margin: 30px 0;
  }
  p {
    max-width: 60vw;
    margin-bottom: 30px;
    white-space: pre-wrap;
  }
}

</style>
