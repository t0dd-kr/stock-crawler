<template>
  <div class="index">
    <input type="text" name="" value="" v-model="code"/>
    <button type="button" name="button" v-on:click="load">불러오기</button>
    <div class="" v-if="data">
      종목 명 : {{data.name}} <br/>
      종목 코드 : {{data.code}} <br/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      code: null,
      data: null
    }
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
