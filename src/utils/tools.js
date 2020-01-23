// 模板替换
function tplReplace(tpl, replaceObject) {
  return tpl.replace(/\{\{(.*?)\}\}/g, function(node, key) {
    return replaceObject[key]
  })
}

// 去空格
function trimSpaces(str) {
  return str.replace(/\s+/g, '')
}

//   拿到url中查询地址 &id=12  ?id=12
function getUrlQueryValue(key) {
  const reg = new RegExp('(^|&)' + key + '=([^&]*)(&|$)', 'i'),
    res = window.location.search.substr(1).match(reg)

  return res != null ? decodeURIComponent(res[2]) : null
}

// 节流
function throttle(fn, delay) {
  var t = null,
    begin = new Date().getTime()

  return function() {
    var _self = this,
      args = arguments,
      cur = new Date().getTime()

    clearTimeout(t)

    if (cur - begin >= delay) {
      fn.apply(_self, args)
      begin = cur
    } else {
      t = setTimeout(function() {
        fn.apply(_self, args)
      }, delay)
    }
  }
}

module.exports = {
  tplReplace,
  trimSpaces
}
