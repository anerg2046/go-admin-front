import { listMenu, delMenu } from "@/api/system";
import { ref, onMounted } from "vue";
import { message } from "@/utils/message";
import { AxiosError } from "axios";

export function useSysMenuManagement(editRef: any) {
  const dataList = ref([]);
  const loading = ref(true);

  async function fetchData() {
    loading.value = true;
    try {
      const { data } = await listMenu();
      dataList.value = data;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        message(e.response.data.msg, { type: "error" });
      }
      console.log(e);
    } finally {
      loading.value = false;
    }
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
    try {
      const { code, msg } = await delMenu({ id: row.id });
      if (code === 0) {
        message("删除成功", { type: "success" });
        fetchData();
      } else {
        message(msg, { type: "error" });
      }
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        message(e.response.data.msg, { type: "error" });
      }
      console.log(e);
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
