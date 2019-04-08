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
      const isScrollingDown = this.prevScrollPosition < window.scrollY
      this.isHidden = isScrollingDown

      this.isOnTop = window.scrollY < this.topOffset

      this.prevScrollPosition = window.scrollY
    }, 70)
  }
}
