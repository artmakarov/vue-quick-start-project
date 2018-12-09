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
          <v-select label="Аудиовыход"
                    v-model="audiocard"
                    :items="audiocards"
                    :disabled="disable"
                    item-text="name"
                    item-value="id"
                    menu-props="auto"
          />

          <v-layout row mt-3>
            <v-flex shrink style="width: 80px">
              <v-text-field label="Громкость"
                            v-model="volume"
                            :disabled="disable"
                            class="mt-0"
                            type="number"
              />
            </v-flex>

            <v-flex class="pl-3">
              <v-slider
                v-model="volume"
                :disabled="disable"
                color="progressBar darken-1"
                thumb-label
                thumb-size="24"
              >
                <v-icon v-if="!!volume" slot="prepend" @click="volume--">volume_down</v-icon>
                <span v-else slot="prepend" class="d-inline-block ml-4"/>

                <v-icon slot="append" @click="volume++" v-text="volume ? 'volume_up' : 'volume_off'"/>
              </v-slider>
            </v-flex>
          </v-layout>


          <v-flex mt-3>
            <v-text-field label="Продолжительность сессии (сек.)"
                          v-model="maxtime"
                          :disabled="disable"
                          :rules="rule.minMax"
                          class="mt-0"
                          type="number"
                          :hint="`От ${maxtimeMin} до ${maxtimeMax}`"
                          persistent-hint
            />
          </v-flex>
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
  import { equals } from 'ramda';
  import Api from '../../../../../core/api/Api';
  import VPageBottomMenu from '../../../../common/elements/VPageBottomMenu';
  import { CONF } from '../../../../../core/consts';

  export default {
    name: 'Common',

    $index: 0, // позиция таба
    $title: 'Общие настройки',

    props: ['isActive'],

    components: {
      VPageBottomMenu,
    },

    data() {
      return {
        valid: true,
        loading: false,
        loadingSave: false,
        tempData: [],
        data: [],

        maxtimeMin: CONF.MIN_DURATION_ALERT_SESSION,
        maxtimeMax: CONF.MAX_DURATION_ALERT_SESSION,

        audiocards: [
          { id: 1, name: 'Линейный выход' },
          { id: 2, name: 'HDMI' },
        ],

        rule: {
          minMax: [
            v => (v >= this.maxtimeMin && v <= this.maxtimeMax) || `Введите от ${this.maxtimeMin} до ${this.maxtimeMax}`,
          ],
        },
      };
    },

    created() {
      this.getSettings();
    },

    methods: {
      async getSettings() {
        this.loading = true;

        const { isSuccess, data, error } = await Api.get('/conf/common');

        if (isSuccess) {
          this.tempData = data.map(i => ({ ...i }));
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

            const { isSuccess, error } = await Api.put('/conf/common', this.data);

            if (isSuccess) {
              this.$noty.success('Общие настройки сохранены');
            } else {
              this.$noty.error(`<h3>Ошибка сохранения общих настроек</h3>${error}`);
            }

            this.loadingSave = false;
            return isSuccess;
          });
        }
      },

      reset() {
        this.data = this.tempData.map(i => ({ ...i }));
      },
    },

    computed: {
      edited() {
        return !!this.data.length && !equals(this.data, this.tempData);
      },

      disable() {
        return !this.data.length || this.loadingSave;
      },

      disableSave() {
        return !this.valid || !this.edited;
      },


      audiocard: {
        get() {
          const audiocard = this.data.find(item => item.name === 'audiocard');
          return audiocard ? Number(audiocard.value) : null;
        },

        set(id) {
          this.data.find(item => item.name === 'audiocard').value = id.toString();
        },
      },


      volume: {
        get() {
          const volume = this.data.find(item => item.name === 'volume');
          return volume ? Number(volume.value) : 0;
        },

        set(value) {
          this.data.find(item => item.name === 'volume').value = value.toString();
        },
      },


      maxtime: {
        get() {
          const maxtime = this.data.find(item => item.name === 'maxtime');
          return maxtime ? Number(maxtime.value) : this.maxtimeMin;
        },

        set(value) {
          this.data.find(item => item.name === 'maxtime').value = value.toString();
        },
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
