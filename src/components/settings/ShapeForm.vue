<template>
  <kath-dialog :visible="visible" :title="isEdit ? 'Edit Shape' : 'Add Shape'">
    <template #body>
      <el-form
        ref="shapeFormRef"
        :model="shape"
        :rules="shapeRules"
        :disabled="loading"
      >
        <el-row :gutter="10">
          <el-col :span="24" :lg="12">
            <el-form-item label="Shape Name" prop="name">
              <el-input v-model="shape.name" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
            <el-form-item label="Shape Character" prop="character">
              <el-input v-model="shape.character" />
            </el-form-item>
          </el-col>
          <el-col :span="24" :lg="12">
            <el-form-item label="Shape Color" prop="color">
              <el-color-picker v-model="shape.color" />
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
const shapeFormRef = ref();
const shape = ref({
  name: "",
  character: "",
  color: "",
  isUsed: 0,
});
const shapeRules = ref({
  name: [
    { required: true, message: "Shape name is required", trigger: "blur" },
  ],
  character: [
    { required: true, message: "Shape character is required", trigger: "blur" },
  ],
  color: [
    { required: true, message: "Shape color is required", trigger: "change" },
  ],
});

const onCancel = () => {
  emit("onCancel");
};
const onSubmit = () => {
  const submitParams = {
    shape: shape.value,
    isEdit: props.isEdit,
    editData: props.editData,
  };
  emit("onSubmit", shapeFormRef.value, submitParams);
};

const setShapeData = (data: any) => {
  shape.value.name = data.shapeName;
  shape.value.character = data.shape;
  shape.value.color = data.shapeColor;
  shape.value.isUsed = data.isUsed | 0;
};

onUpdated(() => {
  shapeFormRef.value.resetFields();
  if (props.isEdit) {
    setShapeData(props.editData);
  }
});
</script>
