import styles from "./ContactMeWindow.module.scss";
import { FC, useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaTelegram, FaPhone } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";
import logo_bright from "../assets/logo_filled.svg";
import logo_dark from "../assets/logo_dark.svg";
import bg_photo from "../assets/contact_me_photo.jpg";
import EmailForm from "./EmailForm";
import { handle_phone_click } from "../helpres";

interface ContactMeWindowProps {
  set_window_visible: (value: boolean) => void;
}

const ContactMeWindow: FC<ContactMeWindowProps> = ({ set_window_visible }) => {
  const contact_me_ref = useRef<HTMLDivElement>(null);
  const [is_small_screen, set_is_small_screen] = useState(
    window.innerWidth <= 1118
  );
  const [logo, set_logo] = useState("");

  // Handling closing window on outside click
  useEffect(() => {
    const handle_click_outside = (e: MouseEvent) => {
      if (contact_me_ref.current) {
        if (!contact_me_ref.current.contains(e.target as Node)) {
          set_window_visible(false);
        }
      }
    };

    document.addEventListener("mousedown", handle_click_outside);

    return () => {
      document.removeEventListener("mousedown", handle_click_outside);
    };
  }, []);

  // Handling resize and logo changing
  useEffect(() => {
    const handle_resize = () => {
      set_is_small_screen(window.innerWidth <= 1118);
    };

    window.addEventListener("resize", handle_resize);

    return () => {
      window.removeEventListener("resize", handle_resize);
    };
  }, []);

  useEffect(() => {
    if (is_small_screen) {
      set_logo(logo_dark);
    } else {
      set_logo(logo_bright);
    }
  }, [is_small_screen]);

  // Handling esc key down
  useEffect(() => {
    const handle_esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        set_window_visible(false);
      }
    };

    document.addEventListener("keydown", handle_esc);

    return () => {
      document.removeEventListener("keydown", handle_esc);
    };
  }, []);

  // Rendering component
  return (
    <div className={styles.contact_me_window}>
      <div
        ref={contact_me_ref}
        className={styles.content_container}
      >
        <FaXmark
          className={styles.close_icon}
          onClick={() => set_window_visible(false)}
        />
        <div className={styles.first_child}>
          <div className={styles.header}>
            <h2 className={styles.h2}>Напишите мне</h2>
            <img
              src={logo}
              className={styles.logo}
            />
          </div>
          <EmailForm />
        </div>
        <div>
          <h2 className={styles.h2}>Или позвоните</h2>
          <div className={styles.call_options}>
            <a
              href="https://wa.me/79219929153"
              target="_blank"
              className={styles.link_container}
            >
              <FaWhatsapp className={`${styles.icon} ${styles.whatsapp}`} />
            </a>
            <a
              href="https://t.me/Artur_Kremnev"
              target="_blank"
              className={styles.link_container}
            >
              <FaTelegram className={`${styles.icon} ${styles.telegram}`} />
            </a>
            <FaPhone
              className={`${styles.icon} ${styles.number}`}
              onClick={handle_phone_click}
            />
          </div>
          <div className={styles.image_wrapper}>
            <img
              src={bg_photo}
              alt="background photo"
              className={styles.bg_photo}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMeWindow;
