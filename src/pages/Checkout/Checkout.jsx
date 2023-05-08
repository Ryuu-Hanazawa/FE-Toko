import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Navbar from "../../components/Navbar/Navbar";

import css from "./Checkout.module.css";

const Checkout = ({ location, cart, history }) => {
  const [payment, setPayment] = useState("");
  const { data } = location;
  const id = useSelector((state) => state.auth.id);

  const postTransaction = () => {
    const info = {
      user_id: id,
      // eslint-disable-next-line no-use-before-define
      qty: data !== undefined ? data[1] : null,
      // eslint-disable-next-line no-use-before-define
      price: data !== undefined ? data[0] : null,
      payment: payment,
    };
    axios
      .post(process.env.REACT_APP_BASEURL + "/history", info)
      .then((res) => {
        console.log("Checkout info,", res);
      })
      .catch((err) => console.log(err));
  };

  const submit = () => {
    confirmAlert({
      title: "Confirm to proceed",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            postTransaction();
            history.push("/");
          },
        },
        {
          label: "No",
          onClick: () => alert("Click No"),
        },
      ],
    });
  };

  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <Navbar />
      <div className='container'>
        <h1 style={{ marginTop: "20px" }}>Checkout</h1>
        <div className={css.Wrapper}>
          <div className={css.BagWrapper}>
            {cart.map((item) => {
              let imgSplit = item.image.split(",");
              let img = imgSplit;
              return (
                <div className={css.CheckoutWrapper}>
                  <div className={css.ProductInfo}>
                    <img
                      className={css.ProductImg}
                      src={process.env.REACT_APP_BASEURL + img[0]}
                      alt='sample'
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <p style={{ fontSize: "16px", fontWeight: "bold" }}>
                        {item.productName}
                      </p>
                      <p
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          color: "#D1D0CE",
                        }}
                      >
                        {item.productBrand}
                      </p>
                    </div>
                  </div>
                  <div className={css.TotalPrice}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#D1D0CE",
                      }}
                    >
                      Rp {toPrice(item.price)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={css.SummaryCard}>
            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              Shopping Summary
            </p>
            <div className={css.TotalPrice}>
              <p>Order</p>
              <p>Rp. {data !== undefined ? toPrice(data[0]) : null}</p>
            </div>
            <div className='accordion' id='accordionExample'>
              <div className='accordion-item'>
                <h2 className='accordion-header' id='headingOne'>
                  <button
                    className='accordion-button'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#collapseOne'
                    aria-expanded='true'
                    aria-controls='collapseOne'
                  >
                    Select payments method
                  </button>
                </h2>
                <div
                  id='collapseOne'
                  className='accordion-collapse collapse show'
                  aria-labelledby='headingOne'
                  data-bs-parent='#accordionExample'
                >
                  <div className='accordion-body'>
                    <div className={css.PaymentList}>
                      <div className={css.PaymentWrapper}>
                        <div className={css.Payment}>
                          <div className={css.PaymentLogo}>
                            <i class='fab fa-cc-paypal'></i>
                          </div>
                        </div>
                        <p style={{ margin: "10px 0px 0px 5px" }}>Paypal</p>
                      </div>
                      <input
                        className={`form-check-input ${css.FormCheck}`}
                        type='radio'
                        name='flexRadioDefault'
                        id='flexRadioDefault1'
                        onClick={() => setPayment("Paypal")}
                      />
                    </div>
                    {/* <div className={css.PaymentList}>
                      <div className={css.PaymentWrapper}>
                        <div className={css.Payment}>
                          <div className={css.PaymentLogo}>
                            <i class='fab fa-cc-mastercard'></i>
                          </div>
                        </div>
                        <p style={{ margin: "10px 0px 0px 5px" }}>Mastercard</p>
                      </div>
                      <input
                        className={`form-check-input ${css.FormCheck}`}
                        type='radio'
                        name='flexRadioDefault'
                        id='flexRadioDefault1'
                        onClick={() => setPayment("Mastercard")}
                      />
                    </div> */}
                    {/* <div className={css.PaymentList}>
                      <div className={css.PaymentWrapper}>
                        <div className={css.Payment}>
                          <div className={css.PaymentLogo}>
                            <i class='fab fa-cc-apple-pay'></i>
                          </div>
                        </div>
                        <p style={{ margin: "10px 0px 0px 5px" }}>Apple Pay</p>
                      </div>
                      <input
                        className={`form-check-input ${css.FormCheck}`}
                        type='radio'
                        name='flexRadioDefault'
                        id='flexRadioDefault1'
                        onClick={() => setPayment("Apple pay")}
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <hr className={css.Divider} />
            <button
              onClick={submit}
              type='button'
              className={`btn btn-primary ${css.BuyBtn}`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
  };
};

export default withRouter(connect(mapStateToProps)(Checkout));
