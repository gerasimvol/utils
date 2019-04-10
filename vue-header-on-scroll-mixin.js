/*
  Usage:

  1. Make header position: fixed

  2. Mixin will toggle 'isHidden' data property, so you can add class when hidden
     :class="['header', { 'header_hidden': isHidden }]"

  3. Animate header show/hide with css transition

  4. Mixin will add 'isOnTop' data property,
     when header is near very top of the page (less than this.topOffset)
*/

import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      isOnTop: true,
      isHidden: false,
      prevScrollPosition: 0,
      topOffset: 100
    }
  }, 
  mounted () {
    this.prevScrollPosition = window.scrollY
    window.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.onScroll)
  },
  methods: {
    onScroll: throttle(function () {
      const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)

      const isScrollingDown = this.prevScrollPosition < scrollTop
      this.isHidden = isScrollingDown

      this.isOnTop = scrollTop < this.topOffset

      this.prevScrollPosition = scrollTop
    }, 70)
  }
}
