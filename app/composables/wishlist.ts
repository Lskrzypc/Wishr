import type { WishlistInterface } from '~~/shared/types/user';

export function useWishlist() {
  const userStore = useUserStore();

  async function getWishlistById(
    wishlistId: string,
  ): Promise<WishlistInterface | undefined> {
    const foundWishlist = await userStore.fetchWishlist(wishlistId);
    return foundWishlist;
  }

  return {
    getWishlistById,
  };
}
