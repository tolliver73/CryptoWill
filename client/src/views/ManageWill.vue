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
      <button v-on:click="confirm()" type="submit" class="btn btn-primary">Confirm Will</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

const Tx = require('ethereumjs-tx');
const Web3 = require('web3');
const web3 = new Web3('http://207.154.233.248:8545');

var contractContract;
var contractAddress;

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
      contactsArray: []
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
      contractContract = web3.eth.Contract([{"constant":false,"inputs":[{"name":"nomineeAddr","type":"address"}],"name":"claim","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nomineespercent","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"sender","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nomineesAddr","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"nomineesselected","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"receiver","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"nomineeAddrList","type":"address[]"},{"name":"nomineepercentList","type":"uint256[]"},{"name":"nomineeselectedList","type":"bool[]"},{"name":"counter","type":"uint8"}],"payable":true,"stateMutability":"payable","type":"constructor"}],
        nomineeAddrList,
        nomineepercentList,
        nomineeselectedList,
        counter,
        web3.eth.accounts.sign({
        from: senderAddr, 
        data: '0x608060405260405162000b2c38038062000b2c83398101806040526200002991908101906200050d565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550836002908051906020019062000081929190620000d9565b5082600390805190602001906200009a92919062000168565b508160049080519060200190620000b3929190620001ba565b5080600160146101000a81548160ff021916908360ff16021790555050505050620006c4565b82805482825590600052602060002090810192821562000155579160200282015b82811115620001545782518260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555091602001919060010190620000fa565b5b50905062000164919062000267565b5090565b828054828255906000526020600020908101928215620001a7579160200282015b82811115620001a657825182559160200191906001019062000189565b5b509050620001b69190620002ad565b5090565b82805482825590600052602060002090601f01602090048101928215620002545791602002820160005b838211156200022357835183826101000a81548160ff0219169083151502179055509260200192600101602081600001049283019260010302620001e4565b8015620002525782816101000a81549060ff021916905560010160208160000104928301926001030262000223565b505b509050620002639190620002d5565b5090565b620002aa91905b80821115620002a657600081816101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055506001016200026e565b5090565b90565b620002d291905b80821115620002ce576000816000905550600101620002b4565b5090565b90565b6200030591905b808211156200030157600081816101000a81549060ff021916905550600101620002dc565b5090565b90565b60006200031682516200068d565b905092915050565b600082601f83011215156200033257600080fd5b8151620003496200034382620005f2565b620005c4565b915081818352602084019350602081019050838560208402820111156200036f57600080fd5b60005b83811015620003a3578162000388888262000308565b84526020840193506020830192505060018101905062000372565b5050505092915050565b600082601f8301121515620003c157600080fd5b8151620003d8620003d2826200061b565b620005c4565b91508181835260208401935060208101905083856020840282011115620003fe57600080fd5b60005b83811015620004325781620004178882620004cb565b84526020840193506020830192505060018101905062000401565b5050505092915050565b600082601f83011215156200045057600080fd5b815162000467620004618262000644565b620005c4565b915081818352602084019350602081019050838560208402820111156200048d57600080fd5b60005b83811015620004c15781620004a68882620004e1565b84526020840193506020830192505060018101905062000490565b5050505092915050565b6000620004d98251620006a1565b905092915050565b6000620004ef8251620006ad565b905092915050565b6000620005058251620006b7565b905092915050565b600080600080608085870312156200052457600080fd5b600085015167ffffffffffffffff8111156200053f57600080fd5b6200054d878288016200031e565b945050602085015167ffffffffffffffff8111156200056b57600080fd5b62000579878288016200043c565b935050604085015167ffffffffffffffff8111156200059757600080fd5b620005a587828801620003ad565b9250506060620005b887828801620004f7565b91505092959194509250565b6000604051905081810181811067ffffffffffffffff82111715620005e857600080fd5b8060405250919050565b600067ffffffffffffffff8211156200060a57600080fd5b602082029050602081019050919050565b600067ffffffffffffffff8211156200063357600080fd5b602082029050602081019050919050565b600067ffffffffffffffff8211156200065c57600080fd5b602082029050602081019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006200069a826200066d565b9050919050565b60008115159050919050565b6000819050919050565b600060ff82169050919050565b61045880620006d46000396000f3fe608060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680631e83409a14610046575b600080fd5b34801561005257600080fd5b5061006d6004803603610068919081019061038d565b610083565b60405161007a91906103c5565b60405180910390f35b600080600090505b6002805490508110156101f0578273ffffffffffffffffffffffffffffffffffffffff166002828154811015156100be57fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101e35760048181548110151561011457fe5b90600052602060002090602091828204019190069054906101000a900460ff16156101d857600060048281548110151561014a57fe5b90600052602060002090602091828204019190066101000a81548160ff0219169083151502179055506001601481819054906101000a900460ff16809291906001900391906101000a81548160ff021916908360ff160217905550506000600160149054906101000a900460ff1660ff1614156101d3576101c96101f7565b60019150506101f2565b6101e2565b60009150506101f2565b5b808060010191505061008b565b505b919050565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1631905060008090505b6003805490508110156103755760028181548110151561025657fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506002818154811015156102d057fe5b9060005260206000200160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc606460038481548110151561032557fe5b9060005260206000200154850281151561033b57fe5b049081150290604051600060405180830381858888f19350505050158015610367573d6000803e3d6000fd5b50808060010191505061023a565b5050565b6000610385823561040c565b905092915050565b60006020828403121561039f57600080fd5b60006103ad84828501610379565b91505092915050565b6103bf816103e0565b82525050565b60006020820190506103da60008301846103b6565b92915050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610417826103ec565b905091905056fea265627a7a723058203876ac31b53abfc7c59b743f1393398271f435cda73a2e316a1751049c2ede826c6578706572696d656e74616cf50037', 
        gas: '4700000'
        }, senderKey),
        function (e, contract){
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
      });
      contractAddress = contractContract.address;
    },
    claim () {
      const contractInstance = contract.at(contractAddress);
      var status = contractInstance.claim(senderAddr);
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
