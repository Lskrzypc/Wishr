<script setup lang="ts">
const toaster = { expand: true };
</script>
<template>
  <div>
    <UApp :toaster="toaster">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </UApp>
  </div>
</template>
