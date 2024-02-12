import styles from "./ContactMeWindow.module.scss";
import { FC, FormEvent, useEffect, useRef, useState } from "react";
import { FaWhatsapp, FaTelegram, FaPhone } from "react-icons/fa6";
import logo_bright from "../assets/logo_filled.svg";
import logo_dark from "../assets/logo_dark.svg";
import bg_photo from "../assets/contact_me_photo.jpg";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface ContactMeWindowProps {
  set_window_visible: (value: boolean) => void;
}

const ContactMeWindow: FC<ContactMeWindowProps> = ({ set_window_visible }) => {
  const [form_data, set_form_data] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const contact_me_ref = useRef<HTMLDivElement>(null);
  const [is_small_screen, set_is_small_screen] = useState(
    window.innerWidth <= 1118
  );
  const [logo, set_logo] = useState("");

  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    set_form_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handle_submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(form_data);
  };

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

  return (
    <div className={styles.contact_me_window}>
      <div
        ref={contact_me_ref}
        className={styles.content_container}
      >
        <div className={styles.first_child}>
          <div className={styles.header}>
            <h2 className={styles.h2}>Напишите мне</h2>
            <img
              src={logo}
              className={styles.logo}
            />
          </div>
          <form
            className={styles.input_form}
            onSubmit={handle_submit}
          >
            <input
              type="text"
              name="name"
              placeholder="Ваше имя"
              className={styles.input}
              onChange={handle_input_change}
            />
            <input
              type="text"
              name="email"
              placeholder="E-mail"
              className={styles.input}
              onChange={handle_input_change}
            />
            <input
              type="text"
              name="phone"
              placeholder="+7 (999) 999 - 99 -99"
              className={styles.input}
              onChange={handle_input_change}
            />
            <input
              type="text"
              name="message"
              placeholder="Ваше сообщение"
              className={styles.input}
              onChange={handle_input_change}
            />
            <button type="submit">Отправить</button>
          </form>
        </div>
        <div>
          <h2 className={styles.h2}>Или позвоните</h2>
          <div className={styles.call_options}>
            <FaWhatsapp className={`${styles.icon} ${styles.whatsapp}`} />
            <FaTelegram className={`${styles.icon} ${styles.telegram}`} />
            <FaPhone className={`${styles.icon} ${styles.phone}`} />
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
