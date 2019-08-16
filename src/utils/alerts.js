import Swal from 'sweetalert2/dist/sweetalert2';

const alertError = (msg, titleTxt) => Swal.fire({
  title: titleTxt,
  text: msg,
  type: 'error',
});

const alertSuccess = (msg, titleTxt) => Swal.fire({
  title: titleTxt,
  text: msg,
  type: 'success',
});

const alertConfirm = (msg, titleTxt) => Swal.fire({
  title: titleTxt,
  text: msg,
  type: 'warning',
  confirmButtonText: 'Sim',
  cancelButtonText: 'Não',
  showCancelButton: true,
  allowOutsideClick: false,
  allowEscapeKey: false,
});

export default {
  alertConfirm,
  alertError,
  alertSuccess,
};
