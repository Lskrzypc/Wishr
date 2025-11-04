<script setup lang="ts">
const { currentUser, computeWishesCount, computeFriendsCount } = useUser();
const { user } = useAuth();
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
          currentUser?.personalInformation.lastName.toUpperCase() || ''
        }}</span
      >
      <span class="text-sm text-gray-500 font-semibold"
        >{{ computeWishesCount(currentUser) }} voeux |
        {{ computeFriendsCount(currentUser) }} amis
      </span>
    </div>
  </section>
</template>
