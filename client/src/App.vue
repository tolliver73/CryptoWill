<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <div style="display: inline-block" v-if="this.$parent.authenticated">
        <router-link to="/will" v-if="this.$parent.will">Manage Wills</router-link>
        <router-link to="/will" v-if="!this.$parent.will">Create Will</router-link> |
        <router-link to="/contacts">Manage Contacts</router-link> |
      </div>
      <router-link to="/login" v-if="this.$parent.authenticated">Logout</router-link>
      <router-link to="/login" v-if="!this.$parent.authenticated">Login</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  data() {
  }
}
</script>
