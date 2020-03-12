import React from "react";
import warehouse from './warehouse.jpg';


function About() {
    return (
        <div>
            <p>An easy to use order tracker to monitor your organization's operational performance</p>
            <p>Log your orders in the app, view historical progress, and check on sales by location!</p>
            <img src={warehouse} alt='A warehouse with a truck in the background' height='368' width='720'/>
        </div>
        
    );
}

export default About;