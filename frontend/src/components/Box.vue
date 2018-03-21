<template>
  <div class="box">
    <div class="btn-load" v-if="!isLoaded">

    </div>
  </div>
</template>
<script>
export default {
  name: 'Box',
  data () {
    return {
      isLoaded: false
    }
  },
  props: {
    index: Number
  }
}
</script>
<style scoped>
  .box {
    margin: .05rem;
    background-color:white;
    border: 1rem #DEDEDE dashed;
    border-radius: 1rem;
    display: inline-block;
  }
</style>
