import css from "./Featured.module.css";
import BenjaminVoros from "../../assets/images/benjamin-voros.png";
import IanDooley from "../../assets/images/ian-dooley.png";
import Sepatu from "../../assets/images/sepatu.png"
import Jas from "../../assets/images/jas.png"
import Outfit from "../../assets/images/all-outfit.png"

function Featured() {
  return (
    <div id={css.Section}>
      <div className='container'>
        <div className={css.Tags}>
        <div className={css.List}>
            <div className={css.ItemTags}>
              <img src={BenjaminVoros} alt='tags' />
              <p className={css.ItemText}>Trend 2022</p>
            </div>
            <div className={css.ItemTags}>
              <img src={IanDooley} alt='tags' />
              <p className={css.ItemText}>Black edition</p>
            </div>
            <div className={css.ItemTags}>
              <img src={Sepatu} alt='tags' />
              <p className={css.ItemText}>Shoe Edition</p>
            </div>
            <div className={css.ItemTags}>
              <img src={Jas} alt='tags' />
              <p className={css.ItemText}>Formal Edition Edition</p>
            </div>
            <div className={css.ItemTags}>
              <img src={Outfit} alt='tags' />
              <p className={css.ItemText}>Black Friday</p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;