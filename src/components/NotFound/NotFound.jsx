import css from "./NotFound.module.css";
import notFound from "../../assets/images/not-found.jpg";

function NotFound() {
  return(
    <div className={css.LoaderContainer}>
      <img className={css.Loader} src={notFound} alt="not-found" />
    </div>
  );
}

export default NotFound;