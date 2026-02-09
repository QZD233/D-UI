<script setup lang="ts">
import { DForm, DHelloWorld } from "@d-ui/core";
import type { IDFormConfig } from "@d-ui/core";
import { ref } from "vue";

// 完整的表单测试数据
const form = ref<Record<string, any>>({
  // 选择类
  category: 1,
  status: "active",
  priority: 2,
  // 输入类
  name: "",
  age: undefined,
  score: 60,
  ee: "哈哈哈只读",
  // 开关/单选
  enabled: true,
  gender: "male",
  // 日期时间
  birthDate: null,
  workTime: null,
  appointment: null,
  // 多选
  hobbies: ["reading"],
  region: [],
  // 标签
  tags: [],
  // 颜色
  theme: "#409EFF",
});

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
  formItemsConfig: [
    // ========== 输入类 ==========
    {
      type: "input",
      edit: true,
      visible: true,
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
      visible: true,
      formItemAttributes: {
        prop: "age",
        label: "年龄",
      },
      attributes: {
        min: 0,
        max: 120,
        placeholder: "请输入年龄",
      },
    },
    {
      type: "input",
      edit: false,
      visible: true,
      formItemAttributes: {
        prop: "ee",
        label: "只读字段",
      },
      attributes: {
        value: "仅展示不可编辑",
      },
    },
    // ========== 选择类 ==========
    {
      type: "select",
      edit: true,
      visible: true,
      options: [
        { label: "选项一", value: 1 },
        { label: "选项二", value: 2 },
        { label: "选项三", value: 3 },
      ],
      formItemAttributes: {
        prop: "category",
        label: "分类",
      },
      attributes: {
        placeholder: "请选择分类",
        onChange: (value: string) => {
          console.log("选择分类了:", value);
        },
      },
    },
    {
      type: "select",
      edit: false,
      visible: true,
      options: [
        { label: "激活", value: "active" },
        { label: "禁用", value: "inactive" },
        { label: "待审核", value: "pending" },
      ],
      formItemAttributes: {
        prop: "status",
        label: "状态",
      },
    },
    {
      type: "radioGroup",
      edit: true,
      visible: true,
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" },
      ],
      formItemAttributes: {
        prop: "gender",
        label: "性别",
      },
    },
    // ========== 滑块、开关 ==========
    {
      type: "slider",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "score",
        label: "评分",
      },
      attributes: {
        min: 0,
        max: 100,
        showInput: true,
      },
    },
    {
      type: "switch",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "enabled",
        label: "启用",
      },
      attributes: {
        activeText: "开",
        inactiveText: "关",
      },
    },
    // ========== 多选框 ==========
    {
      type: "checkboxGroup",
      edit: true,
      visible: true,
      options: [
        { label: "阅读", value: "reading" },
        { label: "运动", value: "sports" },
        { label: "音乐", value: "music" },
        { label: "旅游", value: "travel" },
      ],
      formItemAttributes: {
        prop: "hobbies",
        label: "爱好",
      },
    },
    // ========== 级联选择 ==========
    {
      type: "cascader",
      edit: true,
      visible: true,
      elSlotNames: ["default"],
      options: [
        {
          value: "zhejiang",
          label: "浙江",
          children: [
            { value: "hangzhou", label: "杭州" },
            { value: "ningbo", label: "宁波" },
          ],
        },
        {
          value: "jiangsu",
          label: "江苏",
          children: [
            { value: "nanjing", label: "南京" },
            { value: "suzhou", label: "苏州" },
          ],
        },
      ],
      formItemAttributes: {
        prop: "region",
        label: "地区",
      },
      attributes: {
        placeholder: "请选择省市区",
      },
    },
    // ========== 日期时间 ==========
    {
      type: "datePicker",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "birthDate",
        label: "出生日期",
      },
      attributes: {
        type: "date",
        placeholder: "选择日期",
        valueFormat: "YYYY-MM-DD",
      },
    },
    {
      type: "timePicker",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "workTime",
        label: "工作时间",
      },
      attributes: {
        placeholder: "选择时间",
        valueFormat: "HH:mm",
      },
    },
    {
      type: "datePicker",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "appointment",
        label: "预约日期时间",
      },
      attributes: {
        type: "datetime",
        placeholder: "选择日期时间",
        valueFormat: "YYYY-MM-DD HH:mm:ss",
      },
    },
    // ========== 颜色、标签 ==========
    {
      type: "colorPicker",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "theme",
        label: "主题色",
      },
      attributes: {
        showAlpha: true,
      },
    },
    {
      type: "inputTag",
      edit: true,
      visible: true,
      formItemAttributes: {
        prop: "tags",
        label: "标签",
      },
      attributes: {
        placeholder: "输入后按回车添加",
      },
    },
    // ========== 动态 visible 测试（需 visible 为函数时取消注释）==========
    // {
    //   type: "input",
    //   edit: true,
    //   visible: (model) => model?.enabled === true,
    //   formItemAttributes: { prop: "dynamicField", label: "动态显示字段" },
    //   attributes: { placeholder: "仅当启用为开时显示" },
    // },
  ],
});

const isExpanded = ref(false);

const submit = (res: boolean) => {
  console.log(444, res);
};

const reset = () => {
  console.log("我重置了，必将拿回属于我的一切！");
  isExpanded.value = !isExpanded.value;
};
</script>

<template>
  <div class="app">
    <h1>D-UI 组件库开发演示</h1>
    <el-divider />
    <div class="flex flex-col items-center justify-center">
      <DHelloWorld msg="欢迎使用 D-UI" />
      <el-button type="primary">Element Plus 按钮</el-button>
    </div>
    <el-divider content-position="left">DForm 动态表单测试</el-divider>
    <div class="flex justify-between items-start">
      <div class="p-6">
        <DForm
          v-model="form"
          v-model:expand="isExpanded"
          :form-config="formConfig"
          @submit="submit"
          @reset="reset"
        >
          <template #region-default="slotProps">
            <div>{{ slotProps.data.label }}666</div>
          </template>

          <template #notEdit="slotProps">
            <div>
              我是自定义非编辑区域后的文字，全部的非编辑组件都是我默认显示
            </div>
            <div>这是我的配置项{{ JSON.stringify(slotProps, null, 2) }}</div>
          </template>

          <template #status-notEdit>
            <div>
              我是状态的自定义非编辑状态，我只显示我自己，我优先级高，其他人我不管
            </div>
          </template>

          <!-- <template #footerSlot><div>2233</div></template> -->
        </DForm>
      </div>
      <div class="w-80 shrink-0">
        <el-card>
          <template #header>表单绑定值（调试用）</template>
          <pre class="text-sm">{{ JSON.stringify(form, null, 2) }}</pre>
        </el-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app {
  padding: 2rem;
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
}
</style>
