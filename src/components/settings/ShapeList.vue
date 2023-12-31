<template>
  <div class="page-line-card">
    <div class="button-container-right">
      <div class="m-4">
        <main-button
          rounded
          type="success"
          transition="fade-right-in"
          icon="Plus"
          @button-click="formAction(false)"
        >
          Add
        </main-button>
      </div>
    </div>
    <main-table
      :columns="tableColumns"
      :items="tableItems"
      :page-size="5"
      table-type="primary"
    >
      <template #shape="scope">
        <span class="text-2xl" :style="`color: ${scope.data.shapeColor}`">
          {{ scope.data.shape }}
        </span>
        <span class="ml-3 font-bold"> - {{ scope.data.shapeName }} </span>
      </template>
      <template #badge="scope">
        <kath-badge :badge-color="scope.data.shapeColor" />
      </template>
      <template #action="scope">
        <main-table-actions
          :actions="tableActions"
          :data="scope.data"
          :action-type="scope.type"
          @on-click="actionClick"
          @on-reload="reloadData"
        />
      </template>
    </main-table>
    <shape-form
      :visible="shapeDialog"
      :is-edit="action"
      :edit-data="editData"
      :loading="loading"
      @on-cancel="shapeDialog = false"
      @on-submit="submitShape"
    />
    <confirm-message-box
      :visible="openConfirmBox"
      type="warning"
      header-title="Delete Shape"
      message="Are you sure you want to delete this shape?"
      :loading="loading"
      @on-cancel="cancelConfirmBox"
      @on-confirm="deleteShape"
    />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { onMounted, ref, watchEffect, reactive } from "vue";
import { useTictactoeStore } from "../../store/tictactoe";

const tictactoeStore = useTictactoeStore();
const tableColumns = reactive<any>([
  { name: "Shape", prop: "shape", useSlot: "true", slotName: "shape" },
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
const tableActions = reactive<any>([
  { type: "warning", icon: "Edit", name: "Edit", action: "edit" },
  { type: "danger", icon: "Delete", name: "Delete", action: "delete" },
]);
const tableItems = reactive<any>([]);
const shapeDialog = ref<boolean>(false);
const action = ref<boolean>(false);
const openConfirmBox = ref<boolean>(false);
const shapeId = ref<number>();
const loading = ref<boolean>();

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
        loading.value = true;
        updateShape(params);
      } else if (!params.isEdit) {
        loading.value = true;
        addShape(params);
      }
    } else {
      console.log("error", fields);
    }
  });
};

const addShape = (params: any) => {
  tictactoeStore.setShapes(tableItems.length, params.shape);
  setTimeout(() => {
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
    loading.value = false;
  }, 2000);
};

const updateShape = (params: any) => {
  tictactoeStore.updateShape(params.editData.id, params.shape);
  setTimeout(() => {
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
    loading.value = false;
  }, 2000);
};
const confirmRemove = (id: number) => {
  openConfirmBox.value = true;
  shapeId.value = id;
};
const cancelConfirmBox = () => {
  openConfirmBox.value = false;
  shapeId.value = undefined;
};
const deleteShape = () => {
  if (shapeId.value) {
    loading.value = true;
    tictactoeStore.removeShape(shapeId.value);
    setTimeout(() => {
      if (tictactoeStore.getRemoveResponse === "success") {
        ElMessage({
          message: "Shape was deleted successfully.",
          type: "success",
          duration: 5000,
        });
        cancelConfirmBox();
      } else {
        ElMessage({
          message: "Oops, deleting was failed.",
          type: "error",
          duration: 5000,
        });
      }
      loading.value = false;
    }, 2000);
  } else {
    ElMessage({
      message: "Oops, deleting was failed. Can't find the shape.",
      type: "error",
      duration: 5000,
    });
  }
};

const reloadData = () => {
  tictactoeStore.getShapeList();
  Object.assign(tableItems, tictactoeStore.getShapes);
};

watchEffect(() => {
  reloadData();
});

onMounted(() => {
  reloadData();
});
</script>