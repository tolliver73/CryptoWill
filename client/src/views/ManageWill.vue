<template>
  <div class="will" style="overflow:auto;">
    <h1 v-if="this.$parent.$parent.will">Manage Will</h1>
    <h1 v-if="!this.$parent.$parent.will">Create Will</h1>

    <div v-if="isAddNominee" style="max-width: 800px; margin-left: auto; margin-right: auto">
      <h3>Nominees</h3>
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="_nominee in currentNominees">
            <th scope="row">{{ _nominee.contact.name }}</th>
            <td>{{ _nominee.amount }} %</td>
          </tr>
        </tbody>
      </table>
      <h5>Add Nominee</h5>
      <div class="form-group">
        <label for="contact">Choose Contact</label>
        <select class="form-control" id="contact" v-model="nominee.contact">
          <option v-for="contact in contactsArray" :value="contact">{{ contact.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="amount">Amount in Percent</label>
        <input v-model="nominee.amount" class="form-control" type="text" id="amount">%
      </div>
      <button v-on:click="addCurrentNominee()" type="submit" class="btn btn-primary">Add</button>
      <div class="form-group">
        <label for="privateKey">Ethereum Private Key</label>
        <input v-model="privateKey" class="form-control" type="text" id="privateKey">
      </div>
      <button v-on:click="confirm()" type="submit" class="btn btn-primary">Confirm Will</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'will',
  components: {
  },
  data() {
    return {
      isAddNominee: true,
      nominee: {
        contact: "",
        amount: 0
      },
      currentNominees: [],
      contactsArray: [],
      privateKey: ""
    }
  },
  created() {

      axios
        .get('http://207.154.233.248:3000/api/contacts?filter={"include":["statuses"]}')
        .then(response => {
          this.contactsArray = response.data
          this.response = response
        })
    // Get Retainees
  },
  methods: {
    addCurrentNominee() {
      this.currentNominees.push({"contact": this.nominee.contact, "amount": this.nominee.amount})
      console.log(this.currentNominees)
    },
    confirm() {
      if (privateKey != null && privateKey != "" && this.currentNominees.length > 0) {
        var nomineesArray = []

        for (nominee of this.currentNominees) {

        }
        nomineesArray.push({
          this
        })

        axios.post("http://207.154.233.248:3000/api/Contacts", {
            percentage: this.addContact.name,
            phone: this.addContact.phone,
            mail: this.addContact.mail,
            street: this.addContact.street,
            streetNr: this.addContact.streetNr,
            city: this.addContact.city,
            zip: this.addContact.zip,
            statusesId: this.addContact.status
        })
        .then(response => {
          this.response = response.data
          this.loadContacts()
        // Create Private Key here
        })
        .catch(e => {
          this.response = e
          this.errors.push(e)
          alert('Error: ' + e)
        })
      } else {
        alert("You need to fill in your private key.")
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
