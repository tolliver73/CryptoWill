<template>
  <div class="contacts" style="overflow:auto;">
    <h1>Manage Contacts</h1>
    <h3>Contacts</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Addres</th>
          <th scope="col">Phone</th>
          <th scope="col">Mail</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contactsArray">
          <th scope="row">{{ contact.name }}</th>
          <td>{{ contact.zip }} {{ contact.city }}, {{ contact.street }} {{ contact.streetNr }}</td>
          <td>{{ contact.phone }}</td>
          <td>{{ contact.mail }}</td>
          <td><span v-if="contact.statuses != null">{{ contact.statuses.name }} ({{ contact.statuses.trust }}%)</span></td>
        </tr>
      </tbody>
    </table>

    <div v-if="isAddContact">
      <h3>Add Contact</h3>
      <h5>General</h5>
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="addContact.name" class="form-control" type="text" id="name">
      </div>
      <div class="form-group">
        <label for="phone">Phone</label>
        <input v-model="addContact.phone" class="form-control" type="text" id="phone">
      </div>
      <div class="form-group">
        <label for="mail">Mail</label>
        <input v-model="addContact.mail" class="form-control" type="text" id="mail">
      </div>
      <h5>Address</h5>
      <div class="form-group">
        <label for="zip">Zip</label>
        <input v-model="addContact.zip" class="form-control" type="text" id="zip">
      </div>
      <div class="form-group">
        <label for="city">City</label>
        <input v-model="addContact.city" class="form-control" type="text" id="city">
      </div>
      <div class="form-group">
        <label for="street">Street</label>
        <input v-model="addContact.street" class="form-control" type="text" id="street">
      </div>
      <div class="form-group">
        <label for="streetNr">Street Number</label>
        <input v-model="addContact.streetNr" class="form-control" type="text" id="streetNr">
      </div>
      <select v-model="addContact.status" class="form-control" >
        <option v-for="status in statusesArray" :value="status.id">{{status.name}} ({{status.trust}}%)</option>
      </select>
      <button type="submit" v-on:click="submitContact()" class="btn btn-primary">Add</button>
    </div>

    <!-- <div v-if="isAddStatus">
      <h3>Add Status</h3>
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="addContact.name" class="form-control" type="text" id="name">
      </div>
      <div class="form-group">
        <label for="phone">Trust</label>
        <input v-model="addContact.phone" class="form-control" type="text" id="phone">
      </div>
      <button type="submit" class="btn btn-primary">Add</button>
    </div> -->
<!-- {{ response }} -->
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'contacts',
  components: {
  },
  data() {
    return {
      isAddContact: true,
      addContact: {
        name: "Julian Bruning",
        zip: "49205",
        city: "Hasbergen",
        street: "An der Wache",
        streetNr: "3",
        phone: "4915756016634",
        mail: "julian.bruening@googlemail.com",
        status: ""
      },
      isAddStatus: true,
      addStatus: {
        name: "",
        trust: 50
      },
      contactsArray: [],
      statusesArray: [],
      response: ""
    }
  },
  created() {
    axios
      .get('http://207.154.233.248:3000/api/statuses')
      .then(response => (this.statusesArray = response.data))
    this.loadContacts()
  },
  methods: {
    submitContact() {
      console.log(this.addContact.status)
        axios.post("http://207.154.233.248:3000/api/Contacts", {
            name: this.addContact.name,
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
        })
        .catch(e => {
          this.response = e
          this.errors.push(e)
          alert('Error: ' + e)
        })
    },
    loadContacts() {
      console.log("loading contacts")
      axios
        .get('http://207.154.233.248:3000/api/contacts?filter={"include":["statuses"]}')
        .then(response => {
          this.contactsArray = response.data
          this.response = response
        })
    }
  }
}
</script>

<style>
.contacts {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
</style>
