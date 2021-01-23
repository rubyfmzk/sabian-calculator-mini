<template>
  <header id="header">
    
    <h1>
      <router-link :to="{name:'home', query: $route.query}">
        <img class="logo" src="/img/logo/rainbow_star.svg">
        <span v-if="$route.name==='home'">Sabian Calculator</span>
      </router-link>

      <div v-if="$route.name && $route.name.match(/^symbols/)" id="symbol_search">
        <select id="symbol_search_sign" v-model="sign">
          <option v-for="(sign, i) in sign_list" :key="i" :value="sign.key">{{ $t('sign_list['+i+']') }}</option>
        </select>

        <select id="symbol_search_degree" v-model="degree">
          <option v-for="degree of 30" :key="degree" :value="degree">{{degree}}</option>
        </select>
        <button class="search" @click="click_symbol_search"></button>
      </div>
    </h1>


    <div v-if="$route.name && $route.name.match(/^symbols/)" id="nav_sing_wrap">
      <router-link :to="{name:'symbols_sign', query: $route.query, params: {sign: sign.key }}" v-for="(sign, key) in sign_list" :key="key">
        <img :src="'/img/sign/'+sign.key+'.svg'">
      </router-link>
    </div>
  </header>
</template>


<script>
import Mixin from '@/components/Common'
import define from '@/assets/js/define'
export default {
  name: 'ComponentHeader',
  mixins:[Mixin],
  props: {
    query: Object,
  },
  data(){
    return{
      sign_list: define.SIGN_LIST,
      sign: this.sign,
      degree: this.degree,
    }
  },
  created(){
    this.set_symbols_search_val()
  },
  mounted(){
  },
  watch:{
    '$route': function(){
      this.set_symbols_search_val()
    },
  },
  methods:{
    click_symbol_search(){
      const sign = this.$$('#symbol_search_sign').value
      const degree = this.$$('#symbol_search_degree').value

      this.$router.push({name:'symbols_degree', params:{sign:sign, degree:degree}, query: this.$route.query})
    },
    set_symbols_search_val(){
      if(this.$route.params.sign) this.sign = this.$route.params.sign
      else this.sign = 'Aries'

      if(this.$route.params.degree) this.degree = this.$route.params.degree
      else this.degree = 1
    },
  },
}
</script>

