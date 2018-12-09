/* eslint-disable indent */

const TEXT = {
  REQUIRED: 'Обязательное поле',
  INCORRECT_FORMAT: 'Неверный формат',
};


const RULES = {
      REQUIRED: v => !!v || v === 0 || TEXT.REQUIRED,

          TEXT: v => !v || /\S/.test(v) || TEXT.INCORRECT_FORMAT,

           INT: v => !v || /^[-+]?\d+$/.test(v) || TEXT.INCORRECT_FORMAT,

  INT_OR_FLOAT: v => !v || /^[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?$/.test(v) || TEXT.INCORRECT_FORMAT,

            IP: v => !v || /^(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d{2}|[1-9]?\d)){3}$/.test(v) || TEXT.INCORRECT_FORMAT,
       IP_MASK: v => !v || /^((0|128|192|224|240|248|252|254)\.0\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0\.0)|(255\.(((0|128|192|224|240|248|252|254)\.0)|255\.(0|128|192|224|240|248|252|254|255)))))$/.test(v) || TEXT.INCORRECT_FORMAT,
};


export {
  RULES,
  TEXT,
};
