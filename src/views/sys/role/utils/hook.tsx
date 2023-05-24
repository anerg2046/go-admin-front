import { ref, onMounted } from "vue";
import { delRole, listRole } from "@/api/system";
import { message } from "@/utils/message";
import { AxiosError } from "axios";

export const useSysRoleManagement = (editRef, assignRef) => {
  const dataList = ref([]);
  const loading = ref(true);

  const handleEdit = row => {
    if (row.id) {
      editRef.value.showEdit(row);
    } else {
      editRef.value.showEdit();
    }
  };

  const handleAssign = row => {
    if (row.id) {
      assignRef.value.showAssign(row);
    }
  };

  async function handleDelete(row: any) {
    try {
      const { code, msg } = await delRole({ id: row.id });
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

  const fetchData = async () => {
    loading.value = true;
    try {
      const { data } = await listRole();
      dataList.value = data;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        message(e.response.data.msg, { type: "error" });
      }
      dataList.value = [];
      console.log(e);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchData();
  });

  return {
    dataList,
    loading,
    handleEdit,
    handleAssign,
    handleDelete,
    fetchData
  };
};
