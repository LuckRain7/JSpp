import './index.scss'
import tpl from './index.tpl'

import tools from '../../../utils/tools.js'

class Search {
  constructor() {
    this.name = 'search'
    this.tpl = tpl
  }

  searchPhone(e) {
    const $searchFrom = $('#J_searchForm'),
      $searchInput = $('#J_keyword'),
      keyWord = tools.trimSpaces($searchInput.val()),
      action = $searchFrom.prop('action'),
      leyWordLen = keyWord.length

    if (leyWordLen > 0) {
      window.open(action + '?keyword=' + keyWord)
    }
  }
}

export { Search }
