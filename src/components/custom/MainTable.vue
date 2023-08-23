<template>
  <div>
    <table :class="getTableClasses(tableType)">
      <thead :class="headerClass">
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
      <tbody v-if="tableData.length > 0">
        <tr :class="rowClass" v-for="(item, index) in tableData" :key="index">
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
                  <slot
                    :name="column.slotName"
                    :data="item"
                    :type="tableType"
                  />
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
    <div v-else class="w-full flex justify-center items-end text-md m-4">
      <el-pagination
        :class="paginationClass"
        small
        background
        :page-size="pageSize"
        :total="items.length"
        :hide-on-single-page="true"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, onUpdated, ref, watchEffect } from "vue";
import { tableTypes } from "../../composables/element";

const props = defineProps({
  columns: {
    type: Object,
    required: true,
  },
  items: {
    type: Array,
    default: [],
  },
  pageSize: {
    type: Number,
    default: 3,
  },
  tableType: {
    type: String,
    default: "primary",
  },
});
const emit = defineEmits(["onReload"]);

const firstItem = ref<number>(1);
const lastItem = ref<number>(3);
const tableData = ref<any>([]);
const currentPage = ref<number>(1);

let headerClass = ref<string>("");
let headerRowClass = ref<string>("");
let rowClass = ref<string>("");
let paginationClass = ref<string>("");

const handleCurrentChange = (val: number) => {
  lastItem.value = val * props.pageSize;
  firstItem.value = lastItem.value - props.pageSize;
  tableData.value = [];
  currentPage.value = val;

  props.items.map((item, index) => {
    if (index >= firstItem.value && index < lastItem.value) {
      tableData.value.push(item);
    }
  });
};
const getTableClasses = (type: string) => {
  let tableClass = "";
  tableTypes.map((tblType) => {
    if (tblType.name === type) {
      tableClass = tblType.tableClass;
      headerClass.value = tblType.headerClass;
      headerRowClass.value = tblType.headerRowClass;
      rowClass.value = tblType.rowClass;
      paginationClass.value = tblType.paginationClass;
    }
  });
  return tableClass;
};

watchEffect(() => {
  handleCurrentChange(currentPage.value);
});
</script>
