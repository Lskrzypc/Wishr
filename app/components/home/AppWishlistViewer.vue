<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between">
      <span class="text-wishr-gray font-bold">Mes wishlists :</span>
      <span class="text-wishr-orange font-bold cursor-pointer">Voir tout</span>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div
        v-for="wishlist in userWishlists"
        :key="wishlist.id"
        class="flex flex-col rounded-3xl p-4 w-full h-32 shadow-lg cursor-pointer justify-end bg-[#2c2c2c]"
        @click="goToWishlist(wishlist.id)"
      >
        <span class="text-wishr-orange font-semibold text-xs mb-1"
          >Wishlist n°{{ userWishlists.indexOf(wishlist) + 1 }}</span
        >

        <span class="font-semibold text-white text-lg justify-end">{{
          wishlist.title
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userWishlists } = useUser();

async function goToWishlist(id: string) {
  const router = useRouter();
  await router.push(`/wishlist/${id}`);
}
</script>
