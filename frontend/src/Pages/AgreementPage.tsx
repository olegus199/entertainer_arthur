import { FC } from "react";
import styles from "./AgreementPage.module.scss";
import { Link } from "react-router-dom";

const AgreementPage: FC = () => {
  return (
    <section className={styles.agreement_section}>
      <div className={styles.content}>
        <h2 className={styles.h2}>Пользовательское соглашение</h2>
        <div className={styles.agreement_text}>
          <p>
            Пользователь, оставляя заявку на интернет-сайте{" "}
            <Link
              to="/"
              onClick={() => window.scrollTo(0, 0)}
            >
              artkremnev.ru
            </Link>{" "}
            (далее – «Сайт»), во исполнение требований Федерального закона «О
            персональных данных» от 27.07.2006 г. №152-ФЗ, даёт своё согласие на
            обработку персональных данных (далее – «Согласие») самозанятому
            Кремнёву Артуру Германовичу (далее - Оператор), со следующими
            условиями:
          </p>
          <p>
            1. Согласие дается на обработку персональных данных, не являющихся
            специальными или биометрическими: фамилия, имя, отчество, адрес,
            номера телефона, адрес электронной почты, место работы, занимаемая
            должность, номер основного документа, удостоверяющего личность,
            сведения о дате выдачи указанного документа и выдавшем его органе.
          </p>
          <p>2. Оператор осуществляет обработку персональных данных в целях:</p>
          <p>
            - идентификации Пользователя в рамках Сайта, обработки запросов и
            заявок Пользователя;
          </p>
          <p>
            - заключения с Пользователем любых договоров и их дальнейшего
            исполнения;
          </p>
          <p>
            - предоставления Пользователю информации об оказываемых Оператором
            услугах; информирование Пользователя о предложениях по услугам
            Оператора; о разработке Оператором новых продуктов и услуг; об
            услугах компаний-партнёров, с последующей передачей
            компаниям-партнёрам персональных данных Пользователя в случае
            заинтересованности последнего услугами компаний-партнёров;
          </p>
          <p>- проведение Оператором акций, опросов, исследований.</p>
          <p>3. Персональные данные не являются общедоступными.</p>
          <p>
            4. Данное Согласие дается на обработку персональных данных, как без
            использования средств автоматизации, так и с их использованием.
          </p>
          <p>
            5. Обработка персональных данных означает любые действия или набор
            действий с персональными данными, в том числе автоматических,
            включая, не ограничиваясь перечисленным, сбор; запись;
            систематизация; накопление; хранение; уточнение (обновление,
            изменение); извлечение; использование; передача (распространение,
            предоставление, доступ); удаление; уничтожение.
          </p>
          <p>
            6. Основанием для обработки персональных данных является: ст. 24
            Конституции Российской Федерации; ст. 6 Федерального закона «О
            персональных данных» от 27.07.2006г. №152-ФЗ.
          </p>
          <p>
            7. Персональные данные обрабатываются до момента получения
            Оператором соответствующего письменного или электронного заявления
            от Субъекта персональных данных.
          </p>
          <p>
            8. Согласие может быть отозвано Субъектом персональных данных путём
            направления письменного заявления заказным письмом с уведомлением о
            вручении Оператору по адресу, указанному в начале данного Согласия.
          </p>
          <p>
            9. В случае отзыва субъектом персональных данных или его
            представителем согласия на обработку персональных данных Оператор
            вправе продолжить обработку персональных данных без согласия
            субъекта персональных данных при наличии оснований, указанных в
            пунктах 2 – 11 части 1 статьи 6, части 2 статьи 10 и части 2 статьи
            11 Федерального закона №152-ФЗ «О персональных данных» от 27.07.2006
            г.
          </p>
          <p>
            10. Настоящее согласие действует все время до момента прекращения
            обработки персональных данных, указанных в п.7 и п.8 данного
            Согласия.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AgreementPage;
