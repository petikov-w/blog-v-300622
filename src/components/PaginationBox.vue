<template lang="pug">
//h1 Постов на странице {{ postsPage }}
//h1 Всего страниц с постами {{ totalPages }}
//h1 Текущая страница {{ page }}
//h1 offset {{ pagination_offset }}
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
// import {useStore} from 'vuex'
// import {useRoute} from "vue-router";
import {ref, onBeforeUpdate, onMounted} from "vue";
import paginate from 'vuejs-paginate-next';
export default {
  name: "PaginationBox",
  components: {paginate},
  props: {
            listMain: { require: true, type: Array },
            limitItemsInPage : { require: true, type: Number },
            orderSort: {require: true, type: Number, default: 1}
         },
  setup(props, {emit}) {
    // const store = useStore();
    // const route = useRoute();
    let dataset_in = [];
    let datset_sort = [];
    // Состояние пагинации
    const page = ref(1); //Текущая страница
    const pagination_offset = ref(0); //Текущий офсет
    const postsPage = ref(props.limitItemsInPage);   //Постов на странице
    const totalPages = ref(0); //Всего страниц с постами
    const orderSort = ref(props.orderSort);
    // const orderSort = computed(()=>{
    //   return `${props.orderSort}`
    // });

    const changePage = (page_num) => {
      page.value = page_num;
      pagination_offset.value = (postsPage.value*page.value)-postsPage.value;
      console.log("----sort----->>>> ", orderSort.value);
      if(orderSort.value === 1) {
        datset_sort = dataset_in.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1);
      } else if (orderSort.value === 2) {
        datset_sort = dataset_in.sort((a, b) => Number(a.id) > Number(b.id) ? 1 : -1);
      }

      // const dataset_out = JSON.parse(JSON.stringify(dataset_in.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1)))
      //       .splice(pagination_offset.value, postsPage.value);
      const dataset_out = JSON.parse(JSON.stringify(datset_sort)).splice(pagination_offset.value, postsPage.value);
      emit('listPosts', dataset_out);
    }
    onBeforeUpdate(() => {
                                dataset_in = props.listMain;
                                totalPages.value = Math.ceil( ref(props.listMain).value.length / postsPage.value);
                                changePage(page.value);
    })
    onMounted(() => {
      dataset_in = props.listMain;
       changePage(page.value);
    });
    return {
      changePage,
      totalPages,
      page,
      postsPage,
     //dest: dataset_in,
     // posts_pagin,
     // pagination_offset
    }
  }
}
</script>

<style scoped>
</style>