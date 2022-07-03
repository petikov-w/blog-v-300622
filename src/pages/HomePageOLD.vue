<template lang="pug">
.wrapper
  .card-box
    h1 {{ $store.state.title }}
    //h1 {{ countPosts() }}
    div(v-for="value in posts" :key="value.posts" )
      .card
        .title {{ value.title }}
        .body {{ secWord(value.body,12) }}
        router-link(:to='value.id') Подробнее...

</template>

<script>
import axios from 'axios';
export default {
  name: "HomePage",
  data() {
    return {
      posts: [],
      errors: []
    }
  },
  created() {
    console.log('=====>> ',this.$store)
    axios
        .get('http://api.blog.loc/posts')
        .then(responce => {this.posts = responce.data
              console.log(responce)
              console.log(this.posts)}
        )
        .catch(e => {this.errors.push(e)})
  },
  methods: {
    secWord(str, count) {
        const adis = str.split(" ");
        let result = '';
        for(let i=0; i < count; i++) { result += adis[i]+" "; }
        result += "...";
    return result;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>