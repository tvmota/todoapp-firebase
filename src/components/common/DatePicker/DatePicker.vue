<script>
import Pikaday from 'pikaday';

export default {
  name: 'App-date-picker',
  props: {
    inputName: {
      type: String,
      required: true,
    },
    inputId: {
      type: String,
      required: true,
    },
    isRequired: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      datePicker: {},
    };
  },
  mounted() {
    const self = this;
    this.datePicker = new Pikaday({
      field: this.$refs[this.inputId],
      format: 'DD/MM/YYYY',
      i18n: {
        previousMonth: 'Mês anterior',
        nextMonth: 'Próximo mês',
        months: [
          'Janeiro',
          'Fevereiro',
          'Março',
          'Abril',
          'Maio',
          'Junho',
          'Julho',
          'Agosto',
          'Setembro',
          'Outubro',
          'Novembro',
          'Dezembro',
        ],
        weekdays: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado'],
        weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
      },
      keyboardInput: false,
      toString(date) {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
      parse(dateString) {
        const parts = dateString.split('/');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        return new Date(year, month, day);
      },
      onSelect(date) {
        self.$emit('data-select', date);
      },
    });
  },
};
</script>

<template>
  <input
    class="todo-input"
    :id="inputId"
    maxlength="10"
    :name="inputName"
    placeholder="DD/MM/AAAA"
    readonly
    :ref="inputId"
    :required="isRequired"
    type="text">
</template>

<style lang="scss">
@import '../../../assets/css/_utilities/_variables';
$pd-day-hover-bg: $color-primary;
$pd-day-today-color: $color-primary;
$pd-day-selected-bg: $color-primary-light;
$pd-day-selected-shadow: $color-primary-light;

@import '~pikaday/scss/pikaday';
</style>
