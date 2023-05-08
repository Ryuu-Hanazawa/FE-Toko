import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import {logout} from '../../redux/action/authAction';

import css from "./Navbar.module.css";
import Logo from "../../assets/images/blanja-logo.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import CartIcon from "../../assets/icons/Cart.svg";
import Avatar from "../../assets/images/profile.png";

class Navbar extends React.Component {
  state = {
    isHidden: true,
    navMenu: () => {
      return (
        <div className={css.BtnWrap}>
          <input
            type='button'
            value='Login'
            className={`${css.Btn} ${css.Primary}`}
            onClick={(e) => {
              this.props.history.push({
                pathname: "/login",
              });
            }}
          />
          <input
            type='button'
            value='Signup'
            className={`${css.Btn} ${css.Secondary}`}
            onClick={(e) => {
              this.props.history.push({
                pathname: "/register",
              });
            }}
          />
        </div>
      );
    },
  };

  logOut = () => {
    const config = {
      headers: {
        "x-access-token": "Bearer " + this.props.token
      }
    };
    const data = "";
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/logout`, data, config)
      .then((res) => {
        this.props.logoutRedux();
      })
      .catch(err => console.error(err));
  }

  render() {
    const { isLogin, level } = this.props;
    let authBtn;

    // If user currently in logout state
    // Show the conditional components
    if (isLogin === false) {
      // If user logout
      authBtn = <this.state.navMenu />
    } else {
      // If user login
      authBtn = (
        <>
          {level === "seller" ? (
            <Link to='/myproducts' className={css.BtnWrap}>
              <img
                src={Avatar}
                alt='Profile'
                className='rounded-circle img-fluid'
              />
            </Link>
          ) : (
            <Link to='/profile' className={css.BtnWrap}>
              <img
                src={Avatar}
                alt='Profile'
                className='rounded-circle img-fluid'
              />
            </Link>
          )}
          <button
            className={`${css.Btn} ${css.Secondary}`}
            onClick={this.logOut}
          >
            <Link
              style={{ color: "black", textDecoration: "none" }}
              to='/login'
            >
              <i class='fas fa-sign-out-alt'></i>
            </Link>
          </button>
        </>
      );
    }
    return (
      <nav>
        <div className={css.NavContainer}>
          {/* LOGO */}
          <Link className={`navbar-brand ${css.Logo}`} to='/'>
            <img className='mb-2' src={Logo} alt='Blanja logo' />
            Blanja
          </Link>

          {/* SEARCH */}
          <div className={`${css.SearchArea} mx-auto`}>
            <div
              className={css.SearchBar}
              onClick={() => {
                this.props.history.push("/search");
              }}
            >
              <img
                className={css.SearchIcon}
                src={SearchIcon}
                alt='search icon'
              />
              <input
                type='text'
                name='product_name'
                className={css.Search}
                placeholder='Search'
                disabled
              />
            </div>
            {/* Modal trigger button */}
            <button
              type='button'
              className={css.Filter}
              data-bs-toggle='modal'
              onClick={() => {
                this.props.history.push("/search");
              }}
            >
              <img
                src={FilterIcon}
                className={css.FilterIcon}
                alt='filter-icon'
              />
            </button>
          </div>

          {/* Auth */}
          <div className={css.NavBtn}>
            <img
              onClick={() => this.props.history.push("/cart")}
              src={CartIcon}
              className={css.CartIcon}
              alt='cart-icon'
            />
            {authBtn}
          </div>

          <div className={`${css.NavMenu}`}>
            <button className={`${css.Btn} ${css.Primary}`}>
              <i class='fas fa-bars'></i>
            </button>

            <div className={css.MenuList}>
              <div className={css.Menu}>
                <img
                  onClick={() => this.props.history.push("/cart")}
                  src={CartIcon}
                  className={css.CartIcon}
                  alt='cart-icon'
                />
              </div>
              <div className={css.Menu}>{authBtn}</div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

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

const mapDispatchToProps = (dispatch) => {
  return {
    logoutRedux: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
