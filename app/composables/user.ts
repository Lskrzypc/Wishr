import type { UserInterface } from '~~/shared/types/user';

export function useUser() {
  const userStore = useUserStore();

  const currentUser = computed(() => userStore.user);

  async function updateUser(userId: string, updates: Partial<UserInterface>) {
    await userStore.updateUserByUserId(userId, updates);
  }

  function deleteUser(userId: string) {
    userStore.deleteUserByUserId(userId);
  }

  async function addUser(user: UserInterface) {
    await userStore.addUser(user);
  }

  function fetchUser(userId: string) {
    userStore.fetchUser(userId);
  }

  async function userExists(userId: string): Promise<boolean> {
    return await userStore.userExists(userId);
  }

  return {
    currentUser,
    updateUser,
    deleteUser,
    userExists,
    addUser,
    fetchUser,
  };
}
