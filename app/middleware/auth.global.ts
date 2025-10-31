import { useAuth } from '~/composables/auth';

export default defineNuxtRouteMiddleware(async (to) => {
  if (!import.meta.client) return;

  const { isAuthenticated, isLoading, login } = useAuth();

  // Wait until Auth0 finishes loading state
  while (isLoading.value) {
    await new Promise((r) => setTimeout(r, 100));
  }

  if (to.meta.accessMode === 'not-authenticated' && isAuthenticated.value) {
    await navigateTo('/');
    return;
  }

  if (!isAuthenticated.value && to.meta.accessMode === 'authenticated') {
    await login(to.fullPath);
  }
});
