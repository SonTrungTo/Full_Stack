# [Project: A Pixel Art Editor](https://htmlpreview.github.io/?https://github.com/SonTrungTo/Full_Stack/blob/master/EloquentJS/ch19/editor.html)
This project attempts to build a pixel-drawing editor, where you manipulate
a pixel in a zoomed-in image, in which each pixels represent a color square.

### state.js
A state will be an object which includes `picture, tool, color` properties.
The picture itself is an object that stores `width, height, pixels` content
of the picture, and its methods are:

* `empty` creates a new picture loaded with colored pixels.
* `pixel(x,y)`   returns a particular pixel.
* `draw(pixels)` expects an array of pixels, each of which is an update (object)
by `{x, y, color}` and returns a picture with updated pixels.

Keep in mind that picture returns immutable object. Also, `updateState`
is used to update a state, with `action` is dispatched as object by components.

### dom.js
`elt` is a function helper that returns a DOM element, which may contain
properties, which cannot be assigned a normal string attribute but can be with
a non-string one: e.g, to register a click event handler.

### run.js
Initilization of the state and controls. Running the app
by destructuring object with `=` after the binding names.

## components
The first component we will build is `PictureCanvas`. It will display the current
picture and communicate the pointer event with the rest of the application.

### canvas.js
This contains `PictureCanvas`. It has callbacks inside its
constructor to notify and communication mouse position to
the rest of the app.

As for the callbacks, when you interact with the canvas,
the canvas needs to know the location of the pointer in
picture pixels.

### editor.js
`PictureEditor` gives a shell around `PictureCanvas`: It displays a set of
tools and controls we pass to the constructor.

### controls.js
The first control is the tool selection menu. It first create `<select>` with
options and an `onchange` event handler that changes the app state when the tool
is changed.

The second control is the color select menu. It works similarly.

### drawing.js
We add functionalities to the mouse or touch events, including `draw`, `rectangle`,
`fill` and `pick`(the tools).

The main thing is to communicate each of the controls to the state of the application.

### saveAndLoad.js
They are another tools, designed to save and load a picture from the application.
However, the process are complicated due to the browser technology. Namely,

* `SaveButton` simulates a save by creating a link to canvas and simulating the link.
* `LoadButton` simulates a load by making a pseudo input file, drawing on a canvas,
getting pixel info from that canvas and returning picture object via `dispatch`
in order to communicate to the current state for the current picture.

### undo.js
We add `done` property to state to store an array of pictures to restore. We
add `doneAt` property to state to store the amount of time passed before it
is undone.

Here `historyUpdateState` serves as the main communication between app states(dispatch).
There is also `UndoButton` class.

# Exercise 19.1: Keyboard Bindings :heavy_check_mark:
# Exercise 19.2: Efficient Drawing :heavy_check_mark:
A good demonstration why immutability is important.
# Exercise 19.3: Circles :heavy_check_mark:
Drawing a circle (tool) added!
# Exercise 19.4: Proper Lines :heavy_check_mark:
I really can't solve this problem *on my own*. However, a serious attempts on it is
taken by taking notes on the nature of problems, providing potential for a possible
solution.

* There are four problems, slightly different, associated with this exercise.
Trigonometrically speaking,
  * in the first quadrant, before going through 45 degrees line, the line proceeds
  as if it is on the horizontal axis since it proceeds horizontally more than vertically.
  Once the line crosses through 45 degrees line, the line proceeds vertically, with
  the base axis being the vertical axis.
  * in the second quadrant, after going through 135 degrees line, the line proceeds
  again horizontally, but the direction changes from right to left.
  * in the third quadrant, similar as the first
  * in the fourth quadrant, similarly as the second
* The general approach is comparing against the diagonal line, then doing the loops
on the based axis, swapping the startPoint and endPoint if necessary and computing
(x,y,color) along the based axis.
