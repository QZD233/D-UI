<script setup lang="ts">
import { computed, ref, useTemplateRef } from "vue";
import type { FormInstance } from "element-plus";
import { ArrowDown, ArrowUp } from "@element-plus/icons-vue";
import {
  IFormItemConfig,
  IFormAttributes,
  IFormItemAttributes,
  IDFormConfig,
  IOptions,
} from "./dForm";

defineOptions({
  name: "DForm",
});

// 默认的el-form 的Attribute配置
const defaultFormAttributes: IFormAttributes = {
  span: 24,
  xs: 24,
  sm: 24,
  md: 12,
  lg: 8,
  xl: 6,
  gutter: 8,
  inline: false,
  labelPosition: "left",
  labelWidth: "auto",
};

// 默认el-col的一些属性值（响应式：小屏单列，大屏多列）
const defaultFormItemConfig = {
  visible: true,
  edit: true,
};

// 默认的el-form-item 的Attribute配置
const defaultFormItemAttributes = {};

// 显示尾部按钮配置，要确保footer在最后
const footerConfig: IFormItemConfig = {
  type: "footer",
  edit: true,
  visible: true,
  formItemAttributes: {
    prop: "footer",
  },
};

const modelValue = defineModel<Record<string, any> | any>();
const isExpanded = defineModel("expand", { type: Boolean, default: false });

const { formConfig } = defineProps<{
  formConfig: IDFormConfig; // 表单配置
}>();

const emit = defineEmits<{
  (e: "submit", validate: boolean): boolean;
  (e: "reset"): void;
}>();

const formRef = useTemplateRef<FormInstance>("formRef");

// 默认部分属性值
const formConfigFormat = computed(() => {
  return {
    formAttributes: { ...defaultFormAttributes, ...formConfig.formAttributes },
    formItemsConfig: (formConfig.formItemsConfig ?? []).map((item) => {
      return {
        ...defaultFormItemConfig,
        ...item,
        formItemAttributes: {
          ...defaultFormItemAttributes,
          ...item.formItemAttributes,
        },
      };
    }),
  };
});

/**
 * 根据 showRowNum 计算收缩时显示的表单项（按行数截断）
 */
const getItemsToShow = computed(() => {
  const items = (formConfigFormat.value.formItemsConfig ?? []).filter((item) =>
    isItemVisible(item)
  );
  //   展开收缩
  const showRowNum = formConfigFormat.value.formAttributes?.showRowNum;
  //   尾部按钮是否显示
  const showFooter = formConfigFormat.value.formAttributes?.showFooter;

  // 展开
  if (
    showRowNum == null ||
    showRowNum < 1 ||
    isExpanded.value ||
    items.length === 0
  ) {
    return showFooter ? [...items, footerConfig] : items;
  }

  // 收缩
  const formAttrs = formConfigFormat.value.formAttributes;
  const ROW_SIZE = 24;
  let currentRowSpace = 0;
  let rowCount = 1;
  const result: typeof items = [];
  for (const item of items) {
    const span = (formAttrs?.span ?? item.span ?? 24) as number;
    if (currentRowSpace + span > ROW_SIZE) {
      rowCount++;
      if (rowCount > showRowNum) break;
      currentRowSpace = 0;
    }
    result.push(item);
    currentRowSpace += span;
  }
  if (showFooter) {
    result.pop();
    return [...result, footerConfig];
  } else {
    return result;
  }
});

const showExpandIcon = computed(
  () => (formConfigFormat.value.formAttributes?.showRowNum ?? 0) >= 1
);

/**
 * 非编辑时仅展示文字
 * @param item select、radio等的属性
 * @param options select、radio等的options
 */
const formatDisplayLabel = (
  item: IFormItemAttributes,
  options?: IOptions[],
  value?: unknown
) => {
  const val =
    value ?? (modelValue.value && modelValue.value[item.prop as string]);
  if (options && Array.isArray(options)) {
    if (Array.isArray(val)) {
      return (
        val
          .map((v) => options.find((o) => o.value === v)?.label ?? v)
          .join(", ") || "-"
      );
    }
    return options.find((o) => o.value === val)?.label ?? val ?? "-";
  }
  if (Array.isArray(val)) return val.join(", ") || "-";
  return val ?? "-";
};

/**
 * 是否展示visible字段为funtion时
 */
const isItemVisible = (item: IFormItemConfig): boolean => {
  const visible = item.visible;
  if (typeof visible === "function") return visible(modelValue.value);
  return visible !== false;
};

/**
 * 展开收缩
 */
const toggleExpand = () => {
  isExpanded.value = !isExpanded.value;
};

/**
 * 查询提交
 */
const handleSubmit = async (): Promise<boolean> => {
  if (!formRef.value) return emit("submit", false);
  const validate = await formRef.value.validate();
  return emit("submit", validate);
};

/**
 * 重置
 */
const handleReset = () => {
  if (!formRef.value) return;
  formRef.value.resetFields();
  emit("reset");
};

defineExpose({
  // 暴露form所有属性方法给父组件
  formRef,
});
</script>

<template>
  <el-form
    ref="formRef"
    :model="modelValue"
    v-bind="formConfigFormat.formAttributes ?? {}"
  >
    <!-- 栅格布局 -->
    <el-row
      :gutter="formConfigFormat.formAttributes.gutter"
      :justify="formConfigFormat.formAttributes.justify"
      :align="formConfigFormat.formAttributes.align"
      :tag="formConfigFormat.formAttributes.tag"
      :class="formConfigFormat.formAttributes.rowClass"
      :style="formConfigFormat.formAttributes.rowStyle"
    >
      <template v-for="(item, index) in getItemsToShow">
        <el-col
          v-if="isItemVisible(item)"
          :key="item.formItemAttributes?.prop ?? `form-item-${index}`"
          :span="formConfigFormat.formAttributes?.span ?? item.span"
          :offset="formConfigFormat.formAttributes?.offset ?? item.offset"
          :push="formConfigFormat.formAttributes?.push ?? item.push"
          :pull="formConfigFormat.formAttributes?.pull ?? item.pull"
          :xs="formConfigFormat.formAttributes?.xs ?? item.xs"
          :sm="formConfigFormat.formAttributes?.sm ?? item.sm"
          :md="formConfigFormat.formAttributes?.md ?? item.md"
          :lg="formConfigFormat.formAttributes?.lg ?? item.lg"
          :xl="formConfigFormat.formAttributes?.xl ?? item.xl"
        >
          <el-form-item v-bind="item.formItemAttributes">
            <!-- 头文字插槽 -->
            <template v-if="item.labelSlotName" #label="slotProps">
              <!-- 头部插槽返回全部配置项 -->
              <slot
                :name="item.labelSlotName"
                v-bind="{ ...slotProps, itemConfig: item }"
              ></slot>
            </template>

            <!-- 内容插槽返回全部配置项 -->
            <slot :name="item.formItemAttributes.prop" v-bind="{ ...item }">
              <div
                v-if="item.edit"
                class="w-full flex justify-start items-center"
              >
                <!-- 普通输入框 -->
                <el-input
                  v-if="item.type === 'input'"
                  v-model.trim="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    placeholder: `请输入${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    ...item.attributes,
                  }"
                >
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-input>

                <!-- 数字输入框 -->
                <el-input-number
                  v-else-if="item.type === 'inputNumber'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%;',
                    placeholder: `请输入${item.formItemAttributes.label ?? ''}`,
                    ...item.attributes,
                  }"
                >
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-input-number>

                <!-- 标签输入框 -->
                <el-input-tag
                  v-else-if="item.type === 'inputTag'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请输入${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    draggable: true,
                    ...item.attributes,
                  }"
                >
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-input-tag>

                <!-- 单选框 -->
                <el-radio-group
                  v-else-if="item.type === 'radioGroup'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{ style: 'width:100%', ...item.attributes }"
                >
                  <el-radio
                    v-for="itemOptions in item.options"
                    :key="itemOptions.value"
                    :value="itemOptions.value"
                  >
                    {{ itemOptions.label || "-" }}
                  </el-radio>
                </el-radio-group>

                <!-- 选择框 -->
                <el-select
                  v-else-if="item.type === 'select'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    ...item.attributes,
                  }"
                >
                  <el-option
                    v-for="itemOptions in item.options"
                    :key="itemOptions.value"
                    :label="itemOptions.label"
                    :value="itemOptions.value"
                  />
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-select>

                <!-- 虚拟化选择框 -->
                <el-select-v2
                  v-else-if="item.type === 'selectV2'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    ...item.attributes,
                  }"
                >
                  <el-option
                    v-for="itemOptions in item.options"
                    :key="itemOptions.value"
                    :label="itemOptions.label"
                    :value="itemOptions.value"
                  />
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-select-v2>

                <!-- 滑块 -->
                <el-slider
                  v-else-if="item.type === 'slider'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{ style: 'width:100%', ...item.attributes }"
                />

                <!-- 开关 -->
                <el-switch
                  v-else-if="item.type === 'switch'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{ style: 'width:100%', ...item.attributes }"
                >
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-switch>

                <!-- 时间选择器 -->
                <el-time-picker
                  v-else-if="item.type === 'timePicker'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    valueFormat: 'HH:mm:ss',
                    ...item.attributes,
                  }"
                />

                <!-- 时间选择 -->
                <el-time-select
                  v-else-if="item.type === 'timeSelect'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    ...item.attributes,
                  }"
                />

                <!-- 树形选择 -->
                <el-tree-select
                  v-else-if="item.type === 'treeSelect'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    data: item.options ?? item.attributes?.data ?? [],
                    ...item.attributes,
                  }"
                />

                <!-- 日期时间选择器 -->
                <el-date-picker
                  v-else-if="item.type === 'datePicker'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    ...item.attributes,
                  }"
                >
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-date-picker>

                <!-- 颜色选择器 -->
                <el-color-picker
                  v-else-if="item.type === 'colorPicker'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    ...item.attributes,
                  }"
                />

                <!-- 多选框 -->
                <el-checkbox-group
                  v-else-if="item.type === 'checkboxGroup'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{ style: 'width:100%', ...item.attributes }"
                >
                  <el-checkbox
                    v-for="opt in item.options"
                    :key="opt.value"
                    :value="opt.value"
                  >
                    {{ opt.label ?? "-" }}
                  </el-checkbox>
                </el-checkbox-group>

                <!-- 级联选择器 -->
                <el-cascader
                  v-else-if="item.type === 'cascader'"
                  v-model="modelValue[item.formItemAttributes.prop]"
                  v-bind="{
                    style: 'width:100%',
                    placeholder: `请选择${item.formItemAttributes.label ?? ''}`,
                    clearable: true,
                    options: item.options ?? [],
                    ...item.attributes,
                  }"
                >
                  <template
                    v-for="elSlotName in item.elSlotNames"
                    #[elSlotName]="slotProps"
                  >
                    <slot
                      :key="elSlotName"
                      :name="`${item.formItemAttributes?.prop}-${elSlotName}`"
                      v-bind="{ ...slotProps }"
                    >
                    </slot>
                  </template>
                </el-cascader>

                <slot
                  v-else-if="item.type === 'footer'"
                  name="footerSlot"
                  v-bind="{ ...item }"
                >
                  <div class="flex justify-start items-center">
                    <el-button type="primary" @click="handleSubmit">
                      查 询
                    </el-button>
                    <el-button @click="handleReset">重 置</el-button>
                  </div>
                </slot>

                <!-- 没有匹配的类型时，视为自定义表单组件，可适用于三次封装 -->
                <slot v-else v-bind="{ ...item }" :name="item.type"></slot>

                <!-- 展开/收缩图标（仅当 showRowNum >= 1 时展示） -->
                <span
                  v-if="showExpandIcon && getItemsToShow.length === index + 1"
                  :key="'d-form-expand'"
                  class="d-form-expand-col ml-2"
                >
                  <slot name="expanded" v-bind="{ isExpanded }">
                    <el-icon
                      class="d-form-expand-icon"
                      :size="20"
                      @click="toggleExpand"
                    >
                      <el-tooltip
                        effect="dark"
                        :content="isExpanded ? '收缩' : '展开'"
                        placement="top"
                      >
                        <ArrowDown v-if="!isExpanded" />
                        <ArrowUp v-else />
                      </el-tooltip>
                    </el-icon>
                  </slot>
                </span>
              </div>

              <!-- 非编辑时，默认仅显示文字 -->
              <!-- 【单个】非编辑的字段支持自定义，插槽返回所有配置信息 -->
              <slot
                v-else-if="
                  !!$slots?.[`${item.formItemAttributes?.prop}-notEdit`]
                "
                :name="`${item.formItemAttributes?.prop}-notEdit`"
                v-bind="{ ...item }"
              >
              </slot>
              <!-- 【全部】非编辑的字段支持自定义，插槽返回所有配置信息 -->
              <slot v-else name="notEdit" v-bind="{ ...item }">
                <span>
                  {{
                    formatDisplayLabel(
                      item.formItemAttributes,
                      item.options,
                      modelValue?.[item.formItemAttributes?.prop]
                    )
                  }}
                </span>
              </slot>
            </slot>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.d-form-expand-col {
  display: flex;
  align-items: center;
}

.d-form-expand-icon {
  cursor: pointer;
  color: var(--el-color-primary);
  transition: color 0.2s;

  &:hover {
    color: var(--el-color-primary-light-3);
  }
}
</style>