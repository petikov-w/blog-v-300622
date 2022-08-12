<template lang="pug">
.wrapper
  //AdminPanel
    //include ../assets/pug/AdminMenu
  .admin-body
    .sidebar-left
      .admin-title  Панель администратора
      include ../assets/pug/AdminMenu
    .right-box
      include ../assets/pug/FormUpdateSettings
      
</template>

<script>

import {useStore} from 'vuex'
import AdminPanel from "@/components/AdminPanel";
import {handleSaveSet, telefon, telefon_a, email} from "@/assets/js/setUpdate";
export default {
  name: "AdminPageMainSet",
  components: {AdminPanel},

  setup() {
    const store = useStore();
    store.dispatch('setSettings');

    return {telefon, telefon_a, email, handleSaveSet }
  }
}
</script>

<style lang="scss" scoped>
.admin-body {
  display: flex;
  margin-top: 20px;
  .sidebar-left {
    width: 250px;
    background-color: #4468e0;
    height: 80vh;
    //margin-right: 40px;
    //border-radius: 10px;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    .admin-title {
      font-size: 16px;
      margin-top: 20px;
      margin-left: 25px;
      color: #ffffff;
      font-weight: 600;
      width: max-content;
      border-bottom: 2px solid #ffffff;
      padding-bottom: 10px;
    }
  }
  .right-box {
    padding-left: 40px;
    width: 80%;
    height:80vh;
    border: 1px solid #606266;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    border-left: none;
    overflow: auto;
  }
}

</style>