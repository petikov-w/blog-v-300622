<template lang="pug">
.dialog(v-if="show" @click="hideDialog")
 .dialog__content
  slot
</template>

<script>
export default {
  name: "pv-Dialog",
  props: {
    show: {
      type: Boolean,
      default: false
    },
  setup(_,{emit}) {
    const hideDialog = () => {
      emit("update:show",false)
      // input_value.value = "";
    }
  return {hideDialog}
  }
 }
}
</script>

<style lang="scss" scoped>
  .dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background: rgba(0,0,0, 0.5);
    position: fixed;
    display: flex;
    z-index: 99;
  }
  .dialog__content {
    margin: auto;
    background: white;
    border-radius: 33px;
    min-height: 100px;
    min-width: 300px;
  }
</style>