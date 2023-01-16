/*
 * @Author: xuyingchao
 * @Date: 2023-01-16 15:35:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-16 15:37:47
 * @Descripttion:
 */
export function useForm() {
  const formData = reactive({
    user: "",
    status: ""
  });
  const rules = {
    name: [{ required: true, message: "请输入产品名称", trigger: "blur" }]
  };
  return {
    formData,
    rules
  };
}
