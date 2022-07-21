<template lang="pug">
//.paginate-box
paginate(
  v-model="page"
  :page-count="totalPages"
  :page-range="3"
  :click-handler="changePage"
  :prev-text="'&#10140'"
  :prev-class="'arrow-prev'"
  :prev-link-class='"arrow"'
  :next-text="'&#10140'"
  :next-class="'arrow-next'"
  :next-link-class="'arrow'"
  :container-class="'pagination'"
  :page-class="'page-item'"
  :active-class="'active'"
  )
</template>

<script>
import {useStore} from 'vuex'
// import {useRoute} from "vue-router";
import {ref,computed, onBeforeUpdate, onMounted} from "vue";
import paginate from 'vuejs-paginate-next';

export default {
  name: "PaginationBox",
  components: {paginate},
  setup() {
    const store = useStore();
    // const route = useRoute();
    store.dispatch('setPosts');
    // Состояние пагинации
    const page = ref(0); //Текущая страница
    const pagination_offset = ref(0); //Текущий офсет
    const totalPages = computed(() => store.getters.getTotalPages); //Всего страниц с постами
    const postsPage= computed(() => store.getters.getPostsPage); //Постов на странице
    const posts = computed(() => store.getters.getPosts);
    const posts_pagin = ref ([]);
    const changePage = (page_num) => {
      page.value = page_num===0 ? page_num = 1 : page_num;
      pagination_offset.value = (postsPage.value*page.value)-postsPage.value;
      posts_pagin.value = JSON.parse(JSON.stringify(posts.value.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1))).
      splice(pagination_offset.value, postsPage.value);
    }

    onBeforeUpdate(() => { changePage(page.value); })
    onMounted(() => { changePage(page.value);
    });
    return {
      changePage,
      totalPages,
      page,
      posts_pagin}
  }
}
</script>

<style scoped>

</style>