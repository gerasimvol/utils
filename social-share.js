function shareVia ({ socialNetworkName, link = window.location.href, message }) {
  let url

  const formatedLink = encodeURIComponent(link)
  const formatedMessage = encodeURIComponent(`\n${message}\n`)

  // create popup window url
  if (socialNetworkName === 'facebook') {
    url = `https://www.facebook.com/sharer/sharer.php?u=${formatedLink}`
  } else if (socialNetworkName === 'twitter') {
    url = `http://twitter.com/intent/tweet?text=${formatedMessage}${formatedLink}`
  } else if (socialNetworkName === 'telegram') {
    url = `https://telegram.me/share/url?url=${formatedLink}&text=${formatedMessage}`
  } else if (socialNetworkName === 'linkedin') {
    url = `https://www.linkedin.com/shareArticle?mini=true&url=${formatedLink}&title=${formatedMessage}`
  } else {
    console.error(`There is no ${socialNetworkName} sharing provided!`)
    return
  }

  // open popup window in center of the screen
  window.open(url, 'pop', `
    width=600,
    height=400,
    left=${window.top.outerWidth / 2 + window.top.screenX - 300},
    top=${window.top.outerHeight / 2 + window.top.screenY - 200},
    toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no
  `
  )
}

export default shareVia
