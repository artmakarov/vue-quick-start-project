<template>
  <v-layout column fill-height class="page-system">

    <v-page-header title="Система" :loading="loading"/>

    <v-container pa-4 pb-5 scroll-y fluid>
      <v-layout row>

        <v-form>
          <v-text-field label="Серийный номер"
                        :value="serial"
                        class="mt-0"
                        disabled
          />

          <v-text-field label="Версия ПО"
                        :value="version"
                        class="mt-3"
                        disabled
          />
        </v-form>

      </v-layout>
    </v-container>

    <v-page-bottom-menu>
      <v-btn color="secondary"
             @click="dialogReboot = true"
             :disabled="loadingReboot || loadingShutdown || dialogReboot"
             :loading="loadingReboot"
      >
        Перезагрузить
      </v-btn>
    </v-page-bottom-menu>


    <!-- Диалог перезагрузки -->
    <v-dialog-confirm :show="dialogReboot"
                      title="Перезагрузка"
                      text="Вы точно хотите перезагрузить устройство?"
                      @no="dialogReboot = false"
                      @yes="reboot"
    />

  </v-layout>
</template>


<script>
  import Api from '../../../core/api/Api';
  import VPageHeader from '../../common/elements/VPageHeader';
  import VPageBottomMenu from '../../common/elements/VPageBottomMenu';
  import VDialogConfirm from '../../common/dialogs/VDialogConfirm';

  export default {
    name: 'SystemIndex',

    components: {
      VPageHeader,
      VPageBottomMenu,
      VDialogConfirm,
    },

    data() {
      return {
        loading: false,
        loadingReboot: false,
        loadingShutdown: false,
        dialogReboot: false,
        dialogShutdown: false,
        serial: null,
        version: null,
      };
    },

    created() {
      this.getSerial();
    },

    methods: {
      async getSerial() {
        this.loading = true;

        const { isSuccess, data, error } = await Api.get('/serial');

        if (isSuccess) {
          this.serial = data.serial;
          this.version = data.version;
        } else {
          this.$noty.error(`<h3>Ошибка загрузки данных</h3>${error}`);
        }

        this.loading = false;
      },

      async reboot() {
        this.loadingReboot = true;
        this.dialogReboot = false;

        await Api.post('/test');

        setTimeout(() => {
          this.loadingReboot = false;
        }, 1500);
      },
    },
  };
</script>


<style>
  .page-system .v-input--is-disabled input {
    color: var(--v-black-base) !important;
  }
</style>
