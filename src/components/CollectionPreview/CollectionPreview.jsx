import React from "react";
import axios from "axios";
import CollectionItem from "../CollectionItem/CollectionItem";
import Paginate from "../Pagination/Paginate";

import css from "./CollectionPreview.module.css";

class CollectionPreview extends React.Component {
  constructor() {
    super();
    this.state = {
      products: {},
      popularProducts: {},
      pageInfo: {}
    };
  }

  selectProduct = () => {
    console.log("Selected");
  };

  getNewProducts = () => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/products?page=1&limit=4")
      .then(({ data }) => {
        console.log(data.pageInfo);
        this.setState({ products: data, pageInfo: data.pageInfo });
      })
      .catch((err) => console.error(err));
  };

  getPopularProducts = () => {
    axios
      .get(process.env.REACT_APP_BASEURL + "/products/popular?page=1&limit=4")
      .then(({ data }) => {
        this.setState({ popularProducts: data })
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getNewProducts();
    this.getPopularProducts();
  }

  render() {
    const { products, pageInfo } = this.state;
    const { popularProducts } = this.state;
    return (
      <div id={css.ColletionItem}>
        {/* New products */}
        <div className='container'>
          <div className={css.Head}>
            <h2>New</h2>
            <span className='text-muted'>You've never seen it before!</span>
          </div>

          <div className={css.FlexList}>
            {products.products &&
              products.products.map(
                ({
                  product_name,
                  product_price,
                  image,
                  product_brand,
                  id,
                  product_rating,
                }) => {
                  let img = image.split(",");
                  return (
                    <CollectionItem
                      click={this.selectProduct}
                      idUrl={`/product/${id}`}
                      key={id}
                      name={product_name}
                      brand={product_brand}
                      img={img[0]}
                      rating={product_rating}
                      price={product_price}
                    />
                  );
                }
              )}
          </div>
          <nav aria-label='Page navigation example'>
            <ul class='pagination'>
              <li class='page-item'>
                <a class='page-link' href='#' aria-label='Previous'>
                  <span aria-hidden='true'>&laquo;</span>
                </a>
              </li>
              <li class='page-item'>
                <a
                  class='page-link'
                  href={`${process.env.REACT_APP_BASEURL}/products/popular?page=2&limit=8`}
                >
                  1
                </a>
              </li>
              <li class='page-item'>
                <a class='page-link' href='#' aria-label='Next'>
                  <span aria-hidden='true'>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Popular products */}
        <div className='container'>
          <div className={css.Head}>
            <h2>Popular</h2>
            <span className='text-muted'>You've never seen it before!</span>
          </div>

          <div className={css.FlexList}>
            {popularProducts.products &&
              popularProducts.products.map(
                ({
                  product_name,
                  product_price,
                  image,
                  product_brand,
                  id,
                  product_rating,
                }) => {
                  let img = image.split(",");
                  return (
                    <CollectionItem
                      click={this.selectProduct}
                      idUrl={`/product/${id}`}
                      key={id}
                      name={product_name}
                      brand={product_brand}
                      img={img[0]}
                      rating={product_rating}
                      price={`Rp. ${product_price}`}
                    />
                  );
                }
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default CollectionPreview;