<script setup>
import DataTable from '@/components/DataTable.vue'
import jsonData from './mock/res-second-task.json'
</script>

<template>
  <DataTable :items="jsonData" />
</template>