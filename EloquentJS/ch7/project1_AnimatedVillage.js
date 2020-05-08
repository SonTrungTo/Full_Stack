// test: no
(function() {
  "use strict"

  let active = null;

  const places = {
    "Alice's House" : {x: 279, y: 100},
    "Cabin"         : {x: 295, y: 30},
    "Bob's House"   : {x: 285, y: 150},
    "Town Hall"     : {x: 236, y: 175},
    "Dick's House"  : {x: 150, y: 200},
    "Erina's House" : {x: 100, y: 201},
    "George's House": {x: 50,  y: 101},
    "Farm"          : {x: 50,  y: 60},
    "Shop"          : {x: 120, y: 80},
    "Market"        : {x: 200, y: 109},
    "Post Office"   : {x: 235, y: 30}
  };
  const placeKeys = Object.keys(places);

  const speed = 2;

  class Animation {
    constructor(worldState, robot, robotState) {
      this.worldState = worldState;
      this.robot      = robot;
      this.robotState = robotState;
      this.turn       = 0;

      let outer = (window.__sandbox ? window.__sandbox.output.div : document.body),
doc = outer.ownerDocument;
      this.node = outer.appendChild(doc.createElement("div"));
      this.node.style.cssText = "position: relative; line-height: 0.1; margin: 5px auto;";
      this.map = this.node.appendChild(doc.createElement("img"));
      this.map.src = "img/village2x.png";
    }
  }

  window.runRobotAnimation = function(worldState, robot, robotState) {
    if(active && active.timeout != null)
      clearTimeout(active.timeout);
    active = new Animation(worldState, robot, robotState);
  }
})()
