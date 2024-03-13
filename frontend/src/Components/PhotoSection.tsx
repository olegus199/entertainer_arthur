import styles from "./PhotoSection.module.scss";
import { FC, useState } from "react";
import main_ph1 from "../assets/photo_gallery/ph1.jpg";
import main_ph2 from "../assets/photo_gallery/ph2.jpg";
import main_ph3 from "../assets/photo_gallery/ph3.jpg";
import main_ph4 from "../assets/photo_gallery/ph4.jpg";
import main_ph5 from "../assets/photo_gallery/ph5.jpg";
import main_ph6 from "../assets/photo_gallery/ph6.jpg";
import main_ph7 from "../assets/photo_gallery/ph7.jpg";
import main_ph8 from "../assets/photo_gallery/ph8.jpg";
import main_ph9 from "../assets/photo_gallery/ph9.jpg";
import main_ph10 from "../assets/photo_gallery/ph10.jpg";
import main_ph11 from "../assets/photo_gallery/ph11.jpg";
import main_ph12 from "../assets/photo_gallery/ph12.jpg";
import main_ph13 from "../assets/photo_gallery/ph13.jpg";
import main_ph14 from "../assets/photo_gallery/ph14.jpg";
import main_ph15 from "../assets/photo_gallery/ph15.jpg";
import main_ph16 from "../assets/photo_gallery/ph16.jpg";
import main_ph17 from "../assets/photo_gallery/ph17.jpg";
import main_ph18 from "../assets/photo_gallery/ph18.jpg";
import main_ph19 from "../assets/photo_gallery/ph19.jpg";
import main_ph20 from "../assets/photo_gallery/ph20.jpg";
import main_ph21 from "../assets/photo_gallery/ph21.jpg";
import main_ph22 from "../assets/photo_gallery/ph22.jpg";
import main_ph23 from "../assets/photo_gallery/ph23.jpg";
import main_ph24 from "../assets/photo_gallery/ph24.jpg";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/opacity.css";
import PhotoGallery from "./PhotoGallery";

const photos: string[] = [
  main_ph1,
  main_ph2,
  main_ph3,
  main_ph4,
  main_ph5,
  main_ph6,
  main_ph7,
  main_ph8,
  main_ph9,
  main_ph10,
  main_ph11,
  main_ph12,
  main_ph13,
  main_ph14,
  main_ph15,
  main_ph16,
  main_ph17,
  main_ph18,
  main_ph19,
  main_ph20,
  main_ph21,
  main_ph22,
  main_ph23,
  main_ph24,
];

const PhotoSection: FC = () => {
  const [photo_idx, set_photo_idx] = useState<number | null>(null);

  const handle_photo_click = (idx: number | null) => {
    set_photo_idx(idx);
  };
  return (
    <section className={styles.photo_section}>
      {photo_idx !== null && (
        <PhotoGallery
          init_idx={photo_idx}
          photos={photos}
          handle_photo_click={handle_photo_click}
        />
      )}
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>как проходят мероприятия
          </p>
          <h2 className={styles.h2}>Фотогалерея</h2>
        </div>
        <div className={styles.photos_container}>
          {photos.map((photo, idx) => {
            return (
              <div
                className={styles.image_wrapper}
                key={idx}
                onClick={() => handle_photo_click(idx)}
              >
                <LazyLoadImage
                  src={photo}
                  alt="photo"
                  className={`${styles.image}`}
                  width="100%"
                  height="100%"
                  effect="opacity"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
        <hr className={styles.divider} />
      </div>
    </section>
  );
};

export default PhotoSection;
