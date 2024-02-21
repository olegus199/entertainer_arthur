import { FC, useState } from "react";
import styles from "./Hero.module.scss";
import { HiMiniChevronRight } from "react-icons/hi2";
import ContactMeWindow from "./ContactMeWindow";

const Hero: FC = () => {
  const [contact_me_visible, set_contact_me_visible] = useState(false);

  const hide_window = (value: boolean) => {
    set_contact_me_visible(value);
  };
  return (
    <section className={styles.hero_section}>
      {contact_me_visible && (
        <ContactMeWindow set_window_visible={hide_window} />
      )}
      <div className={styles.content}>
        <h2 className={styles.h2}>Поющий ведущий</h2>
        <h1 className={styles.h1}>
          АРТУР
          <br /> КРЕМНЁВ
        </h1>
        <div
          className={styles.contact_me_button}
          onClick={() => set_contact_me_visible(true)}
        >
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
