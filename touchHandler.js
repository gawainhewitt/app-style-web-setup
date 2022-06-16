class TouchHandler {
  
  constructor(eventBinder) {
    this.eventBinder = eventBinder;
    this.eventBinder.bindTouchStart(this.handleTouchStart);
  }

  handleTouchStart = (e) => {
    e.preventDefault();
    console.log("touch start");
  }

}

module.exports = TouchHandler;