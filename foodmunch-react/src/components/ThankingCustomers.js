import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ThankingCustomers = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="thanking-customers-section pt-5 pb-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-7 d-flex flex-column justify-content-center">
            <h1 className="thanking-customers-section-heading">
              Thank you for being a valuable customer to us.
            </h1>
            <p className="thanking-customers-section-description">
              We have a surprise gift for you
            </p>
            <div className="d-md-none">
              <img
                src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/thanking-customers-section-img.png"
                className="thanking-customers-section-img"
                alt="Thanking Customers"
              />
            </div>
            <div>
              <button type="button" className="custom-button" onClick={handleShow}>
                Redeem Gift
              </button>

              <Modal show={show} onHide={handleClose} className="mt-5">
                <Modal.Header closeButton>
                  <Modal.Title className="thanking-customers-section-modal-title">
                    Gift Voucher
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <img
                    src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/gift-voucher-img.png"
                    className="w-100"
                    alt="Gift Voucher"
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
          <div className="col-12 col-md-5 d-none d-md-block">
            <img
              src="https://d1tgh8fmlzexmh.cloudfront.net/ccbp-responsive-website/thanking-customers-section-img.png"
              className="thanking-customers-section-img"
              alt="Thanking Customers"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankingCustomers;