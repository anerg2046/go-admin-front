import { http } from "@/utils/http";
import { baseUrlApi, ApiResult } from "./utils";

/** 所有菜单列表 */
export const listMenu = () => {
  return http.request<ApiResult>("get", baseUrlApi("/sys/menus/list"));
};

/** 添加/修改菜单 */
export const editMenu = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/menus/edit"), {
    data
  });
};

/** 删除菜单 */
export const delMenu = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/menus/del"), {
    data
  });
};

/** 所有角色列表 */
export const listRole = () => {
  return http.request<ApiResult>("get", baseUrlApi("/sys/roles/list"));
};

/** 添加/修改角色 */
export const editRole = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/roles/edit"), {
    data
  });
};

/** 删除角色 */
export const delRole = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/roles/del"), {
    data
  });
};

/** 角色权限 */
export const permissionRole = (params?: object) => {
  return http.request<ApiResult>("get", baseUrlApi("/sys/roles/permission"), {
    params
  });
};

/** 角色指派权限 */
export const assignRole = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/roles/assign"), {
    data
  });
};

/** 所有用户列表 */
export const listUser = (params?: object) => {
  return http.request<ApiResult>("get", baseUrlApi("/sys/users/list"), {
    params
  });
};

/** 添加/修改用户 */
export const editUser = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/users/edit"), {
    data
  });
};

/** 删除用户 */
export const delUser = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/users/del"), {
    data
  });
};

/** 用户分配角色 */
export const assignUser = (data?: object) => {
  return http.request<ApiResult>("post", baseUrlApi("/sys/users/assign"), {
    data
  });
};
