let endedTouches = []; // array to store ended touches in
let ongoingTouches = []; // array to copy the ongoing touch info into

  
  document.addEventListener("touchstart", handleStart, false);
  document.addEventListener("touchend", handleEnd, false);
  document.addEventListener("touchcancel", handleCancel, false);
  document.addEventListener("touchmove", handleMove, false);


function handleStart(e) {
  e.preventDefault(); // prevent default touch actions like scroll
  if(soundOn){
    let _touches = e.changedTouches; //assign the changedTouches to an array called touches
    ongoingTouches.push(copyTouch(_touches[0])); //copy the new touch into the ongoingTouches array
    //console.log(ongoingTouches); // debugging
    buttonPressed(e);
  }else{
    startAudio();
    let _touches = e.changedTouches; //assign the changedTouches to an array called touches
    ongoingTouches.push(copyTouch(_touches[0])); //copy the new touch into the ongoingTouches array
  }
}

function handleMove(e) {
  e.preventDefault(); // prevent default touch actions like scroll
  let _touches = e.changedTouches; //assign the changedTouches to an array called touches

  for (let i = 0; i < _touches.length; i++) {
    let idx = ongoingTouchIndexById(_touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx
    if (idx >= 0) { // did we get a match?
      // console.log("continuing touch "+idx); // debugging
    // console.log("index = " + idx);
      ongoingTouches.splice(idx, 1, copyTouch(_touches[i]));  // swap in the new touch record
      // console.log(".");
    } else { // no match
      console.log("can't figure out which touch to continue");
    }
  }
  buttonPressed(e);
}

function handleEnd(e) {
  e.preventDefault(); // prevent default touch actions like scroll
  let _touches = e.changedTouches; //assign the changedTouches to an array called touches

  for (var i = 0; i < _touches.length; i++) {

    var idx = ongoingTouchIndexById(_touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx

    if (idx >= 0) { // did we get a match?
      console.log("touchend "+idx);
      //buttonPressed(e);
      ongoingTouches.splice(idx, 1);  // remove it; we're done
    } else { // no match
      console.log("can't figure out which touch to end");
    }
  }
  buttonPressed(e);
    for (let t of e.changedTouches) { // cycle through the changedTouches array
      // console.log("touch id " + t.identifier + // debugging
      //   " released at x: " + t.clientX +
      //   " y: " + t.clientY)
      endedTouches.push({ //create our ended touches array of objects from which we can call .time, .id, .x, .y
        time: millis(),
        id: t.identifier,
        x: t.clientX,
        y: t.clientY
      });
    }
}

function handleCancel(e) { // this handles touchcancel
  e.preventDefault();  // prevent default touch actions like scroll
  console.log("touchcancel."); //debugging
  var touches = e.changedTouches; //assign the changedTouches to an array called touches

  for (var i = 0; i < touches.length; i++) {
    var idx = ongoingTouchIndexById(touches[i].identifier); //call a function that will compare this touch against the list and assign the return to idx
    ongoingTouches.splice(idx, 1);  // remove it; we're done
  }
}

function copyTouch({ identifier, clientX, clientY }) { // this function is used to facilitate copying touch ID properties
  return { identifier, clientX, clientY };
}

function ongoingTouchIndexById(idToFind) { //compares the more complex stuff to give a simple answer to the question "which touch"
for (var i = 0; i < ongoingTouches.length; i++) {
  let id = ongoingTouches[i].identifier;
  if (id == idToFind) {
    return i;
  }
}
return -1;    // not found
}

function buttonPressed() {

  let _touches = ongoingTouches; //assign the changedTouches to an array called touches
  let _buttonState = []; // array to store buttonstate in

  for(let i = 0; i < numberOfButtons; i++) {
    _buttonState.push(0);
  }

  //**** first let's check if each touch is on a button, and store the state in our local variable */

  // i'm using offset.top to change the touch reference to take into consideration the DOM elements above it. If needed you can do the same with  left, top, right, bottom, x, y, width, height.

  if(_touches.length != 0){ // if the touches array isn't empty
    for (var t = 0; t < _touches.length; t++) {  // for each touch
      for (let i = 0; i < numberOfButtons; i++) { // for each button
        let d = dist(_touches[t].clientX, _touches[t].clientY - offset.top, buttonPositions[i].x, buttonPositions[i].y); // compare the touch to the button position
        if (d < radius) { // is the touch where a button is?
          _buttonState[i] = 1; // the the button is on
          console.log("if");
        }else{
          _buttonState[i] = _buttonState[i] + 0; // otherwise add a 0 to the state of that button (another toucch might have put it on you see)
          console.log("else");
        }
      }
    }
  }

  console.log(_buttonState);

  // ********** now our _buttonState array should accurately reflect the state of the touches and buttons so we can do something with it

  for (let i = 0; i < numberOfButtons; i++) { // for each button
    if(_touches.length === 0){ // if there are no touches at all
      stopSynth(i); // call stop synth for each button
    }else if(_buttonState[i] === 1){ // otherwise if the button is on
      playSynth(i); // call play synth for that button
    }else{ // otherwise if the button is off
      stopSynth(i); // call stopsynth for that button
    }
  }
}



