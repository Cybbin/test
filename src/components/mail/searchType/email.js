export default {
  list: [
    {
      domain: 'gmail',
      suffix: ['com']
    },
    {
      domain: 'hotmail',
      suffix: ['com', 'co.uk', 'fr', 'it']
    },
    {
      domain: 'yahoo',
      suffix: ['com', 'co.uk', 'in', 'co.in', 'a', 'ab', 'abc', 'abcd', 'abcde']
    },
    {
      domain: 'outlook',
      suffix: ['com']
    },
    {
      domain: 'qq',
      suffix: ['com']
    },
    {
      domain: '163',
      suffix: ['com']
    }
  ],
  // 搜索
  search: function (that) {
    // email 为此js导出模块， that 为调用此文件的组件
    let email = this
    // val 为输入框的值
    let val = that.val
    // 输入框为空，不显示列表
    if (val.length === 0) {
      that.searching = false
      return
    }
    let resultList = [] // 提示提示结果列表
    that.filteredList = [] // 提示显示列表
    let prefix
    // 输入框出现 @
    if (val.indexOf('@') !== -1) {
      prefix = val.split('@')[0].trim()
      let suffix = val.split('@')[1]
      // @ 前没有字符时不显示提示框
      if (prefix.length === 0) {
        that.searching = false
        return
      }
      // @ 后有字符时搜索提示
      if (suffix.length !== 0) {
        let allList = email.getAllList()
        allList.forEach(function (ele) {
          if (ele.indexOf(suffix) === 0) {
            resultList.push('@' + ele)
          }
        })
      // @ 后没有字符时显示初始列表
      } else {
        resultList = email.getDefaultList(that.showNum)
      }
    // 输入框没有 @ 时，显示初始列表
    } else {
      prefix = val.trim()
      resultList = email.getDefaultList(that.showNum)
    }
    // 渲染提示结果列表
    resultList.forEach(function (ele, index) {
      that.filteredList[index] = prefix + ele
    })
    // 只显示 showNum 个选项
    if (that.filteredList.length > that.showNum) {
      that.filteredList = that.filteredList.slice(0, that.showNum)
    // 完整输入时提示框消失
    } else if (that.filteredList.length === 1) {
      if (val === that.filteredList[0]) {
        that.searching = false
        return
      }
    }
    that.searching = true // 显示列表
  },
  // 获取所有列表
  getAllList: function () {
    let that = this
    let allList = []
    for (let i in that.list) {
      let currentDomain = that.list[i]
      for (let j in currentDomain.suffix) {
        allList.push(currentDomain.domain + '.' + currentDomain.suffix[j])
      }
    }
    return allList
  },
  // 获取初始列表
  getDefaultList: function (showNum) {
    let that = this
    let defaultList = []
    for (let i in that.list) {
      if (i >= showNum) break
      defaultList.push('@' + that.list[i].domain + '.' + that.list[i].suffix[0])
    }
    console.log(defaultList)
    return defaultList
  }
}
