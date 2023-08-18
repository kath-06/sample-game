<template>
  <div>
    <table class="primary-table">
      <thead class="primary-table-header">
        <tr>
          <th
            scope="col"
            class="px-6 py-3"
            v-for="(column, index) in columns"
            :key="index"
          >
            {{ column.name }}
          </th>
        </tr>
      </thead>
      <tbody v-if="items.length > 0">
        <tr
          class="primary-table-row"
          v-for="(item, index) in items"
          :key="index"
        >
          <td
            class="px-6 py-4"
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
          >
            <span v-if="column.useSlot && column.prop === 'action'">
              <slot :name="column.slotName" :data="item" />
            </span>
            <span v-else>
              <span v-for="(data, itemIndex) in item" :key="itemIndex">
                <span v-if="column.useSlot && column.prop === itemIndex">
                  <slot :name="column.slotName" :data="item" />
                </span>
                <span v-else-if="column.useSlot && column.prop === 'action'">
                  <slot :name="column.slotName" :data="item" />
                </span>
                <span v-else>
                  {{ column.prop === itemIndex ? data : "" }}
                </span>
              </span>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      v-if="items.length === 0"
      class="w-full flex justify-center items-center text-md m-4 text-sky-950"
    >
      No Data
    </div>
  </div>
</template>
<script lang="ts" setup>
// import KathBadgeVue from "../custom/elements/KathBadge.vue";
defineProps({
  columns: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    default: [],
  },
});
</script>
