<template lang="pug">
.header-wrapper
  //img(:src='$store.state.contentHeader.logo' alt="logo")
    //.info
    //  span {{ $store.state.contentHeader.subtitle }}
</template>

<script>

export default {
  name: 'vHeader',

  setup() {
  }
}
</script>

<style lang="scss" scoped>
//:deep(.telefon) {
//  font-family: $font-RussoOne;
//  @include font(24px, 400, 29px, #FFFFFF);
//  text-decoration: none;
//}
.header-wrapper {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    @media screen and (max-width: $phoneWidth) {
      max-width: $smPhoneWidth;
      flex-direction: column;
      align-items: center;
    }
    img, .m-top {
      margin-top: 25px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      span {
        //font-family: $font-OpenSans;
        //@include font(16px, 600, 22px, #EF5221);
        //margin-top: 5px;
        //text-decoration: underline;
        //@media screen and (max-width: $phoneWidth) {
        // //text-align: center;
        // display: none;
        //}
      }
    }
  }
</style>