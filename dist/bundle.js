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
      };
      module.exports = EventBinders2;
    }
  });

  // eventHandlers.js
  var require_eventHandlers = __commonJS({
    "eventHandlers.js"(exports, module) {
      var EventHandlers2 = class {
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
          if (this.mouseDown) {
            this.mouseEnterCount += 1;
            this.binder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
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

  // index.js
  var EventBinders = require_eventBinders();
  var EventHandlers = require_eventHandlers();
  var eventBinders = new EventBinders();
  var eventHandlers = new EventHandlers(eventBinders);
})();
