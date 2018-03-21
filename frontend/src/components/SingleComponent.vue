<template lang="html">
  <div class="">
    <div class="" v-for="i in 5" v-bind:key="i">
      {{value}}, {{i}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: String
  }
}
</script>

<style scoped>
</style>
