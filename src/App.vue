<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/css/_base/_normalize';
@import './assets/css/_base/_base';
@import '~sweetalert2/src/sweetalert2';
.app {
  display: flex;
  flex-direction: column;
}
</style>
