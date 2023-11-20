<template>
  <kath-dialog
    :visible="visible"
    :title="isEdit ? 'Edit Player' : 'Add Player'"
  >
    <template #body>
      <el-form
        ref="playerFormRef"
        :model="player"
        :rules="playerRules"
        :disabled="loading"
      >
        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="Player Name" prop="name">
              <el-input v-model="player.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="Shape" prop="shape">
              <el-select
                v-model="player.shape"
                placeholder="Select"
                clearable
                remote
                filterable
                reserve-keyword
                :loading="loading"
                remote-show-suffix
                :remote-method="searchShapes"
              >
                <el-option
                  v-for="item in shapeOptions"
                  :key="item.id"
                  :label="item.shapeName"
                  :value="item.id"
                >
                  {{ item.shapeName }} -
                  <span :style="`color: ${item.shapeColor};`">
                    {{ item.shape }}
                  </span>
                </el-option>
              </el-select>
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
import { onUpdated, ref, watch, reactive, toRefs } from "vue";

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
  shapes: {
    type: Array,
    default: [],
  },
});
const emit = defineEmits(["onCancel", "onSubmit"]);

const playerFormRef = ref();
const player = reactive<any>({
  name: "",
  shape: "",
});
const playerRules = reactive<any>({
  name: [
    { required: true, message: "Shape name is required", trigger: "blur" },
  ],
  shape: [
    {
      required: true,
      message: "Shape character is required",
      trigger: "blur",
    },
  ],
});

let shapeOptions = reactive<any>([]);
let oldId = ref<number>();

const onCancel = () => {
  emit("onCancel");
};
const onSubmit = () => {
  const submitParams = {
    player: player,
    isEdit: props.isEdit,
    editData: props.editData,
    oldShapeId: oldId.value,
  };
  emit("onSubmit", playerFormRef.value, submitParams);
};

const setPlayerData = (data: any) => {
  player.name = data.playerName;
  player.shape = data.shapeReference;
};
const searchShapes = (query: string) => {
  shapeOptions = props.shapes
  if (query) {
    shapeOptions = props.shapes.filter((item: any) => {
      return item.shapeName.toLowerCase().includes(query.toLowerCase());
    });
  } else if (!player.shape) {
    shapeOptions = props.shapes
  } else {
    shapeOptions = []
  }
};

watch(player, () => (oldId.value = props.editData.shapeReference), {
  immediate: true,
});

onUpdated(() => {
  if (props.isEdit) {
    setPlayerData(props.editData);
  } else {
    player.name = "";
    player.shape = "";
  }
  Object.assign(shapeOptions, props.shapes);
});
</script>
