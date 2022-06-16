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
          this.middleBox = document.querySelector("#middle-box");
        }
        bindMouseEnter(handler) {
          this.mouseEnter.addEventListener("mouseenter", () => {
            handler("mouse");
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
          this.middleBox.addEventListener("touchstart", handler);
        }
        bindTouchEnd(handler) {
          this.middleBox.addEventListener("touchend", handler);
        }
        bindTouchMove(handler) {
          this.middleBox.addEventListener("touchmove", handler);
        }
        bindTouchCancel(handler) {
          this.middleBox.addEventListener("touchcancel", handler);
        }
      };
      module.exports = EventBinders2;
    }
  });

  // eventHandlers.js
  var require_eventHandlers = __commonJS({
    "eventHandlers.js"(exports, module) {
      var EventHandlers2 = class {
        constructor(eventBinder, coolStuffHappens2) {
          this.eventBinder = eventBinder;
          this.coolStuffHappens = coolStuffHappens2;
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
        handleMouseEnter = (type) => {
          console.log(type);
          if (type === "mouse") {
            if (this.mouseDown) {
              this.mouseEnterCount += 1;
              this.eventBinder.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
            }
          } else {
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
        #handleTouchStart = (e) => {
          e.preventDefault();
          console.log("touch start");
          let touches = e.changedTouches;
          this.ongoingTouches.push(this.#copyTouch(touches[0]));
        };
        #handleTouchEnd = (e) => {
          e.preventDefault();
          let touches = e.changedTouches;
          console.log("touch end");
          for (let i = 0; i < touches.length; i++) {
            let idx = this.#ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
              console.log("touchend " + idx);
              this.ongoingTouches.splice(idx, 1);
            } else {
              console.log("can't figure out which touch to end");
            }
          }
          console.log(this.ongoingTouches);
        };
        #handleTouchMove = (e) => {
          e.preventDefault();
          console.log("touch move");
          let touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            let idx = this.#ongoingTouchIndexById(touches[i].identifier);
            if (idx >= 0) {
              this.ongoingTouches.splice(idx, 1, this.#copyTouch(touches[i]));
            } else {
              console.log("can't figure out which touch to continue");
            }
          }
          this.#showElement(this.ongoingTouches);
        };
        #handleCancel = (e) => {
          e.preventDefault();
          console.log("touchcancel.");
          let touches = e.changedTouches;
          for (let i = 0; i < touches.length; i++) {
            let idx = this.ongoingTouchIndexById(touches[i].identifier);
            this.ongoingTouches.splice(idx, 1);
          }
        };
        #copyTouch = ({ identifier, clientX, clientY }) => {
          return { identifier, clientX, clientY };
        };
        #ongoingTouchIndexById = (idToFind) => {
          for (let i = 0; i < this.ongoingTouches.length; i++) {
            let id = this.ongoingTouches[i].identifier;
            if (id == idToFind) {
              return i;
            }
          }
          return -1;
        };
        #showElement = () => {
          console.log("we got to showElement");
          for (let i = 0; i < this.ongoingTouches.length; i++) {
            let el = document.elementFromPoint(this.ongoingTouches[i].clientX, this.ongoingTouches[i].clientY);
            console.log(`element = ${el.id}`);
            if (el.id === "mouseEnterText") {
              this.handleMouseEnter("touch");
            }
          }
        };
      };
      module.exports = EventHandlers2;
    }
  });

  // coolStuffHappens.js
  var require_coolStuffHappens = __commonJS({
    "coolStuffHappens.js"(exports, module) {
      var CoolStuffHappens2 = class {
        constructor() {
        }
      };
      module.exports = CoolStuffHappens2;
    }
  });

  // index.js
  var EventBinders = require_eventBinders();
  var EventHandlers = require_eventHandlers();
  var CoolStuffHappens = require_coolStuffHappens();
  var eventBinders = new EventBinders();
  var coolStuffHappens = new CoolStuffHappens();
  var eventHandlers = new EventHandlers(eventBinders, coolStuffHappens);
})();
