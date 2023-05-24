<script lang="ts" setup>
import { ref } from "vue";
import { useSysUserManagement } from "./utils/hook";
import { Delete, Plus, EditPen, Key } from "@element-plus/icons-vue";
import { TimeDefault } from "@/utils/time";
import ComponentPager from "@/components/RePager/index.vue";
import SysUserManagementEdit from "./components/edit.vue";
import SysUserManagementAssign from "./components/assign.vue";

defineOptions({
  name: "SysUserManagement"
});

const editRef = ref();
const assignRef = ref();
const queryForm = { page: 1, size: 20, keyword: "" };
const {
  loading,
  dataList,
  dataTotal,
  handleAssign,
  handleEdit,
  handleDelete,
  fetchData
} = useSysUserManagement({
  assignRef: assignRef,
  editRef: editRef,
  queryForm: queryForm
});
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
        <el-table-column label="ID" prop="id" width="60" />
        <el-table-column label="用户名" prop="username" show-overflow-tooltip />
        <el-table-column label="手机号" prop="phone" width="120" />
        <el-table-column align="center" label="角色" width="180">
          <template #default="{ row }">
            <el-tag v-for="(role, i) in row.roles" :key="i" class="mr-2">
              {{ role }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="加入时间" prop="created_at">
          <template #default="{ row }">
            {{ TimeDefault(row.created_at, "YYYY-MM-DD HH:mm:ss") }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160" align="center">
          <template #default="{ row }">
            <el-button
              title="用户分配角色"
              :icon="Key"
              size="small"
              type="success"
              @click="handleAssign(row)"
            />
            <el-button
              title="编辑用户"
              :icon="EditPen"
              size="small"
              type="primary"
              @click="handleEdit(row)"
            />
            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
              <template #reference>
                <el-button
                  title="删除用户"
                  :icon="Delete"
                  size="small"
                  type="danger"
                />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <ComponentPager
        :query-form="queryForm"
        :total="dataTotal"
        @fetch-data="fetchData"
      />
      <SysUserManagementEdit ref="editRef" @fetch-data="fetchData" />
      <SysUserManagementAssign ref="assignRef" @fetch-data="fetchData" />
    </el-card>
  </div>
</template>
