/* eslint-disable no-param-reassign,no-underscore-dangle */
import Noty from 'noty';
import Vue from 'vue';
import { mergeDeepRight } from 'ramda';
import '../../assets/stylus/noty.styl';


// Настройки смотри тут: http://ned.im/noty/#/options
const defaults = {
  layout: 'bottomRight',
  theme: 'mint',
  timeout: 5000,
  progressBar: true,
  closeWith: ['click'],
};


const VueNoty = {
  options: {},

  setOptions(opts) {
    this.options = Object.assign({}, defaults, opts);

    return this;
  },

  show(text, type = 'alert', opts = {}) {
    const params = Object.assign({}, this.options, opts, { type, text });

    return new Noty(params).show();
  },


  alert(text, opts = {}) {
    return this.show(text, 'alert', opts);
  },

  success(text, opts = {}) {
    return this.show(text, 'success', opts);
  },

  error(text, opts = {}) {
    return this.show(text, 'error', opts);
  },

  warning(text, opts = {}) {
    return this.show(text, 'warning', opts);
  },

  info(text, opts = {}) {
    return this.show(text, 'info', opts);
  },


  // Ниже писать дополнительные методы

  confirm(text, callbackYes, callbackNo, opts = {}) {
    const { buttonYes, buttonNo } = opts;

    const noty = new Noty({
      text,
      buttons: [
        Noty.button((buttonNo && buttonNo.text) || 'Нет', `v-btn ${(buttonNo && buttonNo.color) || 'white--text neutral lighten-1'}`, async () => {
          if (!callbackNo || await callbackNo()) {
            noty.close();
          }
        }),

        Noty.button((buttonYes && buttonYes.text) || 'Да', `v-btn right ${(buttonYes && buttonYes.color) || 'success'}`, async () => {
          if (!callbackYes || await callbackYes()) {
            noty.close();
          }
        }),
      ],

      layout: 'center',
      modal: true,
      closeWith: [],

      ...opts,
    });

    return noty.show();
  },

  confirmDelete(text, callbackYes, callbackNo, opts = {}) {
    return this.confirm(text, callbackYes, callbackNo, mergeDeepRight({ buttonYes: { color: 'error' } }, opts));
  },
};


function install(vue, opts) {
  const noty = VueNoty.setOptions(opts);

  vue.prototype.$noty = noty;
  vue.noty = noty;
}

Vue.use({ install });


/* Пример * /
Vue.noty.confirmDelete(
  '<h3>Удаление</h3>Подтверждаете удаление?',

  () => {
    console.log('button yes clicked');
    return true;
  },

  // () => {
  //   console.log('button no clicked');
  //   return true;
  // },
);
/* */
