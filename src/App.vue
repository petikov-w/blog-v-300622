<template lang="pug">
.mask
  .loader
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
  setup() {
      let mask = document.querySelector('.mask');
      window.addEventListener('load',()=> {
        mask.classList.add('hide');
      })

  }
}
</script>

<style lang="scss">
.mask {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  position: fixed;
  top: 0;
  z-index: 100;
  transition: 0.6s;
  top: 0;
  left: 0;

}

.loader {
  margin: 45vh auto;
  width: 75px;
  height: 75px;
  border:10px solid rgba(13, 71, 161, 0.6);
  border-radius: 50%;
  border-left-color:#0D47A1;
  animation: loader 1.3s linear infinite;
}
@keyframes loader {
  100% {
    transform: rotate(360deg);
  }
}
.hide {
  //opacity: 0;
  z-index: -1;
}

</style>