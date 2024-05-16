import styles from "./NavBar.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import logo from "../assets/logo.svg";
import { IoMenu } from "react-icons/io5";
import { HiMiniXMark } from "react-icons/hi2";
import {
  FaYoutube,
  FaVk,
  FaWhatsapp,
  FaTelegram,
  FaInstagram,
} from "react-icons/fa6";
import { SectionNames } from "../types";

type Visibility = "hidden" | "visible";

interface NavBarProps {
  handle_scroll_to_section: (section_name: SectionNames) => void;
}

const NavBar: FC<NavBarProps> = ({ handle_scroll_to_section }) => {
  const [mobile_menu_open, set_mobile_menu_open] = useState(false);
  const [links_and_media_classes, set_links_and_media_classes] = useState(
    `${styles.links_and_media}`
  );
  const [mobile_menu_visibility, set_mobile_menu_visibility] =
    useState<Visibility>("visible");
  const [is_mobile, set_is_mobile] = useState(window.innerWidth <= 1010);
  const mobile_menu_ref = useRef<HTMLDivElement>(null);

  function handle_logo_click() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  useEffect(() => {
    const handle_resize = () => {
      set_is_mobile(window.innerWidth <= 1010);
    };

    window.addEventListener("resize", handle_resize);

    return () => {
      window.removeEventListener("resize", handle_resize);
    };
  }, []);

  useEffect(() => {
    const handle_click_outside = (e: MouseEvent) => {
      if (mobile_menu_ref.current && is_mobile) {
        if (!mobile_menu_ref.current.contains(e.target as Node)) {
          set_mobile_menu_open(false);
        }
      }
    };

    document.addEventListener("mousedown", handle_click_outside);

    return () => {
      document.removeEventListener("mousedown", handle_click_outside);
    };
  }, [is_mobile]);

  useEffect(() => {
    if (mobile_menu_open) {
      set_links_and_media_classes(
        `${styles.links_and_media} ${styles.menu_open}`
      );
      set_mobile_menu_visibility("visible");
    } else {
      set_links_and_media_classes(`${styles.links_and_media}`);
      setTimeout(() => {
        set_mobile_menu_visibility("hidden");
      }, 300);
    }
  }, [mobile_menu_open]);

  return (
    <nav className={styles.nav_bar}>
      <img
        src={logo}
        alt="logo"
        className={styles.logo}
        draggable={false}
        onClick={handle_logo_click}
      />
      <div
        className={styles.mobile_menu_icons_container}
        onClick={() => set_mobile_menu_open(!mobile_menu_open)}
      >
        {!mobile_menu_open && (
          <IoMenu className={`${styles.mobile_menu_icon}`} />
        )}
        {mobile_menu_open && (
          <HiMiniXMark className={`${styles.mobile_menu_icon}`} />
        )}
      </div>
      <div
        ref={mobile_menu_ref}
        className={links_and_media_classes}
        style={
          is_mobile
            ? { visibility: `${mobile_menu_visibility}` }
            : { visibility: "visible" }
        }
      >
        <div className={styles.nav_links}>
          <p onClick={() => handle_scroll_to_section("hero")}>ГЛАВНАЯ</p>
          <p onClick={() => handle_scroll_to_section("about")}>О СЕБЕ</p>
          <p onClick={() => handle_scroll_to_section("gallery")}>ГАЛЕРЕЯ</p>
          <p onClick={() => handle_scroll_to_section("contacts")}>КОНТАКТЫ</p>
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
      </div>
    </nav>
  );
};

export default NavBar;
