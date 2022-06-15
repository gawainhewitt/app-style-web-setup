let mouseDown = false;

// disable text selection on the site

const disableselect = (e) => {  
  e.preventDefault();
}  

const registerMouseDown = (e) => {
  disableselect(e);
  mouseDown = true;
}

const registerMouseUp = () => {
  mouseDown = false;
}

document.onselectstart = disableselect;
document.onmousedown = registerMouseDown;
document.onmouseup = registerMouseUp;

// when you swipe over an element with the mouse or a touch gesture something happens

const mouseEnter = document.querySelector("#mouseEnter");
mouseEnter.addEventListener('mouseenter', () => {
  if(mouseDown){
    mouseEnterFunction();
  }
})

let mouseEnterCount = 0;

const mouseEnterFunction = () => {
  const text = document.querySelector('#mouseEnterText');
  mouseEnterCount += 1;
  text.innerHTML = `mouseEnter ${mouseEnterCount}`;
}

const button = document.querySelector("#button");
button.addEventListener('click', () => {
  buttonFunction();
})

let buttonCount = 0;

const buttonFunction = () => {
  const text = document.querySelector('#button');
  buttonCount += 1;
  text.innerHTML = `button ${buttonCount}`;
}
