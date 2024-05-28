import { useState } from "react";

export const useBooleanToggle = (initialValue?: boolean) => {
  const [state, setState] = useState(initialValue ?? false);

  const enable = () => setState(true);

  const disable = () => setState(false);

  return {
    active: state,
    enable,
    disable,
  };
};
