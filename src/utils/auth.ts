/*
 * @Author: xuyingchao
 * @Date: 2023-01-05 14:40:55
 * @LastEditors: xuyingchao
 * @LastEditTime: 2023-02-13 11:40:47
 * @Descripttion:
 */
import Cookies from "js-cookie";
import { storageSession } from "@pureadmin/utils";
import { useUserStoreHook } from "@/store/modules/user";
import { getUserInfo } from "@/api/login";
// import { router } from "@/router";
import { useCommon } from "@/utils/rzCommon";
const { timeFormat } = useCommon();

export interface DataInfo<T> {
  /** token */
  accessToken: string;
  /** `accessToken`的过期时间（时间戳） */
  expires: T;
  /** 用于调用刷新accessToken的接口时所需的token */
  refreshToken: string;
  /** 用户名 */
  username?: string;
  /** 当前登陆用户的角色 */
  roles?: Array<string>;
}
export const sessionKey = "user-info";
export const TokenKey = "authorized-token";

/** 获取`token` */
export function getToken(): DataInfo<number> {
  // 此处与`TokenKey`相同，此写法解决初始化时`Cookies`中不存在`TokenKey`报错
  return Cookies.get(TokenKey)
    ? JSON.parse(Cookies.get(TokenKey))
    : storageSession().getItem(sessionKey);
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`这两条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`username`、`roles`、`refreshToken`、`expires`这四条信息放在key值为`user-info`的sessionStorage里（浏览器关闭自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0;
  const { accessToken, refreshToken } = data;
  expires = new Date(data.expires).getTime(); // 如果后端直接设置时间戳，将此处代码改为expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  const cookieString = JSON.stringify({ accessToken, expires });

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000
      })
    : Cookies.set(TokenKey, cookieString);

  function setSessionKey(username: string, roles: Array<string>) {
    useUserStoreHook().SET_USERNAME(username);
    useUserStoreHook().SET_ROLES(roles);
    storageSession().setItem(sessionKey, {
      refreshToken,
      expires,
      username,
      roles
    });
  }

  if (data.username && data.roles) {
    const { username, roles } = data;
    setSessionKey(username, roles);
  } else {
    const username =
      storageSession().getItem<DataInfo<number>>(sessionKey)?.username ?? "";
    const roles =
      storageSession().getItem<DataInfo<number>>(sessionKey)?.roles ?? [];
    setSessionKey(username, roles);
  }
}

// 当前token设置
export function setTokenNew(data) {
  return new Promise(resolve => {
    const { token } = data,
      currentTime = new Date().getTime() + data.expire * 1000,
      expireTime = timeFormat("YYYY/mm/dd HH:MM:SS", new Date(currentTime)),
      expires = new Date(expireTime).getTime(),
      cookieString = JSON.stringify({
        accessToken: token,
        expires
      });
    Cookies.set(TokenKey, cookieString);
    function setSessionKey(info: UserInfo) {
      useUserStoreHook().SET_USERNAME(info.username);
      useUserStoreHook().SET_USERINFO(info);
      storageSession().setItem(sessionKey, {
        username: info.username,
        roles: info.roleIdList,
        expires
      });
    }
    if (token) {
      // 获取用户信息 并存储
      getUserInfo().then(res => {
        if (res.code == 0) {
          setSessionKey(res.data);
          resolve(res);
        }
      });
    }
  });
}

/** 删除`token`以及key值为`user-info`的session信息 */
export function removeToken() {
  Cookies.remove(TokenKey);
  sessionStorage.clear();
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return "Bearer " + token;
};
