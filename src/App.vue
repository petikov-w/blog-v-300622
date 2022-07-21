<template lang="pug">
//Header(v-on:SetM="eventHandler")
Header
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

    const eventHandler = () => {console.log('Привет')}
    return {eventHandler}
  }
}
</script>

<style lang="scss">


</style>