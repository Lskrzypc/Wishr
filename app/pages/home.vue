<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { userWishlists, userWishesCount } = useUser();
</script>
<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-80">
    <AppUserInformations />
    <div class="flex flex-row justify-between space-x-5 mt-8">
      <AppWishlistCountCard
        title="Wishlists"
        :count="userWishlists.length"
        icon-name="i-lucide-gift"
      />
      <AppWishesCard
        title="Mes vœux"
        :count="userWishesCount"
        icon-name="i-lucide-star"
      />
    </div>

    <AppWishlistViewer class="mt-8" />

    <div class="flex-1" />
    <UIFooter />
  </main>
</template>
