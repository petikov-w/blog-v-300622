<template lang="pug">
.wrapper
  AdminPanel
    include ../assets/pug/AdminMenu
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
</style>