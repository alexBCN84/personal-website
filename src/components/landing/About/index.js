import React from "react"
import Image from "../../common/image";
import { Link } from "gatsby"

export function About() {
    return (
    <div id="about" style={{backgroundColor: '#253237', width: '100vw', height: '100vh'}}>
        <div>
            <h1>Hi people</h1>
            <p>Welcome to your new Gatsby site.</p>
            <p>Now go build something great.</p>
            
            <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
                <Image />
            </div>
            <Link to="/page-2/">Go to page 2</Link> <br />
            <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
        </div>  
     </div>
    )
}