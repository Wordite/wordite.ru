const targets = []
let scrollOffset = 0
let container = null

if (typeof window !== 'undefined') {
  container = document.body.querySelector('#home') ? document.body.querySelector('.scrollable_container') : document.body.querySelector('.wordite_page_container')

  setInterval(() => {
    scrollOffset = container.scrollTop

    targets.forEach((listener) => {
      if (scrollOffset === 0) {
        listener._isEntered = false
        listener._isExited = false

        return
    }

      const coords = listener.target.getBoundingClientRect()
      const isInView = window.innerHeight >= coords.top
      const isNotNear = window.innerHeight + 100 < coords.top
      const isTimeLate = Date.now() - listener._lastEnterUse < 3300

      if (!listener._isEntered && isInView) {
        listener._isEntered = true
        listener._isExited = false

        if (isTimeLate) return

        listener._lastEnterUse = Date.now()
        listener.enter(listener.target)
      }

      if (listener._isEntered && !isInView && !listener._isExited && isNotNear) {
        if (isTimeLate) return

        listener._isExited = true
        listener._isEntered = false

        listener.exit(listener.target)
      }
    })
  }, 150)
}

export function enterView({ target, enter = () => {}, exit = () => {}, offset = 0, offsetPx = 0 }) {
  if (typeof target === 'string') {
    target = document.body.querySelector(target)
  }

  targets.push({
    target,
    enter,
    exit,
    _isEntered: false,
    _isExited: false,
    _lastEnterUse: 0,
    offset,
    offsetPx
  })
}
