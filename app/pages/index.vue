<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { currentUser } = useUser();

console.log('Current User:', currentUser.value);
</script>
<template>
  <main class="flex flex-col min-h-screen">
    <UIHeader />
    <AppWishlistGreetings
      :first-name="currentUser?.personalInformation.firstName || ''"
    />
    <AppWishlistOverview />
  </main>
</template>
