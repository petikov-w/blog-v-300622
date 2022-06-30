<template lang="pug">
.wrapper
  .card-box
    div(v-for="value in posts" :key="value.posts" )
      .card
        .title {{ value.title }}
        .body {{ secDescr(value.body) }}
        a.card-link(href="#") Подробнее

</template>

<script>
import axios from 'axios';
//import {ref} from 'vue';
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
    secDescr(str) {
      return `${str.substring(0, 100)} ...`;
    }
  }
}
</script>

<style lang="scss" scoped>
//.wrapper-home {
//  width: 1100px;
//  margin: 0 auto;
//  display: flex;
//  flex-direction: column;
//  justify-content: flex-start;
//  //height: 87vh;
//  @media screen and (max-width: $phoneWidth) {
//    flex-direction: column;
//    width: 380px;
//    align-items: center;
//  }
//}


.card {
  //border: 1px solid #000000;
  padding: 20px 30px;
  margin-right: 20px;
  width: 350px;
  margin-top: 20px;
  background-color: #DCDFE6;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
  border-radius: 10px;
}

.card:hover {
  box-shadow: 0px 0px 0px 0px rgba(34, 60, 80, 0.2);
}

.card-box {
  display: flex;
  flex-wrap: wrap;
  margin: 20px;
}

.title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 20px;
  font-family: $font-RobotoSlab;
  @include font(26px, 800, 30px, #000000)
}

.body {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100px;

}
</style>