import axios from 'axios'
import OfflineSigner from "./components/OfflineSigner.vue";

let CosmVue = {
  install(app, options) {
    app.component("offline-signer", OfflineSigner);
    app.mixin({
      data() {
        return {
          cosmVueOpt: options,
          cosmVue: options,
          isLogged: false,
          addrWallet: "",
          nameWallet: "",
          getBalance: "",
          getRewards: ""
        };
      },    
      methods: {
        async connectWallet(chainInfo) { 
          if (!window.getOfflineSigner || !window.keplr) {
            alert("Please install keplr extension");
          } else {
            const chainId = chainInfo.chainId; 
            await window.keplr.enable(chainId);
            const offlineSigner = await window.getOfflineSignerAuto(chainId);

            const accounts = await offlineSigner.getAccounts();
            const getKey = await window.keplr.getKey(chainId);
            this.addrWallet = accounts[0].address
            this.nameWallet = getKey
            this.isLogged = true

            if(this.cosmVueOpt.getBalances.all){
              let getBalance = await axios.get(chainInfo.rest + `/cosmos/bank/v1beta1/balances/${accounts[0].address}`) 
              this.getBalance = (getBalance.data.balances[0].amount / 1000000)               

              let getRewards = await axios.get(chainInfo.rest + `/cosmos/distribution/v1beta1/delegators/${accounts[0].address}/rewards`)
              this.getRewards = (getRewards.data.total[0].amount / 1000000)

              this.cosmVue.query = {
                isLogged: this.isLogged,
                nameWallet: this.nameWallet.name,
                addrWallet: this.addrWallet,
                getBalance: this.getBalance,
                getRewards: this.getRewards,
              }
            }
          } 
        },
      }      
    });
    //app.provide('CosmVue', options);
  },
};

export default CosmVue
