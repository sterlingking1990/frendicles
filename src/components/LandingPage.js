import React from 'react'
import store1 from '../../src/store1.jpg'
import store2 from '../../src/store2.jpg'
import store3 from '../../src/store3.jpg'

const LandingPage = () => (
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
                            <img src={store1} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                        </div>
                        <div className="card-content">
                            <p className="text-justify text-center mx-3 my-2">select a hook from collection of our available hooks. Hooks are transactions you want to carry out </p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card bg-white mt-2">
                        <div className="card-image text-center">
                            <img src={store2} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                        </div>
                        <div className="card-content">
                            <p className="text-justify text-center mx-3 my-4">Visit the store and make sure to complete the intended transaction. Ensure your token is marked after transaction</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card bg-white mt-2">
                        <div className="card-image text-center">
                            <img src={store3} width="200px" height="200px" alt="item1" className="img-fluid img-responsive img-center" />
                        </div>
                        <div className="card-content">
                            <p className="text-justify text-center mx-3 my-4">Get cash and other friendibees when you complete the transaction</p>
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
                                    <span id="app-name">friendicle</span>
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
        </div>
    </div>
)



export default LandingPage