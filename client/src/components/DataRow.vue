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

<script setup>
import { ref } from 'vue'
import IconDown from '@/components/icons/IconDown.vue'

defineProps({
    data: Object,
    separator: String,
    parentName: String,
    paddingLeft: Number,
    headers: Array
})

const isShowed = ref([])
function toggleDisplay(name) {
  if (isShowed.value.includes(name)) {
    isShowed.value = isShowed.value.filter((i) => i !== name)
  } else {
    isShowed.value.push(name)
  }
}
function isEmptyChildren(items = {}) {
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
