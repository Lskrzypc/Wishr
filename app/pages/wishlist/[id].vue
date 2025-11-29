<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import { z } from 'zod';

definePageMeta({
  accessMode: 'public',
});

const route = useRoute();
const toast = useToast();
const { updateUser, currentUser, isUserWishlistOwner } = useUser();
const { userWishlists, getWishlistById, updateWishlistById } = useWishlist();

const wishlistId = route.params.id;

const isDeleteWishlistModalOpen = ref(false);
const isAddItemModalOpen = ref(false);

const currentWishlist = await getWishlistById(wishlistId as string);

const isEditionMode = computed(() => {
  return isUserWishlistOwner(currentWishlist?.wishlistUserId as string);
});

const isWishlistItemsEmpty = computed(() => {
  return currentWishlist?.items?.length === 0;
});

const zodSchema = z.object({
  title: z.string().min(1, 'Vous devez entrer un nom valide'),
  description: z.string().optional(),
  imageUrl: z.instanceof(File).optional(),
  productUrl: z.string().optional(),
  price: z.number().positive('Le prix doit être un nombre positif'),
});

type FormSchema = z.output<typeof zodSchema>;

const formValues = reactive<FormSchema>({
  title: '',
  description: '',
  imageUrl: undefined,
  productUrl: '',
  price: 0,
});

async function fileToDataUrl(file?: File): Promise<string | null> {
  if (!file) return null;
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string | null);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  try {
    // Ugly way to store image but man I don't have the budget for a proper storage
    const imageDataUrl = await fileToDataUrl(
      event.data.imageUrl as File | undefined,
    );

    const newItem = {
      id: crypto.randomUUID(),
      title: event.data.title,
      description: event.data.description || '',
      imageUrl: imageDataUrl || '',
      price: event.data.price,
      productUrl: event.data.productUrl || '',
      isReserved: false,
      reservedBy: '',
    };

    const updatedItems = [...(currentWishlist?.items || []), newItem];
    const newWishlists = userWishlists.value.map((wishlist) => {
      if (wishlist.id === wishlistId) {
        return {
          ...wishlist,
          items: updatedItems,
          updatedAt: new Date().toISOString(),
        };
      }
      return wishlist;
    });
    await updateUser(currentUser.value!.id, {
      wishlists: newWishlists,
    });
    isAddItemModalOpen.value = false;
    toast.add({
      title: 'Super !',
      description: 'Votre voeu a été ajouté avec succès.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      title: 'Mince !',
      description: "Votre voeu n'a pas pu être ajouté.",
      icon: 'i-lucide-x-circle',
      color: 'error',
    });
    console.error('Error updating user:', error);
  }
}

async function onBackClicked() {
  await navigateTo('/home');
}

function onDeleteClicked() {
  isDeleteWishlistModalOpen.value = true;
}

function onAddItemClicked() {
  isAddItemModalOpen.value = true;
}

async function onConfirmDeleteClicked() {
  const newWishlists = userWishlists.value.filter(
    (wishlist) => wishlist.id !== wishlistId,
  );
  try {
    await updateUser(currentUser.value!.id, {
      wishlists: newWishlists,
    });
    toast.add({
      title: "C'est fait !",
      description: 'Votre wishlist a été supprimée avec succès.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    });
    await navigateTo('/home');
  } catch (error) {
    toast.add({
      title: 'Mince !',
      description: "Votre wishlist n'a pas pu être supprimée.",
      icon: 'i-lucide-x-circle',
      color: 'error',
    });
    console.error('Error updating user:', error);
  }
}

async function onItemReserved(reservedBy: string, itemId: string) {
  console.log('Reserving item:', itemId, 'by', reservedBy);
  const updatedItems = currentWishlist?.items?.map((item) => {
    if (item.id === itemId) {
      return {
        ...item,
        isReserved: true,
        reservedBy,
      };
    }
    return item;
  });

  try {
    await updateWishlistById(wishlistId as string, {
      items: updatedItems,
      updatedAt: new Date().toISOString(),
    });
    toast.add({
      title: 'Super !',
      description: 'Le voeu a été réservé avec succès.',
      icon: 'i-lucide-check-circle',
      color: 'success',
    });
  } catch (error) {
    toast.add({
      title: 'Mince !',
      description: "La réservation n'a pas pu être effectuée.",
      icon: 'i-lucide-x-circle',
      color: 'error',
    });
    console.error('Error updating user:', error);
  }
}

async function onItemClicked(itemId: string) {
  await navigateTo(`/item/${itemId}`);
}
</script>

<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-80">
    <div class="flex flex-row mt-8 justify-between items-center">
      <div
        v-if="isEditionMode"
        class="flex flex-row items-center justify-center h-8 w-8 rounded-lg bg-wishr-gray/25 cursor-pointer"
        @click="onBackClicked"
      >
        <UIcon name="i-lucide-arrow-left" class="size-5" />
      </div>
      <span class="font-bold" :class="{ 'mx-auto': !isEditionMode }">{{
        currentWishlist?.title
      }}</span>

      <div
        v-if="isEditionMode"
        class="flex flex-row items-center justify-center h-8 w-8 rounded-lg bg-wishr-gray/25 cursor-pointer"
        @click="onDeleteClicked"
      >
        <UIcon name="i-lucide-trash" class="size-5" />
      </div>
    </div>

    <div v-if="isWishlistItemsEmpty" class="flex flex-col mt-8">
      <p class="text-gray-600 text-sm text-center">
        Ajoutez des éléments à votre wishlist pour commencer à planifier vos
        envies !
      </p>
      <UButton
        v-if="isEditionMode"
        class="bg-wishr-orange active:bg-wishr-orange/80 active:scale-98 mx-auto mt-4"
        size="lg"
        @click="onAddItemClicked"
        >Ajouter un premier vœu</UButton
      >
    </div>

    <div
      v-if="!isWishlistItemsEmpty"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 mb-16"
    >
      <h1 class="font-bold text-2xl col-span-full">Mes vœux :</h1>
      <UIItem
        v-for="item in currentWishlist?.items"
        :key="item.id"
        :title="item.title"
        :description="item.description"
        :image-url="item.imageUrl"
        :price="item.price"
        :is-reserved="item.isReserved"
        :is-edition-mode="isEditionMode"
        @item-clicked="onItemClicked(item.id)"
        @item-reserved="onItemReserved($event, item.id)"
      />
    </div>

    <UIDraggableButton
      v-if="isEditionMode"
      class="rounded-full"
      :bottom-offset="20"
      :right-offset="20"
      @click="isAddItemModalOpen = true"
    >
      <div
        class="flex w-16 h-16 bg-wishr-orange rounded-full items-center justify-center shadow-lg cursor-pointer"
      >
        <div
          class="flex w-12 h-12 bg-[#CF7945] rounded-full items-center justify-center"
        >
          <UIcon name="i-lucide-plus" class="size-6 text-white" />
        </div>
      </div>
    </UIDraggableButton>

    <UModal v-if="isEditionMode" v-model:open="isDeleteWishlistModalOpen">
      <template #content>
        <div class="mx-auto w-full px-6 py-6">
          <h2 class="text-xl font-bold mb-3">
            Êtes-vous sûr de vouloir supprimer cette wishlist ?
          </h2>
          <p class="mb-6">
            Cette action est irréversible. Tous les éléments de cette wishlist
            seront également supprimés.
          </p>
          <div class="flex flex-row justify-end gap-4">
            <UButton
              class="bg-red-500 active:bg-red-500/80 active:scale-98"
              size="lg"
              @click="onConfirmDeleteClicked"
              >Supprimer</UButton
            >
          </div>
        </div>
      </template>
    </UModal>

    <UModal v-if="isEditionMode" v-model:open="isAddItemModalOpen">
      <template #content>
        <div class="mx-auto w-full px-6 py-6">
          <h2 class="text-xl font-bold">Ajouter un nouveau vœu</h2>
          <span class="text-sm text-gray-500"
            >Remplissez les informations ci-dessous pour ajouter un nouveau vœu
            à votre wishlist.</span
          >
          <UForm
            class="mt-4"
            :schema="zodSchema"
            :state="formValues"
            @submit="onSubmit"
          >
            <UFormField name="title" label="Nom du produit" :required="true">
              <UInput
                v-model="formValues.title"
                placeholder="Ex: Boule à thé"
                type="text"
                color="neutral"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="description"
              label="Description du produit"
              class="mt-4"
            >
              <UInput
                v-model="formValues.description"
                placeholder="Ex: Une jolie boule à thé en acier inoxydable"
                type="text"
                color="neutral"
                class="w-full"
              />
            </UFormField>
            <UFormField name="imageUrl" label="Image du produit" class="mt-4">
              <UFileUpload
                v-model="formValues.imageUrl"
                placeholder="Choisir un fichier"
                color="neutral"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="productUrl"
              label="Lien pour acheter le produit"
              class="mt-4"
            >
              <UInput
                v-model="formValues.productUrl"
                placeholder="Ex: https://example.com/product"
                type="text"
                color="neutral"
                class="w-full"
              />
            </UFormField>
            <UFormField
              name="price"
              label="Prix du produit"
              class="mt-4"
              :required="true"
            >
              <UInput
                v-model="formValues.price"
                placeholder="Ex: 29.99"
                type="number"
                color="neutral"
                class="w-full"
              />
            </UFormField>
            <div class="flex justify-end mt-6">
              <UButton
                class="bg-wishr-orange active:bg-wishr-orange/80 active:scale-98"
                size="lg"
                type="submit"
                @on-click="onSubmit"
                >Ajouter mon voeu</UButton
              >
            </div>
          </UForm>
        </div>
      </template>
    </UModal>
  </main>
</template>
