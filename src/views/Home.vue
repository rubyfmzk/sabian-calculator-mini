<template>
  <div>
    <section id="home_title">
      <h2>{{ $t('home.catch_phrase') }}</h2>
      <p>{{ $t('home.catch_phrase_Supplement') }}</p>
      <p>{{ $t('home.catch_phrase_Supplement_2') }}</p>
      <p>
        <a onclick="toLang('')" v-if="lang=='ja'">( Change to English )</a>
        <a onclick="toLang('/ja')" v-if="lang=='en'">( 日本語に変更 )</a>
      </p>
    </section>

    <section id="calculator_input" class="set_param">
      <p>{{ $t('home.input_your_birthday') }}</p>
      <dl>
        <dt>{{ $t('calculator.set_datetime.year_month_day') }}</dt>
        <dd><input id="date" type="date" v-model="input.date"></dd>

        <dt>{{ $t('calculator.set_datetime.hour_minute') }}</dt>
        <dd>
          <input id="time" type="time" v-model="input.time" onblur="onBlurTime('time')"><br>
          <span><input type="checkbox" id="unknown_time" class="unknown_time" v-model="input.unknown" @change="change_unknown_time">{{ $t('calculator.set_datetime.unknown_time') }}</span>
        </dd>

        <dt>{{ $t('calculator.set_datetime.timezone') }}</dt>
        <dd>
          <select id="timezone" class="timezone" v-model="input.timezone">
            <option v-for="(list, l) in timezone_list" :key="l" :value="list.val">{{list.timezone}}</option>
          </select>
        </dd>
      </dl>

      <button id="get_planet_position" @click="click_get_planet_position">{{ $t('calculator.set_datetime.calculate') }}</button>
    </section>

    <section id="result">
      <h2 id="result_title" v-if="lang=='ja'">{{result.birthday}}の<br>サビアンマンダラ</h2>
      <h2 id="result_title" v-if="lang=='en'">Sabian Mandala of<br>{{result.birthday}}</h2>

      <MandalaGeocentric :result="result.n.planets"></MandalaGeocentric>
      <div id="res_wrap">
        <div v-for="(p, i) in result.current_planet_list" :key="i">
          <ResultNormal :r="result.n.planets[p]"></ResultNormal>
        </div>
      </div>
    </section>

    <hr>

    <article id="home_article">
      <section id="home_about">
        <h2>{{ $t('home.about.title') }}</h2>
        <div v-html="$t('home.about.description')"></div>
      </section>
    </article>

    <hr>

    <article id="home_article">
      <section id="home_links">
        <h2>{{ $t('home.links.title') }}</h2>
        <p><a :href="$t('home.links.sabian_calculator_link')" target="_blank">{{ $t('home.links.sabian_calculator') }}</a></p>
        <p><a :href="$t('home.links.rubyfmzk_link')" target="_blank">{{ $t('home.links.rubyfmzk') }}</a></p>
      </section>
    </article>
  </div>
</template>

<script>
import Mixin from '@/components/Common'
import ResultNormal from '@/components/ResultNormal.vue'
import MandalaGeocentric from '@/components/MandalaGeocentric.vue'
//import define from '@/assets/js/define'
//import planet_list from '@/assets/yml/planet.yml'

export default {
  name: 'Home',
  mixins:[Mixin],
  props: {
    current: Object,
  },
  components: {
    MandalaGeocentric,
    ResultNormal,
  },
  data () {
    this.$route.query.n = this.adjustDatetimeQuery(this.$route.query.n)

    this.set_dateitime_to_pluto()

    return {
      lang: window.lang,
      result: this.get_result(),
      datetime_view: this.get_datetime_view(this.$route),
      input: this.get_input(this.$route),
      countries: this.countries,
      regions: this.regions,
      cities: this.cities,
      input_city: this.input_city,
      input_cities: this.input_cities,
      timezone_list : [
        {val:-12, timezone:'UTC -12:00', city:''},
        {val:-11.5, timezone:'UTC -11:30', city:''},
        {val:-11, timezone:'UTC -11:00', city:''},
        {val:-10.5, timezone:'UTC -10:30', city:''},
        {val:-10, timezone:'UTC -10:00', city:' (Honolulu)'},
        {val:-9.5, timezone:'UTC -09:30', city:''},
        {val:-9, timezone:'UTC -09:00', city:' (Anchorage)'},
        {val:-8.5, timezone:'UTC -08:30', city:''},
        {val:-8, timezone:'UTC -08:00', city:' (Los Angeles, Vancouver)'},
        {val:-7.5, timezone:'UTC -07:30', city:''},
        {val:-7, timezone:'UTC -07:00', city:' (Denver, Calgary)'},
        {val:-6.5, timezone:'UTC -06:30', city:''},
        {val:-6, timezone:'UTC -06:00', city:' (Chicago, Mexico City)'},
        {val:-5.5, timezone:'UTC -05:30', city:''},
        {val:-5, timezone:'UTC -05:00', city:' (New York, Detroit)'},
        {val:-4.5, timezone:'UTC -04:30', city:''},
        {val:-4, timezone:'UTC -04:00', city:''},
        {val:-3.5, timezone:'UTC -03:30', city:''},
        {val:-3, timezone:'UTC -03:00', city:' (Rio)'},
        {val:-2.5, timezone:'UTC -02:30', city:''},
        {val:-2, timezone:'UTC -02:00', city:''},
        {val:-1.5, timezone:'UTC -01:30', city:''},
        {val:-1, timezone:'UTC -01:00', city:''},
        {val:-0.5, timezone:'UTC +00:30', city:''},
        {val:0, timezone:'UTC +00:00', city:' (London)'},
        {val:0.5, timezone:'UTC +00:30', city:''},
        {val:1, timezone:'UTC +01:00', city:' (Berlin, Paris, Rome)'},
        {val:1.5, timezone:'UTC +01:30', city:''},
        {val:2, timezone:'UTC +02:00', city:' (Cape Town, Athens, Jerusalem)'},
        {val:2.5, timezone:'UTC +02:30', city:''},
        {val:3, timezone:'UTC +03:00', city:' (Moscow)'},
        {val:3.5, timezone:'UTC +03:30', city:''},
        {val:4, timezone:'UTC +04:00', city:' (Dubai)'},
        {val:4.5, timezone:'UTC +04:30', city:''},
        {val:5, timezone:'UTC +05:00', city:''},
        {val:5.5, timezone:'UTC +05:30', city:' (Mumbai, New Delhi)'},
        {val:6, timezone:'UTC +06:00', city:''},
        {val:6.5, timezone:'UTC +06:30', city:''},
        {val:7, timezone:'UTC +07:00', city:''},
        {val:7.5, timezone:'UTC +07:30', city:''},
        {val:8, timezone:'UTC +08:00', city:' (Perth, Singapore, Beijing)'},
        {val:8.5, timezone:'UTC +08:30', city:''},
        {val:9, timezone:'UTC +09:00', city:' (Tokyo)'},
        {val:9.5, timezone:'UTC +09:30', city:' (Darwin, Adelaide)'},
        {val:10, timezone:'UTC +10:00', city:' (Sydney, Brisbane, Hobart)'},
        {val:10.5, timezone:'UTC +10:30', city:''},
        {val:11, timezone:'UTC +11:00', city:''},
        {val:11.5, timezone:'UTC +11:30', city:''},
        {val:12, timezone:'UTC +12:00', city:' (Auckland)'},
        {val:12.5, timezone:'UTC +12:30', city:''},
        {val:13, timezone:'UTC +13:00', city:''},
        {val:13.5, timezone:'UTC +13:30', city:''},
        {val:14, timezone:'UTC +14:00', city:''},
      ],
    }
  },

  created() {
    this.set_result()
  },
  mounted(){
    const to = this.$route
    this.input = this.get_input(to)
    this.change_unknown_time()
  },
  destroyed() {
  },
  watch:{
    '$route': function(to){
      this.set_datetime_view(to, this.datetime_view)
      this.set_result()
    }
  },
  methods:{
    adjustDatetimeQuery(datetime_query){
      if(this.checkDatetimeQuery(datetime_query)) return datetime_query

      const current_dt = new Date()
      return current_dt.toStr('yyyyMMddHHmm') + current_dt.getTimezoneStr() + current_dt.getSummerWinter()
    },

    change_unknown_time: function(){
      if(this.$$("#unknown_time")){
        if(this.$$("#unknown_time").checked){
          this.$$('#time').disabled = true
        }
        else{
          this.$$('#time').disabled = false
        }
      }
    },

    click_get_planet_position(){
      const query = this.get_new_query_from_inputbox()

      this.set_datetime_view(this.$route, this.datetime_view)

      this.$router.push({query: query})

      this.set_dateitime_to_pluto()

      this.set_result()
    },

    get_datetime_view(to){
      if(!to) return
      return {
        n: this.changeDatetimeQueryFormat(to.query.n, "TEXT"),
      }
    },

    get_input(to){
      return {
        date: this.changeDatetimeQueryFormat(to.query.n, "yyyy-MM-dd"),
        time: this.changeDatetimeQueryFormat(to.query.n, "HH:mm"),
        timezone: this.changeDatetimeQueryFormat(to.query.n, "timezone"),
        unknown: this.changeDatetimeQueryFormat(to.query.n, "unknown_flg"),
      }
    },

    get_new_query_from_inputbox(){
      let query = {}
      query.n = this.changeDatetimeToQuery(
        this.$$('#date').value,
        this.$$('#time').value,
        this.$$('#timezone').value,
        false,
        this.$$("#unknown_time").checked
      )
      return query
    },

    get_result(){
      return {
        n:{
          pl: this.n.pl,
          query: this.$route.query.n,
          planets: this.addPlanetsInfo( this.n.pl.getPlanets()),
          is_unknown: this.changeDatetimeQueryFormat(this.$route.query.n, 'unknown_flg'),
        },
        current_planet_list: this.current_planet_list,
        birthday: this.changeDatetimeQueryFormat(this.$route.query.n, 'TEXT2'),
      }
    },

    set_dateitime_to_pluto(){
      if(!this.n) this.n = {}

      if(!this.n.pl) this.n.pl = new window.Pluto()

      this.n.pl.setDateArray(this.changeDatetimeQueryFormat(this.$route.query.n, 'array'))
    },

    set_datetime_view(to, view){
      if(!to) return
      return Object.assign(view, this.get_datetime_view(to))
    },

    set_result(){
      this.setAstronomicalModel()
      this.result = this.get_result()
    },
  }
}

</script>

<style>
@import url("../assets/css/home.scss");
</style>