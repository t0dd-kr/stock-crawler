<template>
  <div class="box" style="style" @click="toggleTextbox">
    <img src="../assets/add.png" alt="" v-if="this.info === null"/>
    <div class="title" v-else>
      <div class="name">
        {{info.name}}
      </div>
      <div class="code">
        {{info.code}}
      </div>
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
    index: Number,
    info: Object
  },
  methods: {
    toggleTextbox: function () {
      if (this.info === null) {
        this.$emit('focused', this.index)
      }
    }
  }
}
</script>
<style scoped>
  * {
    font-family: "Nanum Gothic", sans-serif;
  }
  .box {
    min-height: 50%;
    margin: .05rem;
    background-color:white;
    border: 1rem #DEDEDE dashed;
    border-radius: 1rem;
    display: inline-block;
  }
  .box img {
    position:relative;
    height:30%;
    left: 40%;
    top: 34%;
  }
  .box input {
    position:relative;
    height:20%;
    width: 60%;
    left: 20%;
    top: 39%;
  }
  .name {
    float:left;
    padding: 1rem;
  }
</style>
