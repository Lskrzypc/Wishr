import { useAuth0 } from '@auth0/auth0-vue';
import { v4 as uuidv4 } from 'uuid';

export function useAuth() {
  const auth0 = useAuth0();
  const user = computed(() => auth0?.user?.value);
  const isAuthenticated = computed(() => auth0?.isAuthenticated?.value);
  const isLoading = computed(() => auth0?.isLoading?.value);
  //const { addUser, userExists } = useUser();

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

    // const isUser = await userExists(authProviderId);
    //if (!isUser) {
    //   await addUser({
    //     id: user.value?.sub || '',
    //     createdAt: new Date().toISOString(),
    //     updatedAt: new Date().toISOString(),
    //     authProvider: 'auth0',
    //     authProviderId: user.value?.sub || '',
    //     paymentProvider: 'stripe',
    //     paymentProviderId: '',
    //     personalInformation: {
    //       email: user.value?.email || '',
    //       lastName: user.value?.family_name || '',
    //       firstName: user.value?.given_name || '',
    //       optIn: false,
    //     },
    //     tokenTable: [
    //       {
    //         id: uuidv4(),
    //         count: 3,
    //         usedTokens: 0,
    //         expiresAt: new Date(
    //           Date.now() + 30 * 24 * 60 * 60 * 1000,
    //         ).toISOString(), // 30 days from now
    //       },
    //     ],
    //     transactionsHistory: [],
    //     subscriptionHistory: [],
    //   });
    // }
    return;
    //}
  }

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout: logoutUser,
    addNewUser,
  };
}
