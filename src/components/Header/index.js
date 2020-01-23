import tpl from './index.tpl'
import './index.scss'

import { Logo } from './logo'
import tools from '../../utils/tools'

class Header {
  constructor(el) {
    this.name = 'header'
    this.$el = el
    this.logo = new Logo()
  }

  init() {
    this.render()
  }

  render() {
    console.log(tpl);
    
    this.$el.append(
      tools.tplReplace(tpl(), {
        logo: this.logo.tpl()
      })
    )
  }
}

export { Header }
