<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
const { login } = useAuth();
</script>
<template>
  <div>
    <button @click="login()">Login</button>
  </div>
</template>
