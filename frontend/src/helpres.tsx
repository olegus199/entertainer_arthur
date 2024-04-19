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
