import type { UserInterface, WishlistInterface } from '~~/shared/types/user';

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

  const userWishlists = computed<WishlistInterface[]>(() => {
    return currentUser.value?.wishlists || [];
  });

  const userWishesCount = computed(() => {
    const wishlists = userWishlists.value;
    let totalWishes = 0;
    wishlists.forEach((wishlist) => {
      totalWishes += wishlist.items?.length || 0;
    });
    return totalWishes;
  });

  function computeFriendsCount(user: UserInterface): number {
    if (!user || !user.friends) return 0;
    return user.friends.length;
  }

  return {
    currentUser,
    updateUser,
    deleteUser,
    userExists,
    addUser,
    fetchUser,
    computeFriendsCount,
    userWishlists,
    userWishesCount,
  };
}
