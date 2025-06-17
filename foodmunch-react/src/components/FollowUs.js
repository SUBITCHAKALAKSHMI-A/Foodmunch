import React from 'react';

const FollowUs = () => {
  return (
    <div className="follow-us-section pt-5 pb-5" id="followUsSection">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="follow-us-section-heading">Follow Us</h1>
          </div>
          <div className="col-12">
            <div className="d-flex flex-row justify-content-center">
              <div className="follow-us-icon-container">
                <div className="social-icon-bg linkedin-bg">
                  <a href="https://www.linkedin.com/" className="social-icon-link">
                    <i className="fa fa-linkedin"></i>
                  </a>
                </div>
              </div>
              <div className="follow-us-icon-container">
                <div className="social-icon-bg instagram-bg">
                  <a href="https://www.instagram.com/" className="social-icon-link">
                    <i className="fa fa-instagram"></i>
                  </a>
                </div>
              </div>
              <div className="follow-us-icon-container">
                <div className="social-icon-bg facebook-bg">
                  <a href="https://www.facebook.com/" className="social-icon-link">
                    <i className="fa fa-facebook"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowUs;