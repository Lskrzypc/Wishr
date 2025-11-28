<!-- eslint-disable vue/multi-word-component-names -->
<!-- <script setup lang="ts">
const route = useRoute();
const { userWishlists } = useWishlist();

const itemId = route.params.id;

const currentItemInfo = computed(() => {
  for (const wishlist of userWishlists.value) {
    const foundItem = wishlist.items?.find((item) => item.id === itemId);
    if (foundItem) return { wishlistId: wishlist.id, item: foundItem };
  }
  return undefined;
});

onMounted(() => {
  console.log('Item information:', currentItemInfo.value);
});

async function onBackClicked() {
  const wishlistId = currentItemInfo.value?.wishlistId;
  if (wishlistId) {
    await navigateTo(`/wishlist/${wishlistId}`);
    return;
  }
  await navigateTo('/home');
}
</script> -->

<template>
  <main class="flex flex-col min-h-screen px-6 md:px-16 lg:px-80">
    <p>ça arrive promis</p>
    <!-- <div class="flex flex-row mt-8 justify-between items-center">
      <div
        class="flex flex-row items-center justify-center h-8 w-8 rounded-lg bg-wishr-gray/25 cursor-pointer"
        @click="onBackClicked"
      >
        <UIcon name="i-lucide-arrow-left" class="size-5" />
      </div>
      <span class="font-bold">{{ currentItemInfo?.item.title }}</span>

      <div
        class="flex flex-row items-center justify-center h-8 w-8 rounded-lg bg-wishr-gray/25 cursor-pointer"
        @click="onDeleteClicked"
      >
        <UIcon name="i-lucide-trash" class="size-5" />
      </div>
    </div> -->
  </main>
</template>
