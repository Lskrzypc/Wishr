<script setup lang="ts">
interface Props {
  title: string;
  count: number;
  iconName: string;
}

defineProps<Props>();
</script>

<template>
  <div class="flex flex-col w-full p-4 rounded-3xl h-28 bg-[#e7e5db]">
    <!-- Icon and count -->
    <div class="flex flex-row justify-between space-x-5">
      <div
        class="w-7 h-7 bg-white rounded-full items-center justify-center flex"
      >
        <UIcon :name="iconName" class="size-4 text-wishr-gray" />
      </div>
      <span class="text-lg font-black text-wishr-gray">{{ count }}</span>
    </div>
    <!-- Title -->
    <span class="text-base font-bold text-wishr-gray mt-auto self-end">{{
      title
    }}</span>
  </div>
</template>
