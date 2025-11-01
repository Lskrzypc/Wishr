<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { currentUser } = useUser();

console.log('Current User:', currentUser.value);
</script>
<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-32">
    <AppUserInformations />
  </main>
</template>
