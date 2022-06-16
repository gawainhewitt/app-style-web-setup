class CoolStuffHappens {

  constructor() {

  }

  showElement = (ongoingTouches) => {
    console.log("we got to showElement");
    for(let i = 0; i < ongoingTouches.length; i++){
      let el = document.elementFromPoint(ongoingTouches[i].clientX, ongoingTouches[i].clientY);
      console.log(`element = ${el.id}`)
    }
  }
  
}

module.exports = CoolStuffHappens;