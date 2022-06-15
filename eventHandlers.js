class EventHandlers {
  
  constructor(binder) {
    this.binder = binder;
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;
    this.binder.bindMouseEnter(this.mouseEnterFunction);
    this.binder.bindSelectStart(this.disableSelect);
    this.binder.bindMouseDown(this.registerMouseDown);
    this.binder.bindMouseUp(this.registerMouseUp);
    this.binder.bindButton(this.buttonFunction);
  }

  mouseEnterFunction = () => {
    if(this.mouseDown){
      this.mouseEnterCount += 1;
      this.binder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
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
}

module.exports = EventHandlers;
