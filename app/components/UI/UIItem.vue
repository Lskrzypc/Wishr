<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

defineProps<{
  title: string;
  description?: string;
  imageUrl?: string;
  price?: number;
  isReserved?: boolean;
  isEditionMode?: boolean;
}>();

interface Emits {
  (e: 'item-clicked'): void;
  (e: 'item-reserved', reservedBy: string): void;
}

const emit = defineEmits<Emits>();
const isReservedItemModalOpen = ref(false);

const zodSchema = z.object({
  reservedBy: z.string().min(1, 'Vous devez entrer un prénom valide'),
});

type FormSchema = z.output<typeof zodSchema>;

const formValues = reactive<FormSchema>({
  reservedBy: '',
});

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  emit('item-reserved', event.data.reservedBy);
  isReservedItemModalOpen.value = false;
}

function onItemClicked() {
  emit('item-clicked');
}

function onItemReservation() {
  isReservedItemModalOpen.value = true;
}
</script>

<template>
  <div
    class="flex flex-col bg-[#2c2c2c] rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-xl"
    :class="{
      'opacity-50 pointer-events-none': isReserved && !isEditionMode,
    }"
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

      <div class="flex flex-row justify-between items-center mt-2">
        <span v-if="price" class="text-wishr-orange font-bold text-md">
          {{ price.toFixed(2) }} €
        </span>
        <UButton
          v-if="!isEditionMode"
          class="bg-wishr-orange active:bg-wishr-orange/80 active:scale-98 z-10"
          size="sm"
          type="submit"
          @click.stop="onItemReservation"
          >Réserver</UButton
        >
      </div>
    </div>
    <UModal v-if="!isEditionMode" v-model:open="isReservedItemModalOpen">
      <template #content>
        <div class="mx-auto w-full px-6 py-6">
          <h2 class="text-xl font-bold">Réserver ce vœu</h2>
          <span class="text-sm text-gray-500"
            >Remplissez les informations ci-dessous pour réserver ce cadeau. En
            le réservant, vous comprenez que les autres ne pourront plus le
            réserver.</span
          >
          <UForm
            class="mt-4"
            :schema="zodSchema"
            :state="formValues"
            @submit="onSubmit"
          >
            <UFormField
              name="reservedBy"
              label="Votre prénom"
              placeholder="Entrez votre prénom"
              required
            >
              <UInput
                v-model="formValues.reservedBy"
                type="text"
                color="neutral"
                class="w-full"
              />
            </UFormField>
            <div class="flex flex-row justify-end gap-4 mt-6">
              <UButton
                class="bg-wishr-orange active:bg-wishr-orange/80 active:scale-98"
                size="lg"
                type="submit"
                >Réserver</UButton
              >
            </div>
          </UForm>
        </div>
      </template>
    </UModal>
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
