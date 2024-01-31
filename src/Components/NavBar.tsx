import styles from "./NavBar.module.scss";
import { FC } from "react";
import logo from "../assets/logo.svg";
import {
  FaYoutube,
  FaVk,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa6";

const NavBar: FC = () => {
  return (
    <nav className={styles.nav_bar}>
      <div className={styles.logo_container}>
        <img
          src={logo}
          alt="logo"
          className={styles.logo}
        />
      </div>
      <div className={styles.nav_links}>
        <p>ГЛАВНАЯ</p>
        <p>О СЕБЕ</p>
        <p>ГАЛЕРЕЯ</p>
        <p>КОНТАКТЫ</p>
      </div>
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
    </nav>
  );
};

export default NavBar;
