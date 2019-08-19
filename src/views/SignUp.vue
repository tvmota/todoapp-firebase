<script>
// eslint-disable-next-line
import addUser from '../assets/img/icons/add-user.svg?sprite';
import authMixin from '../mixins/Auth';

export default {
  name: 'App-sign-up',
  data() {
    return {
      addUser,
      frmOrigin: 'signup',
    };
  },
  mixins: [
    authMixin,
  ],
};
</script>

<template>
  <div class="auth">
    <div class="auth-container">
      <div class="auth-container--header">
        <svg class="icone icone-xl--1 icone-primary" role="presentation">
          <use :xlink:href="'#' + addUser.id"></use>
        </svg>
        <h1>Nova Conta</h1>
      </div>
      <form
        class="auth-container--body"
        name="frmSignup"
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
          class="btn-signin"
          title="Criar Conta"
          type="button"
          @click.prevent="handleSubmit('frmSignup')">
            <div class="btn-signin--text">Criar Conta</div>
            <div class="btn-signin--loader" v-show="btnLoader">
              <div class="donut"></div>
            </div>
        </button>
        <p>
          ou voltar para o
          <router-link title="Voltar para login" to="/">login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style lang="scss">
@import '../assets/css/_utilities/_variables';
@import '../assets/css/_utilities/_functions';
@import '../assets/css/_components/_auth';

.btn-signin {
  align-items: center;
  background: $color-primary;
  border: 0;
  border-radius: pxToRem(4);
  color: $color-secondary-text-light;
  display: flex;
  font-size: pxToRem(16);
  font-weight: 900;
  margin-top: pxToRem(10);
  padding: pxToRem(10);

  &--text {
    flex: 0 0 65%;
    text-align: end;
  }

  &--loader {
    display: flex;
    flex: 0 0 35%;
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
