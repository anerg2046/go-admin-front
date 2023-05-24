import { clone } from "@pureadmin/utils";
import { FormInstance } from "element-plus";
import { EditProps } from "./type";
import deepmerge from "deepmerge";

export const ReEdit = (props: EditProps) => {
  const showEdit = (row: any) => {
    props.formVisible.value = true;
    if (row?.id) {
      props.title.value = "编辑" + props.titleExt;
      props.formData.value = clone(row, true);
      props.isAdd.value = false;
    } else {
      props.formData.value = clone(props.defaultFormData.value, true);
      if (row) {
        props.formData.value = deepmerge(props.defaultFormData.value, row);
      }
      props.title.value = "添加" + props.titleExt;
      props.isAdd.value = true;
    }
  };

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  const closeDialog = () => {
    props.formVisible.value = false;
    resetForm(props.ruleFormRef.value);
    if (props.doneFn) {
      props.doneFn();
    }
  };

  return {
    showEdit,
    closeDialog
  };
};
