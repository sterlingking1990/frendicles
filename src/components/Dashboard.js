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
                    const user_rec=userArr?userArr.filter(user=>user.uid===authUser.uid):[]
                    const username=user_rec?user_rec[0].username:'';
                    this.setState({username:username})
                }

            })

        })
    }


    render(){
        const {username}=this.state;
        return (
          <div>
            <div className="banner-body-background">
              <div className="banner-body-text1">
                <span className="logo-name" id="app-name">
                  ofatri
                </span>
                <div className="text-display text-center">
                  <strong id="first_heading">Make Transactions </strong> &nbsp;
                  <strong id="second_heading"> Get Rewarded</strong>&nbsp;
                  <strong id="third_heading"> Achieve Goals</strong>
                </div>
                <br />
                <p
                  className="text-center text-display text-center"
                  id="welcome-text"
                >
                  welcome {username}
                </p>
              </div>
            </div>

            <div className="container" id="intro">
              <div className="row mt-4">
                <div className="col-lg-12 sm-12">
                  <p className="text-display text-center" id="about-us">
                    About Us
                  </p>
                </div>
                <div className="col">
                  <div id="about-us-body">
                    <div className="card bg-white">
                      <div className="card-title">
                        <div className="media">
                          <span id="app-name">ofatri</span>
                        </div>
                        <div className="media-body">
                          <p className="text-muted my-1">
                            We are customer rewarding company, partnering with
                            over millions of enterprise who value her customers
                            and always says yes to every of their needs
                          </p>
                          <p className="text-muted mx-3">
                            We are on a mission of continuously increasing
                            customer base of industries through appreciating the
                            customers each time they complete a transaction
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-lg-12 sm-12">
                  <p className="text-display text-center" id="how-it-works">
                    How it works
                  </p>
                </div>
                <div className="col-lg-4">
                  <div className="card bg-white mt-2">
                    <div className="card-image text-center">
                      <img
                        src={store1}
                        width="200px"
                        height="200px"
                        alt="item1"
                        className="img-fluid img-responsive img-center"
                      />
                    </div>
                    <div className="card-content">
                      <p className="text-justify text-center mx-3 my-2">
                        Join offers from collection of available offers i.e
                        Cake4VAL,Hair4Val,Look9ce,Selfie2Kill, Drive2Rock.
                        Offers are promotional transactions businesses are
                        selling to you that comes with reward{" "}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card bg-white mt-2">
                    <div className="card-image text-center">
                      <img
                        src={store2}
                        width="200px"
                        height="200px"
                        alt="item1"
                        className="img-fluid img-responsive img-center"
                      />
                    </div>
                    <div className="card-content">
                      <p className="text-justify text-center mx-3 my-4">
                        Proceed to make transaction with the offer provider
                        using your usual means. Issue the token generated when
                        you joined the offer to the offer provider to verify and
                        reveal your reward
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="card bg-white mt-2">
                    <div className="card-image text-center">
                      <img
                        src={store3}
                        width="200px"
                        height="200px"
                        alt="item1"
                        className="img-fluid img-responsive img-center"
                      />
                    </div>
                    <div className="card-content">
                      <p className="text-justify text-center mx-3 my-4">
                        Enjoy several rewards offered by the offer provider
                        which can range from free photoshoot, cupcakes,
                        smallchops, free gym access, val card, data topup, paid
                        travel and other brand product rewards
                      </p>
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
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          className="card-link"
                          data-toggle="collapse"
                          href="#faq1"
                        >
                          What Service is Ofatri known for?
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq1"
                        data-parent="#accordion"
                        className="collapse show"
                      >
                        <div itemprop="text" className="card-body">
                          When marketers or sellers wish to promote or sell
                          their quality products in addition reward customers
                          who buy those products, they use the Ofatri platform
                          to do so. <a href="http://ofatri.com/#/">Ofatri</a>
                          gives marketers and sellers Innovative means of
                          promoting and selling with the intention of rewarding
                          customers
                        </div>
                      </div>
                    </div>

                    {/* quesiton 2 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          className="collapsed card-link"
                          data-toggle="collapse"
                          href="#faq2"
                        >
                          What is the mantra of Ofatri?
                        </a>
                      </div>
                      <div itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq2"
                        className="collapse"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          Ofatri's mantra is simple- Make Transactions, Get
                          Rewarded, Achieve Goals.
                        </div>
                      </div>
                    </div>

                    {/* question 3 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          className="collapsed card-link"
                          data-toggle="collapse"
                          href="#faq3"
                        >
                          How does Ofatri Reward Customers?
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq3"
                        className="collapse"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          <ul>
                            <li>
                              The first thing you want to do is
                              <a href="http://ofatri.com/#/signup">Sign up</a>
                            </li>
                            <li>
                              Then Click on the <strong>Join Offer</strong> Menu
                            </li>
                            <li>
                              Search for an Offer by the
                              <strong>Marketers Name</strong> or Just
                              <strong>Scroll</strong> to see products you like
                              to buy
                            </li>
                            <li>Join that Offer to reveal your reward Token</li>
                            <li>
                              Make payment by clicking on the Payment Link in
                              the Offer's description or Call the number on the
                              Offer for guidance
                            </li>
                            <li>
                              After payment and your product delivered, You get
                              rewarded
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* question 4 */}
                    {/* <div className="card">
                                            <div className="card-header">
                                                <a href="#faq4" className="collapsed card-link" data-toggle="collapse">
                                                    What if The Business didnt forward my Reward Token to Ofatri
                                                </a>
                                            </div>
                                            <div className="collapse" data-parent="#accordion" id="faq4">
                                                <div className="card-body">
                                                    It is unethical for any Business that prooves to be reliable to have the intention to fraud you or bridge partnership with Ofatri. 
                                                    If there happens to be such cases, the business will be Unlisted and further sanction taken over a bridge of partnership.
                                                    That is why we are ensure to List only Businesses that we verify to be genuine and that consumers trust to be reliable.
                                                </div>
                                            </div>
                                        </div> */}

                    {/* question 5 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          href="#faq5"
                          className="collapsed card-link"
                          data-toggle="collapse"
                        >
                          What kinds of Rewards does Ofatri gives customers who
                          make transactions from the platform?
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        className="collapse"
                        id="faq5"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          The Ofatri coins rewarded to customers help them get
                          other exciting products for free; we call these
                          products goals in Ofatri i.e food, electronics, luxury
                          and so much more.
                        </div>
                      </div>
                    </div>

                    {/* question 6 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          href="#faq6"
                          className="collapsed card-link"
                          data-toggle="collapse"
                        >
                          Can I choose the goals I will like to Track as I make
                          transactions and get rewarded?
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq6"
                        className="collapse"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          The platform enables you to decide among the numerous
                          exciting goals from any marketer or seller in the
                          platform, which ones you will like to track- you can
                          even track all at any time
                        </div>
                      </div>
                    </div>

                    {/* question 7 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          href="#faq7"
                          className="collapsed card-link"
                          data-toggle="collapse"
                        >
                          How do I redeem my goals when they are due?
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq7"
                        className="collapse"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          When your goals are due for redeeming, you get a
                          notification mail or you check your Milestone menu to
                          see whether the goals have a congratulation status.{" "}
                          <p>
                            {" "}
                            If so, you can call the marketers number or the
                            seller from where you have bought from in order to
                            direct you how to go about picking up the item from
                            the stores available
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* question 8 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          href="#faq8"
                          className="collapsed card-link"
                          data-toggle="collapse"
                        >
                          How about refund, supposing my products is not
                          delivered to me?
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq8"
                        className="collapse"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          We often make sure that every customer is treated very
                          urgent and important. However, if by any
                          uncontrollable situation you were not able to get your
                          ordered product, we ensure a deliver within 3 days.
                        </div>
                      </div>
                    </div>

                    {/* question 9 */}
                    <div
                      itemscope
                      itemprop="mainEntity"
                      itemtype="https://schema.org/Question"
                      className="card"
                    >
                      <div itemprop="name" className="card-header">
                        <a
                          href="#faq9"
                          className="collapsed card-link"
                          data-toggle="collapse"
                        >
                          I own a Business, I would love Ofatri to List My
                          Business so I can Reward my Customers
                        </a>
                      </div>
                      <div
                        itemscope
                        itemprop="acceptedAnswer"
                        itemtype="https://schema.org/Answer"
                        id="faq9"
                        className="collapse"
                        data-parent="#accordion"
                      >
                        <div itemprop="text" className="card-body">
                          It has been proved that Rewarding Customers help you
                          gain new customers in a more cheaper way and Increase
                          your sales.
                          <br />
                          <a href="https://wa.me/2348060456301?text=I'm%20interested%20in%20ofatri%20and%20want%20my%20business%20listed">
                            contact
                          </a>
                          Ofatri or send a mail to
                          <i>izundukingsleyemeka@gmail.com</i> to get Your
                          Business Listed as well as an assigned Reward Manager
                          <br /> Your Manager helps plan everything, while you
                          focus on your business
                          <br />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row my-3">
                <div className="col-lg-12 sm-12">
                  <p className="text-display text-center" id="ofatri-business">
                    Ofatri Business
                  </p>
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
                    <h3 className="card-title text-red text-center">
                      <strong>Getting Listed on Ofatri</strong>
                    </h3>
                    <div className="card-image text-center">
                      <img
                        src={store3}
                        width="200px"
                        height="200px"
                        alt="item1"
                        className="img-fluid img-responsive img-center"
                      />
                    </div>
                    <div className="card-content">
                      <p className="text-justify text-center mx-3 my-4">
                        <strong>Ofatri Business</strong> will offer you the
                        following features when you get listed
                      </p>
                      <ul>
                        <li>
                          Dedicated Rewaard Manager- A customer friendly and
                          passionate Ofatri Reward Manager
                        </li>
                        <li>
                          Customer Notifications- When Your Promotional Offer is
                          Created and Rewards given to Your Customers
                        </li>
                        <li>
                          Consultation- Relate with Our Expert on Rewarding for
                          Business Growth
                        </li>
                        <li>
                          Wider Coverage- Promoting your Offer across our social
                          platforms
                        </li>
                      </ul>
                      <p className="text-justify text-center mx-3 my-4">
                        <strong>
                          either of the following features are integrated on
                          Upgrade
                        </strong>
                      </p>
                      <ul>
                        <li>
                          Your Instagram Pictures- To let users see latest pics
                          of your products
                        </li>
                        <li>
                          Your Youtube Videos- Are you also making youtube
                          videos of your products, Upgrade to get this feature
                          on your Promotional Offer
                        </li>
                        <li>
                          Ofatri Designer- Use our Designers to get Stunning
                          Promotional Offer Cover
                        </li>
                      </ul>
                      <p className="text-justify text-center mx-3 my-4">
                        <strong>
                          Click on subscribe now and a business manager will
                          contact you...
                        </strong>
                      </p>
                      <div className="form-group">
                        <button className="form-control btn-success btn-lg text-center">
                          <a href="https://forms.gle/BP4iTq6nFZfqdjxc6">
                            SUBSCRIBE NOW
                          </a>
                        </button>
                      </div>
                      <br />
                      <div className="form-group">
                        <button className="form-control btn-success btn-lg text-center">
                          <a
                            className="text-white"
                            href="https://wa.me/2348060456301?text=I%20am%20interested%20in%20upgrading%20to%20add%20my%20instagram%20and%20YouTube%20on%20my%20offer"
                          >
                            WhatsApp Instead
                          </a>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
}



export default withFirebase(Dashboard)