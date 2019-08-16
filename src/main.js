import Vue from 'vue';
import firebase from 'firebase/app';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;

let app = '';

const config = {
  apiKey: 'AIzaSyBr5EDux4mCxDSyCXo6XaTIhk8Yu-UFF_k',
  authDomain: 'evox-challenge.firebaseapp.com',
  databaseURL: 'https://evox-challenge.firebaseio.com',
  projectId: 'evox-challenge',
  storageBucket: '',
  messagingSenderId: '64691263325',
  appId: '1:64691263325:web:bd975aed6ad02492',
};

firebase.initializeApp(config);


firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
