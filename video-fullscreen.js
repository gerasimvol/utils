// Requires GSAP and ScrollToPlugin

export function openFullscreen (videoEl, { exitAfter = true, exitCallback, scrollBackOffset }) {
  if (videoEl.requestFullscreen) {
    videoEl.requestFullscreen()
  } else if (videoEl.msRequestFullscreen) {
    videoEl.msRequestFullscreen()
  } else if (videoEl.webkitRequestFullscreen) {
    videoEl.webkitRequestFullscreen()
  }

  if (!exitAfter) return

  // exit fullscreen after video end
  videoEl.addEventListener('ended', async () => {
    const isInFullscreen = Boolean(document.fullscreenElement || 
      document.webkitFullscreenElement || 
      document.mozFullScreenElement)
    
    if (!isInFullscreen) return

    await exitFullscreen()

    // fire callback (close modal etc.)
    if (exitCallback) {
      exitCallback()
    }

    // scroll back after fullscreen exit
    if (scrollBackOffset || scrollBackOffset === 0) {
      TweenMax.to(window, 0.8, {
        scrollTo: {
          y: scrollBackOffset,
          autoKill: false
        },
        ease: Power2.easeOut
      })
    }
  })
}

export function exitFullscreen () {
  if (document.exitFullscreen) return document.exitFullscreen()
  else if (document.webkitExitFullscreen) return document.webkitExitFullscreen()
  else if (document.mozCancelFullScreen) return document.mozCancelFullScreen()
  else if (document.msExitFullscreen) return document.msExitFullscreen()
}
