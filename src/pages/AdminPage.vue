<template lang="pug">
.wrapper-admin
  .title-panel Панель администратора
  .telefon
    label(for="a-telefon") Телефон в шапке сайта
    input(name="a-telefon" id="a-telefon" required=true placeholder="телефон")
    h2 {{ telefon }}
  .saved
    button(@click="handleSave") Сохранить
.footer-admin
  //span(@click="back_to_main") Вернуться на главную
  router-link(:to="{ name: 'home'}") Вернуться на главную
</template>

<script>
// import $router from "@/routers";
import {useStore} from 'vuex'
import {computed} from "vue";

export default {
  name: "AdminPage",
  setup() {
    const store = useStore();
    store.dispatch('setSettings');
    const telefon = computed(() => store.getters.getTelefon);
    const handleSave = () => {};

    return {telefon, handleSave }
  }
}
</script>

<style lang="scss" scoped>
::placeholder {
  text-transform: uppercase;
  font-family: $font-RobotoSlab;
  @include font(16px, 700, 20px, #2D2D2D80);
}

.footer-admin {
  width: 1100px;
  margin: 0 auto!important;
  padding-bottom: 20px;
  span {
    color: #ffffff;
    width: auto;
    text-decoration: underline;
    cursor: pointer;
    //font-family: $font-OpenSans;
    @include font(14px, 400, 20px, #ffffff);
    &:hover {
      opacity: 0.3;
    }
  }
}

.wrapper-admin {
  width: 1100px;
  margin: 0 auto!important;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 25px 0;
  //height: 78vh;

  .title-panel {
    font-family: $font-RobotoSlab;
    @include font(25px, 400, 30px, #EF6D00);
    margin: 25px 0;
  }
  .telefon {
    //font-family: $font-OpenSans;
    @include font(20px, 400, 30px, #ffffff);
   label {
      margin-right: 20px!important;
      color: #303133;
    }
   input {
     border-color: #303133;
     border-radius: 7px;
     padding-left: 15px;
   }
  }
  button{
    margin-top: 30px!important;
    padding: 10px 25px;
    border-radius: 8px;
    border: 1px solid #EF6D00;
    cursor: pointer;
    background: #EF6D00;
    color: #f1f1f1;
    &:hover {
      background: #f1f1f1;
      color: #EF6D00;
      border: 3px solid #EF6D00;
    }
  }
}
a {
  color: #4468e0;

  &:hover {
    border-bottom: 1px solid #4468e0;
    padding-bottom: 3px;
  }
}
</style>