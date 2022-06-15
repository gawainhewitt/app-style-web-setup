(() => {
  // index.js
  var mouseDown = false;
  var disableselect = (e) => {
    e.preventDefault();
  };
  var registerMouseDown = (e) => {
    disableselect(e);
    mouseDown = true;
  };
  var registerMouseUp = () => {
    mouseDown = false;
  };
  document.onselectstart = disableselect;
  document.onmousedown = registerMouseDown;
  document.onmouseup = registerMouseUp;
  var mouseEnter = document.querySelector("#mouseEnter");
  mouseEnter.addEventListener("mouseenter", () => {
    if (mouseDown) {
      mouseEnterFunction();
    }
  });
  var mouseEnterCount = 0;
  var mouseEnterFunction = () => {
    const text = document.querySelector("#mouseEnterText");
    mouseEnterCount += 1;
    text.innerHTML = `mouseEnter ${mouseEnterCount}`;
  };
  var button = document.querySelector("#button");
  button.addEventListener("click", () => {
    buttonFunction();
  });
  var buttonCount = 0;
  var buttonFunction = () => {
    const text = document.querySelector("#button");
    buttonCount += 1;
    text.innerHTML = `button ${buttonCount}`;
  };
})();
