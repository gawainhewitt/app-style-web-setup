(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // view.js
  var require_view = __commonJS({
    "view.js"(exports, module) {
      var View2 = class {
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
      module.exports = View2;
    }
  });

  // controller.js
  var require_controller = __commonJS({
    "controller.js"(exports, module) {
      var Controller2 = class {
        constructor(view2) {
          this.view = view2;
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
          if (this.mouseDown) {
            this.mouseEnterCount += 1;
            this.view.mouseEnterText.innerHTML = `mouseEnter ${this.mouseEnterCount}`;
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
      module.exports = Controller2;
    }
  });

  // index.js
  var View = require_view();
  var Controller = require_controller();
  var view = new View();
  var controller = new Controller(view);
})();
