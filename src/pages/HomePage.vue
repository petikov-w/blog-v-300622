<template lang="pug">
//h1 ****** {{ posts_ps }}
.mask-preloader(v-if="loadingStatus")
  .preloader
.wrapper
  .content-box
    PaginationBox(@listPosts="handlePage" :list-main="posts" :order-sort="1" :limit-items-in-page="3"  )
      .card-box
        .card(v-for="value in posts_ps" :key="value.id")
          span.title {{ value.title }}
          span.body {{ secWord(value.body,12) }}
          router-link(:to='value.id' class="link-go") Подробнее...

</template>

<script>
import {useStore} from 'vuex'
// import {useRoute} from "vue-router";
import {ref, computed} from "vue";
import PaginationBox from "@/components/PaginationBox";
import {secWord} from "@/function";


export default {
  name: "HomePage",
  components: {PaginationBox},
  setup(){
    const store = useStore();
    store.dispatch('setPosts');
    const posts = computed(() => store.getters.getPosts);
    //const sd = computed(() => store.getters.getPosts).value.length;
    const posts_ps = ref([]);
    // const ghj = ref(posts.value).length;
    // console.log("ooooooooooooo> ", posts.value)
    const handlePage = ((most) => {posts_ps.value=most;})
    return {
      secWord,
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
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
