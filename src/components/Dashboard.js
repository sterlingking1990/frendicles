import React from 'react'
import store1 from '../../src/store1.jpg'
import store2 from '../../src/store2.jpg'
import store3 from '../../src/store3.jpg'
import { withFirebase } from '../firebase';



class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.state={username:''}
    }

    componentDidMount(){
        this.props.firebase.auth.onAuthStateChanged(authUser=>{
            this.props.firebase.users().on('value',snapShot=>{
                const userObj=snapShot.val()
                if(userObj){
                    const userArr=Object.keys(userObj).map(key=>({
                        ...userObj[key],uid:key
                    }))
                    const user_rec=userArr.filter(user=>user.uid===authUser.uid)
                    const username=user_rec[0].username;
                    this.setState({username:username})
                }

            })

        })
    }


    render(){
        const {username}=this.state;
        return(
                    <div>
                <div className="banner-body-background">
                    <div className="banner-body-text1">
                        <span className="logo-name" id="app-name">ofatri</span>
                        <div className="text-display text-center"><strong id="first_heading">Make Transactions </strong> &nbsp;<strong id="second_heading"> Get Rewarded</strong>&nbsp;<strong id="third_heading"> Achieve Goals</strong></div>
                        <br/>
                        <p className="text-center text-display text-center" id="welcome-text">welcome {username}</p>
                    </div>
                </div>

                        <div className="container" id="intro">
                            <div className="row mt-4">
                                <div className="col-lg-12 sm-12">
                                <p className="text-display text-center" id="about-us">About Us</p>
                                </div>
                                <div className="col">
                                    <div id="about-us-body">
                                        <div className="card bg-white">
                                            <div className="card-title">
                                                <div className="media">
                                                    <span id="app-name">ofatri</span>
                                                </div>
                                                <div className="media-body">
                                                    <p className="text-muted my-1">We are customer rewarding company, partnering with over millions of enterprise who value her customers and always says yes to every of their needs</p>
                                                    <p className="text-muted mx-3">We are on a mission of continuously increasing customer base of industries through appreciating the customers each time they complete a transaction</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-lg-12 sm-12">
                                <p className="text-display text-center" id="how-it-works">How it works</p>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card bg-white mt-2">
                                        <div className="card-image text-center">
                                            <img src={store1} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                                        </div>
                                        <div className="card-content">
                                            <p className="text-justify text-center mx-3 my-2">Join offers from collection of available offers i.e Cake4VAL,Hair4Val,Look9ce,Selfie2Kill, Drive2Rock. Offers are promotional transactions businesses are selling to you that comes with reward </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card bg-white mt-2">
                                        <div className="card-image text-center">
                                            <img src={store2} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                                        </div>
                                        <div className="card-content">
                                            <p className="text-justify text-center mx-3 my-4">Proceed to make transaction with the offer provider using your usual means. Issue the token generated when you joined the offer to the offer provider to verify and reveal your reward</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="card bg-white mt-2">
                                        <div className="card-image text-center">
                                            <img src={store3} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                                        </div>
                                        <div className="card-content">
                                            <p className="text-justify text-center mx-3 my-4">Enjoy several rewards offered by the offer provider which can range from free photoshoot, cupcakes, smallchops, free gym access, val card, data topup, paid travel and other brand product rewards</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-3">
                                <div className="col-lg-12 sm-12">
                                    <p className="text-display text-center" id="faq">
                                        Frequently Aksed Questions
                                    </p>
                                </div>

                                <div className="col-lg-12">
                                    <div id="accordion">
                                        {/* question 1 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a className="card-link" data-toggle="collapse" href="#faq1">
                                                What are Offers
                                                </a>
                                            </div>
                                            <div id="faq1" data-parent="#accordion" className="collapse show">
                                                <div className="card-body">
                                                Offers are goods or services which comes with a reward when you buy them, they can be a company or business name that offers reward when ever you buy their product or service. 
                                                For example, CakeLegend is a business name that sells cake but it is an Offer too for the business name; which means when you join this Offer and buy cakes, you get rewarded.
                                                </div>
                                            </div>
                                        </div>

                                        {/* quesiton 2 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a className="collapsed card-link" data-toggle="collapse" href="#faq2">
                                                    I know a Business Name, but I Can not find its Offer. How can I find It
                                                </a>
                                            </div>
                                            <div id="faq2" className="collapse" data-parent="#accordion"> 
                                                <div className="card-body">
                                                    When you search for a business name and didnt find it on Ofatri, you can reach us on instagram or whatsApp and tell us what product or service you need,
                                                    Ofatri Business Agent will respond with the Offer name for such service and you can continue with Joining the Offer and get rewarded after making Transaction. 
                                                    If the business needs to get listed on Ofatri, then we will be glad to list them here for free so you can buy from them as well.
                                                </div>
                                            </div>
                                        </div>

                                        {/* question 3 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a className="collapsed card-link" data-toggle="collapse" href="#faq3">
                                                    How Long Before I get Rewarded
                                                </a>
                                            </div>
                                            <div id="faq3" className="collapse" data-parent="#accordion">
                                                <div className="card-body">
                                                    As soon as you JOIN an Offer, a Reward Token is shown to you. After making Transaction and It is sent to Us by the Business for Verification, 
                                                    You will instantly get your reward and can verify this by checking on My Rewards Menu
                                                </div>
                                            </div>
                                        </div>

                                        {/* question 4 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a href="#faq4" className="collapsed card-link" data-toggle="collapse">
                                                    What if The Business didnt forward my Reward Token to Ofatri
                                                </a>
                                            </div>
                                            <div className="collapse" data-parent="#accordion" id="faq4">
                                                <div className="card-body">
                                                    First, you can ask for proof that they already sent it by letting them screenshot their conversation on whatsAPP or you ask them to send it on our IG where you can confirm for yourself that the Reward Token was successfully sent to Ofatri.
                                                    However, It is unethical for any Business that prooves to be reliable to have the intention to fraud you or bridge partnership with Ofatri. 
                                                    If there happens to be such cases, the business will be Unlisted and further sanction taken over a bridge of partnership.
                                                    That is why we are ensure to List only Businesses that we verify to be genuine and that consumers trust to be reliable.
                                                </div>
                                            </div>
                                        </div>

                                        {/* question 5 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a href="#faq5" className="collapsed card-link" data-toggle="collapse">
                                                    Do I have to Pay to Redeem my Reward
                                                </a>
                                            </div>
                                            <div className="collapse" id="faq5" data-parent="#accordion">
                                                <div className="card-body">
                                                    As businesses are reaching their goal when you make transactions with them, Ofatri wants you to reach your goals too. Hence paying to get rewarded sounds awkward. You should not pay to redeem any reward offered to you.
                                                    Ofatri is free and will always be free
                                                </div>
                                            </div>
                                        </div>

                                        {/* question 6 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a href="#faq6" className="collapsed card-link" data-toggle="collapse">
                                                    What are The Rewards Like
                                                </a>
                                            </div>
                                            <div id="faq6" className="collapse" data-parent="#accordion">
                                                <div className="card-body">
                                                    Ofatri believes that buying should be fun and rewarding. Our core is The Business and the Consumer, The Reward Coin can get you things that conform with the business brand or culture. 
                                                    However, The coins can help you achieve goals which are generic and ubiquituous so as to let you experience and enjoy what you long for with your Reward Coin.
                                                </div>
                                            </div>
                                        </div>

                                        {/* question 7 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a href="#faq7" className="collapsed card-link" data-toggle="collapse">
                                                    Can I use My Reward Coin to Achieve My Goals
                                                </a>

                                            </div>
                                            <div id="faq7" className="collapse" data-parent="#accordion">
                                                Yes!, the more you make transactions, the more Reward Coins you earn and the closer you are to Achieving your Goals
                                            </div>
                                        </div>

                                        {/* question 8 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a href="#faq8" className="collapsed card-link" data-toggle="collapse">
                                                    I like an Offer and I have bargained with the Business Owner, How Do I Pay for the Product
                                                        </a>
                                            </div>
                                            <div id="faq8" className="collapse" data-parent="#accordion">
                                                Immediately you click on Join Offer, a <strong>Make Payment</strong> check button is displayed, after bargaining with the business owner,<br />Click on the <strong>Make Payment</strong> check button then enter your payments information to make payment to the Business Owner.<br />
                                                Payments made this way earns you 2x Reward Coin than Payment made in cash to the Business Owner or direct transfer to the Business Owner.
                                                <br />
                                                However you can contact Ofatri for more details on making payment for the product after bargaining with the Business Owner
                                                    </div>
                                        </div>

                                        {/* question 9 */}
                                        <div className="card">
                                            <div className="card-header">
                                                <a href="#faq9" className="collapsed card-link" data-toggle="collapse">
                                                    I subscribed to Ofatri for my business, how do I know Customers who show Interest in My Offer
                                                </a>
                                            </div>
                                            <div id="faq9" className="collapse" data-parent="#accordion">
                                                As soon as you subscribe to Ofatri business, Ofatri assigns to you a dedicated Business Manager who manages your offer.<br/> Your Offer ID is given to you
                                                by your Business Manager.<br/> Go to offer menu and Click on Offer Analytics. <br/> provide the ID given to you by your Business Manager Then select the Date you will 
                                                like to see customers who showed Interest in your Offer.<br/>
                                                You can choose to call and follow up with them for more business engagement.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="row my-3">
                                <div className="col-lg-12 sm-12">
                                <p className="text-display text-center" id="ofatri-business">Ofatri Business</p>
                                </div>
                                {/* <div className="col-lg-6">

                                    <div className="card bg-white mt-2">
                                        <h3 className="card-title text-red text-center"><strong>Ofatri Basic</strong></h3>
                                        <div className="card-image text-center">
                                            <img src={store1} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                                        </div>
                                        <div className="card-content">
                                            <p className="text-justify text-center mx-3 my-2"><strong>Ofatri Basic</strong> is the free feature for loyal customers to get various rewards for every transactions made from any offer</p>
                                            <p className="text-justify text-center mx-3 my-4"><strong>Ofatri Basic enables you to...</strong></p>
                                            <ul id="center-basic">
                                                <li>Join Promotional Offers</li>
                                                <li>Get Rewarded</li>
                                            </ul>
                                            <div className="form-group" id="btn-basic-plan">
                                                <button className="form-control btn-success btn-lg text-center">SUBSCRIBE THIS OFFER</button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                          
                                <div className="col">
                                    <div className="card bg-white mt-2">
                                        <h3 className="card-title text-red text-center"><strong>Getting Listed on Ofatri</strong></h3>
                                        <div className="card-image text-center">
                                            <img src={store3} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                                        </div>
                                        <div className="card-content">
                                            <p className="text-justify text-center mx-3 my-4"><strong>Ofatri Business</strong> will provide your business with a dedicated Ofatri business manager who will handle everything relating to</p>
                                            <ul>
                                                <li>Getting you new customers at higher rate</li>
                                                <li>Increasing your customer to product purchases</li>
                                                <li>Increasing your business revenue</li>
                                                <li>Provide your business with Analytics of customers who show interest on your product Offer</li>
                                            </ul>
                                            <p className="text-justify text-center mx-3 my-4"><strong>To get listed, ensure you...</strong></p>
                                            <ul>
                                                <li>Have an Instagram account for your business</li>
                                                <li>At least 20 pics of product or service in your Instagram business account </li>
                                                <li>Can allow your customers pay online using trusted payment gateway i.e paystack</li>
                                            </ul>
                                            <p className="text-justify text-center mx-3 my-4"><strong>Click on subscribe now and a business manager will contact you...</strong></p>
                                            <div className="form-group">
                                        <button className="form-control btn-success btn-lg text-center"><a href="https://forms.gle/BP4iTq6nFZfqdjxc6">SUBSCRIBE NOW</a></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
           
        )
    }
}



export default withFirebase(Dashboard)