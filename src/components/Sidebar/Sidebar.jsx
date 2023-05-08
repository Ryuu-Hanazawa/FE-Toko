import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import styled from "styled-components";

import css from "./Sidebar.module.css";
import Avatar from "../../assets/images/login-user.png";
import User from "../../assets/images/user.svg";
//import Location from "../../assets/images/location.svg";
import Clipboard from "../../assets/images/clipboard.svg";

const Sidebar = ({ level, name }) => {
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    transition: all 0.1s;

    &:hover {
      font-weight: bold;
      color: orangered;
    }

    &:active {
      color: black;
    }

    &:focus {
      color: red;
    }
  `;

  return (
    <>
      <div className={css.MyprofileWrapper}>
        {/* Photo profile */}
        <div className={css.ProfileWrapper}>
          <img
            src={Avatar}
            className={css.ProfileImg}
            style={{ borderRadius: "50%", height: "90px", width: "90px" }}
            alt='profile'
          />
          <div className={css.ProfileInfo}>
            <p style={{ fontSize: "16px", fontWeight: "600" }}>{name}</p>
            <p style={{ fontSize: "12px" }}>
              <i className='fas fa-pen' style={{ marginRight: "5px" }}></i>
              Change photo profile
            </p>
          </div>
        </div>

        {/* Account control */}
        <div className={css.Wrapper}>
          {level === "seller" ? (
            <StyledLink className={css.ControlWrapper} to='/myproducts'>
              <div className={css.MyAccount}>
                <img className={css.LogoImg} src={User} alt='user' />
              </div>
              <p
                style={{
                  marginLeft: "5px",
                  marginTop: "2px",
                }}
              >
                My Products
              </p>
            </StyledLink>
          ) : (
            <>
              <StyledLink className={css.ControlWrapper} to='/account'>
                <div className={css.MyAccount}>
                  <img className={css.LogoImg} src={User} alt='user' />
                </div>
                <p
                  style={{
                    marginLeft: "5px",
                    marginTop: "2px",
                  }}
                >
                  My Account
                </p>
              </StyledLink>
              {/* <StyledLink className={css.ControlWrapper} to='/shipping'>
                <div className={css.Shipping}>
                  <img className={css.LogoImg} src={Location} alt='user' />
                </div>
                <p
                  style={{
                    marginLeft: "5px",
                    marginTop: "2px",
                  }}
                >
                  Shipping Address
                </p>
              </StyledLink> */}
            </>
          )}
          <StyledLink className={css.ControlWrapper} to='/order'>
            <div className={css.Order}>
              <img className={css.LogoImg} src={Clipboard} alt='user' />
            </div>
            <p
              style={{
                marginLeft: "5px",
                marginTop: "2px",
              }}
            >
              My order
            </p>
          </StyledLink>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLogin: state.auth.isLogin,
    token: state.auth.token,
    id: state.auth.id,
    level: state.auth.level,
    name: state.auth.name,
    email: state.auth.email,
  };
};

export default withRouter(connect(mapStateToProps)(Sidebar));
