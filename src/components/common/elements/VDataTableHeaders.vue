<template>
  <tr style="height: 34px">
    <th v-for="header in headers"
        :key="header.text"
        :class="['column', `text-xs-${header.align || 'left'}` ]"
        :width="header.widtn"
    >
      {{ header.text }}
    </th>
  </tr>
</template>

<script>
  export default {
    name: 'VDataTableHeaders',

    props: {
      headers: {
        type: Array,
        requared: true,
      },
    },
  };
</script>

<style scoped>

</style>
