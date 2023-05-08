import React from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { logout } from "../../redux/action/authAction";
import CollectionItem from "../CollectionItem/CollectionItem";

import css from "./SearchItems.module.css";
import Logo from "../../assets/images/blanja-logo.svg";
import SearchIcon from "../../assets/icons/Search.svg";
import FilterIcon from "../../assets/icons/Filter.svg";
import CartIcon from "../../assets/icons/Cart.svg";
import Avatar from "../../assets/images/profile.png";
import Search from "../../assets/images/search-img.png";

class SearchItems extends React.Component {
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
    searchHandler: "",
    product_name: "",
    color: "",
    sortBy: "latest",
    sortWith: "desc",
    category: "",
    searchedItems: {},
  };

  logOut = () => {
    const config = {
      headers: {
        "x-access-token": "Bearer " + this.props.token,
      },
    };
    const data = "";
    axios
      .post(`${process.env.REACT_APP_BASEURL}/auth/logout`, data, config)
      .then((res) => {
        this.props.logoutRedux();
      })
      .catch((err) => console.error(err));
  };

  clickOptHandler = (e) => {
    this.setState({
      [e.target.name]: `&${[e.target.name]}=${e.target.id}`,
    });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      axios
        .get(
          `${process.env.REACT_APP_BASEURL}/search?name=${this.state.product_name}&sortby=${this.state.sortBy}&sort=${this.state.sortWith}&page=1&limit=20`
        )
        .then(({ data }) => {
          this.setState({ searchedItems: data });
        })
        .catch((err) => console.log(err.message));
    }
  };

  handleFilter = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASEURL}/search/multiple?color=${this.state.color}&name=${this.state.product_name}&sortby=${this.state.sortBy}&sort=${this.state.sortWith}&page=1&limit=20`
      )
      .then(({ data }) => {
        this.setState({ searchedItems: data });
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { isLogin, level } = this.props;
    const { searchedItems } = this.state;
    let authBtn;

    // If user currently in logout state
    // Show the conditional components
    if (isLogin === false) {
      // If user logout
      authBtn = <this.state.navMenu />;
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
      <>
        <nav>
          <div className={css.NavContainer}>
            {/* LOGO */}
            <Link className={`navbar-brand ${css.Logo}`} to='/'>
              <img className='mb-2' src={Logo} alt='Blanja logo' />
              Blanja
            </Link>

            {/* SEARCH */}
            <div className={`${css.SearchArea} mx-auto`}>
              <div className={css.SearchBar}>
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
                  onKeyPress={this.handleKeyPress}
                  onChange={this.changeHandler}
                  value={this.state.product_name}
                />
              </div>
              {/* Modal trigger button */}
              <button
                type='button'
                className={css.Filter}
                data-bs-toggle='modal'
                data-bs-target='#staticBackdrop'
              >
                <img
                  src={FilterIcon}
                  className={css.FilterIcon}
                  alt='filter-icon'
                />
              </button>

              {/* Modal */}
              <div
                className='modal fade'
                id='staticBackdrop'
                data-bs-backdrop='static'
                data-bs-keyboard='false'
                tabIndex='-1'
                aria-labelledby='staticBackdropLabel'
                aria-hidden='true'
              >
                <div className='modal-dialog'>
                  <div className='modal-content'>
                    <div class='modal-header'>
                      <h5 className='modal-title' id='staticBackdropLabel'>
                        Filter
                      </h5>
                      <button
                        type='button'
                        className='btn-close'
                        data-bs-dismiss='modal'
                        aria-label='Close'
                      ></button>
                    </div>
                    <div className='modal-body'>
                      {/* Color */}
                      <strong className='mb-5'>Colors</strong>
                      <br></br>
                      <div className='row mt-3 mb-3'>
                        <button
                          onClick={() => {
                            this.setState({ color: "white" });
                          }}
                          id='1'
                          name='color'
                          className={`btn ${css.BtnWhite} rounded-circle me-3 ms-3`}
                        ></button>
                        <button
                          onClick={() => {
                            this.setState({ color: "red" });
                          }}
                          id='2'
                          name='color'
                          className={`btn ${css.BtnRed} rounded-circle me-3 ms-3`}
                        ></button>
                        <button
                          onClick={() => {
                            this.setState({ color: "blue" });
                          }}
                          id='3'
                          name='color'
                          className={`btn ${css.BtnBlue} rounded-circle me-3 ms-3`}
                        ></button>
                        <button
                          onClick={() => {
                            this.setState({ color: "black" });
                          }}
                          id='4'
                          name='color'
                          className={`btn ${css.BtnBlack} rounded-circle me-3 ms-3`}
                        ></button>
                      </div>
                      <div className='dropdown-divider'></div>

                      {/* Sorting */}
                      <strong>Sort</strong>
                      <br></br>
                      <div className='dropdown mt-2'>
                        <button
                          className={`btn btn-primary dropdown-toggle ${css.BtnPrimary}`}
                          type='button'
                          id='dropdownMenuButton'
                          data-bs-toggle='dropdown'
                          aria-expanded='false'
                        >
                          Sort by
                        </button>
                        <ul
                          className='dropdown-menu'
                          aria-labelledby='dropdownMenuButton'
                        >
                          <li
                            onClick={() => {
                              this.setState({
                                sortBy: "latest",
                                sortWith: "desc",
                              });
                            }}
                          >
                            <p className='dropdown-item'>Latest</p>
                          </li>
                          <li
                            onClick={() => {
                              this.setState({
                                sortBy: "latest",
                                sortWith: "asc",
                              });
                            }}
                          >
                            <p className='dropdown-item'>Oldest</p>
                          </li>
                          <li
                            onClick={() => {
                              this.setState({
                                sortBy: "popular",
                                sortWith: "desc",
                              });
                            }}
                          >
                            <p className='dropdown-item'>Popular</p>
                          </li>
                          <li
                            onClick={() => {
                              this.setState({
                                sortBy: "price",
                                sortWith: "asc",
                              });
                            }}
                          >
                            <p className='dropdown-item'>
                              Price: lowest to high
                            </p>
                          </li>
                          <li
                            onClick={() => {
                              this.setState({
                                sortBy: "price",
                                sortWith: "desc",
                              });
                            }}
                          >
                            <p className='dropdown-item'>
                              Price: highest to low
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='modal-footer'>
                      <button
                        type='button'
                        className='btn btn-secondary'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                      <button
                        onClick={this.handleFilter}
                        type='button'
                        className={`btn btn-primary ${css.BtnPrimary}`}
                        data-bs-dismiss='modal'
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
        <div className='container'>
          <div className={css.FlexList}>
            {searchedItems.products !== "Page not found" ? (
              searchedItems.products &&
              searchedItems.products.map(
                ({
                  product_name,
                  product_price,
                  image,
                  product_brand,
                  id,
                  product_rating,
                }) => {
                  let imgSplit = image.split(",");
                  let img = imgSplit;
                  return (
                    <CollectionItem
                      idUrl={`/product/${id}`}
                      key={id}
                      name={product_name}
                      brand={product_brand}
                      img={process.env.REACT_APP_BASEURL + img[0]}
                      rating={product_rating}
                      price={product_price}
                    />
                  );
                }
              )
            ) : (
              <div className={css.EmptySearch}>
                <img className={css.SearchImg} src={Search} alt='search' />
                <h1>Hmm... couldn't find what you've looking for, sorry</h1>
              </div>
            )}
          </div>
        </div>
      </>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SearchItems)
);
