import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

//多言語
import VueI18n from 'vue-i18n'
import { data } from '@/lang/index.js'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: window.lang, // デフォルト言語設定
  fallbackLocale: 'en', // 選択中の言語に対応する文字列が存在しない場合はこの言語の文字列を使用する
  messages: data
})

import VueScrollTo from 'vue-scrollto'
Vue.use(VueScrollTo)

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

