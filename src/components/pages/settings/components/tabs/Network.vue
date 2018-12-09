<template>
  <v-layout column fill-height>

    <v-progress-linear v-if="loading"
                       height="2"
                       color="progressBar"
                       class="ma-0"
                       indeterminate
                       style="margin-bottom: -1px !important;"
    />

    <v-divider v-else class="grey lighten-3"/>

    <v-container pa-4 pb-5 scroll-y fluid ref="container">
      <v-layout row>

        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field label="IP-адрес"
                        v-model="data.ip"
                        :placeholder="tempData.ip"
                        :rules="rule.ip"
                        :disabled="loadingSave"
                        @input="validateForm"
                        class="mt-0"
          />

          <v-text-field label="Сетевая маска"
                        v-model="data.mask"
                        :placeholder="tempData.mask"
                        :rules="rule.mask"
                        :disabled="loadingSave"
                        @input="validateForm"
                        class="mt-3"
          />

          <v-text-field label="Сетевой шлюз"
                        v-model="data.gw"
                        :placeholder="tempData.gw"
                        :rules="rule.sluice"
                        :disabled="loadingSave"
                        class="mt-3"
          />
        </v-form>

      </v-layout>
    </v-container>

    <v-page-bottom-menu>
      <v-btn color="success"
             @click="save"
             :disabled="disableSave || loadingSave"
             :loading="loadingSave"
      >
        Сохранить
      </v-btn>

      <v-slide-x-reverse-transition>
        <v-btn v-if="edited"
               @click="reset"
               color="blue-grey"
               :disabled="loadingSave"
               flat
        >
          <v-icon class="mr-2">mdi-restore</v-icon>
          Отменить изменения
        </v-btn>
      </v-slide-x-reverse-transition>

      <v-slide-x-reverse-transition>
        <span v-if="!valid" class="error--text ml-3">Исправьте ошибки ввода</span>
      </v-slide-x-reverse-transition>
    </v-page-bottom-menu>

  </v-layout>
</template>


<script>
  import IpSubnetCalculator from 'ip-subnet-calculator';
  import Api from '../../../../../core/api/Api';
  import VPageBottomMenu from '../../../../common/elements/VPageBottomMenu';
  import { RULES, TEXT } from '../../../../../core/helpers/rules';


  export default {
    name: 'Network',

    $index: 1, // позиция таба
    $title: 'Сеть',

    props: ['isActive'],

    components: {
      VPageBottomMenu,
    },

    data() {
      return {
        valid: true,
        loading: false,
        loadingSave: false,

        tempData: {
          ip: null,
          mask: null,
          gw: null,
        },

        data: {
          ip: null,
          mask: null,
          gw: null,
        },

        rule: {
          ip: [RULES.REQUIRED, RULES.IP],
          mask: [RULES.REQUIRED, RULES.IP_MASK],
          sluice: [
            RULES.REQUIRED,
            RULES.IP,

            (value) => {
              const ipParts = !!value && value.split('.');
              const { ip, mask } = this.data;

              if (!ipParts || ipParts.length !== 4 || !ipParts[3]) {
                return TEXT.INCORRECT_FORMAT;
              }

              // если ввели '0.0.0.0' или не ввели корректный IP-адрес или маску
              // то завершаем дальнейшие проверки
              if (
                value === '0.0.0.0'
                || !this.rule.ip.every(rule => typeof rule(ip) !== 'string')
                || !this.rule.mask.every(rule => typeof rule(mask) !== 'string')
              ) {
                return true;
              }

              if (value === ip) {
                return 'Сетевой шлюз совпадает с IP-адресом устройства';
              }

              let {
                ipLowStr: minIP,
                ipHighStr: maxIP,
              } = IpSubnetCalculator.calculateCIDRPrefix(ip, mask);

              minIP = minIP.split('.');
              maxIP = maxIP.split('.');

              const valid = ipParts.every((item, index) => {
                const part = parseInt(item, 10);
                const minPart = parseInt(minIP[index], 10);
                const maxPart = parseInt(maxIP[index], 10);

                return part >= minPart && part <= maxPart;
              });

              return valid || 'Не входит в допустимый диапазон IP-адресов';
            },
          ],
        },
      };
    },

    created() {
      this.getStatus();
    },

    methods: {
      async getStatus() {
        this.loading = true;

        const { isSuccess, data, error } = await Api.get('/conf/net');

        if (isSuccess) {
          this.tempData = { ...data };
          this.data = data;
        } else {
          this.$noty.error(`<h3>Ошибка загрузки данных</h3>${error}`);
        }

        this.loading = false;
      },

      async save() {
        if (this.$refs.form.validate()) {
          this.$root.$emit('saveAndReboot', async () => {
            this.loadingSave = true;

            const { isSuccess, error } = await Api.sendData('/conf/net', {
              ip: this.data.ip || this.tempData.ip || null,
              mask: this.data.mask || this.tempData.mask || null,
              gw: this.data.gw || this.tempData.gw || null,
            });

            if (isSuccess) {
              this.$noty.success('Сетевые настройки сохранены');
            } else {
              this.$noty.error(`<h3>Ошибка сохранения сетевых настроек</h3>${error}`);
            }

            this.loadingSave = false;
            return isSuccess;
          }, this.tempData.ip !== this.data.ip ? `//${this.data.ip}` : null);
        }
      },

      reset() {
        this.data = { ...this.tempData };
      },

      validateForm() {
        if (this.validateFormTimeout) {
          clearTimeout(this.validateFormTimeout);
          this.validateFormTimeout = null;
        }

        this.validateFormTimeout = setTimeout(() => {
          this.$refs.form.validate();
          this.$forceUpdate();
        }, 400);
      },
    },

    computed: {
      edited() {
        return Boolean(this.tempData.ip && this.tempData.mask && this.tempData.gw) &&
          (
            this.data.ip !== this.tempData.ip
            || this.data.mask !== this.tempData.mask
            || this.data.gw !== this.tempData.gw
          );
      },

      disableSave() {
        return !this.valid || !this.edited;
      },
    },

    watch: {
      isActive(isset) {
        const { container } = this.$refs;

        if (isset && container.scrollTop) {
          container.scrollTop = 0;
        }
      },
    },
  };
</script>
