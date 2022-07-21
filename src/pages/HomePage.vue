<template lang="pug">
//.mask-preloader
//  .preloader
.wrapper
  .content-box
    .card-box
      .card(v-for="value in posts_pagin" :key="value.id")
        span.title {{ value.title }}
        span.body {{ secWord(value.body,12) }}
        router-link(:to='value.id' class="link-go") Подробнее...
    .paginate-box
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
      // Состояние пагинации
      const page = ref(0); //Текущая страница
      const pagination_offset = ref(0); //Текущий офсет
      const totalPages = computed(() => store.getters.getTotalPages); //Всего страниц с постами
      const postsPage= computed(() => store.getters.getPostsPage); //Постов на странице
      //const totalItems = computed(() => store.getters.getTotalItems); //Всего постов

      const posts = computed(() => store.getters.getPosts);
      // const posts = computed(() => store.getters.getPosts);
      const posts_pagin = ref ([]);

      const secWord = (str, count) => {
          const adis = str.split(" ");
          let result = '';
          for(let i=0; i < count; i++) { result += adis[i]+" "; }
          result += "...";
      return result;}
      const changePage = (page_num) => {
        page.value = page_num===0 ? page_num = 1 : page_num;
        pagination_offset.value = (postsPage.value*page.value)-postsPage.value;
        // if (page.value === 1) {
        //  console.log(route.path=`/page=${page.value}`)  }
        // else {
        //    route.push(`/page=${page.value}`)
        // }

        posts_pagin.value = JSON.parse(JSON.stringify(posts.value.sort((a, b) => Number(a.id) < Number(b.id) ? 1 : -1))).
                            splice(pagination_offset.value, postsPage.value);

      }

    onBeforeUpdate(() => {
      // let mask = document.querySelector('.mask-preloader');
      // window.addEventListener('load',()=> {
      //   mask.classList.add('hide-preloader');
      //   setTimeout(()=> { mask.remove(); },600)
      // });
      changePage(page.value); })
    onMounted(() => {

      // let mask = document.querySelector('.mask-preloader');
      // window.addEventListener('load',()=> {
      //   mask.classList.add('hide-preloader');
      //   setTimeout(()=> { mask.remove(); },600)
      // });
      changePage(page.value);
    });

//------------------------------------
      return {secWord,
              changePage,
              totalPages,
              page,
              posts_pagin}
  }
}
</script>

<style lang="scss" scoped>
//.mask {
//  width: 100%;
//  heigth: 100%!important;
//  background-color: #ffffff;
//  position: fixed;
//  top: 0;
//  z-index: 100;
//  transition: 0.6s;
//  display: flex;
//  justify-content: center;
//  align-items: center;
//}

.content-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 50vh;
  .card-box {
    display: flex;
    flex-wrap: wrap;
  }
  .paginate-box {
    display: flex;
    justify-content: center;
  }
}

</style>