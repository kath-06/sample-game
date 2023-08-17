<template>
  <kath-dialog :visible="visible" title="TicTacToe Shape">
    <template #body>
      <el-form ref="shapeFormRef" :model="shape" :rules="shapeRules">
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
        type="success"
        translate="fade-right-in"
        @button-click="onSubmit"
      >
        Save
      </main-button>
      <main-button
        class="mr-1 ml-1"
        rounded
        type="danger"
        translate="fade-right-in"
        @button-click="onCancel"
      >
        Cancel
      </main-button>
    </template>
  </kath-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  isEdit: {
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
  emit("onSubmit", shapeFormRef.value, shape.value);
};
</script>
