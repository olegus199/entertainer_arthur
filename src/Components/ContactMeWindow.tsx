import styles from "./ContactMeWindow.module.scss";
import { FC, FormEvent, useState } from "react";
import { FaWhatsapp, FaTelegram, FaPhone } from "react-icons/fa6";
import logo from "../assets/logo.svg";
import bg_photo from "../assets/contact_me_photo.jpg";

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactMeWindow: FC = () => {
  const [form_data, set_form_data] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

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

  return (
    <div className={styles.contact_me_window}>
      <div className={styles.content_container}>
        <div className={styles.contact_me_content}>
          <div className={styles.header}>
            <h2 className={styles.h2}>Напишите мне</h2>
            <img
              src={logo}
              alt="logo"
              className={styles.logo}
            />
          </div>
          <form
            className={styles.input_form}
            onSubmit={handle_submit}
          >
            <input
              type="text"
              placeholder="Ваше имя"
              className={styles.input}
              onChange={handle_input_change}
            />
            <input
              type="text"
              placeholder="E-mail"
              className={styles.input}
              onChange={handle_input_change}
            />
            <input
              type="text"
              placeholder="(999) 999 - 99 -99"
              className={styles.input}
              onChange={handle_input_change}
            />
            <input
              type="text"
              placeholder="Ваше сообщение"
              className={styles.input}
              onChange={handle_input_change}
            />
            <button type="submit">Отправить</button>
          </form>
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
          <div className={styles.bg_photo}></div>
        </div>
      </div>
    </div>
  );
};

export default ContactMeWindow;
