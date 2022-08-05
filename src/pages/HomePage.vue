<template lang="pug">
.mask-preloader(v-if="loadingStatus")
  .preloader
.wrapper
  .content-box
    PaginationBox(@listPosts="handlePage" :list-main="posts" :order-sort="1" :limit-items-in-page="3"  )
      .card-box
        .card(v-for="value in posts_ps" :key="value.id")
          img.banner(:src="`${api}${value.image}`" logo="pic")
          .content-section
            span.title {{ value.title }}
            span.body {{ secWord(value.body, 12) }}
            router-link(:to='`/post/${value.id}`'  class="link-go") Подробнее...

</template>

<script>
import {useStore} from 'vuex'
// import {useRoute} from "vue-router";
import {ref, computed} from "vue";
import PaginationBox from "@/components/PaginationBox";
import {secWord} from "@/assets/js/function";
//import stores from "@/assets/store/stores";


export default {
  name: "HomePage",
  components: {PaginationBox},
  setup(){
    const store = useStore();
    store.dispatch('setPosts');
    const api = 'http://api.blog.loc'; // локальный сервер
// const api = 'https://api.blog.kroxdev.ru'; // хостинг
    const posts = computed(() => store.getters.getPosts);
    const posts_ps = ref([]);
    const handlePage = ((most) => {posts_ps.value=most;});
    // onUnmounted(()=>stores.dispatch('setCurrentPost', value));

    return {
      secWord,
      api,
      handlePage,
      posts,
      posts_ps
    }
  }
}
</script>

<style lang="scss" scoped>
.content-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 50vh;
  .card-box {
    //position: relative;
    display: flex;
    flex-wrap: wrap;

  }
}
</style>
