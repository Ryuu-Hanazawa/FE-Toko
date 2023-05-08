import React from "react";
import axios from "axios";
import CollectionItem from "../CollectionItem/CollectionItem";

import css from "./NewProducts.module.css";
const url = process.env.REACT_APP_BASEURL;

class NewProducts extends React.Component {
  constructor() {
    super();
    this.state = {
      products: {},
    };
  }

  selectProduct = () => {
    console.log("Selected");
  };

  getNewProducts = () => {
    axios
      .get(url + "/products?page=1&limit=8")
      .then(({ data }) => {
        console.log(data.pageInfo);
        this.setState({ products: data });
      })
      .catch((err) => console.error(err));
  };

  componentDidMount() {
    this.getNewProducts()
  }

  render() {
    const { products } = this.state;
    return (
      <div id={css.CollectionItem}>
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
                  let imgSplit = image.split(",");
                  let img = imgSplit;
                  return (
                    <CollectionItem
                      click={this.selectProduct}
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
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default NewProducts;