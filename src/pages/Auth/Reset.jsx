import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";

import css from "./Auth.module.css";
import BlanjaLogo from "../../assets/images/blanja-logo.svg";

const Reset = ({ auth, history, isLogin }) => {
  const url = process.env.REACT_APP_BASEURL;
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (password !== confirmPass) {
      setErrorMsg("*Make sure you type same password.");
    } else {
      const data = {
        email: auth.email,
        newPassword: password
      }
      axios
      .patch(url + `/auth/reset`, data)
      .then(({data}) => {
        setSuccess(true);
        history.push("/login");
      })
      .catch((err) => {
        console.log(err.message);
      })
    }
  }

  if (isLogin) {
    return <Redirect to='/' />;
  }

  return (
    <section id={css.FormContainer}>
      <div className={css.Row}>
        <div className={css.Logo}>
          <img src={BlanjaLogo} alt='blanja logo' />
          <h1>Blanja</h1>
        </div>

        <h2>Reset password</h2>

        <div className={css.FormSection}>
          <p className={css.ErrorMsg}>{errorMsg}</p>
          <div className={css.FillForm}>
            <div className={`${css.ColInput} ${css.FormInput}`}>
              <input
                type='password'
                id='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={`${css.ColInput} ${css.FormInput}`}>
              <input
                type='password'
                id='new-password'
                placeholder='Confirm password'
                onChange={(e) => setConfirmPass(e.target.value)}
                required
              />
            </div>
            <div className={`${css.Submit} ${css.FormInput}`}>
              <button
                type='submit'
                className={`${css.SubmitBtn} ${css.Link}`}
                onClick={handleSubmit}
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const mapStateToProps = ({ auth, newState, isLogin }) => {
  return {
    auth,
    newState,
    isLogin,
  };
};

export default withRouter(connect(mapStateToProps)(Reset));
