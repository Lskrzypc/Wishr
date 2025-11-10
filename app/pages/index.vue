<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { isAuthenticated, login } = useAuth();

onMounted(async () => {
  if (!isAuthenticated.value) {
    await login();
  }
  if (isAuthenticated.value) {
    await navigateTo('/home');
  }
});
</script>
