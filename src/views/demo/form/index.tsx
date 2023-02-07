/*
 * @Author: xuyingchao
 * @Date: 2023-01-16 15:35:11
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-06 16:31:41
 * @Descripttion:
 */
import { isPhone } from "@pureadmin/utils";
import { cloneDeep } from "@pureadmin/utils";
import { getUserDetails } from "@/api/demo";
export function useForm() {
  const formData = reactive({
    id: "",
    username: "",
    sex: 1,
    mobile: "",
    roleIdList: [],
    avatarUrl: [],
    content: "",
    videoUrl: [],
    fileUrl: [],
    areaIds: []
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
    sex: [{ required: true, message: "请选择性别", trigger: "change" }],
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
  // 处理数据
  const handleForm = (formData: any) => {
    const { avatarUrl } = formData,
      form = cloneDeep(formData);
    form.avatarUrl = avatarUrl[0]?.url;
    // 数据造假
    const form2 = { corpId: 6, userMenuDoList: [], belong: 1 };
    return { ...form, ...form2 };
  };

  function initDetails() {
    const route = useRoute();
    const id = route.query?.id ? route.query?.id : "";
    if (id) {
      getUserDetails({ id }).then(res => {
        console.log("initDetails ing");
        if (res.code == 0) {
          const { username, sex, mobile, roleIdList, id } = res.data;
          formData.id = id;
          formData.username = username;
          formData.sex = sex;
          formData.mobile = mobile;
          formData.roleIdList = roleIdList;
        }
      });
    }
  }
  return { dataLoading, formData, rules, initDetails, handleForm };
}
