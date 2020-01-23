import { App } from './App.js'
import { Header } from '../components/Header'

class Index extends App {
  constructor($) {
    super($, {
      swiper: true,
      phone: true,
      field: true
    })
  }

  render() {
    new Header(this.$app).init()
    $('body').prepend(this.$app)
  }
}

new Index(jQuery)
