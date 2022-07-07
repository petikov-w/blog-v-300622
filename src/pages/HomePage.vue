<template lang="pug">
.wrapper
  .card-box
    .card(v-for="value in posts" :key="value.posts" )
      span.title {{ value.title }}
      span.body {{ secWord(value.body,12) }}
      router-link(:to='value.id' class="link-go") Подробнее...
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