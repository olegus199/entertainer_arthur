import styles from "./Meeting.module.scss";
import { FC, useEffect, useRef } from "react";

const Meeting: FC = () => {
  const rows_refs = {
    row_1: useRef<HTMLDivElement>(null),
    row_2: useRef<HTMLDivElement>(null),
    row_3: useRef<HTMLDivElement>(null),
    row_4: useRef<HTMLDivElement>(null),
    row_5: useRef<HTMLDivElement>(null),
    row_6: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(`${styles.row_anima}`);
          } else {
            entry.target.classList.remove(`${styles.row_anima}`);
          }
        });
      },
      {
        threshold: 1,
      }
    );

    const refs_arr = Object.values(rows_refs);

    refs_arr.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section className={styles.meeting}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>как мы общаемся
          </p>
          <h2 className={styles.h2}>На встрече:</h2>
        </div>
        <div className={styles.meeting_progress}>
          <div
            ref={rows_refs.row_1}
            className={styles.row}
          >
            <div className={styles.column_circle}>
              <div className={styles.meeting_circle}></div>
            </div>
            <div className={`${styles.column_step} ${styles.column_step_1}`}>
              <p className={styles.meeting_step}>
                Мы встречаемся в уютном кафе и <span>знакомимся.</span>
              </p>
            </div>
          </div>
          <div
            ref={rows_refs.row_2}
            className={styles.row}
          >
            <div className={styles.column_circle}>
              <div className={styles.meeting_circle}></div>
            </div>
            <div className={`${styles.column_step} ${styles.column_step_2}`}>
              <p className={styles.meeting_step}>
                На основе Ваших пожеланий и моих предложений, составляем
                сценарий <span>Вашего праздника.</span>
              </p>
            </div>
          </div>
          <div
            ref={rows_refs.row_3}
            className={styles.row}
          >
            <div className={styles.column_circle}>
              <div className={styles.meeting_circle}></div>
            </div>
            <div className={`${styles.column_step} ${styles.column_step_3}`}>
              <p className={styles.meeting_step}>
                За чашечкой чая или кофе, <span>весело</span> проводим время.{" "}
              </p>
            </div>
          </div>
          <div
            ref={rows_refs.row_4}
            className={styles.row}
          >
            <div className={styles.column_circle}>
              <div className={styles.meeting_circle}></div>
            </div>
            <div className={`${styles.column_step} ${styles.column_step_4}`}>
              <p className={styles.meeting_step}>
                Подбираем необходимые составляющие для создания{" "}
                <span>уникального торжества.</span>
              </p>
            </div>
          </div>
          <div
            ref={rows_refs.row_5}
            className={styles.row}
          >
            <div className={styles.column_circle}>
              <div className={styles.meeting_circle}></div>
            </div>
            <div className={`${styles.column_step} ${styles.column_step_5}`}>
              <p className={styles.meeting_step}>
                Обсуждаем <span>бюджет</span> мероприятия.
              </p>
            </div>
          </div>
          <div
            ref={rows_refs.row_6}
            className={styles.row}
          >
            <div className={styles.column_circle}>
              <div className={styles.meeting_circle}></div>
            </div>
            <div className={`${styles.column_step} ${styles.column_step_6}`}>
              <p className={styles.meeting_step}>
                C приятными эмоциями <span>начинаем готовиться</span> к Вашему
                празднику!
              </p>
            </div>
          </div>
          <div className={styles.progress_line}></div>
        </div>
      </div>
    </section>
  );
};

export default Meeting;
