import styles from "./Footer.module.scss";
import { FC, useState } from "react";
import logo from "../assets/logo.svg";
import { TbNotification } from "react-icons/tb";
import {
  FaInstagram,
  FaTelegram,
  FaVk,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";
import ContactMeWindow from "./ContactMeWindow";
import { SectionHeights } from "../types";
import { handle_scroll_to_section } from "../helpres";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

const Footer: FC = () => {
  const [contact_me_visible, set_contact_me_visible] = useState(false);

  const sectionHeights = useSelector<RootState, SectionHeights>(
    (state) => state.sectionHeights.heights
  );
  const sectionYOffset = useSelector<RootState, number>(
    (state) => state.sectionYOffset.y_offset
  );

  const hide_window = (value: boolean) => {
    set_contact_me_visible(value);
  };
  return (
    <footer className={styles.footer}>
      {contact_me_visible && (
        <ContactMeWindow set_window_visible={hide_window} />
      )}
      <div className={styles.content}>
        <div className={styles.left_part}>
          <div className={styles.nav_and_logo}>
            <div className={styles.nav_links}>
              <p
                onClick={() =>
                  handle_scroll_to_section(
                    "hero",
                    sectionHeights,
                    sectionYOffset
                  )
                }
              >
                ГЛАВНАЯ
              </p>
              <p
                onClick={() =>
                  handle_scroll_to_section(
                    "about",
                    sectionHeights,
                    sectionYOffset
                  )
                }
              >
                О СЕБЕ
              </p>
              <p
                onClick={() =>
                  handle_scroll_to_section(
                    "gallery",
                    sectionHeights,
                    sectionYOffset
                  )
                }
              >
                ГАЛЕРЕЯ
              </p>
              <p
                onClick={() =>
                  handle_scroll_to_section(
                    "contacts",
                    sectionHeights,
                    sectionYOffset
                  )
                }
              >
                КОНТАКТЫ
              </p>
            </div>
            <img
              src={logo}
              alt="logo"
              draggable={false}
              className={styles.logo}
            />
          </div>
          <hr className={styles.divider} />
          <div className={styles.feedback}>Жду обратной связи от вас!</div>
          <div
            className={styles.contact_me}
            onClick={() => set_contact_me_visible(true)}
          >
            <TbNotification className={styles.notification_icon} />
            <p className={styles.p_contact_me}>
              <span>написать</span> <span>/</span> <span>позвонить</span>
            </p>
          </div>
        </div>
        <hr className={`${styles.divider} ${styles.divider_middle}`} />
        <div className={styles.right_part}>
          <div className={styles.header}>
            <h3 className={styles.h3}>ПОЮЩИЙ ВЕДУЩИЙ</h3>
            <h2 className={styles.h2}>АРТУР КРЕМНЁВ</h2>
          </div>
          <hr className={styles.divider} />
          <div className={styles.social_media}>Мои соцсети</div>
          <div className={styles.social_media_container}>
            <a
              href="https://www.youtube.com/@ArturKremnev"
              target="_blank"
              className={styles.social_media_unit}
            >
              <FaYoutube className={styles.social_media_icon} />
            </a>
            <a
              href="https://vk.com/kremnevartur"
              target="_blank"
              className={styles.social_media_unit}
            >
              <FaVk className={styles.social_media_icon} />
            </a>
            <a
              href="https://wa.me/79219929153"
              target="_blank"
              className={styles.social_media_unit}
            >
              <FaWhatsapp className={styles.social_media_icon} />
            </a>
            <a
              href="https://t.me/Artur_Kremnev"
              target="_blank"
              className={styles.social_media_unit}
            >
              <FaTelegram className={styles.social_media_icon} />
            </a>
            <a
              href="https://www.instagram.com/artkremnev"
              target="_blank"
              className={styles.social_media_unit}
            >
              <FaInstagram className={styles.social_media_icon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
