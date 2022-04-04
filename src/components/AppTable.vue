<script setup lang="ts">
import { computed, reactive } from 'vue'
import type { IRow, ITable } from '@/types/table'

const props = defineProps<{
  config: ITable
}>()

const table = reactive(props.config)

interface IFlatRow {
  data: {
    [key: string]: string | number
  }
  origin: IRow
  depth: number
  expandable: boolean
  shiftStyles?: string
}

// flat reactive array based on `table.rows`
const displayedRows = computed(() => {
  const flattenedRows: IFlatRow[] = []
  flattenize(table.rows, flattenedRows)
  return flattenedRows
})

// compute styles for <td> shifting
const computeShiftStyles = (flatRow: IFlatRow) => {
  const shift = flatRow.depth as number
  const paddingLeft = shift * 20 + 20
  return `padding-left: ${paddingLeft}px`
}

// recursively pulls out all nested rows from open rows
const flattenize = (rows: IRow[], flattenRows: IRow[], depth = 0) => {
  rows.forEach((row: IRow) => {
    const newRow: IFlatRow = {
      data: {},
      origin: row,
      depth,
      expandable: !!row.subrows?.length
    }

    // pass data and aggregate groups
    props.config.headers.forEach((header) => {
      if (row.data[header.key]) {
        newRow.data[header.key] = row.data[header.key]
      } else if (header.aggregator && row.subrows && row.subrows.length > 0) {
        newRow.data[header.key] = header.aggregator(row.subrows, header.key)
      }
    })

    newRow.origin = row
    newRow.shiftStyles = computeShiftStyles(newRow)
    flattenRows.push(newRow)

    if (row.opened && row.subrows && row.subrows.length > 0) {
      const newDepth = depth + 1
      flattenize(row.subrows, flattenRows, newDepth)
    }
  })
}

// changes the data in origin object by user input
const changeData = (node: IRow, key: string, value: string) => {
  node.data[key] = value
}

// apply changes by enter keydown
const applyChanges = (node: IRow, key: string, event: Event) => {
  event.preventDefault()
  const target = event.target as HTMLTableCellElement
  target.blur()
  changeData(node, key, target.innerText)
}
</script>

<template>
  <table class="table">
    <thead class="table__thead">
    <tr class="table__tr table__tr--head">
      <th class="table__cell table__cell--expand table__th" />
      <th
          v-for="header in config.headers"
          :key="header.key"
          class="table__cell table__th"
      >
        {{ header.label }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="(row, rowIndex) in displayedRows"
        :key="rowIndex"
        class="table__tr"
    >
      <td
          class="table__cell table__cell--expand"
          :style="row.shiftStyles"
      >
        <img
            v-if="row.expandable"
            src="@/assets/svg/expand.svg"
            alt="Expand or collapse row"
            class="table__expand-toggle"
            :class="{ 'table__expand-toggle--expanded': row.origin.opened }"
            @click="row.origin.opened = !row.origin.opened"
        >
      </td>
      <td
          v-for="(header, cellIndex) in config.headers"
          :key="header.key"
          class="table__cell table__td"
          :style="cellIndex === 0 && row.shiftStyles"
          :contenteditable="!row.origin.subrows || row.origin.subrows.length === 0 || !header.aggregator"
          @blur="changeData(row.origin, header.key, $event.target.innerText)"
          @keydown.enter="applyChanges(row.origin, header.key, $event)"
      >
        {{ row.data[header.key] }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style lang="scss" scoped>
@import '@/assets/vars';

.table {
  table-layout: fixed;
  border-collapse: collapse;
  box-shadow: 0 4px 32px rgba(0, 0, 0, 0.16);
  border-radius: 8px;
  text-align: left;

  &__cell {
    border-bottom: 1px solid $color-light-gray;
    padding: 10px 20px;

    &--expand {
      width: 80px;
    }
  }

  &__tr {
    position: relative;
  }

  &__tr:last-child &__td {
    border-bottom: none;
  }

  &__expand-toggle {
    width: 24px;
    height: 24px;
    transform: rotate(-90deg);
    transition: transform 150ms linear;
    vertical-align: middle;
    cursor: pointer;

    &--expanded {
      transform: rotate(0);
    }
  }
}
</style>
