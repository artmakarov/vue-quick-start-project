import '@mdi/font/css/materialdesignicons.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'vuetify/src/stylus/app.styl';
import Vue from 'vue';
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VRadioGroup,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VTabs,
  VCard,
  VForm,
  VTextField,
  VTextarea,
  VDialog,
  VChip,
  VSubheader,
  VAvatar,
  VBadge,
  VDataTable,
  VDivider,
  VStepper,
  VCheckbox,
  VProgressCircular,
  VSpeedDial,
  VTooltip,
  VSlider,
  VSelect,
  VAutocomplete,
  VSwitch,
  VAlert,
  VMenu,
  VPagination,
  VDatePicker,
  VTimePicker,
  VProgressLinear,
  VExpansionPanel,
  VCombobox,
  VSystemBar,
} from 'vuetify';


import ru from '../locale/ru';


Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VRadioGroup,
    VIcon,
    VGrid,
    VToolbar,
    VTabs,
    VCard,
    VForm,
    VTextField,
    VTextarea,
    VDialog,
    VChip,
    VSubheader,
    VAvatar,
    VDivider,
    transitions,
    VBadge,
    VDataTable,
    VStepper,
    VCheckbox,
    VProgressCircular,
    VSpeedDial,
    VTooltip,
    VSlider,
    VSelect,
    VAutocomplete,
    VSwitch,
    VAlert,
    VMenu,
    VPagination,
    VDatePicker,
    VTimePicker,
    VProgressLinear,
    VExpansionPanel,
    VCombobox,
    VSystemBar,
  },

  theme: {
    primary: '#0097a7',
    secondary: '#1565c0',
    accent: '#ffab40', // accent: '#82B1FF',
    neutral: '#9E9E9E',
    info: '#90caf9',

    warning: '#ffc107',
    error: '#ff5252',
    success: '#4caf50',

    blank: '#f5f5f5',
    progressBar: '#2a8bdc',
  },

  lang: {
    locales: { ru },
    current: 'ru',
  },

  iconfont: 'mdi',
  icons: {
    /**
     * Пример (смотри https://vuetifyjs.com/ru/framework/icons#reusable-custom-icons)
     *
     * <v-icon>$vuetify.icons.arm</v-icon>
     *
     * <v-icon v-text="'$vuetify.icons.arm'"></v-icon>
     */
    arm: 'mdi-desktop-classic',
  },

  options: {
    /**
     * Пример customProperties
     *
     * <style scoped>
     *   .something {
     *     color: var(--v-primary-base)
     *     background-color: var(--v-accent-lighten2)
     *   }
     *   </style>
     */
    customProperties: true,
  },
});
