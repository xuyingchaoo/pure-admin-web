/*
 * @Author: xuyingchao
 * @Date: 2023-01-16 15:35:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-01-17 17:33:19
 * @Descripttion:
 */
export function useForm() {
  const formData = reactive({
    username: "",
    sex: 1,
    mobile: "",
    belong: ""
  });
  const rules = {
    username: [{ required: true, message: "请输入人员名称", trigger: "blur" }],
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
    mobile: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
    belong: [{ required: true, message: "请选择角色", trigger: "blur" }]
  };
  return {
    formData,
    rules
  };
}
