<template>
  <div class="index">
    <Box
      v-on:focused="focus(1)"
      v-bind:info="data1"
    />
    <Box
      v-on:focused="focus(2)"
      v-bind:info="data2"
    />
    <Box
      v-on:focused="focus(3)"
      v-bind:info="data3"
    />
    <Box
      v-on:focused="focus(4)"
      v-bind:info="data4"
    />
    <div class="darken" v-on:click.self="blur" >
      <input class="load" type="number" placeholder="종목 코드를 입력해주세요." maxlength="6" v-model="code" v-on:input="maxLengthCheck" v-on:keydown="onKeyDown"/>
    </div>
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
      data1: null,
      data2: null,
      data3: null,
      data4: null,
      code: '',
      current: -1
    }
  },
  methods: {
    button: function () {
      if (this.code === null) {
        return alert(this.test_code)
      }
    },
    focus: function (val) {
      this.activeTransition('.darken', 'darken-active')
      this.activeTransition('.load', 'show')
      this.current = val
      window.$('input').focus()
    },
    blur: function () {
      this.deactiveTransition('.darken', 'darken-active')
      this.deactiveTransition('.load', 'show')
      if (this.code.length === 6) {
        this.load()
      }
      this.code = ''
    },
    activeTransition: function (selector, name, index) {
      if (window.$(selector).hasClass(name) === false) {
        window.$(selector).addClass(name)
      }
    },
    deactiveTransition: function (selector, name, index) {
      while (window.$(selector).hasClass(name) === true) {
        window.$(selector).removeClass(name)
      }
    },
    maxLengthCheck: function (event) {
      if (event.target.value.length > 6) {
        this.code = event.target.value.slice(0, event.target.maxLength)
      }
    },
    onKeyDown: function () {
      if (event.keyCode === 13) {
        this.blur()
      }
    },
    load: function () {
      this.$http.get(`/api/info/${this.code}`)
        .then((res) => {
          if (res.data !== '') {
            console.log(res.data)
            this['data' + this.current] = res.data
          } else {
            this.$router.push('/')
          }
        })
        .catch((res) => {
          this.$router.push('/')
        })
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
    grid-auto-rows: minmax(45%, auto);
  }
  .darken {
    position:fixed;
    top: 0px;
    left: 0px;
    width: 0%;
    height: 0%;
    z-index: -1;
    transition: background-color .25s;
  }
  .darken-active {
    background-color: rgba(0,0,0,0.5);
    width: 100%;
    height: 100%;
    z-index: 10;
  }
  input.load {
    display: none;
    font-size: 400%;
    text-align: center;
  }
  .show {
    display: block !important;
    position: fixed;
    top: 42.5%;
    height: 15%;
    width: 60%;
    left: 20%;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      /* display: none; <- Crashes Chrome on hover */
      -webkit-appearance: none;
      margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
</style>
