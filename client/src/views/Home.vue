<template>
  <div class="home">
    <img src="../assets/logo.png">
    <CryptoWill msg="Welcome to Crypto-Will!"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CryptoWill from '@/components/CryptoWill.vue'

export default {
  name: 'home',
  components: {
    CryptoWill
  }
}
</script>
