class EventBinders {

  constructor() {
    this.mouseEnter = document.querySelector("#mouseEnter");
    this.mouseEnterText = document.querySelector('#mouseEnterText');
    this.button = document.querySelector("#button");
  }

  bindMouseEnter(handler) {
    this.mouseEnter.addEventListener('mouseenter', () => {
      handler();
    })
  }
  
  bindButton(handler) {
    this.button.addEventListener('click', () => {
      handler();
    })
  }

  bindSelectStart(handler) {
    document.addEventListener('selectstart', (e) => {
      handler(e);
    })
  }

  bindMouseDown(handler) {
    document.addEventListener('mousedown', (e) => {
      handler(e);
    })
  }

  bindMouseUp(handler) {
    document.addEventListener('mouseup', (e) => {
      handler(e);
    })
  }

  bindTouchStart(handler) {
    document.addEventListener('touchstart', handler);
  }

  bindTouchEnd(handler) {
    document.addEventListener('touchend', handler);
  }

  bindTouchCancel(handler) {
    document.addEventListener('touchcancel', handler);
  }

  bindTouchMove(handler) {
    document.addEventListener('touchmove', handler);
  }
}

module.exports = EventBinders;
