<template lang="pug">
.wrapper
  .card-box
    h1 {{ title }}
    h1 {{ posts }}
    div(v-for="value in posts" :key="value.posts" )
      .card
        .title {{ value.title }}
        .body {{ secWord(value.body,12) }}
        router-link(:to='value.id') Подробнее...
//const sss = `http://api.blog.loc/posts/${post.id}`;
</template>

<script>
// import axios from 'axios';
import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "HomePage",
  setup(){
      const store = useStore();
      const title = computed(() => store.getters.getTelefon);
      const posts = computed(() => store.getters.getPosts);
      return {title, posts}

  }
}
</script>

<style lang="scss" scoped>
</style>