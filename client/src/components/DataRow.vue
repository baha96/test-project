<template>
  <template v-for="(division, divisionName) in data" :key="parentName + divisionName">
    <tr @click.stop="toggleDisplay(divisionName)" class="item">
      <td :style="{ paddingLeft: (parentName ? paddingLeft : '') + 'px' }">
        <IconDown
          v-if="isEmptyChildren(division.children)"
          style="width: 14px; height: 14px"
          :style="{ transform: isShowed.includes(divisionName) ? 'scale(-1)' : '' }"
        />
        {{ divisionName }}
      </td>
      <td v-for="y in headers" :key="'data-table-division-' + parentName + y">
        {{ division.data[y] || separator }}
      </td>
    </tr>
    <DataRow
      v-if="isEmptyChildren(division.children) && isShowed.includes(divisionName)"
      :data="division.children"
      :separator="separator"
      :parentName="divisionName"
      :paddingLeft="paddingLeft ? paddingLeft + 20 : 20"
      :headers="headers"
    />
  </template>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { tableItems, tableHeaders, tableSeparator } from '@/types'
import IconDown from '@/components/icons/IconDown.vue'

const props = defineProps<{
  data: tableItems | undefined
  separator: tableSeparator
  parentName?: string | number | undefined
  paddingLeft?: number
  headers: tableHeaders
}>()

const { data, separator } = props
const isShowed = ref<(string | number)[]>([])
function toggleDisplay(name: string | number): void {
  if (isShowed.value.includes(name)) {
    isShowed.value = isShowed.value.filter((i) => i !== name)
  } else {
    isShowed.value.push(name)
  }
}
function isEmptyChildren(items = {}): boolean {
  return !!Object.keys(items).length
}
</script>

<style>
.item {
  cursor: pointer;
}
.item:hover {
  background-color: rgba(220, 220, 220, 0.99);
}
</style>
