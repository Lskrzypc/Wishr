<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { z } from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  accessMode: 'authenticated',
});

const route = useRoute();
const toast = useToast();
const { updateUser, currentUser } = useUser();
const { userWishlists } = useWishlist();

const itemId = String(route.params.id || '');

const isDeleteItemModalOpen = ref(false);

function onBackClicked() {
  // Navigate back to the wishlist page if possible, otherwise to home
  const wlId = currentItemInfo.value?.wishlistId;
  if (wlId) {
    void navigateTo(`/wishlist/${wlId}`);
    return;
  }
  void navigateTo('/home');
}

function onDeleteItemClicked() {
  isDeleteItemModalOpen.value = true;
}

async function onConfirmDeleteItemClicked() {
  if (!currentItemInfo.value) return;
  const { wishlistId } = currentItemInfo.value;

  const newWishlists = userWishlists.value.map((wl) => {
    if (wl.id !== wishlistId) return wl;
    return {
      ...wl,
      items: (wl.items || []).filter((it) => it.id !== itemId),
      updatedAt: new Date().toISOString(),
    };
  });

  try {
    await updateUser(currentUser.value!.id, { wishlists: newWishlists });
    toast.add({
      title: "C'est fait !",
      description: "L'élément a été supprimé.",
      icon: 'i-lucide-check-circle',
      color: 'success',
    });
    isDeleteItemModalOpen.value = false;
    await navigateTo(`/wishlist/${wishlistId}`);
  } catch (error) {
    toast.add({
      title: 'Mince !',
      description: 'La suppression a échoué.',
      icon: 'i-lucide-x-circle',
      color: 'error',
    });
    console.error('Error deleting item:', error);
  }
}

// Find the item and the wishlist that contains it
const currentItemInfo = computed(() => {
  for (const wl of userWishlists.value) {
    const found = wl.items?.find((it) => it.id === itemId);
    if (found) return { wishlistId: wl.id, item: found };
  }
  return undefined as { wishlistId: string; item: any } | undefined;
});

const zodSchema = z.object({
  title: z.string().min(1, 'Vous devez entrer un nom valide'),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  price: z.number().nonnegative('Le prix doit être positif').optional(),
});

type FormSchema = z.output<typeof zodSchema>;

const formValues = reactive<FormSchema>({
  title: '',
  description: '',
  imageUrl: '',
  price: 0,
});

// When the current item is available, populate the form
watch(
  currentItemInfo,
  (val) => {
    if (val && val.item) {
      formValues.title = val.item.title || '';
      formValues.description = val.item.description || '';
      formValues.imageUrl = val.item.imageUrl || '';
      formValues.price = val.item.price ?? 0;
    }
  },
  { immediate: true },
);

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  if (!currentItemInfo.value) {
    toast.add({
      title: 'Erreur',
      description: "L'élément n'a pas été trouvé.",
      color: 'error',
    });
    return;
  }

  const { wishlistId } = currentItemInfo.value;

  const newWishlists = userWishlists.value.map((wl) => {
    if (wl.id !== wishlistId) return wl;
    const updatedItems = (wl.items || []).map((it) => {
      if (it.id !== itemId) return it;
      return {
        ...it,
        title: event.data.title,
        description: event.data.description || '',
        imageUrl: event.data.imageUrl || '',
        price: event.data.price ?? 0,
      };
    });
    return {
      ...wl,
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    };
  });

  try {
    await updateUser(currentUser.value!.id, { wishlists: newWishlists });
    toast.add({
      title: "C'est fait !",
      description: "L'élément a été mis à jour.",
      icon: 'i-lucide-check-circle',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      title: 'Mince !',
      description: 'La mise à jour a échoué.',
      icon: 'i-lucide-x-circle',
      color: 'error',
    });
    console.error('Error updating item:', error);
  }
}
</script>

<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-80">
    <div v-if="!currentItemInfo">
      <p class="text-gray-400">Élément introuvable.</p>
    </div>

    <div v-else>
      <!-- Header with back and delete buttons, title centered -->
      <div class="flex flex-row mt-8 items-center">
        <div
          class="flex flex-row items-center justify-center h-8 w-8 rounded-lg bg-wishr-gray/25 cursor-pointer"
          @click="onBackClicked"
        >
          <UIcon name="i-lucide-arrow-left" class="size-5" />
        </div>

        <div class="flex-1 text-center">
          <span class="font-bold">{{ currentItemInfo.item.title }}</span>
        </div>

        <div
          class="flex flex-row items-center justify-center h-8 w-8 rounded-lg bg-wishr-gray/25 cursor-pointer"
          @click="onDeleteItemClicked"
        >
          <UIcon name="i-lucide-trash" class="size-5" />
        </div>
      </div>

      <!-- Image full width -->
      <div class="w-full h-64 bg-gray-800 rounded-lg overflow-hidden mt-6">
        <img
          v-if="currentItemInfo.item.imageUrl"
          :src="currentItemInfo.item.imageUrl"
          alt="Image de l'élément"
          class="w-full h-full object-cover"
        />
        <div
          v-else
          class="w-full h-full flex items-center justify-center text-gray-500"
        >
          Pas d'image
        </div>
      </div>

      <h1 class="text-2xl font-bold mb-2 mt-6">Éditer l'élément</h1>

      <UForm :schema="zodSchema" :state="formValues" @submit="onSubmit">
        <UFormField name="title" label="Titre" :required="true">
          <UInput v-model="formValues.title" class="w-full" />
        </UFormField>

        <UFormField name="description" label="Description">
          <UInput v-model="formValues.description" class="w-full" />
        </UFormField>

        <UFormField name="imageUrl" label="URL de l'image">
          <UInput v-model="formValues.imageUrl" class="w-full" />
        </UFormField>

        <UFormField name="price" label="Prix">
          <UInput v-model="formValues.price" type="number" class="w-full" />
        </UFormField>

        <div class="flex justify-end mt-4">
          <UButton size="lg" class="bg-wishr-orange" type="submit">
            Enregistrer
          </UButton>
        </div>
      </UForm>

      <!-- Delete confirmation modal for the item -->
      <UModal v-model:open="isDeleteItemModalOpen">
        <template #content>
          <div class="mx-auto w-full px-6 py-6">
            <h2 class="text-xl font-bold mb-3">
              Êtes-vous sûr de vouloir supprimer cet élément ?
            </h2>
            <p class="mb-6">Cette action est irréversible.</p>
            <div class="flex flex-row justify-end gap-4">
              <UButton @click="isDeleteItemModalOpen = false">Annuler</UButton>
              <UButton
                class="bg-red-500 active:bg-red-500/80 active:scale-98"
                size="lg"
                @click="onConfirmDeleteItemClicked"
              >
                Supprimer
              </UButton>
            </div>
          </div>
        </template>
      </UModal>
    </div>
  </main>
</template>
