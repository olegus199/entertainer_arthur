import { SectionHeights, SectionNames } from "./types";

type InputRef = React.RefObject<HTMLInputElement>;

export const handle_enter_key_down = (
  e: React.KeyboardEvent<HTMLInputElement>,
  idx: number,
  input_refs: InputRef[]
) => {
  if (e.key === "Enter") {
    if (input_refs[idx].current?.value) {
      e.preventDefault();
      if (idx < input_refs.length - 1) {
        input_refs[idx + 1].current?.focus();
      }
    }
  }
};

const phone_number = "+79219929153";
export function handle_phone_click() {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(
      navigator.userAgent
    )
  ) {
    window.location.href = `tel:${phone_number}`;
  } else {
    window.location.href = `sms:${phone_number}`;
  }
}

export function handle_scroll_to_section(
  section_name: SectionNames,
  heights: SectionHeights,
  y_offset: number
) {
  let y: number;
  switch (section_name) {
    case "hero":
      window.scrollTo({ top: 0, behavior: "smooth" });
      break;
    case "about":
      y = heights.about + window.scrollY - y_offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      break;
    case "gallery":
      y = heights.gallery + window.scrollY - y_offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      break;
    case "contacts":
      y = heights.contacts + window.scrollY - y_offset;
      window.scrollTo({ top: y, behavior: "smooth" });
      break;
  }
}
