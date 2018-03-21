<template>
  <div class="box" style="style">
    <img src="../assets/add.png" alt=""/>
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
    style: Object
  },
  methods: {
    load: function () {
      this.$http.get(`/api/info/${this.code}`)
        .then((res) => {
          if (res.data !== '') {
            this.data = res.data
          } else {
            this.$router.push('/')
          }
        })
        .catch((res) => {
          this.$router.push('/')
        })
    }
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
  .box img {
    position:relative;
    height:30%;
    left: 40%;
    top: 34%;
  }
</style>
