# Marijn: A platform game. [Play here](https://htmlpreview.github.io/?https://github.com/SonTrungTo/Full_Stack/blob/master/EloquentJS/ch16/Marijn.html)
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

`Level` constructor now has `touches` method, which tests if an element (`pos, size`) touches
a background element in the grid. It also prevents any further readings of elements
outside the level planned!

## state.js
As the game progresses, things change: actors come and go away, level changes,
and status of the game changes. The state class is used to update the state of the game.

It also has `update` method to track activities of actors and the game's state through
collusion and overlap, its movements => **need to add `update` methods to all actors.**

1. First, Lava,
2. Second, Player,
3. Third, Coin.

* `collide` is a method by actors class to return a new state: player interacting
with lava causes the game to end, with gold coins causes the coin to disappear
and with all of the latter wins the game.
* `overlap` a function inside `state.js` to test whether two actors collapse
with each other.

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
to map an element of level plan to appropriate type/class. It now contains
`collide(state)` method to signal the state of the game for each actor who is collided
by the player, a.k.a lava and coin. All actors have `update` method to track
its properties through `time, state, keys`.

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
   1. Once the background is drawn and actor elements are created, thanks to
   `drawGrid` and `drawActors`, we need to a method to display them, given a state:
   `syncState` method. It first removes old graphics in the background, then
   redraws the actors in their new position; it might be awfully inefficient,
   but tracking of all the movements of actors requires big-time book-keeping.
   Since there are not many actors here, this method will do just fine.
       * `scrollPlayerIntoView` method here does the display work.
       * modification of its class helps add effects of CSS to the game status.

## drawingSystem.js
`scale` is for enlarging the number of pixels each element of the grid takes per square.
1. `drawGrid` is drawn using `elt`. `table` tag corresponds nicely with the data
structure made by `Level`. (I want to experience with changing some attrs later,
like `style: "height: ${level.height * scale}px"`).
1. `drawActors` is drawn using `elt`. The idea is to have a set of DOM elements by
actors (their size and position) attached themselves to a `div` element and return it.

# css
It contains `file.css` to display elements graphically, which include background
and moving elements.

# keys

## trackKeys.js
Here were are building `trackKeys` function that takes an array of names of the keys,
and returns an object that tracks whether a key is pressed, which will stay
being pressed as long as the key is held.

# running

## runGame.js
We can use something with `requestAnimationFrame`. However, it is quite primitive
because we need to keep track the time for each request, to account for delay
due to other uses (e.g, tabs hidden), and to change the time unit to "second"
for easy use.

* `runAnimation` does the above.
* `runLevel` runs the game; when the game is over in a single plan level,
it waits 1 more second, then deletes graphic, resolves to game status and returns `false`
in order to stop the animation.
* `runGame`: Since the game is a sequence of levels, the game restarts a level
when a player loses and proceeds to the next level until the game is absolutely finished!
Then the player has won!
