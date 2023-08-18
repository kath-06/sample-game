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
      <template #action="scope">
        <main-table-actions
          :actions="tableActions"
          :data="scope.data"
          @on-click="actionClick"
        />
      </template>
    </main-table>
    <shape-form
      :visible="shapeDialog"
      :is-edit="action"
      :edit-data="editData"
      @on-cancel="shapeDialog = false"
      @on-submit="submitShape"
    />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, ElMessageBox, FormInstance } from "element-plus";
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
  {
    name: "Actions",
    prop: "action",
    useSlot: "true",
    slotName: "action",
  },
]);
const tableActions = ref([
  { type: "warning", icon: "Edit", name: "Edit", action: "edit" },
]);
const tableItems = ref([]);
const shapeDialog = ref<boolean>(false);
const action = ref<boolean>(false);

let editData = ref([]);

const formAction = (btnAction: boolean) => {
  shapeDialog.value = true;
  action.value = btnAction;
};

const actionClick = (data: any, type: string) => {
  if (type === "edit") {
    editData.value = data;
    action.value = true;
    shapeDialog.value = true;
  } else if (type === "delete") {
    confirmRemove(data.id);
  }
};

const submitShape = async (formEl: FormInstance | undefined, params: any) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (params.isEdit) {
        tictactoeStore.updateShape(params.editData.id, params.shape);
        if (tictactoeStore.getEditResponse === "success") {
          shapeDialog.value = false;
          ElMessage({
            message: "Shape was updated successfully.",
            type: "success",
            duration: 5000,
          });
        } else {
          ElMessage({
            message: "Oops, updating shape was failed.",
            type: "error",
            duration: 5000,
          });
        }
      } else if (!params.isEdit) {
        tictactoeStore.setShapes(tableItems.value.length, params.shape);
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
      }
    } else {
      console.log("error", fields);
    }
  });
};

const confirmRemove = (shapeId: number) => {
  ElMessageBox.confirm("Shape will permanently delete. Continue?", "Warning", {
    title: "Delete Shape",
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
    center: true,
  })
    .then(() => {
      removeShape(shapeId);
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
const removeShape = (shapeId: number) => {
  tictactoeStore.removeShape(shapeId);
  if (tictactoeStore.getRemoveResponse === "success") {
    ElMessage({
      message: "Shape was deleted successfully.",
      type: "success",
      duration: 5000,
    });
  } else {
    ElMessage({
      message: "Oops, deleting was failed.",
      type: "error",
      duration: 5000,
    });
  }
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