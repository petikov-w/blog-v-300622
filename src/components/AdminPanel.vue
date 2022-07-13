<template lang="pug">
.admin-panel
  .admin-box Панель администратора
  slot
</template>

<script>
export default {
  name: "AdminPanel"
}
</script>

<style lang="scss" scoped>
.admin-panel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4468e0;
  margin: 25px 0;
  padding: 10px 0 10px 20px ;
  .admin-box {
    @include font(25px, 600, 30px, #FFFFFF);
    letter-spacing: 1.2px;
  }
}
</style>