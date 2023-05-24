<script setup lang="ts">
import { assignUser, listRole } from "@/api/system";
import { message } from "@/utils/message";
import { AxiosError } from "axios";
import { onActivated, ref } from "vue";

defineOptions({
  name: "SysUserManagementAssign"
});

const emit = defineEmits(["fetch-data"]);
const formVisible = ref(false);
const title = ref("");
const roleList = ref();
const user = ref();
const checkRoles = ref([]);

const fetchRole = async () => {
  try {
    const { data } = await listRole();
    roleList.value = data;
  } catch (e) {
    if ((e as AxiosError)?.response?.status === 401) {
      message(e.response.data.msg, { type: "error" });
    }
  }
};

const showAssign = row => {
  user.value = row;
  checkRoles.value = user.value.roles;
  title.value = `${row.username} - 分配角色`;
  formVisible.value = true;
};

const closeDialog = () => {
  user.value = {};
  formVisible.value = false;
};

onActivated(() => {
  fetchRole();
});

const save = async () => {
  const data = {
    roles: [...checkRoles.value],
    id: user.value.id
  };
  try {
    const { code, msg } = await assignUser(data);
    if (code === 0) {
      message("提交成功", { type: "success" });
      emit("fetch-data");
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
};

defineExpose({ showAssign });
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="title"
    width="500px"
    :before-close="closeDialog"
    :draggable="true"
  >
    <el-checkbox-group v-model="checkRoles">
      <el-checkbox v-for="role in roleList" :key="role.id" :label="role.code">
        {{ role.name }}
      </el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>
