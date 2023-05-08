import React from "react";

import StarIcon from "../../assets/icons/Star.png";

const Rating = ({ rating, id, styling }) => {
  let a = "";
  for (let i = 0; i < rating; i++) {
    a += i;
  }
  let lop = a.split("");
  return (
    <div className='d-flex'>
      <div className='rate'>
        {lop.map((data) => {
          return <img key={id} src={StarIcon} alt='rating' className={styling} />;
        })}
      </div>
    </div>
  );
};

export default Rating;