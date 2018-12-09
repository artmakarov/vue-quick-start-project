<template>
  <div>
    <v-divider class="grey lighten-3"/>

    <v-toolbar dense flat :color="color" class="py-1">
      <slot/>
    </v-toolbar>
  </div>
</template>


<script>
  export default {
    name: 'VPageBottomMenu',

    props: {
      color: {
        type: String,
        default: 'white',
      },
    },
  };
</script>
