<template>
  <div class="box" style="style" :style="outline">
    <img src="../assets/add.png" alt="" v-if="this.info === null" @click="focus" />
    <div class="title" v-else>
      <div class="name">
        {{info.name}}
      </div>
      <div class="code">
        ({{info.code}})
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
    focus: function () {
      if (this.info === null) {
        this.$emit('focused', this.index)
      }
    }
  },
  computed: {
    outline: function () {
      if (this.info === null) {
        return 'border: 1rem #DEDEDE dashed'
      } else {
        return 'border: 1rem #555 solid'
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
    background-color: white;
    border-radius: 1rem;
    display: inline-block;
  }
  .box img {
    position: relative;
    height: 30%;
    left: 40%;
    top: 34%;
  }
  .box input {
    position:relative;
    height: 20%;
    width: 60%;
    left: 20%;
    top: 39%;
  }
  .title {
    margin-left: .5rem;
    padding: .5rem 1rem .5rem .25rem;
    font-size: 1.5rem;
    width: 95%;
    border-bottom: 1px solid #CCC;
  }
  .name {
    color: #555;
    float: left;
    margin-right: .25rem;
    font-weight: bold;
  }
  .code {
    color: #BEBEBE;
  }
</style>
