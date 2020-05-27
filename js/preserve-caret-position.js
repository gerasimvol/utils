export default function (el, fn) {
  function saveSelection (containerEl) {
    const range = window.getSelection().getRangeAt(0)
    const preSelectionRange = range.cloneRange()
    preSelectionRange.selectNodeContents(containerEl)
    preSelectionRange.setEnd(range.startContainer, range.startOffset)
    const start = preSelectionRange.toString().length

    return {
      start: start,
      end: start + range.toString().length
    }
  }

  function restoreSelection (containerEl, savedSel) {
    let charIndex = 0
    const range = document.createRange()
    range.setStart(containerEl, 0)
    range.collapse(true)
    const nodeStack = [containerEl]
    let node
    let foundStart = false
    let stop = false

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharIndex = charIndex + node.length
        if (!foundStart && savedSel.start >= charIndex && savedSel.start <= nextCharIndex) {
          range.setStart(node, savedSel.start - charIndex)
          foundStart = true
        }
        if (foundStart && savedSel.end >= charIndex && savedSel.end <= nextCharIndex) {
          range.setEnd(node, savedSel.end - charIndex)
          stop = true
        }
        charIndex = nextCharIndex
      } else {
        let i = node.childNodes.length
        while (i--) {
          nodeStack.push(node.childNodes[i])
        }
      }
    }

    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  }

  const savedPosition = saveSelection(el)
  fn() // modify el (e.g. change innerHTML)
  restoreSelection(el, savedPosition)
}
