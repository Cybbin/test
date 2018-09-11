<template>
  <div class="autoComplete">
    <div class="box-container" :class="{'box_active': canSubmit}">
      <input id="box" class="box" spellcheck="false" maxlength="60" :placeholder=placeholder v-model="val" @input="search" @focus="focus" @blur="blur">
      <i class="clean-btn" v-show="showCleanBtn" @mousedown="cleanVal"></i>
      <ul class="list" :class="{'showList':showList}" v-show="showList">
        <li class="item" v-for="(item, index) in filteredList" :key="index" @mousedown="confirm(item)">
          <span class="text-99">{{item.prefix}}</span><span>{{item.suffix}}</span>
        </li>
      </ul>
      <p class="invalid" v-if="!valid">{{invalidMsg}}</p>
    </div>
    <button class="submit" :class="{'submit_active': canSubmit}" @click="submit">
      <span>{{submitText}}</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'auto-complete-box',
  props: {
    // 搜索类型 如 email
    searchType: {
      type: Object,
      required: true
    },
    // 非法提示字符串
    invalidMsg: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    // 下拉框个数
    showNum: {
      type: Number,
      default: 4
    },
    // 提交方法
    submitFn: {
      type: Function
    },
    // 提交文本
    submitText: {
      type: String,
      default: 'Submit'
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
    // 搜索提示方法
    search: function () {
      this.showCleanBtn = true
      this.searchType.search(this)
    },
    // 点击提示框
    confirm: function (item) {
      this.val = item.prefix + item.suffix
      this.searching = false
    },
    // 清除输入框
    cleanVal: function () {
      this.val = ''
    },
    // 输入框获得焦点
    focus: function () {
      if (this.val.length === '') return
      this.showCleanBtn = true
    },
    // 输入框失去焦点
    blur: function () {
      this.showCleanBtn = false
      this.filteredList = []
    },
    submit: function () {
      if (this.submitFn) {
        this.submitFn()
      }
    }
  },
  computed: {
    // 输入是否符合要求
    valid: function () {
      if (this.invalidMsg) {
        return this.searchType.checkFn(this.val)
      }
      return false
    },
    // 是否能订阅
    canSubmit: function () {
      return this.searchType.canSubmit(this.val) && this.submitFn
    },
    // 列表是否展开
    showList: function () {
      return this.searching && this.filteredList && this.filteredList.length > 0
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.autoComplete{
  position:relative;
  width:570px;
  text-align:left;
  .box-container{
    position:relative;
    width:100%;
    transition:width .5s;
  }
  .box_active{
    width:75%;
  }
  .box{
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
  .list{
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
    .item{
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
    animation:toggle-down .5s ease-in-out forwards;
  }
  .invalid{
    position:absolute;
    left:16px;
    bottom:-20px;
    color:#eb0028;
    font-size:14px;
  }
  .submit{
    position:absolute;
    top:0;
    right:0;
    width:110px;
    height:40px;
    line-height:40px;
    text-align:center;
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
  .submit_active{
    transform:translate3d(0,0,0);
    cursor:pointer;
    opacity:1;
  }
}
.text-99{
	color:#999;
}
@keyframes toggle-down{
  100%{
    max-height:400px;
  }
}
</style>
