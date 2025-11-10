<script setup lang="ts">
const route = useRoute();

function activeClass(path: string) {
  return route.path === path ? 'text-wishr-orange' : 'text-wishr-gray';
}
</script>

<template>
  <div
    class="flex flex-row w-3/4 h-16 bg-[#2c2c2c] rounded-4xl px-6 lg:px-16 justify-between items-center"
  >
    <NuxtLink to="/home" class="flex items-center">
      <UIcon name="i-lucide-house" :class="['size-6', activeClass('/home')]" />
    </NuxtLink>

    <NuxtLink to="/social" class="flex items-center">
      <UIcon
        name="i-lucide-users-round"
        :class="['size-6', activeClass('/social')]"
      />
    </NuxtLink>

    <NuxtLink to="/account" class="flex items-center">
      <UIcon
        name="i-lucide-user"
        :class="['size-6', activeClass('/account')]"
      />
    </NuxtLink>
  </div>
</template>
