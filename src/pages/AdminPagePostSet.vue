<template lang="pug">
.wrapper
  AdminPanel
    include ../assets/pug/AdminMenu
  form.note-form(@submit.prevent="onSubmit") Новый пост
   .input
      //label(for="email") Адрес электронной почты
      input( required name="body-title" id="body-title" placeholder="Название поста")
   .input
      //label(for="Введите содержимое поста") Телефон в шапке сайта
      textarea(required name="body-post" id="body-post" placeholder="Содержимое поста")

   button(@click="handleSave()" type="submit") Сохранить

</template>

<script>
// import $router from "@/routers";
import {useStore} from 'vuex'
// import { computed} from "vue";
import AdminPanel from "@/components/AdminPanel";

export default {
  name: "AdminPagePostSet",
  components: {AdminPanel},

  setup() {
    const store = useStore();
    // store.dispatch('setSettings');
    //
    // const telefon_a = computed(() => store.getters.getTelefon);
    // const email = computed(() => store.getters.getEmail);
    const handleSave = async() => {
      const post_title = (document.getElementById('body-title').value.length===0
                       ? 'Ошибка 1'
                       : document.getElementById('body-title').value);
      const post_body = (document.getElementById('body-post').value.length===0
                       ? 'Ошибка 2'
                       : document.getElementById('body-post').value);

      let formData = new FormData();
      formData.append('title', post_title);
      formData.append('body', post_body);



      const res =await fetch('http://api.blog.loc/posts',
          {method: "POST", body: formData});
      let resData = await res.json();
      if (resData.status === true) { store.dispatch('setSettings');}

      const data = await res.json();
      console.log(data);
      document.getElementById('body-title').value = "";
      document.getElementById('body-post').value = "";
    };
    return { handleSave }
  }
}
</script>

<style lang="scss" scoped>
.note-form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  font-family: $font-RobotoSlab;
  @include font(22px, 600, 26px, #4468e0);
  input {
    width: 500px;
    height: 40px;
    border-radius: 5px;
    padding: 3px 20px;
    margin: 10px 0;
    font-size: 18px;
    color: #EF5221;
    background-color: #c8cdd2;
    border: none;
    &::placeholder {
      font-family: sans-serif;
      text-transform: lowercase;
      @include font(16px, 500, 20px, #2D2D2D80);
    }
  }
  textarea {
    width: 500px;
    height: 250px;
    border-radius: 5px;
    padding: 10px 20px;
    font-size: 18px;
    color: #126b05;
    background-color: #c8cdd2;
    border: none;
    &::placeholder {
      font-family: sans-serif;
      text-transform: lowercase;
      @include font(16px, 500, 20px, #2D2D2D80);
    }
  }
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
}
</style>