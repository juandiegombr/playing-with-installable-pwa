if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register(`/sw.js`)
    .then(registration => {})
} else {
  console.log('Your navigator is NOT prepared to use Service Workers')
}

let deferredPrompt = false
let install = document.getElementById('install')
let installStar = document.getElementById('install-star')
let installText = document.getElementById('install-text')
let mobileAlert = document.getElementById('mobile-alert')

const addToHomeScreen = () => {
  // Show the prompt
  deferredPrompt.prompt()
  deferredPrompt.userChoice
    .then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        installStar.className = 'fas fa-star'
        //installStar.classList.remove('far')
        //installStar.classList.add('fas')
        installText.innerText = 'Added to HomeScreen!'
      }
      deferredPrompt = null
    })
}

const showAddToHomeScreen = () => {
  install.style.display = 'block'
  install.addEventListener("click", addToHomeScreen)
}

window.addEventListener("beforeinstallprompt", event => {
  installStar.className = 'far fa-star'
  //installStar.classList.remove('fas')
  //installStar.classList.add('far')
  installText.innerText = 'Add to HomeScreen!'
  deferredPrompt = event
  showAddToHomeScreen()
})


if (window.innerWidth < 576) {
  // install.style.display = 'block'
} else {
  mobileAlert.style.display = 'block'
}


setTimeout(() => {
//  alert(deferredPrompt)
  if (deferredPrompt === false) {
    installStar.className = 'fas fa-star'
    //installStar.classList.remove('far')
    //installStar.classList.add('fas')
    installText.innerText = 'Added to HomeScreen!'
  }
}, 1000)