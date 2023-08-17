<template>
  <div class="page-line-card">
    <div class="button-container-right">
      <div class="m-4">
        <main-button
          rounded
          type="success"
          transition="fade-right-in"
          @button-click="formAction(false)"
        >
          Add
        </main-button>
      </div>
    </div>
    <main-table :columns="tableColumns" :items="tableItems">
      <template #badge="scope">
        <kath-badge :badge-color="scope.data.shapeColor" />
      </template>
    </main-table>
    <shape-form
      :visible="shapeDialog"
      @on-cancel="shapeDialog = false"
      @on-submit="submitShape"
      :is-edit="action"
    />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { onMounted, ref, watchEffect } from "vue";
import { useTictactoeStore } from "../../store/tictactoe";

const tictactoeStore = useTictactoeStore();
const tableColumns = ref([
  { name: "Name", prop: "shapeName" },
  { name: "Shape", prop: "shape" },
  {
    name: "Color",
    prop: "shapeColor",
    useSlot: "true",
    slotName: "badge",
  },
]);
const tableItems = ref([]);
const shapeDialog = ref<boolean>(false);
const action = ref<boolean>(false);

const formAction = (btnAction: boolean) => {
  shapeDialog.value = true;
  action.value = btnAction;
};

const submitShape = async (formEl: FormInstance | undefined, shape: any) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      tictactoeStore.setShapes(tableItems.value.length, shape);
      if (tictactoeStore.getAddResponse === "success") {
        shapeDialog.value = false;
        ElMessage({
          message: "Shape was added successfully.",
          type: "success",
          duration: 5000,
        });
      } else {
        ElMessage({
          message: "Oops, adding new shape was failed.",
          type: "error",
          duration: 5000,
        });
      }
    } else {
      console.log("error", fields);
    }
  });
};

watchEffect(() => {
  tictactoeStore.getShapeList();
  tableItems.value = tictactoeStore.getShapes;
});

onMounted(() => {
  tictactoeStore.getShapeList();
  tableItems.value = tictactoeStore.getShapes;
});
</script>