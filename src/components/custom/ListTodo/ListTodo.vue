<script>
import { mapGetters } from 'vuex';
import { Howl } from 'howler';
import dangersound from '../../../assets/sounds/alarm.wav';
import warnsound from '../../../assets/sounds/warn.wav';
// eslint-disable-next-line
import closeIcon from '../../../assets/img/icons/cancel.svg?sprite';
import alerts from '../../../utils/alerts';
import db from '../../../persistence/firebasePersistence';

export default {
  name: 'App-todo-list',
  data() {
    return {
      closeIcon,
      sound: {
        dangerAlarm: {},
        warnAlarm: {},
      },
    };
  },
  computed: {
    ...mapGetters(['getToDoList']),
  },
  methods: {
    checkRemove(id) {
      alerts.alertConfirm('Deseja remover o Todo item', 'Atenção').then((result) => {
        if (result.value) {
          this.$store.dispatch('updateStsLoader', true);
          this.removeTodoItem(id);
        }
      });
    },
    playAlarm(todoItem) {
      if (todoItem.diff_days < 2) {
        this.sound.warnAlarm.stop();
        this.sound.dangerAlarm.play();
      }

      if (todoItem.diff_days > 1 && todoItem.diff_days <= 8) {
        this.sound.dangerAlarm.stop();
        this.sound.warnAlarm.play();
      }
    },
    removeTodoItem(id) {
      db.removeItem(id).then(() => {
        this.$store.dispatch('updateStsLoader', false);
        alerts.alertSuccess('Todo Item removido com sucesso', 'Sucesso');
        this.$store.dispatch('updateTodoList');
      }).catch((err) => {
        alerts.alertError('Não foi possível remover o item', 'Erro');
        console.log(err);
      });
    },
  },
  mounted() {
    this.sound.dangerAlarm = new Howl({
      src: dangersound,
      volume: 0.7,
    });

    this.sound.warnAlarm = new Howl({
      src: warnsound,
      volume: 0.7,
    });
  },
};
</script>

<template>
  <div class="list-content">
    <div class="list-content-head">
      <h3>To's do List</h3>
    </div>
    <div class="list-content-body">
      <ol class="todo-list">
        <li
          :title="todo.title"
          class="todo-list-item c-hand"
          :class="todo.cls"
          v-for="todo in getToDoList"
          :key="todo.id"
          @mouseover="playAlarm(todo)">
            <h2 class="todo-list-item--head">
              {{ todo.title }}
              <div class="sub-header">
                <strong>Final Date:</strong>&nbsp;{{ todo.final_date_fmt }}&nbsp;--&nbsp;
                <strong>Priority:</strong>&nbsp;{{ todo.order }}
              </div>
            </h2>
            <button
              title="Remove item"
              type="button"
              @click="checkRemove(todo.id)">
                <svg class="icone icone-md icone-dark" role="presentation">
                  <use :xlink:href="'#' + closeIcon.id"></use>
                </svg>
            </button>
        </li>
      </ol>
    </div>
  </div>
</template>

<style lang="scss">
@import '../../../assets/css/_utilities/_imports';
@import '../../../assets/css/_modules/_icons';
@import '../../../assets/css/_modules/_cursors';

.list-content {
  @include flexContainer(flex, column, nowrap, center, null, center);
  color: $color-primary;

  &-head {
    margin-bottom: pxToRem(10);
  }
}

.todo-list {
  list-style: none;
  margin: 0;
  padding: 0;

  &-item {
    border-radius: pxToRem(10);
    display: flex;
    font-size: pxToRem(16);
    font-weight: 700;
    justify-content: space-between;
    margin-bottom: pxToRem(10);
    padding: pxToRem(10) pxToRem(8);
    position: relative;
    text-decoration: none;
    text-transform: uppercase;

    &--head {
      .sub-header {
        font-size: pxToRem(14);
        margin-top: pxToRem(6);
        margin-left: pxToRem(6);
      }
    }

    button {
      background: transparent;
      border: 0;
      cursor: pointer;
      margin-right: pxToRem(6);
      padding: pxToRem(8) pxToRem(12);
      position: absolute;
      right: 0;
      transform: translate(0%, -50%);
      top: 50%;

      svg {
        &:hover {
          fill: $color-danger;
        }
      }
    }

    &:hover {
      background: $color-light;
    }

    &--danger {
      background: $color-red;
      color: $color-red-secondary;
      box-shadow: 0 0 0 1px $color-red-secondary inset, 0 0 0 0 transparent;

      svg {
        fill: $color-red-secondary;
      }
    }

    &--alert {
      background: $color-orange;
      color: $color-orange-secondary;
      box-shadow: 0 0 0 1px $color-orange-secondary inset, 0 0 0 0 transparent;

      svg {
        fill: $color-orange-secondary;
      }
    }

    &--warning {
      background: $color-yellow;
      color: $color-yellow-secondary;
      box-shadow: 0 0 0 1px $color-yellow-secondary inset, 0 0 0 0 transparent;

      svg {
        fill: $color-yellow-secondary;
      }
    }

    &--normal {
      background: $color-blue;
      color: $color-blue-secondary;
      box-shadow: 0 0 0 1px $color-blue-secondary inset, 0 0 0 0 transparent;

      svg {
        fill: $color-blue-secondary;
      }
    }

    &--cool {
      background: $color-green;
      color: $color-green-secondary;
      box-shadow: 0 0 0 1px $color-green-secondary inset, 0 0 0 0 transparent;

      svg {
        fill: $color-green-secondary;
      }
    }
  }
}
</style>
