<template>
  <div>
    <v-toolbar flat color="white" dense>
      <v-toolbar-title class="title">{{ title }}</v-toolbar-title>
    </v-toolbar>

    <v-divider class="grey lighten-3"/>

    <v-progress-linear v-if="loading"
                       height="2"
                       color="progressBar"
                       class="ma-0"
                       indeterminate
                       style="position: absolute"
    />
  </div>
</template>


<script>
  export default {
    name: 'VPageHeader',

    props: {
      loading: Boolean,

      title: {
        type: String,
        requared: true,
      },
    },
  };
</script>
