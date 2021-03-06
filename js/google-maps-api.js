// map styling in format [{}]
// import styles from './google-maps-styles'

const googleMapsApiLoadedEvent = createEvent('google-maps:loaded')

const GOOGLE_MAP_SCRIPT_ID = 'google-maps-script-tag'

const appearance = {
  settings: {
    styles,
    disableDefaultUI: true
  },
  removeGoogleBranding: true
}

function _removeGoogleBranding () {
  const styleTag = document.createElement('style')
  const css = `
      a[href^="https://maps.google.com/maps"] {
        display: none !important;
      }

      .gmnoprint a, .gmnoprint span {
        display: none !important;
      }

      .gmnoprint div {
        background: none !important;
      }

      .gm-bundled-control div {
        background: white !important;
        border-radius: none !imporant;
      }

      .gm-bundled-control button img {
        display: none !important;
      }

      .gm-bundled-control button img:nth-child(3) {
        display: block !important;
      }
    `

  document.head.appendChild(styleTag)
  styleTag.appendChild(document.createTextNode(css))
}

function _loadGoogleMapsApi (key, language) {
  const onApiLoaded = 'onGoogleMapsApiLoaded'

  window[onApiLoaded] = () => {
    document.documentElement.dispatchEvent(googleMapsApiLoadedEvent)
  }

  const scriptTag = document.createElement('script')
  scriptTag.id = GOOGLE_MAP_SCRIPT_ID
  scriptTag.src = `https://maps.googleapis.com/maps/api/js?key=${key}&language=${language}&callback=${onApiLoaded}`

  document.body.appendChild(scriptTag)

  if (appearance.removeGoogleBranding) {
    _removeGoogleBranding()
  }
}

export function initGoogleMap ({ key, el, options, language }) {
  if (window.google) {
    // API already loaded - just init map
    return new Promise(resolve => createMap(resolve))
  } else {
    // start downloading google maps
    if (!document.getElementById(GOOGLE_MAP_SCRIPT_ID)) {
      _loadGoogleMapsApi(key, language)
    }

    // wait till API will be loaded - then init map
    return new Promise(resolve => {
      document.documentElement.addEventListener('google-maps:loaded', () => {
        createMap(resolve)
      })
    })
  }

  function createMap (resolve) {
    const map = new google.maps.Map(el, {
      ...options,
      ...appearance.settings
    })
    resolve(map)
  }
}

export function createMarker (options) {
  const marker = new google.maps.Marker(options)
  return marker
}

export function fitBounds ({ markers, map }) {
  const bounds = new google.maps.LatLngBounds()

  markers.forEach(marker => {
    bounds.extend(marker.getPosition())
  })

  map.fitBounds(bounds)
}

// helpers
function createEvent (name, bubbles = false, cancelable = true) {
  if (!process.browser) return

  const event = document.createEvent('Event')
  event.initEvent(name, bubbles, cancelable)
  return event
}
