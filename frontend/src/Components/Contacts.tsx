import ContactMeWindow from "./ContactMeWindow";
import styles from "./Contacts.module.scss";
import { FC } from "react";

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
      </div>
    </section>
  );
};

export default Contacts;
