<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-80">
    <div class="flex flex-col w-full h-full items-center justify-center">
      <h1 class="text-3xl font-bold mt-12">Hop hop hop !</h1>
      <p class="mt-4 text-gray-600 text-center">
        La fonctionnalité n'est pas encore prête, mais le développeur travaille
        dur pour livrer au plus vite 🤩
      </p>
      <UButton class="mt-6" color="primary" @click="navigateTo('/home')"
        >Retour à l'accueil</UButton
      >
    </div>
    <div class="flex-1" />
    <UIFooter />
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  accessMode: 'authenticated',
});
</script>
