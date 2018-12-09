<template>
  <div style="background-color: #fbfbfb">
    <!-- Меню ---------------------------------------------------------->
    <v-navigation-drawer fixed app clipped permanent
                         :mini-variant="minimiseMenu"
                         width="230"
                         class="grey lighten-4 pt-1"
    >
      <v-list class="grey lighten-4">
          <v-main-menu-item v-for="(route, index) in routes"
                            :key="index"
                            :route="route"
                            :index="index"
                            :minimized="minimiseMenu"
          />
      </v-list>

      <!-- Кнопка сворачивания панели -->
      <v-tooltip right :disabled="!minimiseMenu" style="position: absolute; bottom: 0; width: 100%">
        <v-list dense class="grey lighten-4 pa-0" slot="activator">
            <v-list-tile ripple @click="switchMenu">
              <v-list-tile-action>
                <v-icon size="24">{{ minimiseMenu ? 'mdi-toggle-switch' : 'mdi-toggle-switch-off' }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title class="caption grey--text">Свернуть панель</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
        </v-list>
        <span>Развернуть панель</span>
      </v-tooltip>
    </v-navigation-drawer>

    <!--Шапка-------------------------------------------------------------->
    <v-toolbar color="primary" app flat dark clipped-left clipped-right dense>
      <!--<img src="@/assets/img/logo.png" alt="" width="35" height="30">-->

      <v-toolbar-title>Название приложения</v-toolbar-title>

      <v-spacer/>

      {{time}}

      <v-menu offset-y>
        <v-btn dark small flat slot="activator">{{userName}}</v-btn>
        <v-list class="pa-0">
          <v-list-tile @click="logout" ripple>
            <v-list-tile-title>Завершить сеанс</v-list-tile-title>
          </v-list-tile>

          <v-list-tile @click="dialogChangePassword = true" ripple>
            <v-list-tile-title>Сменить пароль</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <!-- Основное содержимое -------------------------------------------------->
    <v-content style="height: 100vh">
      <v-container fluid fill-height scroll-y pa-0>
        <v-layout d-block>
          <v-slide-x-transition mode="out-in">
            <router-view/>
          </v-slide-x-transition>
        </v-layout>
      </v-container>
    </v-content>

    <!-- Подвал --------------------------------------------------------------->
    <v-footer v-if="visibleFooter"
              color="primary"
              height="36px"
              class="px-2"
              app dark
    >
      <v-layout row>
        <span>&copy; 2018</span>
      </v-layout>
    </v-footer>
    <!-- -->

    <!-- Диалог изменения пароля -->
    <v-dialog-change-password :show="dialogChangePassword" @close="dialogChangePassword = false"/>

  </div>
</template>

<script>
  import auth from '../../core/auth';
  import Routes from '../../core/router/routes';
  import { CONF } from '../../core/consts';
  import VMainMenuItem from '../common/elements/VMainMenuItem';
  import VDialogChangePassword from '../common/dialogs/VDialogChangePassword';

  export default {
    name: 'MainSkin',

    components: {
      VMainMenuItem,
      VDialogChangePassword,
    },

    data() {
      return {
        routes: Routes.filter(i => !i.meta || !i.meta.hideInMenu),
        minimiseMenu: false,
        dialogChangePassword: false,
        time: '',
        visibleFooter: CONF.SHOW_MAIN_FOOTER,
      };
    },

    beforeMount() {
      const formatter = new Intl.DateTimeFormat('ru', {
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
      });

      this.minimiseMenu = this.isMinimiseMenu();

      setInterval(() => {
        auth.checkAuth();
        this.time = formatter.format(new Date());
      }, 1000);
    },

    methods: {
      logout() {
        auth.logout();
      },

      switchMenu() {
        this.minimiseMenu = !this.minimiseMenu;

        if (this.minimiseMenu) {
          this.$cookie.set('minimiseMenu', JSON.stringify({ user: this.userName, value: 1 }), { expires: 7 });
        } else {
          this.$cookie.delete('minimiseMenu');
        }
      },

      isMinimiseMenu() {
        const cookie = JSON.parse(this.$cookie.get('minimiseMenu'));

        return Boolean(cookie && cookie.user === this.userName && cookie.value);
      },
    },

    computed: {
      userName() {
        return auth.getUserName();
      },
    },
  };
</script>
