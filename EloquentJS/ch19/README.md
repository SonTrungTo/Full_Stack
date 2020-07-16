# Project: A Pixel Art Editor
This project attempts to build a pixel-drawing editor, where you manipulate
a pixel in a zoomed-in image, in which each pixels represent a color square.

## state.js
A state will be an object which includes `picture, tool, color` properties.
The picture itself is an object that stores `width, height, pixels` content
of the picture, and its methods are:

* `empty` creates a new picture loaded with colored pixels.
* `pixel(x,y)`   returns a particular pixel.
* `draw(pixels)` expects an array of pixels, each of which is an update (object)
by `{x, y, color}` and returns a picture with updated pixels.

Keep in mind that picture returns immutable object. Also, `updateState`
is used to update a state, with `action` is dispatched as object by components.
