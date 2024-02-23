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
