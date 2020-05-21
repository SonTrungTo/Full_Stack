# A Modular Robot

roads             <br />
buildGraph        <br />
roadGraph         <br />
VillageState      <br />
runRobot          <br />
randomPick        <br />
randomRobot       <br />
mailRoute         <br />
routeRobot        <br />
findRoute         <br />
goalOrientedRobot <br />

I would write:

* ./graph module = {roads, buildGraph([...[2-elements]])} so that the graph looks
like what dijkstrajs wants. **exports: buildGraph, roadsArray**
* ./road module = {roadGraph}. **exports: roadGraph**; **require('./graph')**
* ./state module = {VillageState, runRobot}. **require('./road', './randomPick',
'./robot')**
* ./randomPick = {randomPick} **exports: randomPick**
* ./robot      = {mailRoute, randomRobot, routeRobot, findRoute, goalOrientedRobot}
 **exports: robots**, **require('./randomPick', './road', 'dijkstrajs')**


I would prefer NPM packages. But it's a trade-off: If I would like to have a
shorter code, NPM is the way to go. But on the other hand, *finding* a right package
on NPM seems to be not easy, not to mention the troubles I will have if the author(s)
decide to upgrade the package, I would have to upgrade my own software.

# Roads Module
See roadModule directory. If I have time, I will come back and write a full
modular version of the robot. For now, robot.js tests the modular structure.
# Circular Dependencies
