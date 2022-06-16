class EventHandlers {
  
  constructor(eventBinder) {
    this.eventBinder = eventBinder;
    this.ongoingTouches = [];
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;
    this.eventBinder.bindMouseEnter(this.handleMouseEnter);
    this.eventBinder.bindSelectStart(this.disableSelect);
    this.eventBinder.bindMouseDown(this.registerMouseDown);
    this.eventBinder.bindMouseUp(this.registerMouseUp);
    this.eventBinder.bindButton(this.buttonFunction);
    this.eventBinder.bindTouchStart(this.#handleTouchStart);
    this.eventBinder.bindTouchEnd(this.#handleTouchEnd);
    this.eventBinder.bindTouchMove(this.#handleTouchMove);
    this.eventBinder.bindTouchCancel(this.#handleCancel);
  }

  handleMouseEnter = () => {
    if(this.mouseDown){
      this.mouseEnterCount += 1;
      this.eventBinder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
    }
  }
  
  buttonFunction = () => {
    const text = document.querySelector('#button');
    this.buttonCount += 1;
    text.innerHTML = `button ${this.buttonCount}`;
  }

  disableSelect = (e) => {  
    e.preventDefault();
  }  

  registerMouseDown = (e) => {
    this.disableSelect(e);
    this.mouseDown = true;
  }

  registerMouseUp = () => {
    this.mouseDown = false;
  }

  #handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
    let touches = e.changedTouches;
    // console.log(touches);
    this.ongoingTouches.push(this.#copyTouch(touches[0]));
    // console.log(this.ongoingTouches);
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
    console.log(this.ongoingTouches);
  }

  #handleTouchMove = (e) => {
    e.preventDefault();
    console.log("touch move");
    let touches = e.changedTouches;
    for (let i = 0; i < touches.length; i++) {
      let idx = this.#ongoingTouchIndexById(touches[i].identifier); 
      if (idx >= 0) { // did we get a match?
        this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));
        let el = document.elementFromPoint(this.ongoingTouches[idx].clientX, this.ongoingTouches[idx].clientY);
        console.log(`element = ${el.id}`)
        // console.log(this.#copyTouch(touches[i]));  
      } else { // no match
        console.log("can't figure out which touch to continue");
      }
    }
  }

  #handleCancel = (e) => { 
    e.preventDefault();  
    console.log("touchcancel."); 
    let touches = e.changedTouches; 
  
    for (let i = 0; i < touches.length; i++) {
      let idx = this.ongoingTouchIndexById(touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx
      this.ongoingTouches.splice(idx, 1);  // remove it; we're done
    }
  }

  #copyTouch = ({ identifier, clientX, clientY }) => { 
    return { identifier, clientX, clientY };
  }

  #ongoingTouchIndexById = (idToFind) => { 
    for (let i = 0; i < this.ongoingTouches.length; i++) {
      let id = this.ongoingTouches[i].identifier;
      if (id == idToFind) {
        return i;
      }
    }
    return -1;    // not found
  }
}

module.exports = EventHandlers;
