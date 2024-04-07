<template>
  <table class="data-table">
    <thead>
      <tr>
        <th>Наименование</th>
        <th v-for="y in headers" :key="'data-table-' + y">
          {{ y }}
        </th>
      </tr>
    </thead>
    <tbody>
      <DataRow :data="items" :separator="separator" :headers="headers" />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import DataRow from '@/components/DataRow.vue'
import type { tableItems, tableHeaders, tableSeparator } from '@/types'

defineProps<{
  items: tableItems
}>()
const separator: tableSeparator = '-'
const headers: tableHeaders = [2020, 2021, 2022, 2023, 2024]
</script>

<style>
.data-table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
}

.data-table th,
.data-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}
</style>
