<template lang="pug">
footer.footer
  .footer-wrapper
    span Политика конфиденциальности
    span Согласие на обработку персональных данных

</template>

<script>

export default {
  name: 'Footer-m',
  setup() {
    return { }
  }
}
</script>

<style lang="scss" scoped>
.footer-wrapper {
  width: 1100px;
  margin: 0 auto;
  display: flex;
  margin-top: -40px; // <<------------------ мобил убрать
  @media screen and (max-width: $phoneWidth) {
    margin-top: -40px;
    flex-direction: column;
  }
  span {
    font-family: 'Open Sans', sans-serif;
    @include font(14px, 400, 19px, #f1f1f1);
    text-decoration: underline;
    margin-right: 30px;
    @media screen and (max-width: $phoneWidth) {
      margin-bottom: 10px;
    }
  }
}
</style>