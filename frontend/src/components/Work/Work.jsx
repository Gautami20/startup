import React from 'react'
import './Work.css'
import user from '../../assets/user.png'
import seinterface from '../../assets/search-interface-symbol.png'
import growth from '../../assets/growth.png'
import piggy from '../../assets/piggy-bank.png'
import { Link } from 'react-router-dom'

function Work() {
  return (
    <>
    <div className="workwork-container">
        <div className="workwork-text">
            <h1>How it Works</h1>
            <p>
                Welcome to Investor's Deck, where visionary investors and ambitious startups come together, fostering innovation, growth, and opportunities for a brighter future. Here's how it works:
            </p>
            <Link to='/register'><button className="workstartup-btn">Register <strong>Startup</strong> </button></Link>
            <Link to='/investreg'><button className="workinvest-btn">Start <strong>Investing</strong> </button></Link>
        </div>
        <div className="workwork-option1">
            <div className="workwork-join">
                <img className="workwork-icon" width="40px" height="40px" src={user}/>
                <h2 className="workwork-heads">1. Join</h2>
                <p className="workwork-para">
                    Join the process by singing up Today.
                </p>
            </div>
            <div className="workwork-choose">
                <img className="workwork-icon" width="40px" height="40px" src={seinterface}/>
                <h2 className="workwork-heads">2. Choose</h2>
                <p className="workwork-para">
                    According to your necessity create an account as an investor or a startup.
                </p>
            </div>
        </div>
        <div className="workwork-option2">
            <div className="workwork-startup">
                <img className="workwork-icon" width="50px" height="50px" src={growth}/>
                <h2 className="workwork-heads">3.Startup</h2>
                <p className="workwork-para">
                    Register your startup so that investors can approach you.
                </p>
            </div>
            <div className="workwork-invest">
                <img className="workwork-icon" width="50px" height="50px" src={piggy}/>
                <h2 className="workwork-heads">4.Invest</h2>
                <p className="workwork-para">
                    Invest and receive quarterly updates on your portfolio's progress.
                </p>
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Work