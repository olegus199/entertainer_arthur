import styles from "./PageNotFound.module.scss";
import { FC } from "react";
import photo from "../assets/not_found_photo.png";
import { Link } from "react-router-dom";

const PageNotFound: FC = () => {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className={styles.content}>
        <h3 className={styles.h3}>
          4<span>0</span>4 not found
        </h3>
        <div className={styles.header}>
          <h2 className={styles.h2}>Упс!</h2>
          <p className={styles.p}>Кажется, страница не найдена</p>
        </div>
        <div className={styles.return_section}>
          <p className={styles.return_text}>Возвращайтесь скорее</p>
          <Link
            to="/"
            className={styles.return_link}
          >
            На главную
          </Link>
        </div>
      </div>
      <div className={styles.image_wrapper}>
        <img
          src={photo}
          alt="photo"
          className={styles.photo}
          draggable={false}
        />
      </div>
    </section>
  );
};

export default PageNotFound;
