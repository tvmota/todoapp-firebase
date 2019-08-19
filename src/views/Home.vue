<script>

import AppHeader from '@/components/common/Header/AppHeader.vue';
import AppFooter from '@/components/common/Footer/AppFooter.vue';
import AddTodo from '@/components/custom/AddTodo/AddTodo.vue';
import ListTodo from '@/components/custom/ListTodo/ListTodo.vue';
import Loader from '@/components/common/Loader/Loader.vue';

export default {
  name: 'App-home',
  components: {
    AppHeader,
    AppFooter,
    AddTodo,
    ListTodo,
    Loader,
  },
  created() {
    this.$store.dispatch('updateTodoList');
  },
};
</script>

<template>
  <div class="home">
    <AppHeader />
    <main class="home-container" role="main">
      <div class="home-container--content">
        <AddTodo />
        <ListTodo />
      </div>
    </main>
    <Loader />
    <AppFooter />
  </div>
</template>

<style lang="scss">
@import '../assets/css/_utilities/_imports';
@import '~spectre.css/src/_variables';
@import '~spectre.css/src/_layout';

.home {
  background: $color-white;
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
    padding: pxToRem(20) pxToRem(30);
    overflow-y: auto;
    width: 100%;

    &--content {
      padding-right: pxToRem(6);
      padding-left: pxToRem(6);
      max-width: 60rem;
    }
  }
}
</style>
