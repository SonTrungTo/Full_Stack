# A Modular Robot

roads <br />
buildGraph <br />
roadGraph  <br />
VillageState <br />
runRobot <br />
randomPick <br />
randomRobot <br />
mailRoute <br />
routeRobot <br />
findRoute <br />
goalOrientedRobot <br />

I would write module ./graph for {roads, buildGraph, roadGraph, mailRoute}, a module ./findRoute for
{findRoute}, which is likely to have been written on NPM thanks to the dijkstrajs package,
a module ./world for {VillageState, randomPick} and finally a module ./robot for
{goalOrientedRobot, randomRobot, routeRobot, runRobot}

Now, ./robot will depend on ./graph, ./findRoute, ./world. The rest are independent modules.

I would prefer NPM packages. It's better to ensure data composability.

# Roads Module

# Circular Dependencies