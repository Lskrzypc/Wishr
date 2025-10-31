import { defineNuxtPlugin, useRuntimeConfig } from '#app';
import { createAuth0 } from '@auth0/auth0-vue';

export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) return; // safety check for SSR

  const config = useRuntimeConfig();

  const domain = config.public.auth.wishrDomain;
  const clientId = config.public.auth.wishrClientId;

  if (!domain || !clientId) {
    console.error('[Auth0] Missing domain or client ID');
    return;
  }

  const auth0 = createAuth0({
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: window.location.origin,
    },
    cacheLocation: 'localstorage',
    useRefreshTokens: true,
  });

  nuxtApp.vueApp.use(auth0);
});
