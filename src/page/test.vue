<template>
  <section class="section-subscribe">
    <img src="https://image01.oneplus.net/shop/201805/25/503/9e37332d0a3afc2bc93bc568931c5faf.jpg" alt="Subscribe Background">
    <div class="wrap">
      <auto-complete :searchType=searchType :invalidMsg=invalidMailMsg :placeholder=placeholder :showNum=showNum></auto-complete>
    </div>
  </section>
</template>

<script>
import autoComplete from '@/components/autoComplete/auto-complete.vue'
import email from '@/components/autoComplete/searchType/email.js'
export default {
  name: 'HelloWorld',
  components: {
    autoComplete
  },
  data () {
    return {
      searchType: email,
      invalidMailMsg: 'Invalid email address. Please retry.',
      placeholder: 'Email address',
      showNum: 5
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .section-subscribe{
    position:relative;
    margin:0 auto;
    width:100%;
    overflow:hidden;
    img{
      position: relative;
      left: 50%;
      transform: translate3d(-50%,0,0);
    }
    .wrap{
      position:absolute;
      top:50%;
      left:50%;
      transform:translate3d(-50%,-50%,0);
    }
  }
</style>
