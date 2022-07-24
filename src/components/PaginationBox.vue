<template lang="pug">
//h1 {{ posts }}
h1 --------0000---------
h1 {{ dest }}
h1 -----------------
h1 Постов на странице {{ postsPage }}
h1 Всего страниц с постами {{ totalPages }}
h1 Текущая страница {{ page }}
h1 offset {{ pagination_offset }}
slot
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
/* eslint-disable no-unused-vars */
// import {useStore} from 'vuex'
// import {useRoute} from "vue-router";
import {ref, computed, onBeforeUpdate, onMounted} from "vue";
import paginate from 'vuejs-paginate-next';
export default {
  name: "PaginationBox",
  components: {paginate},
  props: {
            listMain: { require: true },
            limitItemsInPage : { require: true, type: Number },
            // totalItems: { require: true, type: Number }
         },
  setup(props, {emit}) {
    // const store = useStore();
    // const route = useRoute();
    const dest = ref( []);
    // const posts = ref( []);
    const posts_pagin = ref ([]);
    // Состояние пагинации
    const page = ref(1); //Текущая страница
    const pagination_offset = ref(0); //Текущий офсет
    const postsPage = ref(props.limitItemsInPage);   //Постов на странице
    const totalPages = ref (0); //Всего страниц с постами

   // const posts = computed(() => store.getters.getPosts);

    const changePage = (page_num) => {
      page.value = page_num===0 ? page_num = 1 : page_num;
      pagination_offset.value = (postsPage.value*page.value)-postsPage.value;

      // posts_pagin.value = JSON.parse(JSON.stringify(dest.value.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1)))
      //                     .splice(pagination_offset.value, postsPage.value);
                           let rrr = JSON.parse(JSON.stringify(dest.value));
      console.log('------->>> ', rrr.splice(pagination_offset.value, postsPage.value) );
      // posts_pagin.value = JSON.parse(JSON.stringify(dest.value));
      //
      // emit('listPosts', posts_pagin.value);
    }
    onBeforeUpdate(() => { dest.value = ref( props.listMain);
                                totalPages.value = Math.ceil( ref(props.listMain).value.length / postsPage.value);
                                 changePage(page.value);
    })
    onMounted(() => { dest.value = ref( props.listMain);
       changePage(page.value);
    });
    return {
      changePage,
      totalPages,
      page,
      postsPage,
      // posts,
      // totalPostPages,
      //totalItemsN
      dest,
      posts_pagin,
      pagination_offset
    }
  }
}
</script>

<style scoped>
</style>