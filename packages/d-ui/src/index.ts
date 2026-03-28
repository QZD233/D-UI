/*
 * @Author: QZD233 1634562839@qq.com
 * @Date: 2026-03-28 14:25:06
 * @LastEditors: QZD233 1634562839@qq.com
 * @LastEditTime: 2026-03-28 16:17:32
 * @FilePath: \D-UI\packages\d-ui\src\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import type { App } from "vue";

import "./styles/index.css";

import DForm from "./components/DForm/index.vue";
import {
  IDFormConfig,
  IFormItemConfig,
  IOptions,
  IFormAttributes,
  IFormItemAttributes,
} from "./components/DForm/dForm";

// 导出所有组件
export {
  DForm,
  type IDFormConfig,
  type IFormItemConfig,
  type IOptions,
  type IFormAttributes,
  type IFormItemAttributes,
};

// 组件列表（用于全量注册）
const components = [DForm];

/**
 * 全量安装
 */
export function install(app: App) {
  components.forEach((component) => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
}

export default {
  install,
};
