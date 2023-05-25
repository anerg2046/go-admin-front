import { listMenu, delMenu } from "@/api/system";
import { ref, onMounted } from "vue";
import { message } from "@/utils/message";
import { requestHook } from "@/utils/request";

export function useSysMenuManagement(editRef: any) {
  const dataList = ref([]);
  const loading = ref(true);

  async function fetchData() {
    loading.value = true;
    const { data } = await requestHook(listMenu());
    dataList.value = data;
    loading.value = false;
  }

  function handleEdit(row: any) {
    editRef.value.fetchData();
    if (row.id) {
      editRef.value.showEdit(row);
    } else {
      editRef.value.showEdit();
    }
  }

  function handleEditChild(row: any) {
    if (row.id) {
      editRef.value.fetchData();
      editRef.value.showEditWithParent(row.id);
    }
  }

  async function handleDelete(row: any) {
    const { code } = await requestHook(delMenu({ id: row.id }));
    if (code === 0) {
      message("删除成功", { type: "success" });
      fetchData();
    }
  }

  onMounted(() => {
    fetchData();
  });

  return {
    dataList,
    loading,
    handleEdit,
    handleEditChild,
    handleDelete,
    fetchData
  };
}
