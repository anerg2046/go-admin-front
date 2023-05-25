<script lang="ts" setup>
import { clone } from "@pureadmin/utils";
import { FormInstance } from "element-plus";
import { ref } from "vue";
import { ReEdit } from "@/components/ReEdit";
import { formRules } from "../utils/rules";
import { message } from "@/utils/message";
import { editUser } from "@/api/system";
import { requestHook } from "@/utils/request";

defineOptions({
  name: "SysUserManagementEdit"
});
const emit = defineEmits(["fetch-data"]);
const ruleFormRef = ref<FormInstance>();
const defaultFormData = ref<any>({
  id: null,
  username: "",
  password: "",
  phone: ""
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
  titleExt: "用户",
  doneFn: () => {
    emit("fetch-data");
  }
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      const { code } = await requestHook(editUser(formData.value));
      if (code === 0) {
        message("提交成功", { type: "success" });
        closeDialog();
      }
    }
  });
};

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
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="formData.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model.trim="formData.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formData.password"
          :placeholder="isAdd ? '请输入密码' : '留空表示不修改'"
          show-password
        />
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
