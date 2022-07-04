<template lang="pug">
//- var s_center="text-align: center;";
.wrapper
  .post-content
    .post-title {{ post.title }}
    p {{ post.body }}
    router-link(to="/" class="link-go-main-page") Вернуться на главную
</template>

<script>
// import axios from "axios";
// import {useStore} from "vuex";
// import {computed} from "vue/dist/vue";

import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "_itemAlias",
  setup(){
//------------------------------------
    const store = useStore();
    console.log('========>>>>>>>>>>  ',this.$route.fullPath)
    store.dispatch('setPost', this.$route.fullPath);
    const post = computed(() => store.getters.getPost);
//------------------------------------
    return {post}
  }

  // data() {
  //   return {
  //     item: null,
  //     posts: [],
  //     errors: []
  //   }
  // },
  // created() {
  //   this.item = "http://api.blog.loc/posts" + this.$route.fullPath;
  //   axios
  //       .get(this.item)
  //       .then(responce => {this.posts = responce.data
  //         console.log(responce)
  //         console.log(this.posts)}
  //       )
  //       .catch(e => {this.errors.push(e)})
  // },
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
  .link-go-main-page {
    color: #4468e0;
    &:hover {
      width: max-content;
      border-bottom: 1px solid #4468e0;
      padding-bottom: 3px;
    }
  }
}

</style>
