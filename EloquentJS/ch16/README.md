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
* class `Coin`
