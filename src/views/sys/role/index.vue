<script lang="ts" setup>
import { ref } from "vue";
import { useSysRoleManagement } from "./utils/hook";
import { Delete, Plus, EditPen, Key } from "@element-plus/icons-vue";
import SysRoleManagementEdit from "./components/edit.vue";
import SysRoleManagementAssign from "./components/assign.vue";
defineOptions({
  name: "SysRoleManagement"
});
const editRef = ref();
const assignRef = ref();
const { dataList, loading, handleEdit, handleAssign, handleDelete, fetchData } =
  useSysRoleManagement(editRef, assignRef);
</script>

<template>
  <div class="main-content">
    <el-card shadow="never">
      <div class="mb-2">
        <el-button :icon="Plus" type="primary" @click="handleEdit($event)">
          添加
        </el-button>
      </div>
      <el-table v-loading="loading" border :data="dataList" row-key="id">
        <el-table-column label="角色编码" prop="code" show-overflow-tooltip />
        <el-table-column label="角色名称" prop="name" show-overflow-tooltip />
        <el-table-column label="排序" prop="queue" show-overflow-tooltip />
        <el-table-column
          label="角色描述"
          prop="description"
          show-overflow-tooltip
        />
        <el-table-column fixed="right" label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button
              title="角色指派权限"
              :disabled="row.code == 'superadmin'"
              :icon="Key"
              size="small"
              type="success"
              @click="handleAssign(row)"
            />
            <el-button
              title="编辑角色"
              :disabled="row.code == 'superadmin'"
              :icon="EditPen"
              size="small"
              type="primary"
              @click="handleEdit(row)"
            />

            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
              <template #reference>
                <el-button
                  title="删除角色"
                  :disabled="row.code == 'superadmin'"
                  :icon="Delete"
                  size="small"
                  type="danger"
                />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <SysRoleManagementEdit ref="editRef" @fetch-data="fetchData" />
      <SysRoleManagementAssign ref="assignRef" />
    </el-card>
  </div>
</template>
