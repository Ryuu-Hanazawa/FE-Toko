import React from "react";

import css from "./ProductBag.module.css";
// import SampleImage from "../../assets/images/men-shirt.png";

const ProductBag = ({
  imgUrl,
  productName,
  productBrand,
  price,
  remove,
  picked,
  min,
  plus,
  qty,
}) => {
  const toPrice = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <>
      <div className={css.ProductCart}>
        <div className={css.ProductWrapper}>
          <input
            className={`form-check-input ${css.FormCheck}`}
            type='checkbox'
            value=''
            onChange={picked}
            id='flexCheckDefault'
            style={{ alignSelf: "center" }}
          />
          <div className={css.ImageWrapper}>
            <img src={imgUrl} className={css.ProductImg} alt='product' />
          </div>
          <div className={css.ProductInfo}>
            <p style={{ fontSize: "16px", fontWeight: "bold" }}>
              {productName}
            </p>
            <p
              style={{
                fontSize: "12px",
                fontWeight: "500",
                color: "#9B9B9B",
              }}
            >
              {productBrand}
            </p>
          </div>
        </div>

        {/* <div className={css.Counter}>
          <button
            type='button'
            onClick={min}
            className={`btn btn-light ${css.BtnCounter}`}
          >
            <i className='fas fa-minus'></i>
          </button>
          <p style={{ margin: "8px 10px" }}>{qty}</p>
          <button
            type='button'
            onClick={plus}
            className={`btn btn-light ${css.BtnCounter}`}
          >
            <i className='fas fa-plus'></i>
          </button>
        </div> */}

        <div className={css.TotalPrice}>
          <div className={css.TrashIcon} onClick={remove}>
            <span className='fas fa-times' style={{ color: "red" }}></span>
          </div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#222222",
            }}
          >
            Rp. {toPrice(price)}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductBag;
