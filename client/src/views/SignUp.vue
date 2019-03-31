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



<style>

/* BASIC */

html {
  background-color: #56baed;
}

body {
  font-family: "Poppins", sans-serif;
  height: 100vh;
}

a {
  color: #92badd;
  display:inline-block;
  text-decoration: none;
  font-weight: 400;
}

h2 {
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  display:inline-block;
  margin: 40px 8px 10px 8px;
  color: #cccccc;
}



/* STRUCTURE */

.wrapper {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  min-height: 100%;
  padding: 20px;
}

#formContent {
  -webkit-border-radius: 10px 10px 10px 10px;
  border-radius: 10px 10px 10px 10px;
  background: #fff;
  padding: 30px;
  width: 90%;
  max-width: 450px;
  position: relative;
  padding: 0px;
  -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
  text-align: center;
}

#formFooter {
  background-color: #f6f6f6;
  border-top: 1px solid #dce8f1;
  padding: 25px;
  text-align: center;
  -webkit-border-radius: 0 0 10px 10px;
  border-radius: 0 0 10px 10px;
}



/* TABS */

h2.inactive {
  color: #cccccc;
}

h2.active {
  color: #0d0d0d;
  border-bottom: 2px solid #5fbae9;
}



/* FORM TYPOGRAPHY*/

input[type=button], input[type=submit], input[type=reset], button  {
  background-color: #56baed;
  border: none;
  color: white;
  padding: 15px 80px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  text-transform: uppercase;
  font-size: 13px;
  -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
  margin: 5px 20px 40px 20px;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover, button:hover  {
  background-color: #39ace7;
}

input[type=button]:active, input[type=submit]:active, input[type=reset]:active, button:active  {
  -moz-transform: scale(0.95);
  -webkit-transform: scale(0.95);
  -o-transform: scale(0.95);
  -ms-transform: scale(0.95);
  transform: scale(0.95);
}

input[type=text], input[type=password], input[type=email] {
  background-color: #f6f6f6;
  border: none;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

input[type=text]:focus, input[type=password]:focus, input[type=email]:focus {
  background-color: #fff;
  border-bottom: 2px solid #5fbae9;
}

input[type=text]:placeholder, input[type=password]:placeholder, input[type=email]:placeholder {
  color: #cccccc;
}



/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
@keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

.fadeIn {
  opacity:0;
  -webkit-animation:fadeIn ease-in 1;
  -moz-animation:fadeIn ease-in 1;
  animation:fadeIn ease-in 1;

  -webkit-animation-fill-mode:forwards;
  -moz-animation-fill-mode:forwards;
  animation-fill-mode:forwards;

  -webkit-animation-duration:1s;
  -moz-animation-duration:1s;
  animation-duration:1s;
}

.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}

.fadeIn.fifth {
  -webkit-animation-delay: 1.2s;
  -moz-animation-delay: 1.2s;
  animation-delay: 1-2s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
  display: block;
  left: 0;
  bottom: -10px;
  width: 0;
  height: 2px;
  background-color: #56baed;
  content: "";
  transition: width 0.2s;
}

.underlineHover:hover {
  color: #0d0d0d;
}

.underlineHover:hover:after{
  width: 100%;
}



/* OTHERS */

*:focus {
    outline: none;
}

#icon {
  padding-top: 48px;
  font-size: 48pt;
}

</style>
