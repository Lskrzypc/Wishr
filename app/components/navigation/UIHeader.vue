<script setup lang="ts">
const { isAuthenticated, login, logout, user, userInitials } = useAuth();

async function onAccountClicked() {
  await navigateTo('/account');
}
</script>

<template>
  <ClientOnly>
    <UHeader
      :toggle="{
        class: 'hidden',
      }"
    >
      <template #title>
        <UIWishrLogo class="self-center text-wishr-primary" />
      </template>

      <template #right>
        <UIcon
          v-if="!isAuthenticated"
          name="i-lucide-log-in"
          class="size-5 ml-0.5"
          @click="login()"
        />
        <img
          v-if="isAuthenticated && user?.picture"
          class="rounded-full w-7 h-7 object-cover"
          :src="user?.picture"
          @click="onAccountClicked"
        />
        <span v-if="!user?.picture" class="text-sm">{{ userInitials }}</span>
        <UIcon
          v-if="isAuthenticated"
          name="i-lucide-log-out"
          class="size-5 ml-2"
          @click="logout()"
        />
      </template>
    </UHeader>
  </ClientOnly>
</template>
