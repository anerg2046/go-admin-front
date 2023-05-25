<script lang="ts" setup>
import { ref } from "vue";
import { FormInstance } from "element-plus";
import { listMenu, editMenu } from "@/api/system";
import { clone } from "@pureadmin/utils";
import { formRules } from "../utils/rules";
import { message } from "@/utils/message";
import { ReEdit } from "@/components/ReEdit";
import { requestHook } from "@/utils/request";

defineOptions({
  name: "SysMenuManagementEdit"
});

const emit = defineEmits(["fetch-data"]);
const ruleFormRef = ref<FormInstance>();
const defaultFormData = ref({
  parent_id: 0,
  genre: 1,
  path: "",
  queue: 0,
  meta: {
    title: "",
    showLink: true,
    keepAlive: true,
    showParent: true
  }
});

const formVisible = ref(false);
const formData = ref(clone(defaultFormData, true));
const title = ref("");
const isAdd = ref(false);

const { showEdit, closeDialog } = ReEdit({
  defaultFormData: defaultFormData,
  formData: formData,
  formVisible: formVisible,
  isAdd: isAdd,
  ruleFormRef: ruleFormRef,
  title: title,
  titleExt: "菜单",
  doneFn: () => {
    emit("fetch-data");
  }
});

const treeData = ref<any>();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async valid => {
    if (valid) {
      const { code } = await requestHook(editMenu(formData.value));
      if (code === 0) {
        message("提交成功", { type: "success" });
        closeDialog();
      }
    }
  });
};

const showEditWithParent = (pid: number) => {
  if (pid >= 0) {
    showEdit({ parent_id: pid });
  }
};

const fetchData = async () => {
  const { data } = await requestHook(listMenu());
  treeData.value = [
    {
      id: 0,
      parent_id: 0,
      meta: {
        title: "顶级菜单"
      },
      children: data
    }
  ];
};

const showLable = (data: any) => {
  return data.meta?.title;
};

defineExpose({
  showEdit,
  showEditWithParent,
  fetchData
});
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
      <el-row>
        <el-col :span="12">
          <el-form-item label="上级菜单">
            <el-tree-select
              v-model="formData.parent_id"
              check-strictly
              clearable
              :data="treeData"
              default-expand-all
              :props="{
                children: 'children',
                label: showLable,
                value: 'id'
              }"
              :render-after-expand="false"
              style="width: 255px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单类型" prop="genre">
            <el-radio v-model="formData.genre" :label="1">菜单</el-radio>
            <el-radio v-model="formData.genre" :label="2">操作</el-radio>
            <el-radio v-model="formData.genre" :label="3">外链</el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="标题" prop="meta.title">
            <el-input v-model.trim="formData.meta.title" style="width: 255px" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="meta.showLink">
            <template #label>
              <div class="flex" style="align-items: center">
                <el-tooltip
                  class="box-item"
                  content="在左侧菜单中隐藏"
                  effect="dark"
                  placement="top"
                >
                  <IconifyIconOnline icon="material-symbols:help-outline" />
                </el-tooltip>
                <label>可见性</label>
              </div>
            </template>
            <el-radio v-model="formData.meta.showLink" :label="true">
              显示
            </el-radio>
            <el-radio v-model="formData.meta.showLink" :label="false">
              隐藏
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="name">
            <template #label>
              <span v-if="formData.genre == 3">
                <div class="flex" style="align-items: center">
                  <el-tooltip
                    class="box-item"
                    content="外链地址，需以 http:// https:// // 开头"
                    effect="dark"
                    placement="top"
                  >
                    <IconifyIconOnline icon="material-symbols:help-outline" />
                  </el-tooltip>
                  <span>外链地址</span>
                </div>
              </span>
              <span v-else>
                <div class="flex" style="align-items: center">
                  <el-tooltip
                    class="box-item"
                    content="首字母大写，一定要与 vue 文件 defineOptions 的 name 对应起来"
                    effect="dark"
                    placement="top"
                  >
                    <IconifyIconOnline icon="material-symbols:help-outline" />
                  </el-tooltip>
                  <span>唯一标识</span>
                </div>
              </span>
            </template>
            <el-input
              v-model.trim="formData.name"
              :disabled="!isAdd && formData.genre != 3"
              style="width: 255px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="path">
            <template #label>
              <span v-if="formData.genre == 2">
                <div class="flex" style="align-items: center">
                  <el-tooltip
                    class="box-item"
                    content="请求服务器的路径"
                    effect="dark"
                    placement="top"
                  >
                    <IconifyIconOnline icon="material-symbols:help-outline" />
                  </el-tooltip>
                  <span>操作地址</span>
                </div>
              </span>
              <span v-else>
                <div class="flex" style="align-items: center">
                  <el-tooltip
                    class="box-item"
                    content="path必须以/开头"
                    effect="dark"
                    placement="top"
                  >
                    <IconifyIconOnline icon="material-symbols:help-outline" />
                  </el-tooltip>
                  <span>路由地址</span>
                </div>
              </span>
            </template>
            <el-input v-model.trim="formData.path" style="width: 255px" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-divider />
      <el-row>
        <el-col :span="12">
          <el-form-item label="组件路径">
            <el-input
              v-model.trim="formData.component"
              clearable
              :disabled="formData.genre != 1"
              style="width: 255px"
              placeholder="可选"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="是否缓存" prop="meta.keepAlick">
            <el-radio v-model="formData.meta.keepAlive" :label="true">
              是
            </el-radio>
            <el-radio v-model="formData.meta.keepAlive" :label="false">
              否
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item prop="meta.icon">
            <template #label>
              <div class="flex" style="align-items: center">
                <el-tooltip
                  class="box-item"
                  content="请访问 https://icones.js.org/ 查询"
                  effect="dark"
                  placement="top"
                >
                  <IconifyIconOnline icon="material-symbols:help-outline" />
                </el-tooltip>
                <label>图标</label>
              </div>
            </template>
            <el-input
              v-model.trim="formData.meta.icon"
              clearable
              style="width: 255px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item prop="meta.keepAlick">
            <template #label>
              <div class="flex" style="align-items: center">
                <el-tooltip
                  class="box-item"
                  content="当下级菜单只有一个的时候是否显示父级菜单"
                  effect="dark"
                  placement="top"
                >
                  <IconifyIconOnline icon="material-symbols:help-outline" />
                </el-tooltip>
                <label>显示父级</label>
              </div>
            </template>
            <el-radio v-model="formData.meta.showParent" :label="true">
              是
            </el-radio>
            <el-radio v-model="formData.meta.showParent" :label="false">
              否
            </el-radio>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="排序" prop="queue">
            <el-input-number v-model="formData.queue" :min="0" :step="5" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <el-button @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>
