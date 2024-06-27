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
import { SectionHeights } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";
import { handle_scroll_to_section } from "../helpres";
import { Link } from "react-router-dom";

type Visibility = "hidden" | "visible";

const NavBar: FC = () => {
  const [mobile_menu_open, set_mobile_menu_open] = useState(false);
  const [links_and_media_classes, set_links_and_media_classes] = useState(
    `${styles.links_and_media}`
  );
  const [mobile_menu_visibility, set_mobile_menu_visibility] =
    useState<Visibility>("visible");
  const [is_mobile, set_is_mobile] = useState(window.innerWidth <= 1010);
  const mobile_menu_ref = useRef<HTMLDivElement>(null);
  const sectionHeights = useSelector<RootState, SectionHeights>(
    (state) => state.sectionHeights.heights
  );
  const sectionYOffset = useSelector<RootState, number>(
    (state) => state.sectionYOffset.y_offset
  );

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
          <Link
            to="/"
            onClick={() =>
              handle_scroll_to_section("hero", sectionHeights, sectionYOffset)
            }
          >
            ГЛАВНАЯ
          </Link>
          <Link
            to="/"
            onClick={() =>
              handle_scroll_to_section("about", sectionHeights, sectionYOffset)
            }
          >
            О СЕБЕ
          </Link>
          <Link
            to="/"
            onClick={() =>
              handle_scroll_to_section(
                "gallery",
                sectionHeights,
                sectionYOffset
              )
            }
          >
            ГАЛЕРЕЯ
          </Link>
          <Link
            to="/"
            onClick={() =>
              handle_scroll_to_section(
                "contacts",
                sectionHeights,
                sectionYOffset
              )
            }
          >
            КОНТАКТЫ
          </Link>
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
