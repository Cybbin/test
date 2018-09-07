<template>
  <div class="mail">
    <input class="mailBox" placeholder="Email address" v-model="address" @keydown="search">
    <ul class="mailList" v-show="searching && filteredList.length!=0">
      <li class="mailItem" v-for="item in filteredList" :key="item">
      </li>
    </ul>
  </div>
</template>

<script>
import emailList from './searchType/email.js'
export default {
  name: 'HelloWorld',
  data () {
    return {
      address: '',
      searching: false
    }
  },
  created: function () {
    console.log(emailList)
  },
  methods: {
    search: function () {
      this.searching = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mail{
    width:570px;
    margin:0 auto;
    position:relative;
  }
  .mail .mailBox{
    box-sizing:border-box;
    width:570px;
    height:40px;
    border:none;
    outline:none;
    border-bottom:1px solid #000;
    padding:8px 16px;
    font-size:14px;
    line-height:24px;
  }
  .mailList{
    position:absolute;
    top:40px;
    left:0;
    width:100%;
    margin:0;
    padding:0;
    cursor:pointer;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
  }
  .mailList .mailItem{
    box-sizing:border-box;
    list-style:none;
    width:100%;
    height:40px;
    line-height:40px;
    padding:0 16px;
    text-align:left;
    overflow:hidden;
  }
  .mailList .mailItem:hover{
    background-color:#eee;
  }
  .mailList .mailItem .loginName{
    color:#999;
  }
</style>
