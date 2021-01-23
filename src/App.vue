<template>
  <div id="app">
    <ComponentHeader></ComponentHeader>
    <router-view></router-view>
    <ComponentFooter></ComponentFooter>
  </div>
</template>

<script>
import ComponentHeader from '@/components/ComponentHeader.vue'
import ComponentFooter from '@/components/ComponentFooter.vue'
import Mixin from '@/components/Common'

export default {
  mixins:[Mixin],
  components: {
    ComponentHeader,
    ComponentFooter,
  },

  data () {
    return {
      path: {
        en: '/',
        ja: '/ja',
      },
    }
  },
}
</script>

<style scoped lang="scss">
@import url("assets/css/common.scss");
</style>