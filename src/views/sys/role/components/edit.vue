<script lang="ts" setup>
import { clone } from "@pureadmin/utils";
import { FormInstance } from "element-plus";
import { formRules } from "../utils/rules";
import { message } from "@/utils/message";
import { ReEdit } from "@/components/ReEdit";
import { ref, watch } from "vue";
import { editRole } from "@/api/system";
import { AxiosError } from "axios";

defineOptions({
  name: "SysRoleManagementEdit"
});

const emit = defineEmits(["fetch-data"]);
const ruleFormRef = ref<FormInstance>();
const defaultFormData = ref<any>({
  id: null,
  code: "",
  name: "",
  queue: 0,
  description: ""
});

const formVisible = ref(false);
const formData = ref<any>(clone(defaultFormData, true));
const title = ref("");
const isAdd = ref(false);

const { showEdit, closeDialog } = ReEdit({
  defaultFormData: defaultFormData,
  formData: formData,
  formVisible: formVisible,
  isAdd: isAdd,
  ruleFormRef: ruleFormRef,
  title: title,
  titleExt: "角色",
  doneFn: () => {
    emit("fetch-data");
  }
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      try {
        const { code, msg } = await editRole(formData.value);
        if (code === 0) {
          message("提交成功", { type: "success" });
          closeDialog();
        } else {
          message(msg, { type: "error" });
        }
      } catch (e) {
        if ((e as AxiosError)?.response?.status === 401) {
          message(e.response.data.msg, { type: "error" });
        }
        console.log(e);
      }
    }
  });
};

watch(
  () => formData.value.code,
  val => {
    formData.value.code = val.replace(/[^a-zA-Z0-9\\-]/g, "").toLowerCase();
  }
);

defineExpose({ showEdit });
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="title"
    width="750px"
    :before-close="closeDialog"
    :draggable="true"
  >
    <el-form
      ref="ruleFormRef"
      :rules="formRules"
      label-width="100px"
      :model="formData"
    >
      <el-form-item label="编码" prop="code">
        <el-input
          v-model.trim="formData.code"
          :disabled="!isAdd"
          placeholder="请输入角色编码，限英文和数字"
        />
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model.trim="formData.name" />
      </el-form-item>
      <el-form-item label="排序" prop="queue">
        <el-input-number v-model="formData.queue" :min="0" :step="5" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model.trim="formData.description" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
