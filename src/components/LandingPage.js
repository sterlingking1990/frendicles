import React from 'react'
import { NavLink } from 'react-router-dom'
// import store1 from '../../src/store1.jpg'
// import store2 from '../../src/store2.jpg'
// import store3 from '../../src/store3.jpg'

const LandingPage = () => (
    <div className="landing">
        <div className="section">
            <div className="banner">

            </div>
            <div className="banner-text">
                <p>Welcome to Ofatri a platform that rewards you for every penny you spend on transactions.</p>
                <span><strong>Make Transactions </strong></span> <strong> Get Rewarded</strong> <span><strong>Achieve Goals</strong></span>
                <p><button id="begin-here"><NavLink to="/signin" exact={true}>Begin Here </NavLink></button></p>
            </div>
        </div>

        <div className="first-body">
            <div className="first-body-items">
                <div className="first-body-item">
                    <div className="first-note-pic">
                    </div>
                    <div className="first-note">
                        <h3>What we are doing...</h3>
                        <div>Ofatri is partnering with several businesses so as to reward you everytime you make transactions with them.
                        Rewards range from - data top-up, airtime top-up, fuel top-up, transport fare i.e uber, gokada, brand products, trip to dubia and many more...</div>
                    </div>
                </div>
            </div>
        </div>

        <div className="second-body">
            <div className="second-body-text1">
                <h3>During this festives...</h3>
                <p>Here are several offers that comes with rewards</p>
            </div>
            <div className="second-body-pic1">
                <div className="offers">
                    <div>Cake4Val</div>
                    <div>DressNRock</div>
                    <div>KingsRide</div>
                    <div>OwnALand</div>
                    <div>Shop4Val</div>
                </div>
            </div>
            <div className="second-body-text2">
                <p>And Much More...</p>
            </div>
        </div>

        <div className="third-body">
            <div className="third-body-text1">
                <h3>How to get Rewards</h3>
            </div>
            <div className="reward-image"></div>
            <div className="third-body-step">
                <div className="steps">
                    <div className="step"><span>1</span></div>
                    <div className="step-headline">
                        Search an Offer
                    </div>
                    <div className="step-description">
                        After SignUp, Login and search for an Offer i.e Cake4Val 
                    </div>
                </div>
            </div>

            <div className="third-body-step">
                <div className="steps">
                    <div className="step">2</div>
                    <div className="step-headline">
                        Join the Offer
                    </div>
                    <div className="step-description">
                        Click 'Join Offer' to reveal your personal reward token
                    </div>
                </div>
            </div>
            <div className="third-body-step">
                <div className="steps">
                    <div className="step">3</div>
                    <div className="step-headline">
                        Get Rewarded
                    </div>
                    <div className="step-description">
                        After making transaction with the business contact, your reward token is used to reward you
                    </div>
                </div>
            </div>

            <div className="third-body-text2">
                Its That Simple...
            </div>
        </div>

        <div className="fourth-body">
            <div className="fourth-body-headline">
                <h3>Ofatri Business Plan</h3>
            </div>
            <div className="fourth-body-text">
                <ul>
                <li>Do you run a business?</li>
                <li>Are you on Instagram?</li>
                <li>Do you have at least 60 Insta pics of your product or service?</li>
                </ul>
                <div>Then your business have what it takes to get listed on Ofatri</div>
            </div>
            <div className="fourth-body-button">
                <button id="contact-ofatri"><a href="https://forms.gle/BP4iTq6nFZfqdjxc6">Contact Ofatri Now!!!</a></button>
            </div>
        </div>
        
        <div className="fifth-body">
            <div className="fifth-body-headline">
                <h3>Business Using Ofatri</h3>
            </div>
            <div className="fifth-body-text">
                <div className="fifth-body-logo">
                    <div>CakeLegend</div>
                    <div>Tricia Kitchen</div>
                    <div>SabiiDress</div>
                    <div>HotPot</div>
                    <div>RosySky</div>
                </div>
            </div>
            <div className="fifth-body-more">
                And Many more
            </div>
        </div>

        <div className="sixth-body">
            <div className="sixth-body-items">
                <div className="sixth-body-contacts">
                    <div className="sixth-body-address">
                        <div>Head Office: Block ID Area 8 Opic Estate Agbara, Ogun State</div>
                        <div>Phone Number: 08060456301</div>
                        <div>Email:ofatri@gmail.com</div>
                        <div><span>f</span><span>i</span><span>t</span></div>
                    </div>
                    <div className="sixth-body-socials">
                            <div>work with ofatri</div>
                    </div>
                </div>
            </div>
            
            <div className="sixth-body-copy">
                <div>copyright (c) ofatri 2020</div>
            </div>
        </div>
    </div>

)



export default LandingPage