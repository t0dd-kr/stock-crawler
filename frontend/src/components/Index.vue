<template>
  <div class="index">
    <input type="text" name="" value="" v-model="code"/>
    <button type="button" name="button" v-on:click="load">불러오기</button>
    <div class="" v-if="data">
      종목 명 : {{data.name}} <br/>
      종목 코드 : {{data.code}} <br/>
    </div>
    <div class="submit_check">

    </div>
    <div class="test_button">
      <input type="button" name="" value="test_button" v-on:click="button">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      code: '005930',
      data: null,
      test_code: 123456
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
    },
    button: function () {
      if (this.code === null) {
        return alert(this.test_code)
      }
    }
  },
  computed: {
    error: function () {
      if (this.code === null || this.data === null) {
        return alert('please write code or name')
      } else {
        return alert('submitted code or name')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
