

console.log("CONSENT TEST");

// Set our variables
const triggerButton = document.querySelector('#load') // our trigger button
const storageItem = 'mapsConsent' // key of the item to check if consent is given
const script = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCTpR8Iqp8AFDWbP64uPK9wKTJThDfD4os&callback=initMap' // script to load
const attributes = {} // could contain something like { 'defer': true }

// Basic google maps init function
window.initMap = () => {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 52.28155, lng: 8.04235 },
    zoom: 15,
  })
}

// Our main function to handle script loading
const loady = (trigger, storageItem, script, attributes) => {
  // Check if trigger parameter is a DOM element
  if (trigger instanceof HTMLElement === false) {
    throw new Error('Trigger is not a DOM Element.')
  }

  // Check if browser supports localStorage
  if (typeof localStorage === undefined) {
    throw new Error('localStorage is not available in this browser.')
  }

  // Read the localStorage item, to check if consent is already given
  let consent = localStorage.getItem(storageItem)

  // Function to check if script is already appended to the DOM
  const isAlreadyAppended = () => {
    const scripts = Array.from(document.getElementsByTagName('script'))
    let result = false
    scripts.forEach((s) => (s.src == script ? (result = true) : null))
    return result
  }

  // Function that creates our script element. Also adds attributes if that
  // parameter is filled with an object
  const createScriptElement = () => {
    const el = document.createElement('script')
    el.src = script
    for (let [key, value] of Object.entries(attributes)) {
      el.setAttribute(key, value)
    }
    return el
  }

  // Function that appends script to the Head. Could also be adjusted to prepend
  // it before the closing </body> if you want to.
  const appendScriptElement = (el) => {
    const isAppended = isAlreadyAppended()
    if (!isAppended) {
      document.getElementsByTagName('head')[0].appendChild(el)
    }
  }

  // Our run function that will be trigger if the user a) clicks on our trigger
  // element or b) if consent is already given and found in localStorage.
  const run = () => {
    localStorage.setItem(storageItem, true)
    consent = localStorage.getItem(storageItem)
    const scriptElement = createScriptElement()
    appendScriptElement(scriptElement)
  }

  // Add eventListener to trigger element and check if consent is already given
  trigger.addEventListener('click', () => run())
  if (consent === 'true') trigger.click()
}

// Run loady
loady(triggerButton, storageItem, script, attributes)