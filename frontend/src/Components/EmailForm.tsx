import axios from "axios";
import styles from "./EmailForm.module.scss";
import { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { z } from "zod";
import { handle_enter_key_down } from "../helpres";

interface FormData {
  name: string;
  email: string;
  number: string;
  message: string;
}

const phone_regex = /^\d+$/;

const EmailForm: FC = () => {
  const [form_data, set_form_data] = useState<FormData>({
    name: "",
    email: "",
    number: "",
    message: "",
  });
  const [letter_counter, set_letter_counter] = useState({
    name: 0,
    message: 0,
  });
  const email_schema = z.string().email();
  const [email_valid, set_email_valid] = useState<boolean | null>(null);
  const [button_disabled, set_button_disabled] = useState(true);
  const input_refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Handling input change and submit
  const handle_input_change = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;

    if (name === "name" && value.length > 45) {
      return;
    }

    if (name === "number") {
      let formatted_value = value.replace(/[^\d]/g, "");
      set_form_data((prev) => ({
        ...prev,
        number: "+7" + formatted_value,
      }));
      return;
    }

    if (name === "message" && value.length > 500) {
      return;
    }

    set_form_data((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handle_submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form_urlencoded = convert_to_urlencoded(form_data);
    const send_form = async () => {
      try {
        const response = await axios.post(
          "https://artkremnev.ru/api/message",
          form_urlencoded,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        if (response.status === 200) {
          alert("Письмо успешно отправлено!");
        }
      } catch (error) {
        alert("Что-то пошло не так!");
        console.error(error);
      }
    };

    send_form();
  };

  const convert_to_urlencoded = (data_object: FormData): string => {
    let converted_form_data = new URLSearchParams();
    let property: keyof FormData;

    for (property in data_object) {
      converted_form_data.append(property, data_object[property] as string);
    }

    return converted_form_data.toString();
  };

  // Handling email validity
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    set_email_valid(null);

    if (form_data.email !== "") {
      if (timer) {
        clearTimeout(timer);
      }
      const validation_info = email_schema.safeParse(form_data.email);
      if (validation_info.success) {
        set_email_valid(true);
      } else {
        set_email_valid(null);
        timer = setTimeout(() => {
          set_email_valid(false);
        }, 500);
      }
    } else {
      set_email_valid(null);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [form_data.email]);

  // Handle number validity
  const handle_phone_input = (e: ChangeEvent<HTMLInputElement>) => {
    if (!phone_regex.test(e.target.value)) {
      e.target.value = e.target.value.replace(/[^\d]/g, "");
    }

    let formatted_value = e.target.value.replace(/[^\d]/g, "");

    if (e.target.value.length > 19) {
      return;
    }

    if (formatted_value.length > 0) {
      formatted_value = `(${formatted_value}`;
    }

    if (formatted_value.length > 4) {
      formatted_value = `${formatted_value.slice(
        0,
        4
      )}) ${formatted_value.slice(4)}`;
    }

    if (formatted_value.length > 9) {
      formatted_value = `${formatted_value.slice(
        0,
        9
      )} - ${formatted_value.slice(9)}`;
    }

    if (formatted_value.length > 14) {
      formatted_value = `${formatted_value.slice(
        0,
        14
      )} - ${formatted_value.slice(14)}`;
    }

    e.target.value = formatted_value;
  };

  // Handling button enabling/disabling
  useEffect(() => {
    const form_values = Object.values(form_data);
    const not_empty = form_values.every((field) => field !== "");

    if (not_empty && email_valid) {
      set_button_disabled(false);
    } else {
      set_button_disabled(true);
    }
  }, [form_data, email_valid]);

  // Handling counter update
  useEffect(() => {
    set_letter_counter((prev) => ({
      ...prev,
      name: form_data.name.length,
    }));
    set_letter_counter((prev) => ({
      ...prev,
      message: form_data.message.length,
    }));
  }, [form_data.name, form_data.message]);

  return (
    <form
      className={styles.input_form}
      onSubmit={handle_submit}
    >
      <div className={styles.input_container}>
        <input
          ref={input_refs[0]}
          type="text"
          name="name"
          placeholder="Ваше имя"
          maxLength={45}
          className={styles.input}
          onChange={handle_input_change}
          onKeyDown={(e) => handle_enter_key_down(e, 0, input_refs)}
        />
        <div className={styles.max_size_counter}>{letter_counter.name}/45</div>
      </div>
      <div className={styles.input_container}>
        {!email_valid && email_valid !== null && (
          <p className={styles.email_warning}>некорректный email</p>
        )}
        <input
          ref={input_refs[1]}
          type="text"
          name="email"
          placeholder="E-mail"
          className={styles.input}
          style={{
            color: `${
              !email_valid && email_valid !== null ? "#eb4124" : "#0e0b0c"
            }`,
          }}
          onChange={handle_input_change}
          onKeyDown={(e) => handle_enter_key_down(e, 1, input_refs)}
        />
      </div>
      <div className={styles.input_container}>
        <p className={styles.phone_code}>+7</p>
        <input
          ref={input_refs[2]}
          type="tel"
          name="number"
          placeholder="(999) 999 - 99 - 99"
          maxLength={19}
          className={`${styles.input} ${styles.phone_input}`}
          onChange={handle_input_change}
          onKeyDown={(e) => handle_enter_key_down(e, 2, input_refs)}
          onInput={handle_phone_input}
        />
      </div>
      <div className={styles.input_container}>
        <input
          ref={input_refs[3]}
          type="text"
          name="message"
          placeholder="Ваше сообщение"
          maxLength={500}
          className={styles.input}
          onChange={handle_input_change}
          onKeyDown={(e) => handle_enter_key_down(e, 3, input_refs)}
        />
        <div className={styles.max_size_counter}>
          {letter_counter.message}/500
        </div>
      </div>
      <button
        type="submit"
        disabled={button_disabled}
      >
        Отправить
      </button>
    </form>
  );
};

export default EmailForm;
