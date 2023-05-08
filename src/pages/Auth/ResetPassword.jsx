import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setEmail } from "../../redux/action/authAction";
import { Link, withRouter, Redirect } from "react-router-dom";

import css from "./Auth.module.css";
import BlanjaLogo from "../../assets/images/blanja-logo.svg";

const ResetPassword = ({ setEmail, history, isLogin }) => {
  const [email, takeEmail] = useState("");

  const handleSubmit = () => {
    const data = {
      email: email,
    };
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/forgot`, data)
      .then(({ data }) => {
        console.log(data);
        setEmail(email);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
          <form className={css.FillForm}>
            <div className={`${css.ColInput} ${css.FormInput}`}>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Email'
                onChange={(val) => takeEmail(val.target.value)}
                required
              />
            </div>
            <div className={`${css.Submit} ${css.FormInput}`}>
              <button
                type='submit'
                className={`${css.SubmitBtn} ${css.Link}`}
                onClick={() => {
                  handleSubmit();
                  history.push("/otp");
                }}
              >
                CONFIRM
              </button>
            </div>
          </form>
        </div>
        <p className={css.Text}>
          Don't have a Blanja account?{" "}
          <Link className={`${css.Link}`} to='/register'>
            Register
          </Link>
        </p>
      </div>
    </section>
  );
};

const mapStateToProps = ({ auth, newState, isLogin }) => {
  return {
    auth,
    newState,
    isLogin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setEmail: (email) => dispatch(setEmail(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
