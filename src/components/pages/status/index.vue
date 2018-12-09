<template>
  <v-layout column fill-height>

    <v-page-header title="Заголовок" :loading="loading"/>

    <v-container pa-4 pb-5 scroll-y fluid>
      <v-layout row>

        Контент

      </v-layout>
    </v-container>

    <!--
    <v-page-bottom-menu v-if="isAdmin">
      <v-btn color="success"
             @click=""
             :disabled="!edited"
             :loading="loadingSave"
      >
        Сохранить
      </v-btn>

      <v-slide-x-reverse-transition>
        <v-btn v-if="edited"
               @click="reset"
               color="blue-grey"
               :disabled="!edited || loadingSave"
               flat
        >
          <v-icon class="mr-2">mdi-restore</v-icon>
          Отменить изменения
        </v-btn>
      </v-slide-x-reverse-transition>
    </v-page-bottom-menu>
    -->

  </v-layout>
</template>


<script>
  // import { equals } from 'ramda';
  import Api from '../../../core/api/Api';
  import VPageHeader from '../../common/elements/VPageHeader';
  import VPageBottomMenu from '../../common/elements/VPageBottomMenu';
  import VDataTableHeaders from '../../common/elements/VDataTableHeaders';
  import auth from '../../../core/auth';

  export default {
    name: 'StatusIndex',

    components: {
      VPageHeader,
      VPageBottomMenu,
      VDataTableHeaders,
    },

    data() {
      return {
        loading: false,
        loadingSave: false,
        outputs: [],
        inputs: [],
      };
    },

    created() {
      // this.getStatus();
    },

    methods: {
      async getStatus() {
        this.loading = true;

        const { isSuccess, data } = await Api.get('/test');

        if (isSuccess) {
          this.outputs = data.outputs;
          this.inputs = data.inputs;
        }

        this.loading = false;
      },
    },

    computed: {
      isAdmin() {
        return auth.checkAdmin();
      },
    },
  };
</script>
