<template lang="pug">
Header(v-on:SetM="eventHandler")
wrapper
  router-view
Footer
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import {onMounted} from "vue";

export default {

  components: { Header, Footer},
  setup() {
      //   onMounted(() => {
      //     let mask = document.querySelector('.mask');
      //     window.addEventListener('load',()=> {
      //       mask.classList.add('hide');
      //       setTimeout(()=> { mask.remove(); },600)
      //     })
      // })
    const eventHandler = () => {console.log('Привет')}
    return {eventHandler}
  }
}
</script>

<style lang="scss">


</style>