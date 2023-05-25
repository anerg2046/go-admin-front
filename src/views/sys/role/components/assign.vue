<script lang="ts" setup>
import { permissionRole, listMenu, assignRole } from "@/api/system";
import { message } from "@/utils/message";
import { requestHook } from "@/utils/request";
import { nextTick, onActivated, ref } from "vue";

defineOptions({
  name: "SysRoleManagementAssign"
});

const formVisible = ref(false);
const title = ref("");
const treeRef = ref();
const role = ref();
const permission = ref();

const fetchMenu = async () => {
  const { data } = await requestHook(listMenu());
  permission.value = data;
};

const showAssign = row => {
  role.value = row;
  title.value = `${row.name} - 权限指派`;
  initCheckoutTree();
  formVisible.value = true;
};

const closeDialog = () => {
  role.value = {};
  formVisible.value = false;
};

// 对半选和全选的进行反选
const initCheckoutTree = async () => {
  // 初始化需要等dom元素加载完毕以后在进行获取ref
  nextTick(async () => {
    // defaultCheckedKeys:后端返回的选中id [1,3,4,56,7,8,9,223]
    await treeRef.value.setCheckedKeys([]);
    const { data } = await requestHook(permissionRole({ id: role.value.id }));
    for (const key of data) {
      // getNode（获取tree中对应的节点）
      const node = treeRef.value.getNode(key);
      treeRef.value.setChecked(node, true);
      // isLeaf（判断节点是否为叶子节点）
      // 如果存在isLeaf 代表是叶子节点为最后一级那么就选中即可 不是则不选择
      if (node?.isLeaf) {
        // setChecked （设置tree中对应的节点为选中状态）
        treeRef.value.setChecked(node, true);
      }
    }
  });
};

onActivated(() => {
  fetchMenu();
});

// onMounted(() => {
//   fetchMenu();
// });

const showLable = (data: any) => {
  return data.meta?.title;
};

const save = async () => {
  const data = {
    menu_ids: [
      ...treeRef.value.getCheckedKeys(),
      ...treeRef.value.getHalfCheckedKeys()
    ],
    id: role.value.id
  };
  if (data.menu_ids.length > 0) {
    const { code } = await requestHook(assignRole(data));
    if (code === 0) {
      message("提交成功", { type: "success" });
      closeDialog();
    }
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
    <el-tree
      ref="treeRef"
      :data="permission"
      default-expand-all
      :height="600"
      node-key="id"
      :props="{ children: 'children', label: showLable }"
      show-checkbox
    />
    <template #footer>
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>
