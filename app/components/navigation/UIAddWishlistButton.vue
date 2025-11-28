<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const toast = useToast();
const { updateUser, currentUser } = useUser();
const isModalOpen = ref(false);

const zodSchema = z.object({
  title: z.string().min(1, 'Vous devez entrer un titre valide'),
});

type FormSchema = z.output<typeof zodSchema>;

const formValues = reactive<FormSchema>({
  title: '',
});

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  const currentUserId = currentUser.value?.id;
  if (!currentUserId) {
    console.error('No current user found');
    return;
  }

  try {
    await updateUser(currentUserId, {
      wishlists: [
        ...(currentUser.value?.wishlists || []),
        {
          id: crypto.randomUUID(),
          wishlistUserId: currentUserId,
          title: event.data.title,
          items: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    });
    dismissModal();
    toast.add({
      title: 'Super !',
      description: 'Votre wishlist a été créée avec succès.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      title: 'Mince !',
      description: "Votre wishlist n'a pas pu être créée.",
      icon: 'i-lucide-x-circle',
      color: 'error',
    });
    console.error('Error updating user:', error);
  }
}

function dismissModal() {
  isModalOpen.value = false;
}
</script>
<template>
  <UModal v-model:open="isModalOpen">
    <div
      class="flex w-16 h-16 bg-wishr-orange rounded-full items-center justify-center shadow-lg cursor-pointer"
    >
      <div
        class="flex w-12 h-12 bg-[#CF7945] rounded-full items-center justify-center"
      >
        <UIcon name="i-lucide-plus" class="size-6 text-white" />
      </div>
    </div>
    <template #content>
      <div class="mx-auto w-full px-6 py-6">
        <h2 class="text-xl font-bold mb-3">Ajouter une nouvelle wishlist</h2>

        <UForm :schema="zodSchema" :state="formValues" @submit="onSubmit">
          <UFormField name="title" label="Nom de la wishlist">
            <UInput
              v-model="formValues.title"
              placeholder="Ex: Noël 2025🎄"
              type="text"
              color="neutral"
              class="w-full mt-2"
            />
          </UFormField>
          <div class="flex justify-end mt-6">
            <UButton
              class="bg-wishr-orange active:bg-wishr-orange/80 active:scale-98"
              size="lg"
              type="submit"
              @on-click="onSubmit"
              >Créer la wishlist</UButton
            >
          </div>
        </UForm>
      </div>
    </template>
  </UModal>
</template>
