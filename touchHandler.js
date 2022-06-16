class TouchHandler {
  #ongoingTouches = [];
  constructor(eventBinder) {
    this.eventBinder = eventBinder;
    this.eventBinder.bindTouchStart(this.handleTouchStart);
  }

  handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
    let touches = e.changedTouches;
    console.log(touches);
    this.#ongoingTouches.push(this.#copyTouch(touches[0]));
    console.log(this.#ongoingTouches);
  }

  #copyTouch({ identifier, clientX, clientY }) { 
    return { identifier, clientX, clientY };
  }

}

module.exports = TouchHandler;