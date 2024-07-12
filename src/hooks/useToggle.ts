import { useState } from "react";

const useToggle = (type: string, toggled: string) => {
  const [state, setState] = useState(type);

  const handleToggle = () => {
    setState((prevState) => (prevState === toggled ? type : toggled));
  };

  return [state, handleToggle] as const;
};

export default useToggle;
