class EventBinders {

  constructor() {
    this.mouseEnter = document.querySelector("#mouseEnter");
    this.mouseEnterText = document.querySelector('#mouseEnterText');
    this.button = document.querySelector("#button");
    this.middleBox = document.querySelector("#middle-box");
  }

  bindMouseEnter(handler) {
    this.mouseEnter.addEventListener('mouseenter', () => {
      handler("mouse");
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
    this.middleBox.addEventListener('touchstart', handler);
  }

  bindTouchEnd(handler) {
    this.middleBox.addEventListener('touchend', handler);
  }

  bindTouchMove(handler) {
    this.middleBox.addEventListener('touchmove', handler);
  }

  bindTouchCancel(handler) {
    this.middleBox.addEventListener('touchcancel', handler);
  }

}
 

module.exports = EventBinders;
