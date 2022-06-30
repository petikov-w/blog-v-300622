<template lang="pug">
- var s_center="text-align: center;";
.wrapper(style=s_center)
  h1 {{ item }}
  router-link(to="/" class="btn btnPrimary") Вернуться на главную
</template>

<script>
export default {
  name: "_itemAlias",
  data() {
    return {
      item: null
    }
  },
  created() {
    console.log('======  ',this.$route)
    this.item = "http://api.blog.loc/posts" + this.$route.fullPath;
  },
}
</script>

<style scoped>

</style>