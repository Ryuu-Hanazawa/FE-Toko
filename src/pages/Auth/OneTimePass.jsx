import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import css from "./Auth.module.css";
import BlanjaLogo from "../../assets/images/blanja-logo.svg";

const OneTimePass = ({ auth, history, isLogin }) => {
  const url = process.env.REACT_APP_BASEURL;
  const [errorMsg, setErrorMsg] = useState("");
  const [otp, setOtp] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    axios
      .get(url + `/auth/otp/${auth.email}/${otp}`)
      .then(({ data }) => {
        setSuccess(true);
      })
      .catch((err) => {
        console.log(err.message);
        setErrorMsg("*Invalid OTP code.")
      });
  };

  if (isLogin) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      <section id={css.FormContainer}>
        <div className={css.Row}>
          <div className={css.Logo}>
            <img src={BlanjaLogo} alt='blanja logo' />
            <h1>Blanja</h1>
          </div>

          <h2>Verify OTP</h2>
          <p className='text-muted'>
            We've sent you OTP code to your email. Check your inbox.
          </p>

          <div className={css.FormSection}>
            <p className={css.ErrorMsg}>{errorMsg}</p>
            <div className={css.FillForm}>
              <div className={`${css.ColInput} ${css.FormInput}`}>
                <input
                  type='text'
                  onChange={(val) => setOtp(val.target.value)}
                  required
                />
              </div>
              <div className={`${css.Submit} ${css.FormInput}`}>
                <button
                  type='submit'
                  className={`${css.SubmitBtn} ${css.Link}`}
                  onClick={handleSubmit}
                >
                  RESET
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = ({ auth, newState, isLogin }) => {
  return {
    auth,
    newState,
    isLogin,
  };
};

export default withRouter(connect(mapStateToProps)(OneTimePass));
