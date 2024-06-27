import { FC, useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { HiMiniChevronRight } from "react-icons/hi2";
import ContactMeWindow from "./ContactMeWindow";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

let timer: NodeJS.Timeout;

interface animationDelays {
  h1: number;
  h2: number;
  contactMe: number;
}

const initialAnimationDelays: animationDelays = {
  h1: 1.5,
  h2: 1.3,
  contactMe: 2,
};

const postInitialAnimationDelays: animationDelays = {
  h1: 0,
  h2: 0.3,
  contactMe: 0.6,
};

const Hero: FC = () => {
  const [contact_me_visible, set_contact_me_visible] = useState(false);
  const isInitial = useSelector<RootState, boolean>(
    (state) => state.isInitialLoad.isInitial
  );
  const [animationDelays, setAnimationDelays] = useState<animationDelays>(
    isInitial ? initialAnimationDelays : postInitialAnimationDelays
  );

  const hide_window = (value: boolean) => {
    set_contact_me_visible(value);
  };

  useEffect(() => {
    clearTimeout(timer);
    if (!isInitial) {
      timer = setTimeout(() => {
        setAnimationDelays(postInitialAnimationDelays);
      }, 3000);
    }
  }, [isInitial]);

  return (
    <section className={styles.hero_section}>
      {contact_me_visible && (
        <ContactMeWindow set_window_visible={hide_window} />
      )}
      <div className={styles.content}>
        <h2
          className={styles.h2}
          style={{ animationDelay: `${animationDelays.h2}s` }}
        >
          Поющий ведущий
        </h2>
        <h1
          className={styles.h1}
          style={{ animationDelay: `${animationDelays.h1}s` }}
        >
          АРТУР
          <br /> КРЕМНЁВ
        </h1>
        <div
          className={styles.contact_me_button}
          style={{ animationDelay: `${animationDelays.contactMe}s` }}
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
