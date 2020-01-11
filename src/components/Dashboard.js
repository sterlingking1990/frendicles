import React from 'react'
import store1 from '../../src/store1.jpg'
import store2 from '../../src/store2.jpg'
import store3 from '../../src/store3.jpg'

const Dashboard = () => (
    <div>
    <div id="bg-img"></div>
        <div className="container" id="intro">
            <div className="row">
                <div className="col-lg-12 sm-12">
                    <p className="text-display display-4 text-center bg-light">How it works!</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    <div className="card bg-white mt-2">
                        <div className="card-image text-center">
                            <img src={store1} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center"/>
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
                                <p className="text-justify text-center mx-3 my-4">Proceed to make transaction with the offer provider using your usual means i.e instragram, phone call etc. After the transaction, Issue the token generated when you joined the offer to the offer provider to verify and reveal your reward</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="card bg-white mt-2">
                            <div className="card-image text-center">
                                <img src={store3} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                            </div>
                            <div className="card-content">
                                <p className="text-justify text-center mx-3 my-4">Enjoy several rewards offered by the offer provider which can range from free photoshoot, cupcakes, smallchops, free gym access, val card, data topup, paid travel to beautiful locations within and across africa and many more</p>
                            </div>
                        </div>
                    </div>

            </div>
            <div className="row mt-4">
                <div className="col-lg-12 sm-12">
                    <p className="text-display display-4 text-center bg-light text-success">About Us</p>
                </div>
                <div className="col">
                    <div id="about-us">
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
                    <p className="text-display display-4 text-center bg-light">Ofatri Plans</p>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4">
                    
                    <div className="card bg-white mt-2">
                        <h3 className="card-title text-red text-center"><strong>Ofatri Basic</strong></h3>
                        <div className="card-image text-center">
                            <img src={store1} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                        </div>
                        <div className="card-content">
                            <p className="text-justify text-center mx-3 my-2"><strong>Ofatri Basic</strong> is the free feature for loyal customers to get various rewards for every transactions they make from their customer/seller or service provider </p>
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
                </div>
                <div className="col-lg-4">
                    <div className="card bg-white mt-2">
                        <h3 className="card-title text-red text-center"><strong>Ofatri Standard</strong></h3>
                        <div className="card-image text-center">
                            <img src={store2} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                        </div>
                        <div className="card-content">
                            <p className="text-justify text-center mx-3 my-2"><strong>Ofatri Standard</strong> This is the businesses feature. It enables businesses to create promotional offers that rewards their loyal customers for the goods or service sold to them </p>
                            <p className="text-justify text-center mx-3 my-4"><strong>Businesses can...</strong></p>
                            <ul id="center-standard">
                                <li>Ofatri Basic Features</li>
                                <li>Create Promotional Offer</li>
                                <li>Accept Transactions</li>
                                <li>Set Offer Limit and Fun Reward Types</li>
                            </ul>
                            <div className="form-group" id="btn-standard-plan">
                                <button className="form-control btn-success btn-lg text-center">SUBSCRIBE THIS OFFER</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card bg-white mt-2">
                        <h3 className="card-title text-red text-center"><strong>Ofatri TreatMeNice</strong></h3>
                        <div className="card-image text-center">
                            <img src={store3} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                        </div>
                        <div className="card-content">
                            <p className="text-justify text-center mx-3 my-4"><strong>Ofatri TreatMeNice</strong> With Ofatri TreatMeNice Feature, we handle everything about taking care of appreciating your special and loyal customers while you concentrate on your business of selling to them.</p>
                            <p className="text-justify text-center mx-3 my-4"><strong>With TreatMeNice, we...</strong></p>
                            <ul>
                                <li>Manage your Promotional Offer account</li>
                                <li>Relate with your customers about your brand</li>
                                <li>Create Promotional Offers that conforms with your brand</li>
                                <li>Accept Transactions on your behalf</li>
                                <li>Handle Customer Rewarding and Special Care on your behalf</li>
                            </ul>
                            <div className="form-group">
                                <button className="form-control btn-success btn-lg text-center">SUBSCRIBE THIS OFFER</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
)



export default Dashboard