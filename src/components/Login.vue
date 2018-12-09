<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>

        <v-dialog max-width="400px" :value="true" persistent>
          <v-card>
            <v-card-title>
              <span class="headline">Авторизация</span>
            </v-card-title>

            <v-card-text class="pt-0">
              <v-form v-model="valid" ref="form" lazy-validation>

                <v-text-field label="Пользователь *"
                              v-model="form.login"
                              ref="login"
                              :disabled="loading"
                              :rules="rules.login"
                              @keyup.enter="!!form.login && $refs.password.focus()"
                              prepend-icon="account_circle"
                              autofocus
                              required
                />

                <v-text-field label="Пароль *"
                              v-model="form.password"
                              @keyup.enter="onLogin"
                              ref="password"
                              :disabled="loading"
                              @click:prepend="isVisiblePass = !isVisiblePass"
                              :type="isVisiblePass ? 'text' : 'password'"
                              :rules="rules.password"
                              :prepend-icon="isVisiblePass ? 'visibility' : 'visibility_off'"
                              clearable
                              required
                />

              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer/>
              <v-btn @click.native="onLogin"
                     :disabled="!valid || loading"
                     :loading="loading"
              >
                Вход
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-layout>
    </v-container>
  </v-content>
</template>


<script>
  import auth from '../core/auth';

  export default {
    name: 'Login',

    data() {
      return {
        isVisiblePass: false,
        valid: true,
        loading: false,

        form: {
          login: '',
          password: '',
        },

        rules: {
          login: [
            v => !!v || 'Введите имя пользователя',
          ],

          password: [
            v => !!v || 'Введите пароль',
          ],
        },
      };
    },

    methods: {
      async onLogin() {
        if (this.$refs.form.validate()) {
          this.loading = true;

          const { error } = await auth.login(this.form, (this.$route.query && this.$route.query.redirect) || '/');

          if (error) {
            this.loading = false;
            this.$refs.password.focus();

            this.$noty.error(`<h3>Ошибка аутентификации</h3>${error}`);
          }
        }
      },
    },
  };
</script>
