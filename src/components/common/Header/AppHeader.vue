<script>
import firebase from 'firebase/app';
// eslint-disable-next-line
import toDoList from '../../../assets/img/icons/to-do-list.svg?sprite';
// eslint-disable-next-line
import logoutIcon from '../../../assets/img/icons/logout.svg?sprite';

export default {
  name: 'App-Header',
  data() {
    return {
      toDoList,
      logoutIcon,
    };
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login');
      });
    },
  },
};
</script>
<template>
  <header aria-level="1" class="header" role="banner">
    <router-link class="c-hand header-logo" tag="h2" to="/app" title="Home">
      <svg class="icone icone-xl icone-primary" role="presentation">
        <use :xlink:href="'#' + toDoList.id"></use>
      </svg>
      To Do App
    </router-link>
    <button @click="logout" class="c-hand logout-btn" title="Sair">
      <svg class="icone icone-lg icone-primary" role="presentation">
        <use :xlink:href="'#' + logoutIcon.id"></use>
      </svg>
    </button>
  </header>
</template>
<style lang="scss">
@import '../../../assets/css/_utilities/_variables';
@import '../../../assets/css/_utilities/_functions';
@import '../../../assets/css/_modules/_cursors';
@import '../../../assets/css/_modules/_icons';

.header {
  background-color: $color-white;
  border-bottom: pxToRem(1) solid $color-primary-dark;
  color: $color-primary;
  flex: none;
  display: flex;
  padding: pxToRem(20);
  justify-content: space-between;
  align-items: center;

  &-logo {
    align-items: center;
    display: flex;

    svg {
      margin-right: pxToRem(8);
    }
  }
}

.logout-btn {
  background: transparent;
  border: 0;

  svg {
    &:hover {
      fill: $color-primary-light;
    }
  }
}
</style>
