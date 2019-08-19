import firebase from 'firebase/app';
import alerts from '../utils/alerts';

const authMixin = {
  data() {
    return {
      btnLoader: false,
      frmOrigin: '',
      email: '',
      password: '',
      inputTypes: ['email', 'password'],
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          window.sessionStorage.setItem('userUid', user.user.uid);
          this.$router.push('/app');
        }, (err) => {
          alerts.alertError('Não foi possível fazer o login', 'Erro');
          console.log(`Ops, ${err.message}`);
          this.btnLoader = false;
        });
    },
    signUp() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log('Your account has been created', user);
          alerts.alertSuccess('Conta criada com sucesso', 'Criar Conta');
          this.email = '';
          this.password = '';
        }, (err) => {
          console.log(`Opps. ${err.message}`);
          alerts.alertError(`Não foi possível criar a conta<br>OBS: ${err.message}`, 'Erro');
          this.btnLoader = false;
        });
    },
    handleSubmit(frm) {
      const frmField = document.querySelector(`form[name="${frm}"]`);
      this.btnLoader = true;

      if (frmField.checkValidity()) {
        switch (this.frmOrigin) {
          case 'login':
            this.login();
            break;
          case 'signup':
            this.signUp();
            break;
          default:
            break;
        }
      } else {
        this.btnLoader = false;
        Array.from(frmField.elements).forEach((input) => {
          if (this.inputTypes.indexOf(input.type) >= 0) {
            this.validateForm(input.name);
          }
        });
      }
    },
    validateForm(input) {
      const inputField = document.querySelector(`input[name="${input}"]`);
      if (!inputField.validity.valid) {
        inputField.nextElementSibling.classList.add('form-error--invalid');
      } else {
        inputField.nextElementSibling.classList.remove('form-error--invalid');
      }
    },
  },
};

export default authMixin;
