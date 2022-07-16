<template lang="pug">
.wrapper
  //h1 Всего постов: {{ totalItems }}
  //h1 Постов на странице: {{ postsPage }}
  //h1 Всего страниц с постами: {{ totalPages }}
  //h1 Текущая страница:  {{ page }}
  //h1 Текущий офсет:  {{ pagination_offset }}

  .card-box(onload="changePage")
    .card(v-for="value in posts_pagin" :key="value.id")
      span.title {{ value.title }}
      span.body {{ secWord(value.body,12) }}
      router-link(:to='value.id' class="link-go") Подробнее...
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
  name: "HomePage",
  components: {paginate},
  setup(){
//------------------------------------
      const store = useStore();
      // const route = useRoute();
      store.dispatch('setPosts');
      const page = ref(0);
      const pagination_offset = ref(0);
      const posts = computed(() => store.getters.getPosts);
      const totalPages = computed(() => store.getters.getTotalPages);
      //const totalItems = computed(() => store.getters.getTotalItems);
      const postsPage= computed(() => store.getters.getPostsPage);
      const posts_pagin = ref ([]);
      // const page = computed(() => store.getters.getCurrentPage);
      const secWord = (str, count) => {
          const adis = str.split(" ");
          let result = '';
          for(let i=0; i < count; i++) { result += adis[i]+" "; }
          result += "...";
      return result;}
      const changePage = (page_num) => {
        page.value = page_num;
        pagination_offset.value = (postsPage.value*page.value)-postsPage.value;
        // if (page.value === 1) {
        //  console.log(route.path=`/page=${page.value}`)  }
        // else {
        //    route.push(`/page=${page.value}`)
        // }

        const s1 = JSON.stringify(posts.value);
        const s2 = JSON.parse(s1);
        const s3 = s2.splice(pagination_offset.value, postsPage.value);
        posts_pagin.value = s3;
        // console.log("= 1 => ", s2)
        // console.log("= 2 => ", s3)
        // console.log("= 3 => ", posts_pagin.value)
        }

    onBeforeUpdate(() => {
      // store.dispatch('setPosts');
      changePage(page.value);
      console.log("==1===>  ",posts.value);
      console.log("==2===>  ",posts_pagin.value);
    })
    onMounted(() => {
      // store.dispatch('setPosts');
      changePage(page.value);
      console.log("==1===>  ",posts.value);
      console.log("==2===>  ",posts_pagin.value);
    })
//------------------------------------
      return {secWord,
              // posts,
              totalPages,
              // totalItems,
              // postsPage,
              changePage,
              page,
              // pagination_offset,
              posts_pagin}
  }
}
</script>

<style lang="scss" scoped>

button{
  margin-top: 30px!important;
  padding: 10px 30px;
  border-radius: 8px;
  border: 1px solid #EF6D00;
  cursor: pointer;
  background: #EF6D00;
  color: #f1f1f1;
  width: max-content;
  font-size: 16px;
  &:hover {
    background: #f1f1f1;
    color: #EF6D00;
    border: 1px solid #EF6D00;
  }
}
.pagination-row {
  display: flex;
  align-items: center;
  margin-top: 30px;
  font-size: 18px;

  button.pagination-button {
    padding: 8px 13px;
    margin: 3px;
    background-color: blue;
    border-radius: 100%;
    color: #ffffff;
    font-weight: 600;
    border: 2px solid blue;
    &:hover {
      color: blue;
      background-color: #ffffff;
    }
  }
  button.pagination-button-fix {
    padding: 8px!important;
  }
  button.arrow {
    padding: 6px 9px;
    margin: 3px;
    background-color: blue;
    border-radius: 100%;
    color: #ffffff;
    font-weight: 600;
    border: 2px solid blue;
    &:hover {
      color: blue;
      background-color: #ffffff;
    }
  }
  button.arrow-fix {
    transform: scale(-1, 1);
  }
}
</style>