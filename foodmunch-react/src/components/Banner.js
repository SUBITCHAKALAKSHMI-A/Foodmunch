import React from 'react';

const Banner = () => {
  return (
    <div className="banner-section-bg-container d-flex justify-content-center flex-column">
      <div className="text-center">
        <h1 className="banner-heading mb-3">Get Delicious Food Anytime</h1>
        <p className="banner-caption mb-4">Eat Smart & Healthy</p>
        <button className="custom-button">View Menu</button>
        <button className="custom-outline-button">Order Now</button>
      </div>
    </div>
  );
};

export default Banner;