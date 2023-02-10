/*
 * @Author: xuyingchao
 * @Date: 2023-01-16 15:35:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-10 16:44:20
 * @Descripttion:
 */
import { isPhone } from "@pureadmin/utils";
export function useForm() {
  const formData = reactive({
    id: "",
    username: "",
    status: 1,
    mobile: "",
    roleIdList: []
  });
  const validatePhone = (rule: any, value: any, callback: any) => {
    if (isPhone(formData.mobile)) {
      callback();
    } else {
      callback(new Error("请输入正确联系方式"));
    }
  };
  const rules = {
    username: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
    mobile: [
      {
        required: true,
        message: "请输入联系方式",
        trigger: "blur"
      },
      {
        validator: validatePhone,
        trigger: "blur"
      }
    ],
    roleIdList: [{ required: true, message: "请选择角色", trigger: "blur" }]
  };
  const dataLoading = ref(false);
  return { dataLoading, formData, rules };
}
