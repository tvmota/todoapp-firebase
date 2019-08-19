import dayjs from 'dayjs';
import db from '../firebaseInit';

const getAllItens = async () => {
  const uid = window.sessionStorage.getItem('userUid');
  const itens = [];
  const resp = await db.collection('todoItens').where('user_id', '==', uid).get();

  resp.forEach((doc) => {
    const item = {
      id: doc.id,
      order: doc.data().order,
      title: doc.data().title,
      user_id: doc.data().user_id,
      final_date: doc.data().final_date.toDate(),
      final_date_fmt: dayjs(doc.data().final_date.toDate()).format('DD/MM/YYYY'),
      diff_days: dayjs(doc.data().final_date.toDate()).diff(dayjs(), 'day'),
    };

    if (item.diff_days < 1) {
      item.cls = 'todo-list-item--danger';
    }

    if (item.diff_days > 1 && item.diff_days <= 7) {
      item.cls = 'todo-list-item--alert';
    }

    if (item.diff_days > 7 && item.diff_days <= 30) {
      item.cls = 'todo-list-item--warning';
    }

    if (item.diff_days > 30 && item.diff_days <= 60) {
      item.cls = 'todo-list-item--normal';
    }

    if (item.diff_days > 60) {
      item.cls = 'todo-list-item--cool';
    }

    itens.push(item);
  });

  return itens.sort((x, y) => Number(y.order) - Number(x.order));
};

const removeItem = async (id) => {
  const resp = await db.collection('todoItens').doc(id).delete();

  return resp;
};

const setItem = async (item) => {
  const resp = await db.collection('todoItens').doc().set(item);

  return resp;
};

export default {
  getAllItens,
  removeItem,
  setItem,
};
