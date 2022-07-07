<template lang="pug">
footer.footer
  .footer-wrapper
    router-link(v-if="!isHome" :to="{ name: 'home'}" class="link-go") Вернуться на главную
    router-link(v-if="!isAdmin && !isPost" :to="{ name: 'admin'}" class="link-go-admin") Панель администратора

</template>

<script>
import {useRoute} from 'vue-router';
import {computed} from "vue";

export default {
  name: 'Footer-m',
  setup() {
    const route = useRoute();
    const isAdmin = computed(() => route.name==='admin' ? true : false);
    const isHome = computed(() => route.name==='home' ? true : false);
    const isPost = computed(() => route.name==='post' ? true : false);
    return { isAdmin, isHome, isPost}
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  span {
    font-family: 'Open Sans', sans-serif;
    @include font(14px, 400, 19px, #f1f1f1);
    text-decoration: underline;
    margin-right: 30px;
  }
}
</style>