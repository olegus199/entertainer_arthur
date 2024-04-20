import styles from "./About.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import decor1 from "../assets/decor1.svg";
import decor2 from "../assets/decor2.svg";
import decor3 from "../assets/decor3.svg";
import decor4 from "../assets/decor4.svg";
import decor_ellipse from "../assets/decor_ellipse.svg";

const About: FC = () => {
  const [facts_class_names, set_facts_class_names] = useState(
    `${styles.about_facts}`
  );
  const [ellipse_class_names, set_ellipse_class_names] = useState(
    `${styles.decor_ellipse}`
  );
  const about_facts_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          set_facts_class_names(
            `${styles.about_facts} ${styles.about_facts_animation}`
          );
          set_ellipse_class_names(
            `${styles.decor_ellipse} ${styles.ellipse_anima}`
          );
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (about_facts_ref.current) {
      observer.observe(about_facts_ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.about_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>давайте знакомиться!
          </p>
          <h2 className={styles.h2}>Немного обо мне</h2>
        </div>
        <div
          ref={about_facts_ref}
          className={facts_class_names}
        >
          <p className={`${styles.about_fact} ${styles.fact_1}`}>
            АРТИСТ ТЕАТРА И <span>КИНО</span>
          </p>
          <p className={`${styles.about_fact} ${styles.fact_2}`}>
            ПЕВЕЦ, <span>МУЗЫКАНТ</span> - МУЛЬТИИНСТРУМЕНТАЛИСТ
          </p>
          <p className={`${styles.about_fact} ${styles.fact_3}`}>
            <span>РЕЗИДЕНТ</span> ЭСТРАДНОГО ТЕАТРА “ВИНИЛ”
          </p>
          <p className={`${styles.about_fact} ${styles.fact_4}`}>
            АРТИСТ ТЕАТРА <span>“</span>БУФФ<span>”</span>
          </p>
        </div>
        <div className={styles.bottom_decor}>
          <img
            src={decor1}
            alt="decor svg"
            draggable={false}
          />
          <img
            src={decor2}
            alt="decor svg"
            draggable={false}
          />
          <img
            src={decor3}
            alt="decor svg"
            draggable={false}
          />
          <img
            src={decor4}
            alt="decor svg"
            draggable={false}
          />
        </div>
        <img
          src={decor_ellipse}
          alt="decor ellipse"
          className={ellipse_class_names}
          draggable={false}
        />
      </div>
      <hr className={styles.bottom_decor_line} />
    </section>
  );
};

export default About;
