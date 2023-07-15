/* eslint-disable @typescript-eslint/no-explicit-any */
interface UseTokenReturn {
  user: any;
  updateUser: (userData: any) => void;
  wipeUser: () => void;
}

const loadUserFromStorage = (): string | null => {
  const storageUser = window.localStorage.getItem('user');
  if (storageUser) {
    return storageUser;
  }
  return null;
};
const updateUser = (response: any): void => {
  const userData = JSON.stringify(response.data.user);
  window.localStorage.setItem('user', userData);
};

const wipeUser = (): void => {
  window.localStorage.removeItem('user');
};

export const useUser = (): UseTokenReturn => {
  const user = loadUserFromStorage();

  return {
    user,
    updateUser,
    wipeUser,
  };
};
