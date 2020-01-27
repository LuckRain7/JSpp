import navTpl from './tpl/nav.tpl'
import navItemTpl from './tpl/nav_item.tpl'

import './index.scss'

import { NavMenu } from './nav_menu/index.js'

import tools from '../../../utils/tools.js'

class Nav {
  constructor() {
    this.name = 'header Nav'

    this.NavMenu = new NavMenu()
    this.htmlCache = {} // 模板缓存
  }

  tpl(data) {
    let list = ''
    data.forEach(item => {
      list += tools.tplReplace(navItemTpl(), {
        field: item.field,
        seriesName: item.series_name
      })
    })
    return tools.tplReplace(navTpl(), {
      navItems: list,
      navMenu: this.NavMenu.tpl()
    })
  }

  // 绑定 navMouseIn 事件函数
  navMouseIn(e) {
    const data = e.data,
      phoneDatas = data.phoneDatas,
      oNav = data.oNav, // 这里的 this 指向 node
      field = $(this).attr('data-field'), // 渠道渲染的字段名称
      $navMenu = $('.J_navMenu')

    // 判断缓存
    if (!oNav.htmlCache[field]) {
      oNav.htmlCache[field] = oNav.NavMenu.appendMenuCards(
        phoneDatas.filter(item => {
          return item.field === field
        })
      )
    }

    // 渲染
    $navMenu.html(oNav.htmlCache[field])
  }
}

export { Nav }
