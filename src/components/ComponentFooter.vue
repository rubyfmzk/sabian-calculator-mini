<template>
  <footer>
    <p>
      <a onclick="toLang('')">English</a> |
      <a onclick="toLang('/ja')">日本語</a>
    </p>
    <p class="sns">
      <a href="https://www.instagram.com/rubyfmzk/" target="_blank">
        <img src="/img/icon/instagram.svg">
      </a>
      <a :href="'https://twitter.com/'+$t('common.twitter')" target="_blank">
        <img src="/img/icon/twitter.svg">
      </a>
    </p>
    <p class="copyright">©2021 Sabian Calculator All rights reserved.</p>
  </footer>
</template>

<script>
export default {
  name: 'ComponentFooter',
  data(){
    return {
    }
  }
}
</script>

