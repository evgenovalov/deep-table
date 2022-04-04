<script setup lang="ts">
import AppTable from '@/components/AppTable.vue'
import { table } from '@/examples/raw'
</script>

<template>
  <main class="home">
    <AppTable
        :config="table"
        class="home__table"
    />
  </main>
</template>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;

  &__table {
    width: 100%;
    max-width: 800px;
  }
}
</style>