import { useBoolean } from 'ahooks';
import React, { createContext, PropsWithChildren, useContext } from 'react';

interface GlobalLoadingContextInter {
  globalLoading: boolean;
  setGlobalLoading: (value: boolean) => void;
  setGlobalLoadingTrue: () => void;
  setGlobalLoadingFalse: () => void;
  toggleGlobalLoading: () => void;
}

const GlobalLoadingContext = createContext<GlobalLoadingContextInter>({
  globalLoading: false,
  setGlobalLoading: () => undefined,
  setGlobalLoadingTrue: () => undefined,
  setGlobalLoadingFalse: () => undefined,
  toggleGlobalLoading: () => undefined,
});

export default GlobalLoadingContext;

export const GlobalLoadingContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [
    globalLoading,
    {
      set: setGlobalLoading,
      setTrue: setGlobalLoadingTrue,
      setFalse: setGlobalLoadingFalse,
      toggle: toggleGlobalLoading,
    },
  ] = useBoolean(false);

  return (
    <GlobalLoadingContext.Provider
      value={{
        globalLoading,
        setGlobalLoading,
        setGlobalLoadingTrue,
        setGlobalLoadingFalse,
        toggleGlobalLoading,
      }}
    >
      {children}
    </GlobalLoadingContext.Provider>
  );
};

export const useGlobalLoading = () => {
  return useContext(GlobalLoadingContext);
};
