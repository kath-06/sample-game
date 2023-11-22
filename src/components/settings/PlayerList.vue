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
    <player-form
      :visible="playerDialog"
      :is-edit="action"
      :edit-data="editData"
      :loading="loading"
      :shapes="shapeOptions"
      @on-cancel="playerDialog = false"
      @on-submit="submitPlayer"
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
      header-title="Delete Player"
      message="Are you sure you want to delete this player?"
      :loading="loading"
      @on-cancel="cancelConfirmBox"
      @on-confirm="deletePlayer"
    />
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { onMounted, ref, watchEffect, reactive, watch, toRefs } from "vue";
import { usePlayerStore } from "../../store/players";
import { useTictactoeStore } from "../../store/tictactoe";

const playerStore = usePlayerStore();
const tictactoeStore = useTictactoeStore();

const playerDialog = ref<boolean>(false);
const action = ref<boolean>(false);
const tableColumns = reactive<any>([
  { name: "Player", prop: "playerName" },
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

let editData = reactive<any>([]);
let loading = ref<boolean>(false);
let tableItems = reactive<any>([]);
let shapes = reactive<any>([]);
let shapeOptions = reactive<any>([]);
let shapeName = ref<string>("");
let openConfirmBox = ref<boolean>(false);
let playerId = ref<number>();
let shapeId = ref<number>();

const formAction = (btnAction: boolean) => {
  playerDialog.value = true;
  action.value = btnAction;
  if (tableItems && !btnAction) {
    shapeOptions = shapes.filter(
      (shape: any) => shape.isUsed !== 1
    );
  }
};

const submitPlayer = async (formEl: FormInstance | undefined, params: any) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (params.isEdit) {
        loading.value = true;
        updatePlayer(params);
      } else if (!params.isEdit) {
        loading.value = true;
        addPlayer(params);
      }
    } else {
      console.log("error", fields);
    }
  });
};
const addPlayer = (params: any) => {
  playerStore.setPlayers(tableItems.length, params.player);
  tictactoeStore.updateUsedShape(params.player.shape, 1);
  setTimeout(() => {
    if (playerStore.getAddResponse === "success") {
      playerDialog.value = false;
      ElMessage({
        message: "Player was added successfully.",
        type: "success",
        duration: 5000,
      });
    } else {
      ElMessage({
        message: "Oops, adding new player was failed.",
        type: "error",
        duration: 5000,
      });
    }
    loading.value = false;
  }, 2000);
};
const loadData = () => {
  playerStore.getPlayerList();
  Object.assign(tableItems, playerStore.getPlayers);
  getShapes();
};
const actionClick = (data: any, type: string) => {
  if (type === "edit") {
    editData = data;
    action.value = true;
    shapeOptions = shapes.filter(
      (shape: any) => shape.isUsed !== 1 || shape.id === data.shapeReference
    );
    playerDialog.value = true;
  } else if (type === "delete") {
    confirmRemove(data);
  }
};
const getShapes = () => {
  tictactoeStore.getShapeList();
  Object.assign(shapes, tictactoeStore.getShapes);
};
const getShapeName = (shapeId: number) => {
  let shapeColor: string = "";
  shapes.map((shape: any) => {
    if (shape.id === shapeId) {
      shapeName.value = shape.shape;
      shapeColor = shape.shapeColor;
    }
  });
  return shapeColor;
};
const updatePlayer = (params: any) => {
  playerStore.updatePlayer(params.editData.id, params.player);
  tictactoeStore.updateUsedShape(params.player.shape, 1);
  if (params.player.shape !== params.oldShapeId) {
    tictactoeStore.updateUsedShape(params.oldShapeId, 0);
  }
  setTimeout(() => {
    if (playerStore.getEditResponse === "success") {
      playerDialog.value = false;
      ElMessage({
        message: "Player was updated successfully.",
        type: "success",
        duration: 5000,
      });
    } else {
      ElMessage({
        message: "Oops, updating player was failed.",
        type: "error",
        duration: 5000,
      });
    }
    loading.value = false;
  }, 2000);
};
const confirmRemove = (data: any) => {
  openConfirmBox.value = true;
  playerId.value = data.id;
  shapeId.value = data.shapeReference;
};
const cancelConfirmBox = () => {
  openConfirmBox.value = false;
  playerId.value = undefined;
  shapeId.value = undefined;
};
const deletePlayer = () => {
  if (playerId.value) {
    loading.value = true;
    playerStore.removePlayer(playerId.value);
    tictactoeStore.updateUsedShape(shapeId.value, 0);
    setTimeout(() => {
      if (playerStore.getRemoveResponse === "success") {
        ElMessage({
          message: "Player was deleted successfully.",
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