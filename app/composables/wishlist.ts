import type { WishlistInterface } from '~~/shared/types/user';

export function useWishlist() {
  const userStore = useUserStore();
  const { currentUser } = useUser();

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

  async function getWishlistById(
    wishlistId: string,
  ): Promise<WishlistInterface | undefined> {
    const foundWishlist = await userStore.fetchWishlist(wishlistId);
    return foundWishlist;
  }

  return {
    getWishlistById,
    userWishlists,
    userWishesCount,
  };
}
