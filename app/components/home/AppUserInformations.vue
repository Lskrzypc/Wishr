<script setup lang="ts">
const { currentUser, userWishesCount, computeFriendsCount } = useUser();
const { user, logout } = useAuth();
</script>

<template>
  <section class="flex w-full mt-8 gap-x-5 items-center">
    <UAvatar
      :src="user?.picture || ''"
      :alt="`${currentUser?.personalInformation.firstName || ''} ${currentUser?.personalInformation.lastName || ''}`"
      class="h-14 w-14"
    />
    <div class="flex flex-col text-black">
      <span class="font-bold text-lg"
        >{{ currentUser?.personalInformation.firstName || '' }}
        {{
          currentUser?.personalInformation?.lastName?.toUpperCase() || ''
        }}</span
      >
      <span class="text-sm text-gray-500 font-semibold"
        >{{ userWishesCount }} voeux |
        {{ computeFriendsCount(currentUser) }} amis
      </span>
    </div>
    <div class="flex h-full items-center justify-center ml-auto">
      <UIcon
        name="i-lucide-log-out"
        class="size-5 text-gray-500 cursor-pointer"
        @click="logout"
      />
    </div>
  </section>
</template>
