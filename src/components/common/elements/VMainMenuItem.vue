<template>
  <v-tooltip v-if="visible" :disabled="!minimized" right>
    <v-list-tile :to="route.path"
                 active-class="grey lighten-3 primary--text"
                 slot="activator"
                 ripple
    >
      <v-list-tile-action>
        <v-icon v-text="route.icon"/>
      </v-list-tile-action>

      <v-list-tile-content>
        <v-list-tile-title v-text="route.title"/>
      </v-list-tile-content>
    </v-list-tile>

    <span v-text="route.title"/>

  </v-tooltip>
</template>

<script>
  import checkRouteAvailable from '../../../core/helpers/checkRouteAvailable';

  export default {
    name: 'VMainMenuItem',

    props: {
      index: Number,

      route: {
        type: Object,
        requared: true,
      },

      minimized: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      visible() {
        return checkRouteAvailable(this.route);
      },
    },
  };
</script>

<style scoped>

</style>
