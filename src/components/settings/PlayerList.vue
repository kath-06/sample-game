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
      :shapes="shapes"
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
      <template #shape="scope">
        <span class="text-xl" :style="`color: ${shapeColor};`">
          {{ getShapeName(scope.data.shapeReference) }}
        </span>
      </template>
      <template #action="scope">
        <main-table-actions
          :actions="tableActions"
          :data="scope.data"
          :action-type="scope.type"
          @on-click="actionClick"
        />
      </template>
    </main-table>
  </div>
</template>
<script lang="ts" setup>
import { ElMessage, FormInstance } from "element-plus";
import { onMounted, ref, watchEffect } from "vue";
import { usePlayerStore } from "../../store/players";
import { useTictactoeStore } from "../../store/tictactoe";

const playerStore = usePlayerStore();
const tictactoeStore = useTictactoeStore();

const playerDialog = ref<boolean>(false);
const action = ref<boolean>(false);
const tableColumns = ref([
  { name: "Player", prop: "playerName" },
  {
    name: "Shape",
    prop: "shapeReference",
    useSlot: "true",
    slotName: "shape",
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

let editData = ref([]);
let loading = ref<boolean>(false);
let tableItems = ref<any>([]);
let shapes = ref<any>([]);
let shapeColor = ref<string>("");

const formAction = (btnAction: boolean) => {
  playerDialog.value = true;
  action.value = btnAction;
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
  playerStore.setPlayers(tableItems.value.length, params.player);
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
  tableItems.value = playerStore.getPlayers;
  getShapes();
};
const actionClick = (data: any, type: string) => {
  if (type === "edit") {
    editData.value = data;
    action.value = true;
    playerDialog.value = true;
  }
};
const getShapes = () => {
  tictactoeStore.getShapeList();
  shapes.value = tictactoeStore.getShapes;
};
const getShapeName = (shapeId: number) => {
  let shapeName: string = "";
  shapes.value.map((shape: any) => {
    if (shape.id === shapeId) {
      shapeName = shape.shape;
      shapeColor.value = shape.shapeColor;
    }
  });

  return shapeName;
};
const updatePlayer = (params: any) => {
  playerStore.updatePlayer(params.editData.id, params.player);
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

watchEffect(() => {
  loadData();
});

onMounted(() => {
  loadData();
});
</script>