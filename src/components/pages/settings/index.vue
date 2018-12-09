<template>
  <v-layout column fill-height class="page-settings">

    <!-- Табы -->

  </v-layout>
</template>


<script>
  import ArraySort from '../../../core/helpers/arraySort';

  const requireTabs = require.context('./components/tabs', false, /\.vue$/);
  let tabs = [];

  requireTabs
    .keys()
    .forEach(fileName => tabs.push(requireTabs(fileName).default));

  tabs = ArraySort.asc(tabs, '$index');


  export default {
    name: 'SettingsIndex',

    props: ['tab'],

    data() {
      return {
        tabs,
        active: 0,
      };
    },

    computed: {
      isActiveTab() {
        const active = [];

        this.tabs.forEach((tab, index) => active.push(this.active === index));

        return active;
      },
    },
  };
</script>
