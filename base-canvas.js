export default class BaseCanvas {
  constructor (container) {
    if (!container) {
      throw new Error('BaseCanvas requires container element or selector')
    }

    this.canvas = {
      elem: document.createElement('canvas'),
      container: container instanceof HTMLElement
        ? container
        : document.querySelector(container)
    }

    this.childRenderFunction = null

    this._initSize()

    this.canvas.container.appendChild(this.canvas.elem)

    this._rerenderFnWithContext = this._rerender.bind(this)
    window.addEventListener('resize', this._rerenderFnWithContext)
  }

  _destroy () {
    window.removeEventListener('resize', this._rerenderFnWithContext)
  }

  _initSize () {
    window.devicePixelRatio > 1
      ? this._initRetinaDisplaySize()
      : this._initDefaultDisplaySize()
  }

  _initRetinaDisplaySize () {
    this.canvas.width = this.canvas.container.offsetWidth
    this.canvas.height = this.canvas.container.offsetHeight

    this.canvas.elem.width = this.canvas.width * 2
    this.canvas.elem.height = this.canvas.height * 2
    this.canvas.elem.style.width = `${this.canvas.container.offsetWidth}px`
    this.canvas.elem.style.height = `${this.canvas.container.offsetHeight}px`

    this.ctx = this.canvas.elem.getContext('2d')
    this.ctx.scale(2, 2)
  }

  _initDefaultDisplaySize () {
    this.canvas.width = this.canvas.container.offsetWidth
    this.canvas.height = this.canvas.container.offsetHeight

    this.canvas.elem.width = this.canvas.width
    this.canvas.elem.height = this.canvas.height
    this.canvas.elem.style.width = ``
    this.canvas.elem.style.height = ``

    this.ctx = this.canvas.elem.getContext('2d')
  }

  _rerender () {
    this._initSize()
    this.childRenderFunction()
  }
}
