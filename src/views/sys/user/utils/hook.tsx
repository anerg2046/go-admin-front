import { delUser, listUser } from "@/api/system";
import { message } from "@/utils/message";
import { requestHook } from "@/utils/request";
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
    const { code } = await requestHook(delUser({ id: row.id }));
    if (code === 0) {
      message("删除成功", { type: "success" });
      fetchData();
    }
  }

  const fetchData = async () => {
    loading.value = true;
    const { data } = await requestHook(listUser(props.queryForm));
    dataList.value = data?.list;
    dataTotal.value = data?.total;
    loading.value = false;
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
