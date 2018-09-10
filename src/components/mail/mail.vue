<template>
  <div class="mailContainer">
    <div class="mail" :class="{'mail_active': canSubscribe}">
      <input id="mailBox" class="mailBox" :placeholder=placeholder spellcheck="false" v-model="val" @input="search" @focus="focus" @blur="blur">
      <i class="clean-btn" v-show="showCleanBtn" @mousedown="cleanVal"></i>
      <ul class="mailList" :class="showList?'showList':''" v-show="searching && filteredList && filteredList.length!=0">
        <li class="mailItem" v-for="(item, index) in filteredList" :key="index" @mousedown="confirm(item)">
          <span>{{item}}</span>
        </li>
      </ul>
      <p class="invalid" v-if="valid">{{invalidMessage}}</p>
    </div>
    <button class="subscribe" :class="{'subscribe_active': canSubscribe}">
      <span>Subscribe</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'auto-complete-box',
  props: {
    invalidMessage: {
      type: String,
      default: ''
    },
    checkFn: {
      type: Function,
      default: function () {
        return true
      }
    },
    searchType: {
      type: Object,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    showNum: {
      type: Number,
      default: 4
    }
  },
  data () {
    return {
      val: '',
      searching: false,
      filteredList: null,
      showCleanBtn: false
    }
  },
  methods: {
    search: function () {
      this.showCleanBtn = true
      this.searchType.search(this)
    },
    confirm: function (item) {
      this.val = item
      this.searching = false
    },
    cleanVal: function () {
      this.val = ''
    },
    focus: function () {
      if (this.val.length === '') return
      this.showCleanBtn = true
    },
    blur: function () {
      this.showCleanBtn = false
      this.filteredList = []
    }
  },
  computed: {
    valid: function () {
      return !this.checkFn(this.val)
    },
    canSubscribe: function () {
      return this.val.indexOf('@') > -1
    },
    showList: function () {
      return this.filteredList && this.filteredList.length > 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mailContainer{
  position:relative;
  width:100%;
  text-align:left;
  .mail{
    position:relative;
    width:100%;
    transition:width .5s;
  }
  .mail_active{
    width:75%;
  }
  .mailBox{
    box-sizing:border-box;
    width:100%;
    height:40px;
    border:none;
    outline:none;
    border-bottom: 1px solid hsla(0,0%,100%,.5);
    font-size:14px;
    padding:8px 16px;
    line-height:24px;
    background-color:transparent;
    color:#fff;
  }
  .clean-btn{
    position:absolute;
    right:0;
    top:50%;
    width:20px;
    height:20px;
    cursor:pointer;
    transform:translate3d(0,-50%,0);
    &:hover:before,&:hover:after{
      background-color:#fff;
    }
    &:before,&:after{
      position:absolute;
      display:block;
      content:'';
      top:50%;
      right:0;
      width:80%;
      height:1px;
      background-color:#828282;
    }
    &:before{
      transform:rotate(45deg);
    }
    &:after{
      transform:rotate(-45deg);
    }
  }
  .mailList{
    position:absolute;
    top:40px;
    left:0;
    width:100%;
    max-height:0;
    margin:0;
    padding:0;
    cursor:pointer;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);
    background-color:#fff;
    z-index:1000;
    overflow:hidden;
    transition:height .4s ease;
    .mailItem{
      box-sizing:border-box;
      list-style:none;
      width:100%;
      height:40px;
      line-height:40px;
      padding:0 16px;
      overflow:hidden;
      &:hover{
        background-color: #eee;
      }
      .loginName{
        color:#999;
      }
    }
  }
  .showList{
    animation:toggle-down .3s ease forwards;
  }
  .invalid{
    position:absolute;
    left:16px;
    bottom:-20px;
    color:#eb0028;
    font-size:14px;
  }
  .subscribe{
    position:absolute;
    top:0;
    right:0;
    padding:10px 20px;
    border:1px solid #fff;
    outline:none;
    background-color:transparent;
    color:#fff;
    opacity:0;
    transform:translate3d(100%,0,0);
    transition:color .25s ease,opacity .25s ease,transform .5s;
    &:before{
      position:absolute;
      display:block;
      content:'';
      height:100%;
      width:0;
      top:0;
      left:0;
      background:#fff;
      transition:width .25s ease;
      z-index:-1;
    }
    &:hover{
      color:#2C3E50;
    }
    &:hover:before{
      width:100%;
    }
  }
  .subscribe_active{
    transform:translate3d(0,0,0);
    cursor:pointer;
    opacity:1;
  }
}
@keyframes toggle-down{
  100%{
    max-height:160px;
  }
}
</style>
