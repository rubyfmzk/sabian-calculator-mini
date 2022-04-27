<template>
  <div class="res_item" :id="r.key">
    <div class="title_area">
      <h2 class="great_title"><img class="planet_icon large" :src="r.icon">{{r.name}}</h2>
      <p class="title_description">{{r.description}}</p>
    </div>

    <div class="before_img_area"></div>

    <img :src="r.img" :data-minute="r.symbol_minute" :alt="r.alt">

    <div class="after_img_area">
      <div>
        <p class="symbol_title" v-if="lang=='ja'">あなたの{{r.name}}のシンボル</p>
        <p class="symbol_title" v-if="lang=='en'">Your {{r.name}} Symbol</p>
        <p class="sign_degree">{{r.sign_degree}}</p>
        <p class="symbol_name">{{r.sabian}}</p>
      </div>
      <div>
        <p class="symbol_title" v-if="lang=='ja'">{{r.description}}</p>
        <p class="symbol_title" v-if="lang=='en'">{{r.description}}</p>
        <p class="word">{{r.sabian_description}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultNormal',
  props: {
    r: Object,
  },
  data(){
    return {
      lang: window.lang,
    }
  },
  methods:{
/*
    click_change_symbol_minute(e){
      //でたらめなパラメータを後でなおす
      if(e.target.dataset.minute){
        this.$route.query.symbol_minute = e.target.dataset.minute
      }
      else{
        delete this.$route.query.symbol_minute
      }
      this.$router.replace({ query: this.$route.query })
    },*/
  }
}
</script>