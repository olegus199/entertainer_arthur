import styles from "./Advantages.module.scss";
import React, { FC, useEffect, useRef } from "react";
import star from "../assets/icons/star.svg";
import vocalist from "../assets/icons/vocalist.svg";
import quality from "../assets/icons/quality.svg";
import reliability from "../assets/icons/reliability.svg";
import decor_vinyl from "../assets/decor_vinyl.svg";

interface AdvantageWidget {
  title: string;
  icon: string;
  description: string;
}

const advantages_widgets: AdvantageWidget[] = [
  {
    title: "Опыт",
    icon: star,
    description: `Имею большой опыт в проведении и организации развлекательных мероприятий любой сложности: от юбилеев, свадебных торжеств, корпоративов до значимых мероприятий с участием высокопоставленных лиц администрации города!`,
  },
  {
    title: "Вокал",
    icon: vocalist,
    description: `Я - поющий ведущий, саксофонист, гитарист и музыкант. Был гостем в программе “Привет, Андрей”, посмотерть и послушать можно здесь`,
  },
  {
    title: "Качество",
    icon: quality,
    description: `Провожу праздники весело, ярко, зажигательно и динамично! Современный подход, веселые конкурсы, никакой пошлости, виртуозная импровизация, только добрые шутки, море музыки и позитива! А вот моё промо видео`,
  },
  {
    title: "Стабильность",
    icon: reliability,
    description: `Любое торжество с моим участием пройдет гарантированно на высоком уровне и несомненно запомнится Вам и Вашим гостям, будь то свадьба, юбилей, корпоративный праздник.`,
  },
];

const Advantages: FC = () => {
  const advantages_refs = Array.from({ length: 4 }, () =>
    useRef<HTMLDivElement>(null)
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(`${styles.widget_anima}`);
          }
        });
      },
      {
        threshold: 0.7,
      }
    );

    advantages_refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className={styles.advantages_section}>
      <div className={styles.content}>
        <div className={styles.header}>
          <p className={styles.header_aux}>
            <span></span>почему я?
          </p>
          <h2 className={styles.h2}>Мои преимущества</h2>
        </div>
        <div className={styles.advantages_container}>
          {advantages_widgets.map((widget, idx) => {
            const split_malahov = widget.description.split("здесь");
            const split_promo = widget.description.split("промо видео");

            return (
              <div
                key={idx}
                ref={advantages_refs[idx]}
                className={styles.advantages_widget}
              >
                <div className={styles.widget_header}>
                  <p className={styles.widget_title}>{widget.title}</p>
                  <img
                    src={widget.icon}
                    alt="icon"
                    draggable={false}
                    className={styles.widget_icon}
                  />
                </div>
                {widget.title === "Качество" ? (
                  <p className={styles.widget_description}>
                    {split_promo.map((part, partIdx) => (
                      <React.Fragment key={partIdx}>
                        {part}
                        {partIdx < split_promo.length - 1 && (
                          <a
                            href="https://www.youtube.com/watch?v=oNCP9ep7_O0&list=PLGAC0A0yGLqtG5oGeCk1e3vRXNalbqJnd&index=26"
                            target="_blank"
                          >
                            промо видео
                          </a>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                ) : (
                  <p className={styles.widget_description}>
                    {split_malahov.map((part, partIdx) => (
                      <React.Fragment key={partIdx}>
                        {part}
                        {partIdx < split_malahov.length - 1 && (
                          <a
                            href="https://www.youtube.com/watch?v=e1hc3O213zg"
                            target="_blank"
                          >
                            здесь
                          </a>
                        )}
                      </React.Fragment>
                    ))}
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <img
          src={decor_vinyl}
          alt="decor vinyl"
          className={styles.decor_vinyl}
          draggable={false}
        />
      </div>
    </section>
  );
};

export default Advantages;
