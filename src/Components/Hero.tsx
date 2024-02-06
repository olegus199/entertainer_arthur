import { FC } from "react";
import styles from "./Hero.module.scss";
import { HiMiniChevronRight } from "react-icons/hi2";
import ContactMeWindow from "./ContactMeWindow";

const Hero: FC = () => {
  return (
    <section className={styles.hero_section}>
      <ContactMeWindow />
      <div className={styles.content}>
        <h2 className={styles.h2}>Поющий ведущий</h2>
        <h1 className={styles.h1}>
          АРТУР
          <br /> КРЕМНЁВ
        </h1>
        <div className={styles.contact_me_button}>
          <p className={styles.contact_me_p}>
            СВЯЖИТЕСЬ СО <span>МНОЙ</span>
          </p>
          <HiMiniChevronRight className={styles.chevron} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
