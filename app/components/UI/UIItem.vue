<script setup lang="ts">
defineProps<{
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
}>();

interface Emits {
  (e: 'item-clicked'): void;
}

const emit = defineEmits<Emits>();

function onItemClicked() {
  emit('item-clicked');
}
</script>

<template>
  <div
    class="flex flex-col bg-[#2c2c2c] rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl"
    @click="onItemClicked"
  >
    <img
      v-if="imageUrl"
      :src="imageUrl"
      alt="Image du produit"
      class="w-full h-48 object-cover"
    />

    <div class="p-4 flex flex-col grow">
      <span class="text-white font-semibold text-lg mb-2 line-clamp-1">
        {{ title }}
      </span>

      <span class="text-gray-400 text-sm grow line-clamp-3">
        {{ description }}
      </span>

      <span v-if="price" class="text-wishr-orange font-bold text-md">
        {{ price.toFixed(2) }} €
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Force des tailles cohérentes */
.line-clamp-1,
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.line-clamp-1 {
  -webkit-line-clamp: 1;
}
.line-clamp-3 {
  -webkit-line-clamp: 3;
}
</style>
