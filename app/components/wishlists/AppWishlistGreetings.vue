<script setup lang="ts">
interface Props {
  firstName: string;
}

defineProps<Props>();
</script>

<template>
  <section class="w-full h-full">
    <div
      class="flex-col max-w-(--ui-container) w-full mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-full"
    >
      <h1 class="text-3xl text-wishr font-semibold mt-5 text-wishr-primary">
        Hello {{ firstName }} !
      </h1>
      <p class="text-base text-gray-400 leading-tight">
        On espère que de ton côté tout va bien ! Commence sans attendre à créer
        tes wishlists et à partager tes envies du moment avec tes proches et
        amis.
      </p>
    </div>
  </section>
</template>
