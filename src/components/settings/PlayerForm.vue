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
          <el-col :span="24" :lg="12">
            <el-form-item label="Player Name" prop="name">
              <el-input v-model="player.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
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
import { onMounted, onUpdated, ref } from "vue";
import { useTictactoeStore } from "../../store/tictactoe";

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
const tictactoeStore = useTictactoeStore();

const playerFormRef = ref();
const player = ref({
  name: "",
  shape: "",
});
const playerRules = ref({
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

let shapeOptions = ref<any>([]);

const onCancel = () => {
  emit("onCancel");
};
const onSubmit = () => {
  const submitParams = {
    player: player.value,
    isEdit: props.isEdit,
    editData: props.editData,
  };
  emit("onSubmit", playerFormRef.value, submitParams);
};

const setPlayerData = (data: any) => {
  player.value.name = data.playerName;
  player.value.shape = data.shapeReference;
};
const searchShapes = (query: string) => {
  if (query) {
    shapeOptions.value = props.shapes.filter((item: any) => {
      return item.shapeName.toLowerCase().includes(query.toLowerCase());
    });
  } else if (!player.value.shape) {
    shapeOptions.value = props.shapes;
  } else {
    shapeOptions.value = [];
  }
};

onUpdated(() => {
  if (props.isEdit) {
    setPlayerData(props.editData);
  }
  shapeOptions.value = props.shapes;
});
</script>
