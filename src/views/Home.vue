<script>
import * as firebase from 'firebase';
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld,
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
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout()">Logout</button>
  </div>
</template>
