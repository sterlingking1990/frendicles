import React from 'react'
import { NavLink } from 'react-router-dom'
// import store1 from '../../src/store1.jpg'
// import store2 from '../../src/store2.jpg'
// import store3 from '../../src/store3.jpg'
import pic1 from '../imageUpload/pic1.png';
import pic2 from '../imageUpload/pic2.png';
import pic3 from '../imageUpload/pic3.png';
import pic4 from '../imageUpload/pic4.png';
import pic5 from '../imageUpload/pic5.png';


const LandingPage = () => (
    <div className="landing">
        <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                <p className="banner-button"><NavLink to="/signin" exact={true}><button className="btn btn-success btn-large" id="action_button" >Begin Here </button></NavLink></p>
                    </div>
        </div>
        {/* <div className="section">
            <div className="banner">
                <div className="banner-text">
                    <div className="banner-text-flow">
                    <p>Welcome to Ofatri a platform that rewards you for every penny you spend on transactions.</p>
                    <span><strong>Make Transactions </strong></span> <strong> Get Rewarded</strong> <span><strong>Achieve Goals</strong></span>
                    <p><button className="btn-success"><NavLink to="/signin" exact={true}>Begin Here </NavLink></button></p>
                    </div>
                </div>

            </div>
            
        </div> */}
        <br/>
        <div className="fourth-body-background">
            <div className="first-body">
                <div className="first-body-items">
                    <div className="first-body-item">
                        <div className="first-note-pic">
                        </div>
                        <div className="first-note">
                            <h3>What we are doing...</h3>
                            <div>Ofatri is partnering with several businesses that rewards you everytime you make transactions.
                            Rewards range from - data top-up, airtime top-up, fuel top-up, transport fare i.e uber, gokada, brand products, trip to dubia and many more...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
       <br/>
        <div className="fourth-body-background">
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
        </div>

        <br/>
        <div className="fourth-body-background">
            <div className="how-to-gallery">
                <div className="gallery-plane">
                    <div className="row">
                        <div className="col">
                            <div className="card bg-dark">
                                <h3 className="card-title text-center text-white">Welcome to your Dashboard</h3>
                                <div className="card-body">
                                    <img src={pic1} className="card-img img-fluid img-responsive" />
                                </div>
                                <div className="card-footer">
                                    <p className="text-white text-center">Get hints on how best to win rewards and achieve goals</p>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card bg-dark mt-2">
                                <h3 className="card-title text-center text-white">Search An Offer</h3>
                                <div className="card-body">
                                    <img src={pic2} className="card-img img-fluid img-responsive" />
                                </div>
                                <div className="card-footer">
                                    <p className="text-white text-center">Enter an Offer name and Join to reveal Reward Token</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">

                            <div className="card bg-dark mt-2">
                                <h3 className="card-title text-center text-white">Get Rewarded</h3>
                                <div className="card-body">
                                    <img src={pic3} className="card-img img-fluid img-responsive" />
                                </div>
                                <div className="card-footer">
                                    <p className="text-white text-center">Make Transaction as usual from the business and get Rewarded</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card bg-dark mt-2">
                                <h3 className="card-title text-center text-white">Set Goals</h3>
                                <div className="card-body">
                                    <img src={pic4} className="card-img img-fluid img-responsive" />
                                </div>
                                <div className="card-footer">
                                    <p className="text-white text-center">Maybe you dont want to Redeem the Rewards, you can set Goals and your Rewards will accumulate to help you reach the Goals</p>
                                </div>
                            </div>
                        </div>

                        <div className="col">
                            <div className="card bg-dark mt-2">
                                <h3 className="card-title text-center text-white">Check Milestone</h3>
                                <div className="card-body">
                                    <img src={pic5} className="card-img img-fluid img-responsive" />
                                </div>
                                <div className="card-footer">
                                    <p className="text-white text-center">See how close you are to achieving your Goals</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <br/>
        <div className="fourth-body-background">
            <div className="fourth-body-background-flow">
                <div className="fourth-body">
                    <div className="fourth-body-headline">
                        <h3>Ofatri Business</h3>
                    </div>
                    <div className="fourth-body-text">
                        <ul>
                            <li>Do you run a business?</li>
                            <li>Willing to use Ofatri to Promote your product or Services Offer?</li>
                            <li>Want to manage and plan Rewards and Goals for your Customers?</li>
                        </ul>
                        <div>Then get your business listed on Ofatri</div>
                    </div>
                    <div className="fourth-body-button">
                        <button id="contact-ofatri"><a href="https://forms.gle/BP4iTq6nFZfqdjxc6">Contact Ofatri Now!!!</a></button>
                    </div>
                </div>

            </div>
        </div>

        <br/>
        <div className="second-body-background">
            <div className="second-body-background-flow">
                <div className="second-body">
                    <div className="second-body-text1">
                        <h3 className="text-white text-center">More for your Business...</h3>
                    </div>
                    <div className="second-body-pic1">
                        <div className="offers">
                            <div>
                                <h4>Dedicated Rewards Manager</h4>
                                <p className="text-center text-white">Ofatri assigns a human dedicated Reward and Goal Manger who helps set up and manages every activity for you while you concentrate on your business</p>
                            </div>
                            <div>
                                <h4>Customer Analytics</h4>
                                <p className="text-center text-white">Your manager helps contact customers when they Join your Offer even before making transaction, a way to strengthen your brand</p>
                            </div>
                            <div><h4>Social Media Integration</h4>
                                <p className="text-center text-white">Ofatri Integrates your social media so that your customers can view more pictures or videos of your products; This is optional</p>
                            </div>

                            <div><h4>Free Consultation</h4>
                                <p className="text-center text-white">You can relate with Ofatri about what kinds of Rewards or Goals best excite your Customers, and other matters</p></div>

                            <div><h4>Seamless Outsource</h4>
                                <p className="text-center text-white">We understand you might be busy, Ofatri can help treat your customers to their Goals. Be it- Fun Vacation, Photoshoot session, Dinner etc, Just to make your Customer Happy</p>
                            </div>
                        </div>
                    </div>
                    <div className="second-body-text2">
                        <p>And Much More...</p>
                    </div>
                </div>

            </div>

        </div>


      
        
        {/* <div className="fifth-body">
            <div className="fifth-body-headline">
                <h3>Businesses Using Ofatri</h3>
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
        </div> */}

        <br/>
        <div className="sixth-body">
            <div className="sixth-body-items">
                <div className="sixth-body-contacts">
                    <div className="sixth-body-address">
                        <div>Head Office: Block ID Area 8 Opic Estate Agbara, Ogun State</div>
                    </div>
                    <br/>
                    <div className="sixth-body-socials">
                        <div><i className="fa fa-instagram"></i>&nbsp; &nbsp;<i className="fa fa-twitter"></i>&nbsp; &nbsp; <i className="fa fa-phone"></i> &nbsp; &nbsp; <i className="fa fa-envelope-open-o"></i> </div>
                    </div>
                    <br/>
                    <div className="work-with">
                        <a href="https://forms.gle/L7DiqXXGXSrhNPqVA"><div><i className="fa fa-briefcase"></i>&nbsp;&nbsp;become Ofatri business manager</div></a>
                    </div>
                </div>
            </div>
            
            <div className="sixth-body-copy">
                <div><i className="fa fa-copyright"></i>ofatri 2020</div>
            </div>
        </div>
    </div>

)



export default LandingPage