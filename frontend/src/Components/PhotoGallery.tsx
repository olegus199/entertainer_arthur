import styles from "./PhotoGallery.module.scss";
import { FC, useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft, FaXmark } from "react-icons/fa6";

interface PhotoGalleryProps {
  init_idx: number;
  photos: string[];
  handle_photo_click: (idx: number | null) => void;
}

const PhotoGallery: FC<PhotoGalleryProps> = ({
  init_idx,
  photos,
  handle_photo_click,
}) => {
  const [active_photo_idx, set_active_photo_idx] = useState<number>(init_idx);
  const handle_nav_area_click = (direction: "prev" | "next") => {
    switch (direction) {
      case "prev":
        if (active_photo_idx === 0) {
          set_active_photo_idx(photos.length - 1);
        } else {
          set_active_photo_idx(active_photo_idx - 1);
        }
        break;
      case "next":
        if (active_photo_idx === photos.length - 1) {
          set_active_photo_idx(0);
        } else {
          set_active_photo_idx(active_photo_idx + 1);
        }
        break;
    }
  };

  useEffect(() => {
    const handle_esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handle_photo_click(null);
      }
    };

    document.addEventListener("keydown", handle_esc);

    return () => {
      document.removeEventListener("keydown", handle_esc);
    };
  }, []);

  return (
    <div className={styles.photo_gallery}>
      <FaXmark
        className={styles.close_icon}
        onClick={() => handle_photo_click(null)}
      />
      <div
        className={`${styles.nav_area} ${styles.area_left}`}
        onClick={() => handle_nav_area_click("prev")}
      >
        <div className={styles.nav_button}>
          <FaChevronLeft className={styles.chevron} />
        </div>
      </div>
      <div className={styles.image_wrapper}>
        <img
          src={photos[active_photo_idx]}
          alt="photo"
          draggable={false}
        />
      </div>
      <div
        className={`${styles.nav_area} ${styles.area_right}`}
        onClick={() => handle_nav_area_click("next")}
      >
        <div className={styles.nav_button}>
          <FaChevronRight className={styles.chevron} />
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
