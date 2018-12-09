<template>
  <v-dialog v-model="show" max-width="350px" persistent>
    <v-card>
      <v-card-title class="pb-2">
        <h3>Смена пароля</h3>
      </v-card-title>

      <v-fade-transition>
        <v-card-text v-if="show" class="pt-0">
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field label="Текущий пароль *"
                              v-model="passwords.current"
                              type="password"
                              :rules="rules.password"
                              required/>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Новый пароль *"
                              v-model="passwords.new"
                              type="password"
                              :rules="rules.newPassword"
                              required/>
              </v-flex>
              <v-flex xs12>
                <v-text-field label="Подтверждение пароля *"
                              v-model="passwords.confirm"
                              type="password"
                              :rules="rules.confirmPassword"
                              required/>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-fade-transition>

      <v-card-actions>
        <v-btn color="neutral lighten-1"
               @click="$emit('close')"
               dark
        >
          Отмена
        </v-btn>

        <v-spacer/>

        <v-btn color="success"
               @click="changePassword"
               :disabled="!valid || loading"
               :loading="loading"
        >
          Сохранить
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
  import Api from '../../../core/api/Api';
  import auth from '../../../core/auth';
  import { RULES } from '../../../core/helpers/rules';

  export default {
    name: 'VDialogChangePassword',

    props: {
      show: Boolean,
    },

    data() {
      const RULE_PASSWORD = [
        RULES.REQUIRED,
        RULES.TEXT,
        v => (v && v.length >= 3) || 'Пароль должен содержать не менее 3 символов',
      ];

      return {
        valid: false,
        loading: false,

        passwords: {
          current: null,
          new: null,
          confirm: null,
        },

        rules: {
          password: RULE_PASSWORD,

          newPassword: [
            ...RULE_PASSWORD,
            v => (v && (v !== this.passwords.current)) || 'Новый пароль совпадает со старым',
          ],

          confirmPassword: [
            ...RULE_PASSWORD,
            v => (v && (v === this.passwords.new)) || 'Пароль и подтверждение не совпадают',
          ],
        },
      };
    },

    methods: {
      async changePassword() {
        if (this.$refs.form.validate()) {
          this.loading = true;

          const { isSuccess, error } = await Api
            .sendData(`/pass/${auth.getUserName()}`, {
              current: this.passwords.current,
              new: this.passwords.new,
            });

          if (isSuccess) {
            this.$noty.success('Пароль успешно изменен');

            this.$emit('close');
          } else {
            this.$noty.error(`<h3>Ошибка изменения пароля</h3>${error}`);
          }

          this.loading = false;
        }
      },
    },

    watch: {
      show(isset) {
        if (!isset) {
          Object.assign(this.passwords, { current: null, new: null, confirm: null });
        }
      },
    },
  };
</script>
