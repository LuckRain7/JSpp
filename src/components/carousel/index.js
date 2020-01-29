import tpl from './tpl/wrapper.tpl'
import itemTpl from './tpl/item.tpl'
import indicatorTpl from './tpl/indicator.tpl'
import controlTpl from './tpl/control.tpl'
import './index.scss'

import tools from '../../utils/tools.js'

class Carousel {
  constructor(el, data) {
    this.name = 'Carousel'
    this.$el = el
    this.data = data
    this.curIdx = 0
    this.dataLen = this.data.length
  }

  async init() {
    await this.render()
    this.autoPlay()
    this.bindEvent()
  }

  async render() {
    await this.$el.append(
      tools.tplReplace(tpl(), {
        list: this.makeList(),
        control: controlTpl(),
        indicatorW: 18 * this.dataLen,
        indicator: this.makeIndicator()
      })
    )

    this.$carousel = $('.J_carousel')
    this.$carItems = this.$carousel.find('.car-item')
    this.$carIndicators = this.$carousel.find('.indicator-item')
  }

  bindEvent() {
    this.$carousel.on('mouseenter', $.proxy(this.mouseInOut, this))
    this.$carousel.on('mouseleave', $.proxy(this.mouseInOut, this))
    this.$carousel.on('click', $.proxy(this.carouseClick, this))
  }

  autoPlay() {
    Carousel.timer = setInterval(this.run.bind(this, 'next'), 1000)
  }

  run(dir) {
    switch (dir) {
      case 'next':
        if (this.curIdx >= this.dataLen - 1) {
          this.curIdx = 0
        } else {
          this.curIdx++
        }
        break
      case 'prev':
        if (this.curIdx === 0) {
          this.curIdx = this.dataLen - 1
        } else {
          this.curIdx--
        }
        break
      default:
        break
    }
    this.fadeAction(this.curIdx)
  }

  fadeAction(index) {
    this.$carItems
      .eq(index)
      .fadeIn()
      .siblings()
      .fadeOut()
    this.$carIndicators
      .eq(index)
      .addClass('current')
      .siblings()
      .removeClass('current')
  }

  makeList() {
    let list = ''
    this.data.forEach((item, index) => {
      list += tools.tplReplace(itemTpl(), {
        id: item.phone_id,
        swiper_img: item.pic,
        alt: item.alt,
        isActive: index === 0 ? 'active' : ''
      })
    })
    return list
  }

  makeIndicator() {
    let list = ''
    for (let i = 0; i < this.dataLen; i++) {
      list += tools.tplReplace(indicatorTpl(), {
        isCurrent: i === 0 ? 'current' : ''
      })
    }
    return list
  }

  mouseInOut(e) {
    const eType = e.type
    switch (eType) {
      case 'mouseenter':
        clearInterval(Carousel.timer)
        break
      case 'mouseleave':
        this.autoPlay()
        break
      default:
        break
    }
  }

  carouseClick(e) {
    const tar = e.target,
      className = tools.trimSpaces(tar.className),
      $tar = $(tar)

    switch (className) {
      case 'car-control':
        const dir = $tar.attr('data-dir')
        this.run(dir)
        break
      case 'indicator-item':
        this.curIdx = $tar.index()
        this.fadeAction(this.curIdx)
        break
      default:
        break
    }
  }
}

export { Carousel }
