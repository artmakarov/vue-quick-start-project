<template>
  <v-container flex fluid class="error-page pa-0">

    <v-layout column align-center>
      <v-layout class="error-code" align-center justify-center primary>
        {{ id }}
      </v-layout>

      <v-card class="error-card" color="white">
        <v-layout column
                  align-center
                  justify-center
                  no-wrap>
          <v-icon color="grey" class="error_outline">error_outline</v-icon>

          <p class="text-center">Ой. Здесь ничего нет...</p>

          <v-layout row wrap align-center>
            <v-btn v-if="canGoBack"
                   color="primary"
                   @click="goBack"
            >
              <v-icon left dark>keyboard_arrow_left</v-icon>
              Назад
            </v-btn>
            <v-btn color="primary"
                   @click="$router.replace('/')"
            >
              На главную
              <v-icon right dark>home</v-icon>
            </v-btn>
          </v-layout>
        </v-layout>
      </v-card>
    </v-layout>

  </v-container>
</template>

<script>

  export default {
    name: 'NotFound',

    props: {
      id: {
        type: Number,
        default: 404,
      },
    },

    data() {
      return {
        canGoBack: window.history.length > 1,
      };
    },

    methods: {
      goBack() {
        window.history.go(-1);
      },
    },
  };
</script>

<style lang="stylus" scoped>
  .error-page
    .error-code
      height 50vh
      width 100%
      padding 0
      padding-top 15vh
      font-size 30vmax
      color rgba(255, 255, 255, .2)
      overflow hidden
    .error-card
      border-radius 2px
      margin-top -50px
      width 80vw
      max-width 600px
      padding 25px
      .error_outline
        font-size 5rem
</style>
