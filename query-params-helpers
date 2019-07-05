function removeQueryParameterFromString (url, parameter) {
  return url
    .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1')
}

export function addQueryParam (key, value) {
  if (history.pushState) {
    let currentUrl = window.location.href
    currentUrl = removeQueryParameterFromString(currentUrl, key)

    let queryStart
    if (currentUrl.indexOf('?') !== -1) {
      queryStart = '&'
    } else {
      queryStart = '?'
    }

    const newurl = currentUrl + queryStart + key + '=' + value
    window.history.pushState({ path: newurl }, '', newurl)
  }
}

export function removeQueryParam (key) {
  if (history.replaceState) {
    const regExp = new RegExp(`[?&]${key}=[^&]+`)

    history.replaceState(
      null,
      '',
      location.pathname + location.search.replace(regExp, '').replace(/^&/, '?')
    )
  }
}
