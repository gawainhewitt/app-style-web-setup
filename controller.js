class Controller {
  
  constructor(view) {
    this.view = view;
    this.mouseEnterCount = 0;
    this.buttonCount = 0;
    this.mouseDown = false;
    this.view.bindMouseEnter(this.mouseEnterFunction);
    this.view.bindSelectStart(this.disableSelect);
    this.view.bindMouseDown(this.registerMouseDown);
    this.view.bindMouseUp(this.registerMouseUp);
    this.view.bindButton(this.buttonFunction);
  }

  mouseEnterFunction = () => {
    if(this.mouseDown){
      this.mouseEnterCount += 1;
      this.view.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
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

module.exports = Controller;
