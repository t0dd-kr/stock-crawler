<template lang="html">
  <div class="login">
    <div class="container-id">
      <input type="email" v-model="email" placeholder="EMAIL">
    </div>
    <div class="container-pw">
      <input type="password" v-model="password" placeholder="PASSWORD">
    </div>
    <div class="container-pw-confirm">
      <input type="password" v-model="password_confirm" placeholder="CONFIRM PASSWORD">
    </div>
    <div class="errormessage" v-if="password !== ''">
      {{error}}
    </div>
    <div class="container-button">
      <button type="button" v-on:click="login">Login</button>
    </div>
    <ul class="container-numbers">
      <li v-for="number in numbers" v-bind:key="number">
        {{number}}
      </li>
    </ul>
    <div class="container-condition" v-if="condition">
      True
    </div>
    <div class="container-condition" v-else>
      False
    </div>
    <div class="container-model">
      {{email}}
    </div>
    <SingleComponent
      v-bind:value="'test string, ' + variableString"
    />
  </div>
</template>

<script>
import SingleComponent from './SingleComponent'
export default {
  name: 'Login',
  data () {
    return {
      numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      condition: true,
      email: '',
      password: '',
      password_confirm: '',
      email_: 't0dd',
      password_: 't0dd',
      variableString: 'variable string'
    }
  },
  computed: {
    error: function () {
      if (this.password === this.password_confirm) {
        return 'Password correct!'
      } else {
        return 'Password wrong!'
      }
    }
  },
  methods: {
    login: function () {
      if (this.email === this.email_ && this.password === this.password_ && this.password_confirm === this.password_) {
        alert('Login success')
      } else {
        alert('Login fail')
      }
    }
  },
  components: {
    SingleComponent
  }
}
</script>

<style scoped>
  .container-id, .container-pw, .container-pw-confirm, .container-button {
    padding: .5rem;
  }
  .errormessage {
    padding-left: .5rem;
  }
  .container-id input, .container-pw input, .container-pw-confirm input, .container-button button {
    padding: .5rem 1rem .5rem 1rem;
    width: 10rem;
  }
</style>
