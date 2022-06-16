(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // eventBinders.js
  var require_eventBinders = __commonJS({
    "eventBinders.js"(exports, module) {
      var EventBinders2 = class {
        constructor() {
          this.mouseEnter = document.querySelector("#mouseEnter");
          this.mouseEnterText = document.querySelector("#mouseEnterText");
          this.button = document.querySelector("#button");
          this.wrapper = document.querySelector("#wrapper");
        }
        bindMouseEnter(handler) {
          this.mouseEnter.addEventListener("mouseenter", () => {
            handler();
          });
        }
        bindButton(handler) {
          this.button.addEventListener("click", () => {
            handler();
          });
        }
        bindSelectStart(handler) {
          document.addEventListener("selectstart", (e) => {
            handler(e);
          });
        }
        bindMouseDown(handler) {
          document.addEventListener("mousedown", (e) => {
            handler(e);
          });
        }
        bindMouseUp(handler) {
          document.addEventListener("mouseup", (e) => {
            handler(e);
          });
        }
        bindTouchStart(handler) {
          wrapper.addEventListener("touchstart", handler);
        }
      };
      module.exports = EventBinders2;
    }
  });

  // eventHandlers.js
  var require_eventHandlers = __commonJS({
    "eventHandlers.js"(exports, module) {
      var EventHandlers2 = class {
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
          if (this.mouseDown) {
            this.mouseEnterCount += 1;
            this.eventBinder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
          }
        };
        buttonFunction = () => {
          const text = document.querySelector("#button");
          this.buttonCount += 1;
          text.innerHTML = `button ${this.buttonCount}`;
        };
        disableSelect = (e) => {
          e.preventDefault();
        };
        registerMouseDown = (e) => {
          this.disableSelect(e);
          this.mouseDown = true;
        };
        registerMouseUp = () => {
          this.mouseDown = false;
        };
      };
      module.exports = EventHandlers2;
    }
  });

  // touchHandler.js
  var require_touchHandler = __commonJS({
    "touchHandler.js"(exports, module) {
      var TouchHandler2 = class {
        constructor(eventBinder) {
          this.eventBinder = eventBinder;
          this.eventBinder.bindTouchStart(this.handleTouchStart);
        }
        handleTouchStart = (e) => {
          e.preventDefault();
          console.log("touch start");
        };
      };
      module.exports = TouchHandler2;
    }
  });

  // index.js
  var EventBinders = require_eventBinders();
  var EventHandlers = require_eventHandlers();
  var TouchHandler = require_touchHandler();
  var eventBinders = new EventBinders();
  var eventHandlers = new EventHandlers(eventBinders);
  var touchHandler = new TouchHandler(eventBinders);
})();
