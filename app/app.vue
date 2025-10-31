<script setup lang="ts">
const toaster = { expand: true };
const { isAuthenticated, addNewUser, user } = useAuth();
const { fetchUser } = useUser();

onMounted(async () => {
  if (isAuthenticated.value) {
    await addNewUser();
    fetchUser(user.value?.sub ?? '');
  }
});
</script>
<template>
  <div>
    <UApp :toaster="toaster">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
      <UIAddWishlistButton v-if="isAuthenticated" />
    </UApp>
  </div>
</template>
