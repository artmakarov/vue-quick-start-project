<template>
  <v-dialog v-model="show" max-width="350px" persistent>
    <v-card>
      <v-card-title v-if="title">
        <h3>{{ title }}</h3>
      </v-card-title>

      <v-card-text v-if="text" :class="{ 'pt-0': !!title }">
        {{ text }}
      </v-card-text>

      <v-card-actions>
        <v-btn v-if="!hideNo"
               :color="(button.no && button.no.color) || null"
               @click="$emit('no')"
               :disabled="loading"
        >
          {{ (button.no && button.no.text) || 'Нет' }}
        </v-btn>

        <v-spacer/>

        <v-btn v-if="!hideYes"
               :color="(button.yes && button.yes.color) || 'success'"
               @click="$emit('yes')"
               :disabled="loading"
               :loading="loading"
        >
          {{ (button.yes && button.yes.text) || 'Да' }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>


<script>
  export default {
    name: 'VDialogConfirm',

    props: {
      show: Boolean,
      loading: Boolean,
      hideNo: Boolean,
      hideYes: Boolean,

      title: {
        type: String,
        default: '',
      },

      text: {
        type: String,
        default: '',
      },

      buttons: {
        type: Object,
        default: null,
      },
    },

    computed: {
      button() {
        return {
          no: (this.buttons && this.buttons.no) || null,
          yes: (this.buttons && this.buttons.yes) || null,
        };
      },
    },
  };
</script>
