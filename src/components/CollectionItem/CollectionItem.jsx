import React from "react";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

import css from "./CollectionItem.module.css";

const CollectionItem = ({ img, name, brand, price, click, idUrl, rating, ratingKey }) => {
  return (
    <>
      <div className={css.Item}>
        <div className={css.ItemCard} onClick={click}>
          <img src={img} alt={name} />
          <Link to={{ pathname: `${idUrl}`}}>
            <div className={css.ItemDesc}>
              <p className={css.ItemTitle}>{name}</p>
              <p className={css.ItemPrice}>Rp {price.toLocaleString()}</p>
              <span>{brand}</span>
              <Rating rating={rating} />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CollectionItem;