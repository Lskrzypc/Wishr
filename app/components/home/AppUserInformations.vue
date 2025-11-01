<script setup lang="ts">
const { currentUser } = useUser();
const { user } = useAuth();
</script>

<template>
  <section class="flex w-full mt-8">
    <UAvatar
      :src="user?.picture || ''"
      :alt="`${currentUser?.personalInformation.firstName || ''} ${currentUser?.personalInformation.lastName || ''}`"
      size="3xl"
      class="mr-4"
    />
  </section>
</template>
