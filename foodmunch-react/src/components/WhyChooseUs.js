import React from 'react';

const WhyChooseUs = () => {
  return (
    <div className="wcu-section pt-5 pb-5" id="wcuSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="wcu-section-heading">Why Choose Us?</h1>
            <p className="wcu-section-description">
              We use both original recipes and classic versions of famous food
              items.
            </p>
          </div>
          <div className="col-12 col-md-4">
            <div className="wcu-card p-3 mb-3">
              <img
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/food-serve.png"
                className="wcu-card-image"
                alt="Food Service"
              />
              <h1 className="wcu-card-title mt-3">Food Service</h1>
              <p className="wcu-card-description">
                Experience fine dining at the comfort of your home. All our
                orders are carefully packed and arranged to give you the nothing
                less than perfect.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="wcu-card p-3 mb-3">
              <img
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/fruits-img.png"
                className="wcu-card-image"
                alt="Fresh Food"
              />
              <h1 className="wcu-card-title mt-3">Fresh Food</h1>
              <p className="wcu-card-description">
                The Fresh Food group provides fresh-cut fruits and vegetables
                directly picked from our partner farms and farm houses so that
                you always get them tree to plate.
              </p>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <div className="wcu-card p-3 mb-3">
              <img
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/offers-img.png"
                className="wcu-card-image"
                alt="Best Offers"
              />
              <h1 className="wcu-card-title mt-3">Best Offers</h1>
              <p className="wcu-card-description">
                Food Coupons & Offers upto
                <span className="offers"> 50% OFF</span>
                and Exclusive Promo Codes on All Online Food Orders.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;