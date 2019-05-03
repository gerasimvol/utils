// Example for Vue.js
// vanila.js: https://stephanwagner.me/auto-resizing-textarea-with-vanilla-javascript

// Usage:
// - set ref to textarea
// - set initial textareheight (maybe same as input)

textareaAutoHeight () {
  if (!this.$refs.textarea) return

  this.$refs.textarea.style.boxSizing = 'border-box'
  const offset = this.$refs.textarea.offsetHeight - this.$refs.textarea.clientHeight
  this.$refs.textarea.addEventListener('input', event => {
    event.target.style.height = this.TEXTAREA_INITIAL_HEIGHT + 'px'

    if (event.target.scrollHeight + offset > this.TEXTAREA_INITIAL_HEIGHT) {
      event.target.style.height = event.target.scrollHeight + offset + 'px'
    }
  })
}
