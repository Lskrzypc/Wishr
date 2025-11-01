import { useAuth0 } from '@auth0/auth0-vue';

export function useAuth() {
  const auth0 = useAuth0();
  const user = computed(() => auth0?.user?.value);
  const isAuthenticated = computed(() => auth0?.isAuthenticated?.value);
  const isLoading = computed(() => auth0?.isLoading?.value);
  const { addUser, userExists } = useUser();

  async function login(targetUrl?: string) {
    if (!import.meta.client) return;
    await auth0.loginWithRedirect({
      appState: { targetUrl: targetUrl || '/' },
    });
  }

  async function logoutUser() {
    if (!import.meta.client) return;
    await auth0.logout({
      logoutParams: { returnTo: window.location.origin },
    });
  }

  async function addNewUser() {
    const authProviderId = user.value?.sub;
    if (!authProviderId) return;

    const isUser = await userExists(authProviderId);
    if (!isUser) {
      await addUser({
        id: user.value?.sub || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        personalInformation: {
          firstName: user.value?.given_name || '',
          lastName: user.value?.family_name || '',
          email: user.value?.email || '',
        },
        wishlists: [],
        friends: [],
      });
    }
    return;
  }

  const userInitials = computed(() => {
    if (user?.value?.given_name && user?.value?.family_name) {
      return (
        user.value.given_name.charAt(0).toUpperCase() +
        user.value.family_name.charAt(0).toUpperCase()
      );
    }
    return '';
  });

  return {
    user,
    isAuthenticated,
    isLoading,
    userInitials,
    login,
    logout: logoutUser,
    addNewUser,
  };
}
