import React, { useState, useEffect } from "react";
import axios from "axios";
import CollectionItem from "../../components/CollectionItem/CollectionItem";
import Navbar from "../../components/Navbar/Navbar";

import css from "./CategoryView.module.css";

const CategoryView = ({ location }) => {
  const [products, setProducts] = useState({});
  const { data, title } = location;
  const url = `${process.env.REACT_APP_BASEURL}/search?category=${data}`;

  useEffect(() => {
    axios
      .get(url + "&sortby=latest&sort=asc&page=1&limit=10")
      .then(({ data }) => setProducts(data))
      .catch((err) => console.log(err));
  }, [url]);

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className={css.Head}>
          <h1>{title}</h1>
        </div>
        <div className={css.FlexList}>
          {products.products !== "Page not found" ? (
            products.products &&
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
            <div className='center'>
              <div className='spinner-border text-danger ' role='status'>
                <span className='visually-hidden'>Loading...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryView;
