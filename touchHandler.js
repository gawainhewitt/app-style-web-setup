class TouchHandler {
  ongoingTouches = [];
  constructor(eventBinder) {
    this.eventBinder = eventBinder;
    this.eventBinder.bindTouchStart(this.#handleTouchStart);
    this.eventBinder.bindTouchEnd(this.#handleTouchEnd);
  }

  #handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
    let touches = e.changedTouches;
    console.log(touches);
    this.ongoingTouches.push(this.#copyTouch(touches[0]));
    console.log(this.ongoingTouches);
  }

  #handleTouchEnd = (e) => {
    e.preventDefault(); 
    let touches = e.changedTouches; 
    console.log("touch end");

    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier); 
      if (idx >= 0) { // did we get a match?
        console.log("touchend "+idx);
        this.ongoingTouches.splice(idx, 1);  // remove it; we're done
      } else { // no match
        console.log("can't figure out which touch to end");
      }
    }
  }

  #handleTouchMove = (e) => {
    e.preventDefault();
    console.log("touch move");
    let touches = e.changedTouches;
    for (let i = 0; i < _touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier); 
      if (idx >= 0) { // did we get a match?
        this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));  
      } else { // no match
        console.log("can't figure out which touch to continue");
      }
    }
  }

  #copyTouch({ identifier, clientX, clientY }) { 
    return { identifier, clientX, clientY };
  }

  #ongoingTouchIndexById(idToFind) { 
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier;
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
    }

}

module.exports = TouchHandler;