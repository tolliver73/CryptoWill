<template>
  <div class="wrapper fadeInDown">
    <div id="formContent" v-if="!this.$parent.$parent.authenticated">
      <!-- Tabs Titles -->
      <!-- Icon -->
      <div class="fadeIn first">
        <i class="material-icons" id="icon">
          lock
        </i>
      </div>

      <!-- Login Form -->
      <form>
        <input v-model="userData.login" type="text" id="login" class="fadeIn" name="login" placeholder="login">
        <input v-model="userData.password" type="password" id="password" class="fadeIn" name="login" placeholder="password">
        <input type="submit" class="fadeIn" value="Log In" v-on:click="submit(userData)">
      </form>

      <!-- Remind Passowrd -->
      <!-- <div id="formFooter">
        <a class="underlineHover" href="#">Forgot Password?</a>
      </div> -->

      <!-- Sign Up -->
      <div id="formFooter">
      <router-link to="/SignUp">Sign Up</router-link>
      </div>
    </div>
    <div id="formContent" v-if="this.$parent.$parent.authenticated">
        <input type="submit" class="fadeIn" value="Log Out" v-on:click="logOut()">
    </div>
    <!-- <br>
    <p>
      {{ response }}

      {{ this.$parent.authenticated }}
    </p> -->
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
  name: 'login',
  components: {
    // CryptoWill
  },
  data() {
    return {
      userData: {
        login: 'tesl@gmail.comt',
        password: 'test'
      },
      response: 'No response yet'
    }
  },
  // define methods under the `methods` object
  methods: {
    submit: function (userData) {
      var link = "http://207.154.233.248:3000/api/Clients/login"

      axios.post(link, {
          email: this.userData.login,
          password: this.userData.password
        })
      .then(response => {
        this.response = response.data
        this.$parent.$parent.accessToken = response.data.id
        this.$parent.$parent.authenticated = true
        // router.push("about")
      })
      .catch(e => {
        this.response = e
        this.errors.push(e)
        alert('Error: ' + e)
      })
    },
    logOut() {
      this.$parent.$parent.authenticated = false
      this.$parent.$parent.accessToken = ""
      // var link = "http://207.154.233.248:3000/api/Clients/logout"

      // axios.post(link, {
      //     accessToken: this.$parent.accessToken
      // })
      // .then(response => {
      //   this.response = response.data
      //   this.$parent.authenticated = true
      // })
      // .catch(e => {
      //   this.response = e
      //   this.errors.push(e)
      //   alert('Error: ' + e)
      // })
    }
  },
}
</script>
