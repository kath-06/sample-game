<template>
  <kath-dialog
    :visible="visible"
    :title="isEdit ? 'Edit Game Type' : 'Add Game Type'"
  >
    <template #body>
      <el-form
        ref="gameTypeFormRef"
        :model="gameType"
        :rules="gameTypeRules"
        :disabled="loading"
      >
        <el-row :gutter="10">
          <el-col :span="24" :lg="12">
            <el-form-item label="Type Name" prop="name">
              <el-input v-model="gameType.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
            <el-form-item label="Type Number" prop="type">
              <el-input v-model="gameType.type" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
            <el-form-item label="Rows" prop="rows">
              <el-input v-model="gameType.rows" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
            <el-form-item label="Columns" prop="columns">
              <el-input v-model="gameType.columns" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
            <el-form-item label="Fill Count" prop="fillCount">
              <el-input v-model="gameType.fillCount" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <main-button
        class="mr-1 ml-1"
        rounded
        :type="isEdit ? 'warning' : 'success'"
        translate="fade-right-in"
        :icon="isEdit ? 'EditPen' : 'Check'"
        :loading="loading"
        @button-click="onSubmit"
      >
        {{ isEdit ? "Update" : "Save" }}
      </main-button>
      <main-button
        class="mr-1 ml-1"
        rounded
        type="danger"
        translate="fade-right-in"
        icon="Close"
        :disabled="loading"
        @button-click="onCancel"
      >
        Cancel
      </main-button>
    </template>
  </kath-dialog>
</template>
<script setup lang="ts">
import { onUpdated, ref, reactive } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
  editData: {
    type: Object,
    default: {},
  },
  loading: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["onCancel", "onSubmit"]);

const gameTypeFormRef = ref();
const gameType = reactive<any>({
  name: "",
  type: "",
  rows: "",
  columns: "",
  fillCount: "",
});
const gameTypeRules = reactive<any>({
  name: [
    { required: true, message: "Game type name is required", trigger: "blur" },
  ],
  type: [
    {
      required: true,
      message: "Game type number is required",
      trigger: "blur",
    },
  ],
  rows: [{ required: true, message: "Rows is required", trigger: "blur" }],
  columns: [
    { required: true, message: "Columns name is required", trigger: "blur" },
  ],
  fillCount: [
    {
      required: true,
      message: "Fill count is required",
      trigger: "blur",
    },
  ],
});

const onCancel = () => {
  emit("onCancel");
};
const onSubmit = () => {
  const submitParams = {
    gameType: gameType,
    isEdit: props.isEdit,
    editData: props.editData,
  };
  emit("onSubmit", gameTypeFormRef.value, submitParams);
};

const setPlayerData = (data: any) => {
  gameType.name = data.typeName;
  gameType.type = data.type;
  gameType.rows = data.rows;
  gameType.columns = data.columns;
  gameType.fillCount = data.fillCount;
};

onUpdated(() => {
  if (props.isEdit) {
    setPlayerData(props.editData);
  } else {
    gameType.name = "";
    gameType.type = "";
    gameType.rows = "";
    gameType.columns = "";
    gameType.fillCount = "";
  }
});
</script>
