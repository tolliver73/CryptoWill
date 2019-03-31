<template>
<div id="app">
  <form>

  <div v-if="step === 1">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
        <!-- Icon -->
        <div class="fadeIn first">
          <i class="material-icons" id="icon">
            lock
          </i>
        </div>

        <form>
          <input v-model="userData.email" type="email" id="email" class="fadeIn second" name="login" placeholder="Mail-Address">
          <input v-model="userData.password" type="password" id="password" class="fadeIn third" name="login" placeholder="Password">
          <input v-model="userData.passwordConfirm" type="password" id="passwordConfirm" class="fadeIn third" name="login" placeholder="Confirm Password">
          <button @click.prevent="next()">Next</button>
        </form>
      </div>
    </div>
  </div>

  <div v-if="step === 2">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
        <!-- Icon -->
        <div class="fadeIn first">
          <i class="material-icons" id="icon">
            place
          </i>
        </div>

        <form>
          <input v-model="userData.zip" type="text" id="zip" class="fadeIn second" name="zip" placeholder="Zip-Code">
          <input v-model="userData.city" type="text" id="city" class="fadeIn third" name="city" placeholder="City">
          <input v-model="userData.street" type="text" id="street" class="fadeIn fourth" name="street" placeholder="Street">
          <input v-model="userData.streetNr" type="text" id="streetNr" class="fadeIn fifth" name="streetNr" placeholder="Streetnumber">

          <button @click.prevent="prev()">Previous</button>
          <button @click.prevent="next()">Next</button>
        </form>
      </div>
    </div>

  </div>

  <div v-if="step === 3">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <!-- Tabs Titles -->
        <!-- Icon -->
        <div class="fadeIn first">
          <i class="material-icons" id="icon">
            person
          </i>
        </div>

        <form>
          <input v-model="userData.name" type="text" id="name" class="fadeIn third" name="name" placeholder="Name">
          <input v-model="userData.phone" type="text" id="phone" class="fadeIn fifth" name="phone" placeholder="Phone">

          <button @click.prevent="prev()">Previous</button>
          <button @click.prevent="submit()">Save</button>
        </form>
      </div>
    </div>


  </div>
  </form>

  <br/><br/>Debug: {{response}}
</div>
</template>

<script>
import axios from 'axios'
import router from '../router'
export default {
  name: 'signup',
  components: {
    // CryptoWill
  },
  data() {
    return {
      step:1,
      userData: {
        email: 'test2@googlemail.com',
        password: 'test',
        passwordConfirm: 'test',

        street: "An der Wache",
        streetNr: "3",
        city: "Hasbergen",
        zip: "49205",

        name: "Julian Bruning",
        etherumAdd: "",
        phone: "4915756016634"
      },
      response: 'No response yet'
    }
  },
  // define methods under the `methods` object
  methods: {
    prev() {
      this.step--;
    },
    next() {
      if (this.step == 1 && this.userData.password != this.userData.passwordConfirm) {
        alert('Passwords do not match!')
      } else {
        this.step++;
      }
    },
    submit: function () {
      if (this.userData.password == this.userData.passwordConfirm) {
        var link = "http://207.154.233.248:3000/api/Clients"
        console.log("processing")
        console.log(this.userData.email)
        console.log(this.userData.password)
        console.log(this.userData.street)
        console.log(this.userData.streetNr)
        console.log(this.userData.city)
        console.log(this.userData.zip)
        console.log(this.userData.name)
        console.log(this.userData.phone)

        axios.post(link, {
            email: this.userData.email,
            password: this.userData.password,
            street: this.userData.street,
            streetNr: this.userData.streetNr,
            city: this.userData.city,
            zip: this.userData.zip,
            name: this.userData.name
        })
        .then(response => {
          this.response = response.data
        })
        .catch(e => {
          this.response = e
          this.errors.push(e)
          alert('Error: ' + e)
        })
      } else {
        alert('Passwords do not match!')
      }
    }
  }
}
</script>


