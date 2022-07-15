<template lang="pug">
.wrapper
  h1 Всего постов: {{ totalItems }}
  h1 Постов на странице: {{ postsPage }}
  h1 Всего страниц с постами: {{ totalPages }}
  //.card-box
  //  .card(v-for="value in posts" :key="value.posts")
  //    span.title {{ value.title }}
  //    span.body {{ secWord(value.body,12) }}
  //    router-link(:to='value.id' class="link-go") Подробнее...
</template>

<script>
import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "HomePage",
  setup(){
//------------------------------------
      const store = useStore();
      store.dispatch('setPosts');
      const posts = computed(() => store.getters.getPosts);
      const totalPages = computed(() => store.getters.getTotalPages);
      const totalItems = computed(() => store.getters.getTotalItems);
      const postsPage= computed(() => store.getters.getPostsPage);
      const secWord = (str, count) => {
          const adis = str.split(" ");
          let result = '';
          for(let i=0; i < count; i++) { result += adis[i]+" "; }
          result += "...";
      return result;}
//------------------------------------
      return {secWord,
              posts,
              totalPages,
              totalItems,
              postsPage}
  }
}
</script>

<style lang="scss" scoped>
</style>