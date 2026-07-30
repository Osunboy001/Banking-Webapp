const BASE_URL = window.location.origin + '/api/v1'

// ── STATE ──
let pin = []
let confirmPin = []
let stage = 'pin' // 'pin' | 'confirm'

// ── HELPERS ──
function showErr(msg) {
  const el = document.getElementById('pinError')
  el.textContent = msg
  el.classList.add('show')
}

function hideErr() {
  document.getElementById('pinError').classList.remove('show')
}

function setMatchHint(msg, type) {
  const hint = document.getElementById('matchHint')
  hint.textContent = msg
  hint.className = 'nb-match-hint' + (type ? ' ' + type : '')
}

// ── DOT RENDERING ──
function renderDots(displayId, filledCount) {
  const dots = document.querySelectorAll(`#${displayId} .nb-dot`)
  dots.forEach((dot, i) => {
    if (i < filledCount) {
      dot.classList.add('nb-filled')
    } else {
      dot.classList.remove('nb-filled')
    }
  })
}

function updateDisplays() {
  const pinDisplay = document.getElementById('pinDisplay')
  const confirmDisplay = 
  
  document.getElementById('confirmDisplay')

  renderDots('pinDisplay', pin.length)
  renderDots('confirmDisplay', confirmPin.length)

  // Active / done states
  if (stage === 'pin') {
    pinDisplay.classList.add('nb-active')
    pinDisplay.classList.remove('nb-done')
    confirmDisplay.classList.remove('nb-active', 'nb-done')
  } else {
    pinDisplay.classList.remove('nb-active')
    pinDisplay.classList.add('nb-done')
    confirmDisplay.classList.add('nb-active')
    confirmDisplay.classList.remove('nb-done')
  }
}

// ── KEYPAD HANDLER ──
function handleKey(key) {
  hideErr()

  if (key === 'back') {
    if (stage === 'pin') {
      pin.pop()
    } else {
      if (confirmPin.length === 0) {
        // Go back to PIN stage
        stage = 'pin'
        setMatchHint('', '')
      } else {
        confirmPin.pop()
      }
    }
    updateDisplays()
    return
  }

  // Digit key
  if (stage === 'pin') {
    if (pin.length >= 4) return
    pin.push(key)
    updateDisplays()

    if (pin.length === 4) {
      // Weak PIN check early (optional UX)
      const weak = ['1234','0000','1111','2222','3333','4444','5555','6666','7777','8888','9999']
      if (weak.includes(pin.join(''))) {
        showErr('This PIN is too easy to guess. Please choose a different PIN.')
        pin = []
        updateDisplays()
        return
      }
      // Advance to confirm stage
      setTimeout(() => {
        stage = 'confirm'
        updateDisplays()
      }, 180)
    }
  } else {
    if (confirmPin.length >= 4) return
    confirmPin.push(key)
    updateDisplays()

    if (confirmPin.length === 4) {
      if (confirmPin.join('') === pin.join('')) {
        setMatchHint('PINs match', 'ok')
      } else {
        setMatchHint('PINs do not match', 'no')
        // Shake effect then reset confirm
        shakeDisplay('confirmDisplay')
        setTimeout(() => {
          confirmPin = []
          updateDisplays()
          setMatchHint('', '')
        }, 500)
      }
    } else {
      setMatchHint('', '')
    }
  }
}

function shakeDisplay(id) {
  const el = document.getElementById(id)
  el.style.transition = 'transform 0.08s'
  const steps = [6, -6, 4, -4, 2, -2, 0]
  let i = 0
  const next = () => {
    if (i >= steps.length) { el.style.transform = ''; return }
    el.style.transform = `translateX(${steps[i]}px)`
    i++
    setTimeout(next, 60)
  }
  next()
}

// ── BIND KEYPAD ──
document.getElementById('keypad').addEventListener('click', (e) => {
  const btn = e.target.closest('.nb-key')
  if (!btn) return

  const key = btn.dataset.key
  if (!key) return

  // Press animation
  btn.classList.add('nb-press')
  setTimeout(() => btn.classList.remove('nb-press'), 120)

  handleKey(key)
})

// ── CREATE PIN ──
async function createPin() {
  hideErr()
  setMatchHint('', '')

  if (pin.length < 4) {
    showErr('Please enter a 4-digit PIN.')
    return
  }

  if (confirmPin.length < 4 || confirmPin.join('') !== pin.join('')) {
    showErr('Please confirm your PIN before continuing.')
    return
  }

  document.getElementById('formSection').classList.add('nb-hidden')
  document.getElementById('loadingSection').classList.remove('nb-hidden')

  try {
    const res = await fetch(BASE_URL + '/transactions/create-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pin: pin.join('') })
    })

    const data = await res.json()
    document.getElementById('loadingSection').classList.add('nb-hidden')

    if (!res.ok) {
      document.getElementById('formSection').classList.remove('nb-hidden')
      if (data.message && data.message.toLowerCase().includes('already')) {
        showErr('You already have a PIN. Go back to transfer.')
      } else {
        showErr(data.message || 'Failed to create PIN. Try again.')
      }
      return
    }

    document.getElementById('successSection').classList.remove('nb-hidden')

  } catch (err) {
    document.getElementById('loadingSection').classList.add('nb-hidden')
    document.getElementById('formSection').classList.remove('nb-hidden')
    showErr('Network error. Check your connection and try again.')
  }
}

// ── NAVIGATION ──
function goToTransfer() {
  window.location.href = 'transaction.html'
}

function goToDashboard() {
  window.location.href = 'transaction.html'
}

// ── SIDEBAR TOGGLE ──
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('overlay')
  if (!sidebar || !overlay) return
  sidebar.classList.toggle('active')
  overlay.classList.toggle('active')
}

document.querySelectorAll('.menu-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 768) toggleSidebar()
  })
})

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const sidebar = document.getElementById('sidebar')
    const overlay = document.getElementById('overlay')
    if (sidebar) sidebar.classList.remove('active')
    if (overlay) overlay.classList.remove('active')
  }
})

// ── KEYBOARD SUPPORT (physical keyboard) ──
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') handleKey(e.key)
  if (e.key === 'Backspace') handleKey('back')
})

// ── INIT ──
updateDisplays()