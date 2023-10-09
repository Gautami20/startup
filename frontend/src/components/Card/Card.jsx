import React from 'react';
import './Card.css';
import investcard from "../../assets/investor-icon.webp"
import startcard from "../../assets/startup-icon.webp"

function Card() {
  return (
    <div id="cardcard-container">
        <div id="cardinvestor">
            <img className="cardinvestor-icon" src={investcard} alt="investor-icon"/>
            <h2>Are you an Investor?</h2>
            <p>
                Discover and Invest in curated startups.
                Get access to exclusive allocations and build your investment portfolio.
            </p>
            <button><a href=""><strong>Join</strong> to Invest</a></button>
        </div>
        <div id="cardstartup">
            <img className="cardstartup-icon" src={startcard}/>
            <h2>Are you a Startup?</h2>
            <p>
                Fundraise in STEALTH with your curated list of investors & access value-added capital.
                Bring all investors as a single entity in your cap table.
            </p>
            <button><a href=""><strong>Join</strong> to raise funds</a></button>
        </div>
    </div>
  )
}

export default Card