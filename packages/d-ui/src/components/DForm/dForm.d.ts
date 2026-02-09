/**
 * 定义表单项的基础结构
 */
export interface IFormItemConfig {
  // 组件类型，如 'input', 'select', 'date-picker'
  type?:
    | "input"
    | "inputNumber"
    | "inputTag"
    | "radioGroup"
    | "select"
    | "selectV2"
    | "slider"
    | "switch"
    | "timePicker"
    | "timeSelect"
    | "treeSelect"
    | "datePicker"
    | "colorPicker"
    | "checkboxGroup"
    | "cascader"
    | "footer";

  // 是否可编辑
  edit?: boolean;

  // 控制是否显示，支持动态函数
  visible?: boolean | ((modelValue: any) => boolean);

  // 栅格布局的配置 (Element Plus的el-col)
  span?: number; // 栅格占据的列数（默认 breakpoint）
  offset?: number; // 栅格左侧的间隔格数
  push?: number; // 栅格向右移动格数
  pull?: number; // 栅格向左移动格数
  // 响应式栅格，同 Element Plus el-col
  xs?: number | { span?: number; offset?: number };
  sm?: number | { span?: number; offset?: number };
  md?: number | { span?: number; offset?: number };
  lg?: number | { span?: number; offset?: number };
  xl?: number | { span?: number; offset?: number };

  // 子选项，用于select、radio-group等
  options?: IOptions[];

  // 所使用的组件插槽列表（如果存在），具体插槽名称可查看element plus对应组件文档，使用：prop + '-' + 插槽名称
  elSlotNames?: string[];

  // 传递给Element组件的属性，如placeholder, clearable
  attributes?: Record<string, any>;

  // 表单项文字插槽
  labelSlotName?: string;

  // 子表单项，用于嵌套结构
  children?: IFormItemConfig[];

  /**
   * el-form-item的属性
   */
  formItemAttributes: IFormItemAttributes;
}

export interface IOptions {
  label?: string;
  value?: any;
  text?: string;
}

/**
 * el-form的配置
 */
export interface IFormAttributes {
  // 栅格布局的配置 (Element Plus的el-row)
  gutter?: number; // 栅格间隔
  justify?:
    | "start"
    | "end"
    | "center"
    | "space-around"
    | "space-between"
    | "space-evenly"; // flex 布局下的水平排列方式
  align?: "top" | "middle" | "bottom"; // flex 布局下的垂直排列方式
  tag?: string; // 自定义元素标签

  // 响应式栅格，同 Element Plus el-col，优先使用el-col的配置，否则统一使用以下
  span?: number; // 栅格占据的列数（默认 breakpoint）
  offset?: number; // 栅格左侧的间隔格数
  push?: number; // 栅格向右移动格数
  pull?: number; // 栅格向左移动格数
  xs?: number | { span?: number; offset?: number };
  sm?: number | { span?: number; offset?: number };
  md?: number | { span?: number; offset?: number };
  lg?: number | { span?: number; offset?: number };
  xl?: number | { span?: number; offset?: number };

  // 行内表单模式
  inline?: boolean;

  // 表单域标签的位置
  labelPosition?: "left" | "right" | "top";

  // 标签的长度
  labelWidth?: string | number;

  // 表单域标签的后缀
  labelSuffix?: string;

  // 是否隐藏必填字段标签旁边的红色星号
  hideRequiredAsterisk?: boolean;

  // 星号的位置
  requireAsteriskPosition?: "left" | "right";

  // 是否以行内形式展示校验信息
  inlineMessage?: boolean;

  // 是否在输入框中显示校验结果反馈图标
  statusIcon?: boolean;

  // 是否在 rules 属性改变后立即触发一次验证
  validateOnRuleChange?: boolean;

  // 用于控制该表单内组件的尺寸
  size?: "" | "large" | "default" | "small";

  // 是否禁用该表单内的所有组件
  disabled?: boolean;

  // 当校验失败时，滚动到第一个错误表单项
  scrollToError?: boolean;

  // 当校验有失败结果时，滚动到第一个失败的表单项目 可通过 scrollIntoView 配置
  scrollIntoViewOptions?: any;

  // 展开收缩：undefined 不展示图标；number>=1 时展示展开/收缩图标，收缩时仅显示对应行数
  showRowNum?: number;

  // 展示尾部查询按钮，为true时会有一个footer的插槽
  showFooter?: boolean;

  // el-form类名
  class?: string | any[] | Record<string, any>;

  // el-row类名
  rowClass?: string | any[] | Record<string, any>;
  // el-row样式
  rowStyle?: string | Record<string, any>;

  // 样式
  style?: string;

  // 自定义属性
  otherAttributes?: any;
}

/**
 * el-form-item的配置
 */
export interface IFormItemAttributes {
  // 用于v-model绑定的字段名
  prop: any;

  // 显示标签
  label?: string;

  // 表单域标签的位置
  labelPosition?: "left" | "right" | "top";

  // 标签宽度，例如 '50px'。 可以使用 auto
  labelWidth?: string | number;

  // 是否为必填项，如不设置，则会根据校验规则确认
  required?: boolean;

  // 表单项验证规则
  rules?: Array<Record<string, any>>;

  // 是否显示校验错误信息
  showMessage?: boolean;

  // 是否在行内显示校验信息
  inlineMessage?: boolean;

  // 用于控制该表单域下组件的默认尺寸
  size?: "" | "large" | "default" | "small";

  // 和原生标签相同能力
  for?: string;

  // formitem 校验的状态
  validateStatus?: "" | "error" | "validating" | "success";

  // 类名
  class?: string | any[] | Record<string, any>;

  // 样式
  style?: string;

  // 自定义属性
  otherAttributes?: any;
}

/**
 * 表单整体配置
 */
export interface IDFormConfig {
  // el-form的属性
  formAttributes: IFormAttributes;
  // 表单项数组
  formItemsConfig: IFormItemConfig[];
}
