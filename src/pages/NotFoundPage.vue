<template lang="pug">
//h1.article-title 404 Страница не найдена
.wrapper-home
  .is404 404
  .title Страница не найдена
  //img(src="@/assets/images/btn_back_to_the_site.png" @click="back_to_main")
  //.btn-main
  //  router-link(to="/" class="btn btnPrimary") Вернуться на главную

</template>

<script>
import $router from "@/routers";

export default {
  name: "NotFoundPage",
  setup() {
    const back_to_main = () => {$router.push('/')};
    return {back_to_main}
  }
}
</script>

<style lang="scss" scoped>
.wrapper-home {
  width: 1100px;
  margin: 0 auto;
  min-height: 80vh;
  //font-family: $font-RussoOne;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  .is404 {
    @include font(200px, 400, 250px, #EF5221);
    text-align: center;
    margin-bottom: -20px;
  }

  .title {
    text-align: center;
    color: #ec9b3b;
    font-size: 36px;
  }
  img {
    width: 35%;
    text-align: center;
    margin-top: 30px;
  }
  //.btn-main {
  //  text-align: center;
  //  margin-top: 40px;
  //}
}
</style>