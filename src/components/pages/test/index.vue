<template>
  <v-layout column fill-height>

    <v-page-header title="Заголовок" :loading="loading"/>

    <v-container pa-4 pb-5 scroll-y fluid>
      <v-layout row wrap>

        Контент

      </v-layout>
    </v-container>

    <v-page-bottom-menu>
      <!--
      <v-btn color="success"
             @click=""
             :disabled="!!0"
             :loading="!!0"
      >
        Сохранить
      </v-btn>
      -->
    </v-page-bottom-menu>

  </v-layout>
</template>


<script>
  // import Api from '../../../core/api/Api';
  import VPageHeader from '../../common/elements/VPageHeader';
  import VPageBottomMenu from '../../common/elements/VPageBottomMenu';

  export default {
    name: 'TestIndex',

    components: {
      VPageHeader,
      VPageBottomMenu,
    },

    data() {
      return {
        valid: true,
        loading: false,
      };
    },

    created() {
      this.getData();
    },

    methods: {
      async getData() {
        this.loading = true;

        /* <Запрос> */

        this.loading = false;
      },
    },

    computed: {
    },
  };
</script>
