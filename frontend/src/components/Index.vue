<template>
  <div class="index">
    <Box
      v-for="i in 4"
      v-bind:key="i"
      v-bind:index="i"
    />
  </div>
</template>

<script>
import Box from './Box'
export default {
  name: 'Index',
  components: {
    Box
  },
  data () {
    return {
      code: '005930',
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
  .index {
    position:fixed;
    width:100%;
    height:100%;
    top:0;
    left:0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    grid-auto-rows: minmax(300px, auto);
  }
</style>
