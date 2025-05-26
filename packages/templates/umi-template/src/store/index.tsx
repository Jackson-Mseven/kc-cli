import { create } from 'zustand';

interface UserInfo {
  id: number;
  name: string;
  avatar: string;
}

interface UserInfoStore {
  userInfo: UserInfo | null;
  setUserInfo: (userInfo: UserInfo) => void;
}

const useUserInfoStore = create<UserInfoStore>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => {
    set(() => ({ userInfo }));
  },
}));

export { useUserInfoStore };
