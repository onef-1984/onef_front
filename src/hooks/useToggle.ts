import { useState } from "react";

const useToggle = <T extends string, G extends string>(type: T, toggled: G) => {
  const [state, setState] = useState<T | G>(type);

  const handleToggle = () => {
    setState((prevState) => (prevState === toggled ? type : toggled));
  };

  return [state, handleToggle] as const;
};

export default useToggle;
