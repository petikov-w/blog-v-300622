<template lang="pug">
.wrapper
  .card-box
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
//------------------------------------
      const store = useStore();
      store.dispatch('setPosts');
      // const title = computed(() => store.getters.getTelefon);
      const posts = computed(() => store.getters.getPosts);
      const secWord = (str, count) => {
          const adis = str.split(" ");
          let result = '';
          for(let i=0; i < count; i++) { result += adis[i]+" "; }
          result += "...";
      return result;}
//------------------------------------
      return {secWord,
              posts}
  }
}
</script>

<style lang="scss" scoped>
</style>