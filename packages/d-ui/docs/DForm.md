# DForm 动态表单

基于 Vue 3 + Element Plus 的配置化动态表单组件，通过 JSON 配置即可快速生成表单，支持栅格布局、响应式、校验规则、插槽自定义等能力。

---

## 目录

- [安装与引入](#安装与引入)
- [基础使用](#基础使用)
- [Props 属性](#props-属性)
- [v-model](#v-model)
- [Events 事件](#events-事件)
- [Interface 类型定义](#interface-类型定义)
- [配置 JSON 结构](#配置-json-结构)
- [支持的控件类型](#支持的控件类型)
- [展开/收缩功能](#展开收缩功能)
- [尾部按钮（footer）](#尾部按钮footer)
- [暴露的方法与属性](#暴露的方法与属性)
- [插槽说明](#插槽说明)
- [完整配置示例](#完整配置示例)

---

## 安装与引入

```bash
pnpm add @d-ui/core
```

```ts
// 全量引入
import DUI from "@d-ui/core";
import "@d-ui/core/style.css";
app.use(DUI);

// 按需引入
import { DForm } from "@d-ui/core";
import type { IDFormConfig } from "@d-ui/core";
import "@d-ui/core/style.css";
```

---

## 基础使用

```vue
<script setup lang="ts">
import { DForm } from "@d-ui/core";
import type { IDFormConfig } from "@d-ui/core";
import { ref } from "vue";

const form = ref<Record<string, any>>({
  name: "",
  category: undefined,
});

const formConfig = ref<IDFormConfig>({
  formAttributes: {
    labelWidth: "120px",
  },
  formItemsConfig: [
    {
      type: "input",
      edit: true,
      formItemAttributes: {
        prop: "name",
        label: "姓名",
        rules: [{ required: true, message: "请输入姓名" }],
      },
    },
    {
      type: "select",
      edit: true,
      options: [
        { label: "选项A", value: "a" },
        { label: "选项B", value: "b" },
      ],
      formItemAttributes: {
        prop: "category",
        label: "分类",
      },
    },
  ],
});
</script>

<template>
  <DForm v-model="form" :form-config="formConfig" />
</template>
```

---

## Props 属性

| 属性名       | 类型          | 必填 | 默认值 | 说明                               |
| ------------ | ------------- | ---- | ------ | ---------------------------------- |
| `formConfig` | `IDFormConfig` | 是   | -      | 表单整体配置，包含表单项与表单属性 |

---

## v-model

DForm 使用 `v-model` 进行双向绑定，绑定的值类型为 `Record<string, any>`，key 对应各表单项的 `formItemAttributes.prop`。

- **支持**：`v-model`、`v-model:modelValue`
- **要求**：传入对象引用，组件会直接修改该对象的属性
- **建议**：使用 `ref({})` 初始化，确保为响应式对象

```vue
<DForm v-model="form" :form-config="formConfig" />
```

---

## Events 事件

| 事件名   | 参数        | 说明                                                 |
| -------- | ----------- | ---------------------------------------------------- |
| `submit` | `validate: boolean` | 点击默认「查询」按钮或调用 `handleSubmit` 时触发，`validate` 为表单校验结果 |
| `reset`  | -           | 点击默认「重置」按钮或调用 `handleReset` 时触发       |

```vue
<DForm
  v-model="form"
  :form-config="formConfig"
  @submit="onSubmit"
  @reset="onReset"
/>
```

---

## Interface 类型定义

### IDFormConfig

表单整体配置。

```ts
interface IDFormConfig {
  formAttributes: IFormAttributes;      // el-form 属性
  formItemsConfig: IFormItemConfig[];  // 表单项配置数组
}
```

### IFormAttributes

对应 [Element Plus Form](https://element-plus.org/zh-CN/component/form.html) 的属性，用于配置表单容器。

| 属性                    | 类型                                   | 说明                       |
| ----------------------- | -------------------------------------- | -------------------------- |
| `gutter`                | `number`                               | 栅格间隔，默认 `8`         |
| `inline`                | `boolean`                              | 是否行内表单               |
| `labelPosition`         | `'left' \| 'right' \| 'top'`           | 标签位置，默认 `'left'`    |
| `labelWidth`            | `string \| number`                     | 标签宽度，默认 `'auto'`    |
| `labelSuffix`           | `string`                               | 标签后缀，如 `':'`         |
| `hideRequiredAsterisk`  | `boolean`                              | 是否隐藏必填星号           |
| `requireAsteriskPosition` | `'left' \| 'right'`                  | 星号位置                   |
| `inlineMessage`         | `boolean`                              | 行内显示校验信息           |
| `statusIcon`            | `boolean`                              | 显示校验结果图标           |
| `validateOnRuleChange`  | `boolean`                              | 规则变更时是否立即校验     |
| `size`                  | `'' \| 'large' \| 'default' \| 'small'` | 表单尺寸                   |
| `disabled`              | `boolean`                              | 是否禁用                   |
| `scrollToError`         | `boolean`                              | 校验失败时滚动到错误项     |
| `scrollIntoViewOptions` | `any`                                  | scrollIntoView 配置        |
| `showRowNum`            | `number \| undefined`                  | 展开/收缩：`undefined` 不展示图标；`>= 1` 时展示，收缩时仅显示对应行数 |
| `style`                 | `string`                               | el-form 样式               |
| `class`                 | `string \| any[] \| Record<string, any>` | el-form 类名              |
| `rowClass`              | `string \| any[] \| Record<string, any>` | el-row 类名               |
| rowStyle | `string \| Record<string, any>` | el-row 样式 |
| `justify`               | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | 行内 flex 对齐 |
| `align`                 | `'top' \| 'middle' \| 'bottom'`        | 行内垂直对齐               |
| `tag`                   | `string`                               | el-row 根元素标签          |
| `span`              | `number`                                   | 栅格列数，默认`24`          |
| `offset`            | `number`                                   | 栅格左侧隔                  |
| `push`              | `number`                                   | 栅格向右动                  |
| `pull`              | `number`                                   | 栅格向左动                  |
| `xs`                | `number \| { span?: number; offset?: number }`                     | 响应式：<768px                             |
| `sm`                | `number \| { span?: number; offset?: number }`                        | 响应式：≥768px                             |
| `md`                | `number \| { span?: number; offset?: number }`                        | 响应式：≥992px                             |
| `lg`                | `number \| { span?: number; offset?: number }`                          | 响应式：≥1200px                            |
| `xl`                | `number \| { span?: number; offset?: number }`                           | 响应式：≥1920px |

### IFormItemConfig

单个表单项配置。

| 属性                | 类型                                                                 | 必填 | 说明                                      |
| ------------------- | -------------------------------------------------------------------- | ---- | ----------------------------------------- |
| `type`              | 见 [支持的控件类型](#支持的控件类型)                                  | 否   | 控件类型，不传时可用自定义插槽             |
| `edit`              | `boolean`                                                            | 是   | 是否为编辑模式，`false` 时只读展示         |
| `visible`           | `boolean \| ((modelValue: any) => boolean)`                          | 否   | 是否显示，支持函数动态控制                 |
| `span`              | `number`                                                             | 否   | 栅格列数                        |
| `offset`            | `number`                                                             | 否   | 栅格左侧间隔                               |
| `push`              | `number`                                                             | 否   | 栅格向右移动                               |
| `pull`              | `number`                                                             | 否   | 栅格向左移动                               |
| `xs`                | `number \| { span?: number; offset?: number }`                       | 否   | 响应式：<768px                             |
| `sm`                | `number \| { span?: number; offset?: number }`                       | 否   | 响应式：≥768px                             |
| `md`                | `number \| { span?: number; offset?: number }`                       | 否   | 响应式：≥992px                             |
| `lg`                | `number \| { span?: number; offset?: number }`                       | 否   | 响应式：≥1200px                            |
| `xl`                | `number \| { span?: number; offset?: number }`                       | 否   | 响应式：≥1920px                            |
| `options`           | `IOptions[]`                                                         | 否   | 选项数据，用于 select/radio/checkbox/cascader/treeSelect |
| `attributes`        | `Record<string, any>`                                                | 否   | 传给底层 Element 组件的属性                |
| `labelSlotName`     | `string`                                                             | 否   | 标签插槽名，用于自定义 label               |
| `elSlotNames`       | `string[]`                                                           | 否   | 需要透传的 Element 组件插槽名列表          |
| `formItemAttributes`| `IFormItemAttributes`                                                | 否   | el-form-item 属性                          |

**默认响应式栅格**（未指定 `xs`/`sm`/`md`/`lg`/`xl` 时，formAttributes与formItemConfig都可设置，formItemConfig优先级最高，formAttributes默认如下）：

| 断点 | 默认 span | 含义     |
| ---- | --------- | -------- |
| xs   | 24        | 小屏单列 |
| sm   | 24        | 小平板单列 |
| md   | 12        | 中屏 2 列 |
| lg   | 8         | 大屏 3 列 |
| xl   | 6         | 超大屏 4 列 |

### IFormItemAttributes

对应 [Element Plus Form-Item](https://element-plus.org/zh-CN/component/form.html#form-item-attributes) 的属性。

| 属性             | 类型                                   | 说明                 |
| ---------------- | -------------------------------------- | -------------------- |
| `prop`           | `any`                                  | **必填**，表单字段名 |
| `label`          | `string`                               | 标签文本             |
| `labelPosition`  | `'left' \| 'right' \| 'top'`           | 标签位置             |
| `labelWidth`     | `string \| number`                     | 标签宽度             |
| `required`       | `boolean`                              | 是否必填             |
| `rules`          | `Array<Record<string, any>>`           | 校验规则             |
| `showMessage`    | `boolean`                              | 是否显示错误信息     |
| `inlineMessage`  | `boolean`                              | 行内显示错误信息     |
| `size`           | `'' \| 'large' \| 'default' \| 'small'` | 控件尺寸             |
| `for`            | `string`                               | 关联的控件 id        |
| `validateStatus` | `'' \| 'error' \| 'validating' \| 'success'` | 校验状态     |
| `class`          | `string \| any[] \| Record<string, any>` | 类名                |
| `style`          | `string`                               | 样式                 |

### IOptions

选项数据结构，用于 select、radio、checkbox、cascader、treeSelect 等。

```ts
interface IOptions {
  label?: string;   // 显示文本
  value?: any;      // 值
  text?: string;    // 备用文本
  children?: IOptions[];  // 级联/树形子节点
}
```

---

## 配置 JSON 结构

顶层结构：

```json
{
  "formAttributes": { /* IFormAttributes */ },
  "formItemsConfig": [ /* IFormItemConfig[] */ ]
}
```

表单项最小结构（以 input 为例）：

```json
{
  "type": "input",
  "edit": true,
  "formItemAttributes": {
    "prop": "fieldName",
    "label": "字段名"
  }
}
```

---

## 支持的控件类型

| type 值        | 对应组件        | 说明                    | 数据格式 / 特殊配置                         |
| -------------- | --------------- | ----------------------- | ------------------------------------------- |
| `input`        | el-input        | 文本输入                | `string`                                    |
| `inputNumber`  | el-input-number | 数字输入                | `number`                                    |
| `inputTag`     | el-input-tag    | 标签输入（Element Plus 2.9+） | `string[]`                          |
| `select`       | el-select       | 下拉选择                | 需 `options`                                |
| `selectV2`     | el-select-v2    | 虚拟化下拉              | 需 `options`，适合大量选项                  |
| `radioGroup`   | el-radio-group  | 单选框组                | 需 `options`                                |
| `checkboxGroup`| el-checkbox-group | 多选框组              | 需 `options`，值为 `any[]`                  |
| `switch`       | el-switch       | 开关                    | `boolean`                                   |
| `slider`       | el-slider       | 滑块                    | `number`                                    |
| `datePicker`   | el-date-picker  | 日期/日期时间选择       | `string \| Date`，可用 `type`、`valueFormat` |
| `timePicker`   | el-time-picker  | 时间选择器              | `string \| Date`                            |
| `timeSelect`   | el-time-select  | 时间列表选择            | `string`                                    |
| `colorPicker`  | el-color-picker | 颜色选择                | `string`                                    |
| `cascader`     | el-cascader     | 级联选择                | 需 `options`（树形），值为 `string[]`       |
| `treeSelect`   | el-tree-select  | 树形选择                | 需 `options` 或 `attributes.data`（树形）   |
| `footer`       | -               | 尾部按钮区域            | 默认渲染「查询」「重置」按钮，可通过插槽自定义 |

**自定义控件**：`type` 不匹配上述任一值时，将渲染名为 `item.type` 的插槽，可用于二次封装。

---

## 展开/收缩功能

当表单项较多时，可通过 `showRowNum` 实现展开/收缩，收缩时只显示指定行数，并展示上下箭头图标。

### 配置

在 `formAttributes` 中设置 `showRowNum`：

| 值         | 行为                               |
| ---------- | ---------------------------------- |
| `undefined` | 不展示展开/收缩图标，全部表单项显示 |
| `number >= 1` | 展示图标，收缩时仅显示对应行数，这是在Dform上可用【v-model:expand="expand"】，在外部控制展开收缩 |

### 使用示例

```ts
formAttributes: {
  showRowNum: 2,  // 收缩时仅显示 2 行，点击箭头可展开/收缩
  labelWidth: "120px",
}
```

### 行数计算规则

- 按每项 `span` 累加，满 24 视为一行
- 默认使用 `formAttributes.span ?? item.span ?? 24` 作为单格占位
- `showRowNum: 2` 时，收缩状态只展示前 2 行内的表单项

### 自定义展开图标插槽（expanded）

可通过 `#expanded` 插槽自定义展开/收缩图标，插槽参数：`{ isExpanded: boolean }`。切换展开/收缩需通过 `ref` 调用 `toggleExpand`。

```vue
<script setup lang="ts">
const dFormRef = ref<InstanceType<typeof DForm>>();
const expand = ref(false);
</script>

<template>
  <DForm ref="dFormRef" v-model="form" v-model:expand="expand" :form-config="formConfig">
    <template #expanded="{ isExpanded }">
      <el-button link type="primary" @click="dFormRef?.toggleExpand() 或者 expand=!expand">
        {{ isExpanded ? '收起' : '展开' }}
      </el-button>
    </template>
  </DForm>
</template>
```

---

## 尾部按钮（footer）

在 `formAttributes` 添加 `showFooter: true` 的配置，即可在表单尾部渲染默认的「查询」「重置」按钮，常用于搜索表单。

### 配置示例

```ts
const formConfig = ref<IDFormConfig>({
  formAttributes: {
    class: "mt-2",
    showRowNum: 2,
    labelSuffix: ":",
    gutter: 16,
    span: 8,
    labelWidth: "120px",
    labelPosition: "right",
    // 展示尾部按钮，得到【footerSlot】插槽
    showFooter: true,
  },
  formItemsConfig: []
})
```

### 默认行为

- **查询**：点击后执行 `formRef.validate()`，校验通过时触发 `@submit` 事件
- **重置**：点击后执行 `formRef.resetFields()`，并触发 `@reset` 事件

### 自定义尾部内容（footerSlot）

通过 `#footerSlot` 插槽可完全替换默认按钮，插槽参数：`{ ...item }`（当前 footer 的默认配置）。

```vue
<DForm v-model="form" :form-config="formConfig" @submit="onSearch" @reset="onReset">
  <template #footerSlot>
    <div class="flex gap-2">
      <el-button type="primary" @click="dFormRef?.formRef?.validate().then(() => onSearch())">查 询</el-button>
      <el-button @click="dFormRef?.formRef?.resetFields(); onReset()">重 置</el-button>
      <el-button type="success">导 出</el-button>
    </div>
  </template>
</DForm>
```

### 配合 Events 使用

使用默认 footer 时，监听 `@submit` 和 `@reset` 即可：

```vue
<script setup lang="ts">
const onSearch = (valid: boolean) => {
  if (valid) {
    console.log("查询", form.value);
    // 调用接口等
  }
};

const onReset = () => {
  console.log("我重置了，必将拿回属于我的一切！");
};
</script>

<template>
  <DForm
    v-model="form"
    :form-config="formConfig"
    @submit="onSearch"
    @reset="onReset"
  />
</template>
```

---

## 暴露的方法与属性

通过 `ref` 获取组件实例后，可访问：

| 属性/方法                 | 类型           | 说明                       |
| ------------------------- | -------------- | -------------------------- |
| `formRef`                 | `FormInstance` | Element Plus Form 实例引用 |
| `v-model:expand="expand"` | `boolean`      | 切换展开/收缩状态          |

`FormInstance` 提供的方法包括：

- `validate()`：校验整个表单
- `validateField(props)`：校验指定字段
- `resetFields()`：重置表单
- `clearValidate(props?)`：清除校验结果
- `scrollToField(prop)`：滚动到指定字段

### 使用示例

**1. 调用表单校验与重置**

```vue
<script setup lang="ts">
const dFormRef = ref<InstanceType<typeof DForm>>();
const formConfig = ref<IDFormConfig>({...})
const form = ref({...})

const handleSubmit = async () => {
  await dFormRef.value?.formRef?.validate();
  console.log("校验通过", form.value);
};

const handleReset = () => {
  dFormRef.value?.formRef?.resetFields();
};
</script>

<template>
  <DForm ref="dFormRef" v-model="form" :form-config="formConfig" />
  <el-button @click="handleSubmit">提交</el-button>
  <el-button @click="handleReset">重置</el-button>
</template>
```

**2. 控制展开/收缩**

```vue
<script setup lang="ts">
const formConfig = ref<IDFormConfig>({
  formAttributes: {
    class: "mt-2",
    showRowNum: 4,
  },
  formItemsConfig: []
})
const dFormRef = ref<InstanceType<typeof DForm>>();
const expand = ref(false);
const form = ref({...})
    
// 展开表单
const expandForm = () => {
  expand.value = true
};

// 收缩表单
const collapseForm = () => {
  expand.value = false
};

// 读取当前展开状态
const isExpanded = computed(() => dFormRef.value?.isExpanded ?? false);
</script>

<template>
  <DForm ref="dFormRef" v-model="form" v-model:expand="expand" :form-config="formConfig" />
  <el-button @click="expandForm">展开</el-button>
  <el-button @click="collapseForm">收缩</el-button>
</template>
```

---

## 插槽说明

### 1. 表单项内容插槽（按 prop）

**插槽名**：`item.formItemAttributes.prop`  
**作用**：覆盖该字段的默认控件，实现完全自定义  
**插槽参数**：`{ ...item }`（当前表单项完整配置）

```vue
<DForm v-model="form" :form-config="formConfig">
  <template #customField="{ formItemAttributes, attributes }">
    <el-input v-model="form[formItemAttributes.prop]" v-bind="attributes" />
  </template>
</DForm>
```

配置中需将 `formItemAttributes.prop` 设为 `customField`。

### 2. 标签插槽（labelSlotName）

**插槽名**：`item.labelSlotName`  
**作用**：自定义表单项的 label  
**插槽参数**：`{ ...slotProps, itemConfig: item }`（slotProps 为 el-form-item label 插槽参数）

```vue
<DForm v-model="form" :form-config="formConfig">
  <template #name-label="{ itemConfig }">
    <span>{{ itemConfig.formItemAttributes.label }}</span>
    <el-tooltip content="提示信息"><el-icon><QuestionFilled /></el-icon></el-tooltip>
  </template>
</DForm>
```

配置示例：`labelSlotName: "name-label"`。

### 3. Element 组件子插槽（elSlotNames）

**插槽名**：`${prop}-${elSlotName}`  
**作用**：透传到底层 Element 组件的具名插槽  
**配置**：在 `elSlotNames` 中声明要透传的插槽名

以 el-input 的 `prefix` 为例：

```vue
<DForm v-model="form" :form-config="formConfig">
  <template #username-prefix>
    <el-icon><User /></el-icon>
  </template>
</DForm>
```

配置示例：

```ts
{
  type: "input",
  edit: true,
  elSlotNames: ["prefix", "suffix"],
  formItemAttributes: { prop: "username", label: "用户名" },
}
```

### 4. 非编辑模式插槽（notEdit/[prop]-notEdit）,【prop：表单项绑定的属性】

**插槽名**：`notEdit/[prop]-notEdit`  
**作用**：自定义 `edit: false` 时的展示内容  
**插槽参数**：`{ ...item }`

```vue
<DForm v-model="form" :form-config="formConfig">
  <template #notEdit="slotProps">
    <span class="my-readonly">
      <span>全部的非编辑组件都是我显示</span>
      <span>这是我的配置项{{ JSON.stringify(slotProps, null, 2) }}</span>
    </span>
  </template>
  <template #status-notEdit="slotProps">
     <span>我是【status:状态】的自定义非编辑状态，我只显示我自己，我优先级高，其他人我不管</span>
	 ...
   </template>
</DForm>
```

配置中需将 `formItemAttributes.prop` 设为 `status`

### 5. 自定义控件类型插槽

**插槽名**：`item.type`  
**作用**：当 `type` 不在内置列表时，渲染此插槽，用于二次封装  
**插槽参数**：`{ ...item }`

```vue
<DForm v-model="form" :form-config="formConfig">
  <template #myCustomType="{ formItemAttributes, attributes }">
    <MyCustomComponent v-model="form[formItemAttributes.prop]" v-bind="attributes" />
  </template>
</DForm>
```

### 6. 尾部按钮插槽（footerSlot）

**插槽名**：`footerSlot`  
**作用**：自定义 `footer` 的按钮区域，替换默认的「查询」「重置」  
**插槽参数**：`{ ...item }`（当前 footer 默认配置）

```vue
<DForm v-model="form" :form-config="formConfig" @submit="onSearch">
  <template #footerSlot>
    <el-button type="primary">查 询</el-button>
    <el-button>重 置</el-button>
    <el-button type="success">导 出</el-button>
  </template>
</DForm>
```

### 7. 展开/收缩图标插槽（expanded）

**插槽名**：`expanded`  
**作用**：自定义展开/收缩图标（仅当 `showRowNum >= 1` 时生效）  
**插槽参数**：`{ isExpanded: boolean }`  
**说明**：点击时需通过 `ref` 调用 `toggleExpand()` 切换状态

```vue
<DForm ref="dFormRef" v-model="form" :form-config="formConfig">
  <template #expanded="{ isExpanded }">
    <el-button link type="primary" @click="dFormRef?.toggleExpand()">
      {{ isExpanded ? '收起' : '展开' }}
    </el-button>
  </template>
</DForm>
```

---

## 完整配置示例

```ts
const formConfig: IDFormConfig = {
  formAttributes: {
    labelWidth: "120px",
    labelSuffix: ":",
    gutter: 16,
    span: 8,
    labelPosition: "right",
    showRowNum: 2,  // 收缩时仅显示 2 行，可展开
    rules: {
      name: [{ required: true, message: "请输入姓名" }],
    },
  },
  formItemsConfig: [
    {
      type: "input",
      edit: true,
      formItemAttributes: {
        prop: "name",
        label: "姓名",
        rules: [{ required: true, message: "请输入姓名" }],
      },
      attributes: {
        placeholder: "请输入姓名",
        maxlength: 20,
        showWordLimit: true,
      },
    },
    {
      type: "inputNumber",
      edit: true,
      formItemAttributes: { prop: "age", label: "年龄" },
      attributes: { min: 0, max: 120 },
    },
    {
      type: "select",
      edit: true,
      options: [
        { label: "选项一", value: 1 },
        { label: "选项二", value: 2 },
      ],
      formItemAttributes: { prop: "category", label: "分类" },
    },
    {
      type: "radioGroup",
      edit: true,
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
      ],
      formItemAttributes: { prop: "gender", label: "性别" },
    },
    {
      type: "checkboxGroup",
      edit: true,
      options: [
        { label: "阅读", value: "reading" },
        { label: "运动", value: "sports" },
      ],
      formItemAttributes: { prop: "hobbies", label: "爱好" },
    },
    {
      type: "datePicker",
      edit: true,
      formItemAttributes: { prop: "birthDate", label: "出生日期" },
      attributes: {
        type: "date",
        valueFormat: "YYYY-MM-DD",
      },
    },
    {
      type: "switch",
      edit: true,
      formItemAttributes: { prop: "enabled", label: "启用" },
    },
    {
      type: "input",
      edit: false,
      formItemAttributes: { prop: "createdAt", label: "创建时间" },
    },
    {
      type: "input",
      edit: true,
      visible: (model) => model?.enabled === true,
      formItemAttributes: { prop: "dynamicField", label: "动态字段" },
    }
  ],
};
```

---

## 依赖说明

- **Vue** ^3.5.0
- **Element Plus** ^2.6.0
- **el-input-tag**：Element Plus 2.9+ 内置，更低版本需单独安装或移除该类型
