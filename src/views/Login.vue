<script>
// eslint-disable-next-line
import loginIcon from '../assets/img/icons/to-do-list.svg?sprite';
import authMixin from '../mixins/Auth';

export default {
  name: 'App-login',
  mixins: [
    authMixin,
  ],
  data() {
    return {
      loginIcon,
      frmOrigin: 'login',
    };
  },
};
</script>

<template>
  <div class="auth">
    <div class="auth-container">
      <div class="auth-container--header">
        <svg class="icone icone-xl--1 icone-light" role="presentation">
          <use :xlink:href="'#' + loginIcon.id"></use>
        </svg>
        <h1>To do App</h1>
      </div>
      <form
        class="auth-container--body"
        name="frmLogin"
        novalidate>
          <input
            autocomplete="off"
            name="emailInput"
            placeholder="Email"
            ref="emailInput"
            required
            type="email"
            v-model="email"
            @blur="validateForm('emailInput')">
          <label class="form-error">E-mail inválido</label>
          <input
            autocomplete="off"
            name="pwdInput"
            placeholder="Senha"
            ref="pwdInput"
            required
            type="password"
            v-model="password"
            @blur="validateForm('pwdInput')">
          <label class="form-error">Senha inválida</label>
          <button
            class="btn-login"
            title="Login"
            type="button"
            @click.prevent="handleSubmit('frmLogin')">
              <div class="btn-login--text">Entrar</div>
              <div class="btn-login--loader" v-show="btnLoader">
                <div class="donut"></div>
              </div>
          </button>
          <p>
            Não tem uma conta?
            <router-link title="Criar Conta" to="/sign-up">Criar conta</router-link>
          </p>
      </form>
    </div>
  </div>
  <!--div class="login">
    <h3>Sign In</h3>
    <input type="text" name="email" placeholder="Email" v-model="email">
    <input type="password" name="pwd" placeholder="Password" v-model="password">
    <button @click="login">Login</button>
    <p>
      You dont have an account ?
      <router-link to="/sign-up">Create account</router-link>
    </p>
  </div-->
</template>
<style lang="scss">
@import '../assets/css/_utilities/_variables';
@import '../assets/css/_utilities/_functions';
@import '../assets/css/_components/_auth';

.btn-login {
  align-items: center;
  background: $color-primary;
  border: 0;
  border-radius: pxToRem(4);
  color: $color-secondary-text-light;
  display: flex;
  font-size: pxToRem(16);
  font-weight: 900;
  justify-content: space-between;
  margin-top: pxToRem(10);
  padding: pxToRem(10);

  &--text {
    flex: 0 0 60%;
    text-align: end;
  }4a

  &--loader {
    display: flex;
    flex: 0 0 40%;
    justify-content: flex-end;
  }

  &:hover {
    background: $color-primary-dark;
  }

  &:active {
    box-shadow: 0 0 pxToRem(2) pxToRem(2) $color-primary;
  }
}
</style>
