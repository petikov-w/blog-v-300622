<template lang="pug">
.wrapper
  .card-box
    div(v-for="value in posts" :key="value.posts" )
      .card
        .title {{ value.title }}
        .body {{ secWord(value.body,12) }}
        //a(:href=`link(value.id)`) Подробнее
        //router-link(:to='link(value.id)') Подробнее...
        router-link(:to='"http://api.blog.loc/posts"+"/"+value.id') Подробнее...
//const sss = `http://api.blog.loc/posts/${post.id}`;
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
    axios
        //.get('https://jsonplaceholder.typicode.com/posts')
        .get('http://api.blog.loc/posts')
        .then(responce => {this.posts = responce.data
              console.log(responce)
              console.log(this.posts)}
        )
        .catch(e => {this.errors.push(e)})
  },
  methods: {
    link(value) {
      return `http://api.blog.loc/posts/${value}`;
    },
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