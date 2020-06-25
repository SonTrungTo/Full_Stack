# Marijn: A platform game.
This project attempts to build a somewhat simplified Mario-like game. You control
the main character, Marijn, moving around a fixed level design, going through a couple of levels.
The goal is to collect all gold coins in any single level and to avoid being hit
by a lava.

You win the game if you finish all levels of the game. You lose if you lose all
lives.

# level
## level.js
This attempts to create a level object which can interpret background elements
created by a human-readable interpretation of the level design.
## state.js
As the game progresses, things change: actors come and go away, level changes,
and status of the game changes. The state class is used to update the state of the game.

# actors
## actors.js
This contains classes that define the moving elements in the game, a.k.a actors,
including...
* class `Vec` to describe the 2-dimensional position of moving elements
* class `Player` to describe the player, Marijn: his position and his speed to simulate
momentum and gravity.
* class `Lava` to describe different types of lava: dripping lava, horizontal lava
and vertical lava. `reset` property determines whether a lava is coming back from
the start or just bounces back.
* class `Coin` to describe gold coins. Since gold coins will fluctuate
a bit to enliven the game, they keep `basePos` and `wobble` properties as a result,
which together determine `pos` property.

It also contains the definition of `levelChars` object used by `Level` class
to map an element of level plan to appropriate type/class.

# drawing
Encapsulation is applied. We define DOMDisplay, an interface that returns
an object that displays a given level and state.

## DOMDisplay.js
1. Define `elt`, a helper function.
1. DOMDisplay: We need to build a display object by giving it a parent to which
it appends itself and a level object.
   1. `this.actorLayer` contains elements that track the actors being displayed
   as a state updates.
   1. `level` is used to draw a background, which is drawn by `drawGrid`. It is
   drawn once, then actors are redrawn as the state changes.

## drawingSystem.js
`scale` is for enlarging the number of pixels each element of the grid takes per square.
1. `drawGrid` is drawn using `elt`. `table` tag corresponds nicely with the data
structure made by `Level`.
