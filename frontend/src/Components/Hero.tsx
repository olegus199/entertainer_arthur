import { FC, useEffect, useState } from "react";
import styles from "./Hero.module.scss";
import { HiMiniChevronRight } from "react-icons/hi2";
import ContactMeWindow from "./ContactMeWindow";
import logo_bright from "../assets/logo_filled.svg";
import logo_dark from "../assets/logo_dark.svg";
import bg_photo from "../assets/contact_me_photo.jpg";
import bg_texture from "../assets/texture_contact_me.jpg";
import bg_mask from "../assets/bg_mask.svg";

const images = [logo_bright, logo_dark, bg_photo, bg_texture, bg_mask];

const Hero: FC = () => {
  const [contact_me_visible, set_contact_me_visible] = useState(false);

  const hide_window = (value: boolean) => {
    set_contact_me_visible(value);
  };

  useEffect(() => {
    images.forEach((img_url) => {
      const image = new Image();
      image.src = img_url;
    });
  }, []);

  return (
    <section className={styles.hero_section}>
      {contact_me_visible && (
        <ContactMeWindow
          logo_bright={logo_bright}
          logo_dark={logo_dark}
          bg_photo={bg_photo}
          bg_texture={bg_texture}
          bg_mask={bg_mask}
          set_window_visible={hide_window}
        />
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
