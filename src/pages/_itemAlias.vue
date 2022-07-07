<template lang="pug">
.wrapper
  .post-content
    .post-title {{ post.title }}
    p {{ post.body }}
    router-link(:to="{ name: 'home'}" class="link-go") Вернуться на главную
</template>

<script>
import {useStore} from 'vuex'
import {useRoute} from 'vue-router';
import {computed} from "vue";

export default {
  name: "_itemAlias",
  setup(){
//------------------------------------
    const store = useStore();
    const route = useRoute();
    store.dispatch('setPost', route.fullPath);
    const post = computed(() => store.getters.getPost);
    // console.log(' >> 3 >> ', post)
//------------------------------------
    return {post}
  }
}
</script>

<style lang="scss" scoped>
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
  }
}

</style>
