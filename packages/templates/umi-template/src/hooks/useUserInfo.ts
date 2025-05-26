import { useUserInfoStore } from '@/store';

const useUserInfo = () => {
  const { userInfo, setUserInfo } = useUserInfoStore();
  if (!userInfo) {
    fetch('/api/user')
      .then((res) => res.json())
      .then((res) => {
        setUserInfo(res);
      });
  }
  return userInfo;
};

export default useUserInfo;
