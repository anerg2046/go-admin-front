<template>
  <el-config-provider :locale="currentLocale">
    <router-view />
    <ReDialog />
  </el-config-provider>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
import { ReDialog } from "@/components/ReDialog";
import { useWatermark } from "@pureadmin/utils";
import { useNav } from "@/layout/hooks/useNav";
export default defineComponent({
  name: "app",
  components: {
    [ElConfigProvider.name]: ElConfigProvider,
    ReDialog
  },
  computed: {
    currentLocale() {
      return zhCn;
    }
  },
  setup() {
    const { setWatermark } = useWatermark();
    const { title } = useNav();
    onMounted(() => {
      nextTick(() => {
        setWatermark(title.value, {
          globalAlpha: 0.5 // 值越低越透明
        });
      });
    });
  }
});
</script>
