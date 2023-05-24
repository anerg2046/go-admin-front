<script lang="ts" setup>
import { ref } from "vue";

defineOptions({
  name: "ComponentPager"
});

const props = defineProps({
  queryForm: {
    type: Object,
    default: () => {
      return {
        page: 1,
        size: 20
      };
    }
  },
  total: {
    type: Number,
    default: 0
  }
});

const queryForm = ref(props.queryForm);
const layout = "total, sizes, prev, pager, next, jumper";

const emit = defineEmits(["fetch-data"]);

const handleSizeChange = val => {
  queryForm.value.size = val;
  emit("fetch-data");
};
const handleCurrentChange = val => {
  queryForm.value.page = val;
  emit("fetch-data");
};
</script>

<template>
  <div class="flex justify-center mt-4">
    <el-pagination
      background
      :current-page="queryForm.page"
      :layout="layout"
      :page-size="queryForm.size"
      :page-sizes="[10, 20, 50, 100, 200]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>
