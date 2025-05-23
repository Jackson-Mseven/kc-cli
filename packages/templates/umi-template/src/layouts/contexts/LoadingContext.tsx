import { createContext, useContext } from 'react';

const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
});

export const useGlobalLoading = () => {
  return useContext(LoadingContext);
};

export default LoadingContext;
