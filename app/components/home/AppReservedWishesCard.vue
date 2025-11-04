<script setup lang="ts">
interface Props {
  title: string;
  count: number;
  iconName: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="relative flex flex-col w-full p-4 rounded-3xl h-28 bg-wishr-orange overflow-hidden"
  >
    <!-- Foreground content sits above the SVG -->
    <div class="relative z-10 flex-1 flex flex-col">
      <!-- Icon and count -->
      <div class="flex flex-row justify-between space-x-5">
        <div
          class="w-7 h-7 bg-wishr-gray/55 rounded-full items-center justify-center flex"
        >
          <UIcon :name="iconName" class="size-4 text-white" />
        </div>
        <span class="text-lg font-black text-white">{{ count }}</span>
      </div>
      <!-- Title -->
      <span class="text-base font-bold text-white mt-auto self-end">{{
        title
      }}</span>
    </div>
  </div>
</template>
