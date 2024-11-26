import { createContext, ReactNode, useContext } from "react";

type CreateContextResult<T> = {
  Provider: React.FC<{ value: T; children: ReactNode }>;
  useContext: (conponentName: string) => T;
};

export function createSafeContext<T>(): CreateContextResult<T> {
  const Context = createContext<T | undefined>(undefined);

  const useSafeContext = (componentName: string) => {
    const context = useContext(Context);

    if (context === undefined) {
      throw new Error(`${componentName} component must be used within a Provider`);
    }

    return context;
  };

  const Provider: React.FC<{ value: T; children: ReactNode }> = ({ value, children }) => {
    return <Context.Provider value={value}>{children}</Context.Provider>;
  };

  return { Provider, useContext: useSafeContext };
}
