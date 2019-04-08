/*
  Usage:

  1. Make header position: fixed

  2. Mixin will toggle 'isHidden' data property, so you can add class when hidden
     :class="['header', { 'header_hidden': isHidden }]"

  3. Animate header show/hide with css transition
*/

import throttle from 'lodash/throttle'

export default {
  data () {
    return {
      isHidden: false,
      prevScrollPosition: 0
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
      this.prevScrollPosition = window.scrollY
    }, 70)
  }
}
