import styles from "./PhotoSection.module.scss";
import { FC } from "react";

const PhotoSection: FC = () => {
  return (
    <section className={styles.photo_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>как проходят мероприятия
          </p>
          <h2 className={styles.h2}>Фотогалерея</h2>
        </div>
        <div className={styles.photos_container}>photos</div>
        <hr className={styles.divider} />
      </div>
    </section>
  );
};

export default PhotoSection;
