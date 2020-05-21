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
My guess is `if(!(name in require.cache))` supports the circular dependencies.
If a module is loaded first, it will return the object `exports` without interfering
with other modules (calling too many `require.cache[names]`, hence out of stack!).

When the object `exports` is overwritten in *circular dependencies*, it returns
an empty object. It is so because the wrapper is expecting an object to wrap
the codes with it (?) (hence, not the interface value it is expecting, and because
it has got the object {} before it finishes loading ????)
