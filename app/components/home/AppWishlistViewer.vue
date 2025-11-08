<template>
  <div class="flex flex-col">
    <div class="flex flex-row justify-between">
      <span class="text-wishr-gray font-bold">Mes wishlists :</span>
      <span class="text-wishr-orange font-bold cursor-pointer">Voir tout</span>
    </div>
    <div class="mt-4 flex flex-col space-y-4">
      <div
        v-for="wishlist in userWishlists"
        :key="wishlist.id"
        class="w-full h-32 bg-wishr-orange rounded-2xl p-4 flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow"
      >
        <span class="font-bold text-lg">{{ wishlist.title }}</span>
        <span class="text-sm text-wishr-gray">
          {{ wishlist.items?.length }} vœux
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { userWishlists } = useUser();
</script>
