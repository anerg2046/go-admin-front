import { delUser, listUser } from "@/api/system";
import { message } from "@/utils/message";
import { AxiosError } from "axios";
import { onMounted, ref } from "vue";

export const useSysUserManagement = (props: any) => {
  const dataList = ref([]);
  const dataTotal = ref(0);
  const loading = ref(true);

  const handleEdit = row => {
    if (row.id) {
      props.editRef.value.showEdit(row);
    } else {
      props.editRef.value.showEdit();
    }
  };

  const handleAssign = row => {
    if (row.id) {
      props.assignRef.value.showAssign(row);
    }
  };

  async function handleDelete(row: any) {
    try {
      const { code, msg } = await delUser({ id: row.id });
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
      const { data } = await listUser(props.queryForm);
      dataList.value = data?.list;
      dataTotal.value = data?.total;
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        message(e.response.data.msg, { type: "error" });
      }
      dataList.value = [];
      dataTotal.value = 0;
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
    dataTotal,
    loading,
    handleAssign,
    handleEdit,
    handleDelete,
    fetchData
  };
};
