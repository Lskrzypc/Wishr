<script setup lang="ts"></script>

<template>
  <ClientOnly>
    <UIDraggableButton
      class="rounded-full bg-wishr-primary shadow-xl"
      :bottom-offset="20"
      :right-offset="20"
    >
      <div class="flex h-16 w-16 items-center justify-center">
        <UIcon name="i-lucide-plus" class="size-8 text-white" />
      </div>
    </UIDraggableButton>
  </ClientOnly>
</template>
