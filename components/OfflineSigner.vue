<template>
  <div v-if="!cosmVue.query.isLogged">
    <div class="container has-pt-16 ">  
      <h3 class="text">Offline Signer</h3>  
        <div class="columns has-text-center">
          <div v-for="item in cosmVueOpt.offlineSigner" class="column">
            <div v-if="item.status" class="is-rounded has-bg-primary has-text-white has-p-2" @click="connectWallet(cosmVueOpt.chainInfo)">{{ item.name }}</div>
          </div>  
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data:() => ({
    active: 0
  })
}
</script>
<style>
  @import 'https://cdn.jsdelivr.net/npm/siimple/siimple.css';
  @import 'https://siimple.xyz/siimple-icons.css';
  body {
    background-color: #1c1c1e;
    color: #fefefe;
  }
  .text {
    color: #fefefe;
  }
  .color1 {color: #0b1015;}
  .color2 {color: #2d363d;}
  .color3 {color: #53656f;}
  .color4 {color: #829eac;}
  .color5 {color: #b8e2f2;}
</style> 