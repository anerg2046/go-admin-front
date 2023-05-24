import { FormInstance } from "element-plus";
import { Ref } from "vue";

type EditProps = {
  defaultFormData: any;
  formData: any;
  formVisible: Ref<boolean>;
  isAdd: Ref<boolean>;
  ruleFormRef: Ref<FormInstance>;
  title: Ref<string>;
  titleExt: string;
  doneFn?: Function;
};

export type { EditProps };
