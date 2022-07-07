<template lang="pug">
.header-wrapper
  router-link(:to="{ name: 'home'}")
    .logo
      img(:src='logo' width="60" height="60"  alt="logo")
      .site {{ title_site }}
  .info
    Telefon(:tel='telefon')
</template>

<script>
import {useStore} from 'vuex'
import {computed} from "vue";
import Telefon from "@/components/UI/NumberTelefon";

export default {
  name: 'vHeader',
  components: {Telefon} ,
  setup() {

    const store = useStore();
    store.dispatch('setSettings');
    const telefon = computed(() => store.getters.getTelefon);
    const logo = computed(() => store.getters.getLogo);
    const title_site = computed(() => store.getters.getTitle);

    return { logo, telefon, title_site }

  }
}
</script>

<style lang="scss" scoped>
:deep(.telefon) {
  font-family: $font-RobotoSlab;
  @include font(24px, 600, 29px, #ffb400);
  text-decoration: none;
}
.header-wrapper {
    width: 1100px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    @media screen and (max-width: $phoneWidth) {
      max-width: $smPhoneWidth;
      flex-direction: column;
      align-items: center;
    }
    m-top {
      margin-top: 25px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      margin-right: 30px;
    }
    .logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 220px;
      img {
        margin-right: 15px;
      }
      .site {
        font-family: $font-RobotoSlab;
        @include font(24px, 600, 29px, #F68832);
      }
    }
  }
</style>