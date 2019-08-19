<script>
import DatePicker from '../../common/DatePicker/DatePicker.vue';
import db from '../../../persistence/firebasePersistence';
import alerts from '../../../utils/alerts';

export default {
  name: 'App-add-todo-item',
  components: {
    DatePicker,
  },
  data() {
    return {
      inputTypes: ['text'],
      selectedDate: '',
      todo: {
        title: '',
        order: 0,
        final_date: '',
        user_id: '',
      },
    };
  },
  methods: {
    attachValidate() {
      const self = this;
      const frmField = document.querySelector('form[name="frmAddTodo"]');

      Array.from(frmField.elements).forEach((input) => {
        if (self.inputTypes.indexOf(input.type) >= 0) {
          input.addEventListener('blur', event => self.inputValidate(event.target));
        }
      });
    },
    getDate(date) {
      this.todo.final_date = date;
    },
    handleSubmit() {
      const self = this;
      if (self.$refs.frmAddTodo.checkValidity()) {
        self.todo.user_id = window.sessionStorage.getItem('userUid');
        self.$store.dispatch('updateStsLoader', true);

        db.setItem(self.todo).then(() => {
          self.$store.dispatch('updateStsLoader', false);
          alerts.alertSuccess('Registro gravado com sucesso', 'Sucesso');
          self.todo = {
            title: '',
            order: 0,
            final_date: '',
            user_id: '',
          };
          document.getElementById('todoDate').value = '';
          self.$store.dispatch('updateTodoList');
        }).catch((err) => {
          console.log(err);
          self.$store.dispatch('updateStsLoader', false);
        });
      } else {
        Array.from(self.$refs.frmAddTodo.elements).forEach((input) => {
          if (self.inputTypes.indexOf(input.type) >= 0) {
            self.inputValidate(input);
          }
        });
      }
    },
    inputValidate(input) {
      if (!input.validity.valid || !input.value) {
        input.classList.add('input-error');
        input.nextElementSibling.classList.add('form-error--invalid');
      } else {
        input.classList.remove('input-error');
        input.nextElementSibling.classList.remove('form-error--invalid');
      }
    },
  },
  mounted() {
    this.attachValidate();
  },
};
</script>

<template>
  <div class="todo-content">
    <div class="todo-content-head">
      <h3>Add To Do</h3>
    </div>
    <form class="todo-content-frm columns mx-0" name="frmAddTodo" ref="frmAddTodo" novalidate>
      <div class="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-7">
        <label class="todo-content-frm--label" for="todoitem">Todo Item</label>
        <input
          class="todo-input"
          name="todoitem"
          placeholder="To do item"
          required
          v-model="todo.title"
          type="text">
        <span class="form-error">Valor inválido</span>
      </div>
      <div class="todo-content-frm--field col-xs-12 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-2">
        <label class="todo-content-frm--label" for="todoitem">Priority</label>
        <input
          class="todo-input"
          min="1"
          name="todopriotiry"
          placeholder="Priority"
          required
          v-model="todo.order"
          type="number">
        <span class="form-error">Valor inválido</span>
      </div>
      <div class="todo-content-frm--field col-xs-12 col-sm-10 col-md-4 col-lg-4 col-xl-4 col-3">
        <label class="todo-content-frm--label" for="data">Final Date</label>
        <DatePicker input-id="todoDate" input-name="todoDate" @data-select="getDate"/>
        <span class="form-error">Valor inválido</span>
      </div>
      <div class="todo-content-frm--btn col-xs-12 col-sm-12 col-md-12 col-12">
        <button
          class="todo-btn"
          title="Add Todo"
          type="button"
          @click.prevent="handleSubmit()">
            +
        </button>
      </div>
    </form>
  </div>
</template>

<style lang="scss">
@import '../../../assets/css/_utilities/_imports';
@import '~spectre.css/src/_variables';
@import '~spectre.css/src/_layout';
@import '~spectre.css/src/mixins/_position';

@include margin-variant(0, 0);

.todo-content {
  @include flexContainer(flex, column, nowrap, center, null, center);
  color: $color-primary;
  flex: 0 0 80%;
  margin-top: pxToRem(10);
  margin-bottom: pxToRem(20);

  &-head {
    margin-bottom: pxToRem(12);
  }

  &-frm {
    &--field {
      padding-left: pxToRem(10);
      margin-bottom: pxToRem(10);

      @media(max-width: 480px) {
        padding-left: 0;
      }
    }

    &--btn {
      align-items: center;
      display: flex;
      justify-content: flex-end;
    }

    &--label {
      font-size: pxToRem(14);
      font-weight: 700;
    }
  }
}

.todo-input {
  border: pxToRem(1) solid $color-primary;
  border-radius: pxToRem(4);
  color: $color-primary;
  margin-top: pxToRem(8);
  padding: pxToRem(10) pxToRem(10);
  width: 100%;

  &::selection {
    background: $color-primary;
    color: $color-secondary-text-light;
  }

  &::-moz-selection {
    background: $color-primary;
    color: $color-secondary-text-light;
  }
}

.todo-btn {
  align-items: center;
  background: $color-primary;
  border: 0;
  border-radius: pxToRem(4);
  color: $color-secondary-text-light;
  display: flex;
  font-size: pxToRem(18);
  font-weight: 900;
  justify-content: space-between;
  margin-bottom: pxToRem(4);
  padding: pxToRem(10) pxToRem(16);

  &--text {
    flex: 0 0 60%;
    text-align: end;
  }

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

.form-error {
  color: $color-danger;
  font-size: pxToRem(12);
  font-weight: 900;
  padding-bottom: pxToRem(8);
  text-align: left;
  visibility: hidden;

  &--invalid {
    visibility: visible;
  }
}

.input-error {
  border: 1px solid $color-danger;
}
</style>
