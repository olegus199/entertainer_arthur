import styles from "./SpecialOffer.module.scss";
import { FC } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import photo_arthur from "../assets/arthur_roses.jpg";
import photo_nikolai from "../assets/guitarist.jpg";
import rose_bg from "../assets/rose_bg.png";
import { SectionHeights, SectionNames } from "../types";
import Video from "./Video";
import { handle_scroll_to_section } from "../helpres";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const SpecialOffer: FC = () => {
  const sectionHeights = useSelector<RootState, SectionHeights>(
    (state) => state.sectionHeights.heights
  );
  const sectionYOffset = useSelector<RootState, number>(
    (state) => state.sectionYOffset.y_offset
  );

  return (
    <section className={styles.special_offer_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>уникальное предложение
          </p>
          <h2 className={styles.h2}>Вечер романсов</h2>
        </div>
        <p className={`${styles.description} ${styles.general_description}`}>
          Дополнительная услуга к проведению вашего мероприятия - концерт
          романсов!
        </p>
        <div className={styles.offer_body}>
          <div className={styles.text_content}>
            <h2 className={styles.offer_header}>
              Вдыхая <br className={styles.br} />
              <span>Розы</span> <br className={styles.br} />
              Аромат
            </h2>
            <p className={`${styles.description} ${styles.offer_description}`}>
              Предлагаем вам насладиться русскими и цыганскими романсами под
              аккомпанемент гитары, в оригинальном исполнении артиста театра и
              кино Артура Кремнёва и виртуозного гитариста Николая Криворучко!
            </p>
            <div className={styles.duration_price_desktop}>
              <p className={`${styles.description} ${styles.duration}`}>
                Продолжительность программы - 1 час
              </p>
              <p className={`${styles.description} ${styles.price}`}>
                По вопросам цены{" "}
                <span
                  onClick={() =>
                    handle_scroll_to_section(
                      "contacts",
                      sectionHeights,
                      sectionYOffset
                    )
                  }
                >
                  пишите
                </span>{" "}
                или{" "}
                <span
                  onClick={() =>
                    handle_scroll_to_section(
                      "contacts",
                      sectionHeights,
                      sectionYOffset
                    )
                  }
                >
                  звоните
                </span>
                , сориентирую лично!
              </p>
            </div>
          </div>
          <div className={styles.photo_content}>
            <div className={styles.photo}>
              <div className={styles.image_wrapper}>
                <LazyLoadImage
                  src={photo_arthur}
                  alt="photo"
                  className={`${styles.image}`}
                  width="100%"
                  height="100%"
                  effect="opacity"
                  draggable={false}
                />
              </div>
              <p className={styles.artist_name}>Артур Кремнёв</p>
            </div>
            <div className={styles.photo}>
              <div className={styles.image_wrapper}>
                <LazyLoadImage
                  src={photo_nikolai}
                  alt="photo"
                  className={`${styles.image}`}
                  width="100%"
                  height="100%"
                  effect="opacity"
                  draggable={false}
                />
              </div>
              <p className={styles.artist_name}>Николай Криворучко</p>
            </div>
          </div>
          <div className={styles.duration_price_mobile}>
            <p className={`${styles.description} ${styles.duration_mobile}`}>
              Продолжительность программы - 1 час
            </p>
            <p className={`${styles.description} ${styles.price_mobile}`}>
              По вопросам цены{" "}
              <span
                onClick={() =>
                  handle_scroll_to_section(
                    "contacts",
                    sectionHeights,
                    sectionYOffset
                  )
                }
              >
                пишите
              </span>{" "}
              или{" "}
              <span
                onClick={() =>
                  handle_scroll_to_section(
                    "contacts",
                    sectionHeights,
                    sectionYOffset
                  )
                }
              >
                звоните
              </span>
              , сориентирую лично!
            </p>
          </div>
        </div>
        <Video />
      </div>
      <div className={styles.rose_bg}>
        <img
          src={rose_bg}
          alt="rose"
          width="100%"
          height="100%"
          draggable={false}
        />
      </div>
    </section>
  );
};

export default SpecialOffer;
