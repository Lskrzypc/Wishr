<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts"></script>
<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-80">
    <AppUserInformations />
    <div class="flex flex-row justify-between space-x-5 mt-8">
      <AppReservedWishesCard
        title="Vœux réservés"
        :count="4"
        icon-name="i-lucide-gift"
      />
      <AppWishesCard title="Mes vœux" :count="27" icon-name="i-lucide-star" />
    </div>

    <AppWishlistViewer class="mt-8" />

    <div class="flex-1" />
    <UIFooter />
  </main>
</template>
