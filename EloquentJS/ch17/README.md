# shapes.js (Shapes)
Drawing:
1. A trapezoid
1. A red diamond
1. A zigzagging line
1. A spiral made up of 100 straight line segments
1. A yellow star

# thePieChart.js (The Pie Chart)
Putting label on each pie of the chart.

# aBouncingBall.js (The Bouncing Ball)
The ball moves at a constant speed and bounces off the walls when it hits them.

This is also an extension of what is required in the exercise: each time the ball
hits a side of the wall, its speed is incremented! This could be a potential
for a future game!

# precomputedMirroring (Precomputed Mirroring, added to CANVASDisplay.js)
From the hint: We draw inverted sprites on a canvas without adding to the document.
Then use that canvas as a source to draw the sprites.

The lesson here is drawing transformed images takes significant time for bitmap
to be built. Also, loading additional images may take time; that is why loading
from canvas is the fastest way.
