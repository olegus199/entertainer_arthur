import styles from "./About.module.scss";
import { FC } from "react";
import decor1 from "../assets/decor1.svg";
import decor2 from "../assets/decor2.svg";
import decor3 from "../assets/decor3.svg";
import decor4 from "../assets/decor4.svg";
import decor_ellipse from "../assets/decor_ellipse.svg";

const About: FC = () => {
  return (
    <section className={styles.about_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>давайте знакомиться!
          </p>
          <h2 className={styles.h2}>Немного обо мне</h2>
        </div>
        <div className={styles.about_facts}>
          <p className={styles.about_fact}>
            АРТИСТ ТЕАТРА И <span>КИНО</span>
          </p>
          <p className={styles.about_fact}>
            ПЕВЕЦ, <span>МУЗЫКАНТ</span> - МУЛЬТИИНСТРУМЕНТАЛИСТ
          </p>
          <p className={styles.about_fact}>
            <span>РЕЗИДЕНТ</span> ЭСТРАДНОГО ТЕАТРА “ВИНИЛ”
          </p>
          <p className={styles.about_fact}>
            АРТИСТ ТЕАТРА <span>“</span>БУФФ<span>”</span>
          </p>
          <p className={styles.about_fact}>
            РАБОТАЛ В “<span>СМЕШНОМ</span> ТЕАТРИКЕ”
          </p>
          <p className={styles.about_fact}>
            А ТАКЖЕ В ТРУППЕ ЮРИЯ <span>ГАЛЬЦЕВА</span>
          </p>
        </div>
        <div className={styles.bottom_decor}>
          <img
            src={decor1}
            alt="decor svg"
          />
          <img
            src={decor2}
            alt="decor svg"
          />
          <img
            src={decor3}
            alt="decor svg"
          />
          <img
            src={decor4}
            alt="decor svg"
          />
        </div>
        <img
          src={decor_ellipse}
          alt="decor ellipse"
          className={styles.decor_ellipse}
        />
      </div>
      <hr className={styles.bottom_decor_line} />
    </section>
  );
};

export default About;
