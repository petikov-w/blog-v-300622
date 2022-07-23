<template lang="pug">
Header
wrapper
  router-view
Footer
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  components: { Header, Footer},
  setup() {}
}
</script>

<style lang="scss">


</style>