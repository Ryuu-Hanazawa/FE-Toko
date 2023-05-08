import React from "react";
import { Link } from "react-router-dom";

import css from "./Category.module.css";
import tShirt from "../../assets/images/t-shirt.png";
import Shorts from "../../assets/images/shorts.png";
import Pants from "../../assets/images/pants.png";
import Shoes from "../../assets/images/shoes.png";
import Jacket from "../../assets/images/jacket.png";

const Category = () => {
  return (
    <div id={css.Section}>
      <div className='container'>
        <div className={css.Head}>
          <h2>Category</h2>
          <span className='text-muted'>What are you currently looking for</span>
        </div>

        <div className={css.List}>
          <Link
            to={{
              pathname: "/category",
              data: "baju",
              title: "T-Shirt",
            }}
            className={css.Item}
          >
            <div
              className={css.ItemCategory}
              style={{ backgroundColor: "#CC0B04" }}
            >
              <img src={tShirt} alt='T-shirt' />
              <p className={css.ItemText}>T-Shirt</p>
            </div>
          </Link>

          <Link
            /* to={{
              pathname: "/category",
              data: "short",
              title: "Shorts",
            }}
            className={css.Item} */
          >
            <div
              className={css.ItemCategory}
              style={{ backgroundColor: "#1C3391" }}
            >
              <img src={Shorts} alt='Shorts' />
              <p className={css.ItemText}>Shorts</p>
            </div>
          </Link>

          <Link
            to={{
              pathname: "/category",
              data: "celana",
              title: "Pants",
            }}
            className={css.Item}
          >
            <div
              className={css.ItemCategory}
              style={{ backgroundColor: "#E31F51" }}
            >
              <img src={Pants} alt='Pants' />
              <p className={css.ItemText}>Pants</p>
            </div>
          </Link>

          <Link
            to={{
              pathname: "/category",
              data: "sepatu",
              title: "Shoes",
            }}
            className={css.Item}
          >
            <div
              className={css.ItemCategory}
              style={{ backgroundColor: "#57CD9E" }}
            >
              <img src={Shoes} alt='Shoes' />
              <p className={css.ItemText}>Shoes</p>
            </div>
          </Link>

          <Link
            /* to={{
              pathname: "/category",
              data: "jaket",
              title: "Jacket",
            }}
            className={css.Item} */
          >
            <div
              className={css.ItemCategory}
              style={{ backgroundColor: "#F67B02" }}
            >
              <img src={Jacket} alt='Jacket' />
              <p className={css.ItemText}>Jacket</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Category;