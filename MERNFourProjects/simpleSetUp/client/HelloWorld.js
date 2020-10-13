import React from "react";
import { hot } from "react-hot-loader";

const HelloWorld = () => 
    <div>
        <h1>Boardwalk Empire is the best HBO series!</h1>
        <p>
            I watched the series as early as in 2010. I regretted that I didn't know
            about the Internet and wasn't as decisive as I should have been regarding
            to my studies. I listened to my bad parenting advices, but I will work hard
            now and not care about them anymore.
        </p>
    </div>

export default hot(module)(HelloWorld);