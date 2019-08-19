<script>
import { mapGetters } from 'vuex';

export default {
  name: 'App-loader',
  computed: {
    ...mapGetters(['getStsLoader']),
  },
};
</script>
<template>
  <div class="loader" v-if="getStsLoader">
    <div class="loader-spinner"></div>
  </div>
</template>
<style lang="scss">
@import '../../../assets/css/_utilities/_functions';
@import '../../../assets/css/_utilities/_variables';
@keyframes donut-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  align-items: center;
  background: $color-bg-shadow;
  display: flex;
  height: 100vh;
  justify-content: center;
  position: fixed;
  width: 100vw;

  &-spinner {
    animation: donut-spin 1.2s linear infinite;
    border: pxToRem(26) solid rgba(0, 0, 0, 0.1);
    border-left-color: $color-primary;
    border-radius: 50%;
    display: inline-block;
    height: pxToRem(260);
    width: pxToRem(260);
  }
}
</style>
