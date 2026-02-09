<script setup lang="ts">
defineOptions({
  name: "DHelloWorld",
});

withDefaults(
  defineProps<{
    msg?: string;
  }>(),
  {
    msg: "Hello from D-UI!",
  }
);
</script>

<template>
  <div class="d-hello-world">
    <h1>{{ msg }}</h1>
    <p>基于 Vue 3 + Element Plus 的组件库</p>
  </div>
</template>

<style scoped>
.d-hello-world {
  padding: 1rem;
  text-align: center;
}

.d-hello-world h1 {
  color: var(--el-color-primary);
  margin-bottom: 0.5rem;
}

.d-hello-world p {
  color: var(--el-text-color-regular);
}
</style>
