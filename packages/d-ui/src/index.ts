import type { App } from "vue";

import "./styles/index.css";

import DForm from "./components/DForm/index.vue";
import DHelloWorld from "./components/HelloWorld.vue";
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
  DHelloWorld,
  type IDFormConfig,
  type IFormItemConfig,
  type IOptions,
  type IFormAttributes,
  type IFormItemAttributes,
};

// 组件列表（用于全量注册）
const components = [DForm, DHelloWorld];

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
