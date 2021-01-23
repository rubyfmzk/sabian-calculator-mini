<template>
  <div>
    <section id="home_background" v-bind:style="{ 'background-image':img }"></section>

    <section id="home_before_top"></section>
    <section id="home_top">
      <div class="text">
        <p>{{ current_sun_position }}</p>
        <p>{{ $t('home.top.current_sabian_symbol') }}</p>
        <p class="sabian">{{ sabian }}</p>
        <p>{{ until_next }}</p>
      </div>
    </section>
    <article id="home_article">
      <section id="home_lang">
        <p>
          <a onclick="toLang('')">English</a> |
          <a onclick="toLang('/ja')">日本語</a>
        </p>
      </section>
      <section id="home_about">
        <h2>{{ $t('home.about.title') }}</h2>
        <div v-html="$t('home.about.description')"></div>
      </section>
    </article>
  </div>
</template>

<script>
import Mixin from '@/components/Common'

export default {
  name: 'Home',
  mixins:[Mixin],
  props: {
    current: Object,
  },
  data () {
    return {
      current_sun_position: this.$t('home.top.current_sun_position').replace('{sign}', this.getSign(this.current.sun_longitude)).replace('{degree}', this.current.sun_longitude.getDegree()),
      sabian: this.$t('sabian['+this.current.sun_longitude.int()+']'),
      until_next: this.$t('home.top.until_next').replace('{hour_minute}', this.getUntilNext(this.current.sun_longitude, this.current.planets.Sun.longitudeSpeed).hour_minute).replace('{hour}', this.getUntilNext(this.current.sun_longitude, this.current.planets.Sun.longitudeSpeed).hour).replace('{minute}', this.getUntilNext(this.current.sun_longitude, this.current.planets.Sun.longitudeSpeed).minute),
      img: 'url(' + this.current.sun_longitude.getImg('full') + ')',

    }
  },

  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  mounted(){
    this.show_hide_nav()

  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },

  methods:{
    onScroll(){
      this.show_hide_nav()
    },
    show_hide_nav(){
      if(this.$route.name !== 'home') return

      if(window.pageYOffset < 50 && this.$$('#page_nav').classList.contains('show')){
        this.$$('#page_nav').classList.add("hide")
        this.$$('#page_nav').classList.remove("show")
      }
      //else{
      else if(window.pageYOffset >= 50 && this.$$('#page_nav').classList.contains('hide')){
        this.$$('#page_nav').classList.add("show")
        this.$$('#page_nav').classList.remove("hide")
      }
    },
    getUntilNext(longitude, longitudeSpeed){
      var rest = (1 - longitude % 1) / longitudeSpeed * 24
      var hour = rest.int().zeroPadding(2)
      var minute = (rest % 1 * 60).int().zeroPadding(2)
      return {hour: hour, minute: minute, hour_minute: hour + ':' + minute}
    },
  }
}

</script>

<style>
@import url("../assets/css/home.scss");
</style>