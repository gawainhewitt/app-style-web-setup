class EventHandlers {
  
  constructor(eventBinder) {
    this.eventBinder = eventBinder;
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;
    this.eventBinder.bindMouseEnter(this.handleMouseEnter);
    this.eventBinder.bindSelectStart(this.disableSelect);
    this.eventBinder.bindMouseDown(this.registerMouseDown);
    this.eventBinder.bindMouseUp(this.registerMouseUp);
    this.eventBinder.bindButton(this.buttonFunction);
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
}

module.exports = EventHandlers;
