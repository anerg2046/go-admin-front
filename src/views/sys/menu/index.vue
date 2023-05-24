<script setup lang="ts">
import { useSysMenuManagement } from "./utils/hook";
import { EditPen, Delete, Plus } from "@element-plus/icons-vue";
import SysMenuManagementEdit from "./components/edit.vue";
import { ref } from "vue";

defineOptions({
  name: "SysMenuManagement"
});

const editRef = ref();

const {
  dataList,
  loading,
  handleEdit,
  handleEditChild,
  handleDelete,
  fetchData
} = useSysMenuManagement(editRef);
</script>

<template>
  <div class="main-content">
    <el-card shadow="never">
      <div class="mb-2">
        <el-button :icon="Plus" type="primary" @click="handleEdit($event)">
          添加
        </el-button>
      </div>
      <el-table
        v-loading="loading"
        border
        :data="dataList"
        default-expand-all
        row-key="id"
        :tree-props="{ children: 'children' }"
      >
        <el-table-column label="菜单名称" prop="meta.title" min-width="120" />
        <el-table-column label="图标" width="55" align="center">
          <template #default="{ row }">
            <div v-if="row.meta.icon" class="inline-block">
              <IconifyIconOnline :icon="row.meta.icon" />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="路由地址" prop="path" />
        <el-table-column label="组件路径" prop="component" min-width="120" />
        <el-table-column label="唯一标识" prop="name" min-width="120" />
        <el-table-column label="排序" prop="queue" width="60" />
        <el-table-column align="center" label="类型" width="90">
          <template #default="{ row }">
            <el-tag v-if="row.genre == 1">菜单</el-tag>
            <el-tag v-if="row.genre == 2" type="warning">操作</el-tag>
            <el-tag v-if="row.genre == 3" type="danger">外链</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="显示父级" width="90">
          <template #default="{ row }">
            <el-tag v-if="row.meta.showParent" type="success">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="隐藏" prop="hidden" width="60">
          <template #default="{ row }">
            <el-tag v-if="row.meta?.showLink" type="success">否</el-tag>
            <el-tag v-else type="warning">是</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="缓存" width="60">
          <template #default="{ row }">
            <el-tag v-if="row.meta.keepAlive" type="success">是</el-tag>
            <el-tag v-else type="warning">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" width="160">
          <template #default="{ row }">
            <el-button
              size="small"
              type="success"
              title="添加下级菜单"
              @click="handleEditChild(row)"
              :disabled="row.genre != 1"
            >
              <IconifyIconOnline icon="ci:arrow-sub-down-left" />
            </el-button>
            <el-button
              title="编辑菜单"
              :icon="EditPen"
              size="small"
              type="primary"
              @click="handleEdit(row)"
            />
            <el-popconfirm title="是否确认删除?" @confirm="handleDelete(row)">
              <template #reference>
                <el-button
                  title="删除菜单"
                  :icon="Delete"
                  size="small"
                  type="danger"
                />
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <SysMenuManagementEdit ref="editRef" @fetch-data="fetchData" />
    </el-card>
  </div>
</template>
