export function getInputValue(target: HTMLInputElement) {
  let value;
  switch (target.type) {
    case "number":
      value = Number(target.value);
      break;

    default:
      value = target.value;
  }

  return value;
}
