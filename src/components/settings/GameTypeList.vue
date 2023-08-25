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
    <game-type-form
      :visible="gameTypeDialog"
      :is-edit="action"
      :edit-data="editData"
      :loading="loading"
      @on-cancel="gameTypeDialog = false"
      @on-submit="submitGameType"
    />
    <main-table
      :columns="tableColumns"
      :items="tableItems"
      :page-size="5"
      table-type="primary"
      @on-reload="loadData"
    >
      <template #action="scope">
        <main-table-actions
          :actions="tableActions"
          :data="scope.data"
          :action-type="scope.type"
          @on-click="actionClick"
        />
      </template>
    </main-table>
    <confirm-message-box
      :visible="openConfirmBox"
      type="warning"
      header-title="Delete Game Type"
      message="Are you sure you want to delete this game type?"
      :loading="loading"
      @on-cancel="cancelConfirmBox"
      @on-confirm="deleteGameType"
    />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { onMounted, ref, watchEffect } from "vue";
import { useGameTypeStore } from "../../store/gameType";

const gameTypeStore = useGameTypeStore();

const gameTypeDialog = ref<boolean>(false);
const action = ref<boolean>(false);
const tableColumns = ref([
  { name: "Type No.", prop: "type" },
  { name: "Type", prop: "typeName" },
  {
    name: "Rows",
    prop: "rows",
  },
  {
    name: "Columns",
    prop: "columns",
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
  { type: "danger", icon: "Delete", name: "Delete", action: "delete" },
]);

let editData = ref([]);
let loading = ref<boolean>(false);
let tableItems = ref<any>([]);
let openConfirmBox = ref<boolean>(false);
let gameTypeId = ref<number>();

const formAction = (btnAction: boolean) => {
  gameTypeDialog.value = true;
  action.value = btnAction;
};

const submitGameType = async (
  formEl: FormInstance | undefined,
  params: any
) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (params.isEdit) {
        loading.value = true;
        updateGameType(params);
      } else if (!params.isEdit) {
        loading.value = true;
        addGameType(params);
      }
    } else {
      console.log("error", fields);
    }
  });
};
const addGameType = (params: any) => {
  gameTypeStore.setGameTypes(tableItems.value.length, params.gameType);
  setTimeout(() => {
    if (gameTypeStore.getAddResponse === "success") {
      gameTypeDialog.value = false;
      ElMessage({
        message: "Game type was added successfully.",
        type: "success",
        duration: 5000,
      });
    } else {
      ElMessage({
        message: "Oops, adding new game type was failed.",
        type: "error",
        duration: 5000,
      });
    }
    loading.value = false;
  }, 2000);
};
const loadData = () => {
  gameTypeStore.getGameTypeList();
  tableItems.value = gameTypeStore.getGameTypes;
};
const actionClick = (data: any, type: string) => {
  if (type === "edit") {
    editData.value = data;
    action.value = true;
    gameTypeDialog.value = true;
  } else if (type === "delete") {
    confirmRemove(data);
  }
};
const updateGameType = (params: any) => {
  gameTypeStore.updateGameType(params.editData.id, params.gameType);
  setTimeout(() => {
    if (gameTypeStore.getEditResponse === "success") {
      gameTypeDialog.value = false;
      ElMessage({
        message: "Game type was updated successfully.",
        type: "success",
        duration: 5000,
      });
    } else {
      ElMessage({
        message: "Oops, updating game type was failed.",
        type: "error",
        duration: 5000,
      });
    }
    loading.value = false;
  }, 2000);
};
const confirmRemove = (data: any) => {
  openConfirmBox.value = true;
  gameTypeId.value = data.id;
};
const cancelConfirmBox = () => {
  openConfirmBox.value = false;
  gameTypeId.value = undefined;
};
const deleteGameType = () => {
  if (gameTypeId.value) {
    loading.value = true;
    gameTypeStore.removeGameType(gameTypeId.value);
    setTimeout(() => {
      if (gameTypeStore.getRemoveResponse === "success") {
        ElMessage({
          message: "Game type was deleted successfully.",
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
      message: "Oops, deleting was failed. Can't find the player.",
      type: "error",
      duration: 5000,
    });
  }
};

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});
</script>