<template lang="html">
  <div class="yoon">
    <div class="container-id">
      <input class="email" type="email" v-model="email" placeholder="E-mail">
    </div>
    <div class="errormessage" v-if="email !== ''">
      {{verifyEmail}}
    </div>
    <div class="container-pw">
      <input type="password" v-model="password" placeholder="Password">
    </div>
    <div class="container-pw-confirm">
      <input type="password" v-model="password_confirm" placeholder="CONFIRM Password">
    </div>
    <div class="errormessage" v-if="password !== ''">
      {{error}}
    </div>
    <div class="container-button">
      <button type="button" v-on:click="login">Login</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Yoon',
  data () {
    return {
      email_: 'ahnsh09',
      password: '1111',
      password_: '1111',
      password_confirm: '1111',
      email: 'ahnsh09'
    }
  },
  computed: {
    error: function () {
      if (this.password === this.password_confirm) {
        return 'Password Correct'
      } else {
        return 'Password Wrong!!'
      }
    },
    verifyEmail: function () {
      var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
      if (this.email.match(regExp) !== null) {
        return 'good'
      } else {
        return 'error'
      }
    }
  },
  methods: {
    login: function () {
      if (this.email === this.email_ && this.password === this.password_ === this.password_confirm) {
        alert('Login success')
      } else {
        alert('Login Fail')
      }
    }
  }
}
</script>

<style scoped>
  .container-id, .container-pw, .container-pw-confirm, .container-button {
    padding: .5rem;
  }
  .container-id input, .container-pw input, .container-pw-confirm input, .container-button button, .errormessage{
    padding: .5rem 1rem .5rem 1rem;
  }
</style>
