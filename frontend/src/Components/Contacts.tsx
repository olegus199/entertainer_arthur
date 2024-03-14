import styles from "./Contacts.module.scss";
import { FC } from "react";
import EmailForm from "./EmailForm";

const Contacts: FC = () => {
  return (
    <section className={styles.contacts_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>есть вопросы?
          </p>
          <h2 className={styles.h2}>Напишите мне!</h2>
        </div>
        <div className={styles.email_form}>
          <EmailForm />
        </div>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>любите пообщаться?
          </p>
          <h2 className={styles.h2}>Можете звонить!</h2>
        </div>
        <div className={styles.call_options}>
          <div className={styles.option}>
            <p className={styles.option_name}>телефон</p>
            <p className={styles.option_phone}>+7 (921) 992 - 91 - 53</p>
          </div>
          <div className={styles.option}>
            <p className={styles.option_name}>whatsapp</p>
            <a
              href="https://wa.me/79219929153"
              target="_blank"
              className={styles.option_whatsapp}
            >
              WhatsApp
            </a>
          </div>
          <div className={styles.option}>
            <p className={styles.option_name}>telegram</p>
            <a
              href="https://t.me/Artur_Kremnev"
              target="_blank"
              className={styles.option_telegram}
            >
              Telegram
            </a>
          </div>
        </div>
        <div className={styles.recommendation_container}>
          <p className={styles.recommendation_text}>
            <span className={styles.text_red}>Рекомендую</span> не
            ограничиваться сухими фактами, а найти удобное для{" "}
            <span className={styles.text_bold}>Вас</span> время для личной
            встречи!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
