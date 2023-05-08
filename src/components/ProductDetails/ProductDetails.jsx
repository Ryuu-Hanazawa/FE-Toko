import React from "react";
import { Container } from "react-bootstrap";

import Navbar from "../Navbar/Navbar";
import Rating from "../Rating/Rating";

import css from "./ProductDetails.module.css";

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      size: 0,
      quantity: 0,
    };
  }

  handleClickQty = () => {
    this.setState((prevState) => ({ size: prevState.size + 1 }));
  };

  handleClickPlus = () => {
    this.setState((prevState) => ({ quantity: prevState.quantity + 1 }));
  };

  handleClickQtyMin = () => {
    this.setState((prevState) => ({
      size: Math.max(prevState.size - 1, 0),
    }));
  };

  handleClickMin = () => {
    this.setState((prevState) => ({
      quantity: Math.max(prevState.quantity - 1, 0),
    }));
  };

  render() {
    const {
      name,
      desc,
      price,
      brand,
      image,
      image1,
      image2,
      image3,
      image4,
      image5,
      category,
      rating,
      addToCart
    } = this.props;
    return (
      <div>
        <Navbar />
        <Container className={css.Main}>
          <p className={css.FontTitle}>
            Home {">"} category {">"} <b>{category}</b>
          </p>
          <div className={`row ${css.Row}`}>
            <div className='col-sm-4'>
              <img src={image} alt='img' className='rounded img-fluid' />
              <div className={`mt-3 ${css.MoreImages}`}>
                <ul className={css.HorizontalList}>
                  {/* <li>
                    <a href>
                      <img
                        src={image1}
                        alt={name}
                        className={`rounded ${css.SmallImages}`}
                      />
                    </a>
                  </li> */}
                  {/* <li>
                    <a href>
                      <img
                        src={image2}
                        alt={name}
                        className={`rounded ${css.SmallImages}`}
                      />
                    </a>
                  </li> */}
                  {/* <li>
                    <a href>
                      <img
                        src={image3}
                        alt={name}
                        className={`rounded ${css.SmallImages}`}
                      />
                    </a>
                  </li> */}
                  {/* <li>
                    <a href>
                      <img
                        src={image4}
                        alt={name}
                        className={`rounded ${css.SmallImages}`}
                      />
                    </a>
                  </li> */}
                  {/* <li>
                    <a href>
                      <img
                        src={image5}
                        alt={name}
                        className={`rounded ${css.SmallImages}`}
                      />
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
            <div className='col-sm-8'>
              <h3>{name}</h3>
              <p className={`${css.FontTitle} ms-1`}>
                <b>{brand}</b>
              </p>
              <div className={`${css.Rating} mt-n2 ms-1`}>
                <Rating rating={rating} />
              </div>
              <p className={`${css.FontTitle} ms-1 mt-3`}>
                <b>Price</b>
              </p>
              <h2 className='mt-n3'>
                <b>Rp {parseInt(price).toLocaleString()}</b>
              </h2>
              <p className={`${css.FontTitle} ms-1 mt-3 text-dark`}>
                <b>Color</b>
              </p>
              <ul className={`${css.HorizontalList}`}>
                <li>
                  <span
                    className={`${css.ColorSelected} rounded-circle border border-danger`}
                  >
                    <a
                      href
                      className={`${css.ColorOption} rounded-circle`}
                      style={{ backgroundColor: "black" }}
                    />
                  </span>
                </li>
                <li>
                  <a
                    href
                    className={`${css.ColorOption} rounded-circle bg-danger`}
                  ></a>
                </li>
                <li>
                  <a
                    href
                    className={`${css.ColorOption} rounded-circle bg-primary`}
                  ></a>
                </li>
                <li>
                  <a
                    href
                    className={`${css.ColorOption} rounded-circle bg-success`}
                  ></a>
                </li>
              </ul>
              <div className={`row ${css.Row} justify-content-start`}>
                <div className='col-sm-4'>
                  <p className={`${css.FontTitle} ms-1 mt-3 text-dark`}>
                    <b>Size</b>
                  </p>
                  <ul className={`${css.HorizontalList} d-flex justify-center`}>
                    <li>
                      <span
                        onClick={this.handleClickQtyMin}
                        className={`${css.ColorSelected} rounded-circle bg-secondary`}
                      >
                        <i className='fas fa-minus'></i>
                      </span>
                    </li>
                    <li style={{ margin: "0.9rem 1rem" }}>
                      <span>{this.state.size}</span>
                    </li>
                    <li>
                      <span
                        onClick={this.handleClickQty}
                        className={`${css.ColorSelected} rounded-circle`}
                      >
                        <i className='fas fa-plus'></i>
                      </span>
                    </li>
                  </ul>
                </div>
                <div className='col-sm-4'>
                  <p className={`${css.FontTitle} ms-1 mt-3 text-dark`}>
                    <b>Jumlah</b>
                  </p>
                  <ul className={`${css.HorizontalList} d-flex justify-center`}>
                    <li>
                      <span
                        onClick={this.handleClickMin}
                        className={`${css.ColorSelected} rounded-circle bg-secondary`}
                      >
                        <i className='fas fa-minus'></i>
                      </span>
                    </li>
                    <li style={{ margin: "0.9rem 1rem" }}>
                      <span>{this.state.quantity}</span>
                    </li>
                    <li>
                      <span
                        onClick={this.handleClickPlus}
                        className={`${css.ColorSelected} rounded-circle`}
                      >
                        <i className='fas fa-plus'></i>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className=' d-flex justify-content-between'>
                <button
                  onClick={addToCart}
                  className={`${css.BtnGrup} ${css.BtnAddBag} mt-2 me-2`}
                >
                  Add to bag
                </button>
                <button href className={`${css.BtnGrup} ${css.BtnBuy} mt-2`}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <h3 className='mt-3'>Informasi Produk</h3>
          <div>
            <p className='mt-3 text-dark'>
              <b>Condition</b>
            </p>
            <p className='mt-n3 text-danger'>
              <b>New</b>
            </p>
            <p className='mt-4 text-dark'>
              <b>Description</b>
            </p>
            <p>{desc}</p>
          </div>
          <h2>Product Review</h2>

          <Container style={{ marginBottom: "70px" }}>
            <div className={`row ${css.Row}`}>
              <div className='col-md-3 align-item-center justify-content-center'>
                <h1 className='display-1 d-inline'>
                  <b>{rating}</b>
                </h1>
                <p className='d-inline-block ms-1 mt-3 text-dark'>
                  <b>/ 5</b>
                </p>
                <div className={`${css.Rating} mt-n2 ms-1 d-flex`}>
                  <Rating rating={rating} styling={css.Star} />
                </div>
              </div>

              <div className='col-md-3'>
                <div className={`row ${css.Row}`}>
                  <div className={css.Side}>
                    <div>
                      {" "}
                      <i className={`fas fa-star ${css.Bintang}`}></i>5
                    </div>
                  </div>
                  <div className={`${css.Middle}`}>
                    <div className={`${css.BarContainer}`}>
                      <div className={`${css.Bar1}`}></div>
                    </div>
                  </div>
                  <div className={`${css.Side} ${css.Right}`}>
                    <div>4</div>
                  </div>
                  <div className={css.Side}>
                    <div>
                      <i className={`fas fa-star ${css.Bintang}`}></i>4
                    </div>
                  </div>
                  <div className={`${css.Middle}`}>
                    <div className={`${css.BarContainer}`}>
                      <div className={`${css.Bar1}`}></div>
                    </div>
                  </div>
                  <div className={`${css.Side} ${css.Right}`}>
                    <div>0</div>
                  </div>
                  <div className={css.Side}>
                    <div>
                      <i className={`fas fa-star ${css.Bintang}`}></i>3
                    </div>
                  </div>
                  <div className={`${css.Middle}`}>
                    <div className={`${css.BarContainer}`}>
                      <div className={`${css.Bar1}`}></div>
                    </div>
                  </div>
                  <div className={`${css.Side} ${css.Right}`}>
                    <div>0</div>
                  </div>
                  <div className={css.Side}>
                    <div>
                      <i className={`fas fa-star ${css.Bintang}`}></i>2
                    </div>
                  </div>
                  <div className={`${css.Middle}`}>
                    <div className={`${css.BarContainer}`}>
                      <div className={`${css.Bar1}`}></div>
                    </div>
                  </div>
                  <div className={`${css.Side} ${css.Right}`}>
                    <div>0</div>
                  </div>
                  <div className={css.Side}>
                    <div>
                      <i className={`fas fa-star ${css.Bintang}`}></i>1
                    </div>
                  </div>
                  <div className={`${css.Middle}`}>
                    <div className={`${css.BarContainer}`}>
                      <div className={`${css.Bar1}`}></div>
                    </div>
                  </div>
                  <div className={`${css.Side} ${css.Right}`}>
                    <div>0</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>

          {/* Menu Bottom */}
          <div className='btn d-flex d-lg-none'>
            <a href className={`${css.BtnBtm} ${css.BtnChart} mt-2`}>
              Chart
            </a>
            <a href className={`${css.BtnBtm} ${css.BtnAddBag} mt-2`}>
              Add bag
            </a>
            <a href className={`${css.BtnBtm} ${css.BtnBuy} mt-2`}>
              Buy Now
            </a>
          </div>
        </Container>
      </div>
    );
  }
}

export default ProductDetails;
