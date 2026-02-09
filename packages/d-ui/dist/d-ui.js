import { defineComponent as q, useModel as G, useTemplateRef as ve, computed as S, resolveComponent as a, openBlock as l, createBlock as s, mergeProps as r, withCtx as n, createVNode as U, normalizeStyle as ye, normalizeClass as Ae, createElementBlock as v, Fragment as x, renderList as c, createSlots as _, renderSlot as m, createTextVNode as F, toDisplayString as R, createElementVNode as D, unref as L, createCommentVNode as N, mergeModels as Z } from "vue";
import { ArrowDown as Ve, ArrowUp as Ie } from "@element-plus/icons-vue";
const ke = {
  key: 0,
  class: "w-full flex justify-start items-center"
}, he = { class: "flex justify-start items-center" }, $e = {
  key: "d-form-expand",
  class: "d-form-expand-col ml-2"
}, ge = /* @__PURE__ */ q({
  name: "DForm",
  __name: "index",
  props: /* @__PURE__ */ Z({
    formConfig: {}
  }, {
    modelValue: {},
    modelModifiers: {},
    expand: { type: Boolean, default: !1 },
    expandModifiers: {}
  }),
  emits: /* @__PURE__ */ Z(["submit", "reset"], ["update:modelValue", "update:expand"]),
  setup(b, { expose: y, emit: V }) {
    const j = {
      span: 24,
      xs: 24,
      sm: 24,
      md: 12,
      lg: 8,
      xl: 6,
      gutter: 8,
      inline: !1,
      labelPosition: "left",
      labelWidth: "auto"
    }, H = {
      visible: !0,
      edit: !0
    }, K = {}, M = {
      type: "footer",
      edit: !0,
      visible: !0,
      formItemAttributes: {
        prop: "footer"
      }
    }, o = G(b, "modelValue"), h = G(b, "expand"), P = V, $ = ve("formRef"), f = S(() => ({
      formAttributes: { ...j, ...b.formConfig.formAttributes },
      formItemsConfig: (b.formConfig.formItemsConfig ?? []).map((u) => ({
        ...H,
        ...u,
        formItemAttributes: {
          ...K,
          ...u.formItemAttributes
        }
      }))
    })), W = S(() => {
      const u = (f.value.formItemsConfig ?? []).filter(
        (w) => B(w)
      ), p = f.value.formAttributes?.showRowNum, g = f.value.formAttributes?.showFooter;
      if (p == null || p < 1 || h.value || u.length === 0)
        return g ? [...u, M] : u;
      const i = f.value.formAttributes, A = 24;
      let I = 0, C = 1;
      const k = [];
      for (const w of u) {
        const E = i?.span ?? w.span ?? 24;
        if (I + E > A) {
          if (C++, C > p) break;
          I = 0;
        }
        k.push(w), I += E;
      }
      return g ? (k.pop(), [...k, M]) : k;
    }), Q = S(
      () => (f.value.formAttributes?.showRowNum ?? 0) >= 1
    ), X = (u, p, g) => {
      const i = g ?? (o.value && o.value[u.prop]);
      return p && Array.isArray(p) ? Array.isArray(i) ? i.map((A) => p.find((I) => I.value === A)?.label ?? A).join(", ") || "-" : p.find((A) => A.value === i)?.label ?? i ?? "-" : Array.isArray(i) ? i.join(", ") || "-" : i ?? "-";
    }, B = (u) => {
      const p = u.visible;
      return typeof p == "function" ? p(o.value) : p !== !1;
    }, Y = () => {
      h.value = !h.value;
    }, O = async () => {
      if (!$.value) return P("submit", !1);
      const u = await $.value.validate();
      return P("submit", u);
    }, ee = () => {
      $.value && ($.value.resetFields(), P("reset"));
    };
    return y({
      // 暴露form所有属性方法给父组件
      formRef: $
    }), (u, p) => {
      const g = a("el-input"), i = a("el-input-number"), A = a("el-input-tag"), I = a("el-radio"), C = a("el-radio-group"), k = a("el-option"), w = a("el-select"), E = a("el-select-v2"), te = a("el-slider"), oe = a("el-switch"), re = a("el-time-picker"), le = a("el-time-select"), ue = a("el-tree-select"), ae = a("el-date-picker"), se = a("el-color-picker"), ne = a("el-checkbox"), fe = a("el-checkbox-group"), pe = a("el-cascader"), T = a("el-button"), de = a("el-tooltip"), me = a("el-icon"), ce = a("el-form-item"), be = a("el-col"), ie = a("el-row"), _e = a("el-form");
      return l(), s(_e, r({
        ref_key: "formRef",
        ref: $,
        model: o.value
      }, f.value.formAttributes ?? {}), {
        default: n(() => [
          U(ie, {
            gutter: f.value.formAttributes.gutter,
            justify: f.value.formAttributes.justify,
            align: f.value.formAttributes.align,
            tag: f.value.formAttributes.tag,
            class: Ae(f.value.formAttributes.rowClass),
            style: ye(f.value.formAttributes.rowStyle)
          }, {
            default: n(() => [
              (l(!0), v(x, null, c(W.value, (e, z) => (l(), v(x, null, [
                B(e) ? (l(), s(be, {
                  key: e.formItemAttributes?.prop ?? `form-item-${z}`,
                  span: f.value.formAttributes?.span ?? e.span,
                  offset: f.value.formAttributes?.offset ?? e.offset,
                  push: f.value.formAttributes?.push ?? e.push,
                  pull: f.value.formAttributes?.pull ?? e.pull,
                  xs: f.value.formAttributes?.xs ?? e.xs,
                  sm: f.value.formAttributes?.sm ?? e.sm,
                  md: f.value.formAttributes?.md ?? e.md,
                  lg: f.value.formAttributes?.lg ?? e.lg,
                  xl: f.value.formAttributes?.xl ?? e.xl
                }, {
                  default: n(() => [
                    U(ce, r({ ref_for: !0 }, e.formItemAttributes), _({
                      default: n(() => [
                        m(u.$slots, e.formItemAttributes.prop, r({ ref_for: !0 }, { ...e }), () => [
                          e.edit ? (l(), v("div", ke, [
                            e.type === "input" ? (l(), s(g, r({
                              key: 0,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t,
                              modelModifiers: { trim: !0 }
                            }, { ref_for: !0 }, {
                              placeholder: `请输入${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              ...e.attributes
                            }), _({ _: 2 }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "inputNumber" ? (l(), s(i, r({
                              key: 1,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%;",
                              placeholder: `请输入${e.formItemAttributes.label ?? ""}`,
                              ...e.attributes
                            }), _({ _: 2 }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "inputTag" ? (l(), s(A, r({
                              key: 2,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请输入${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              draggable: !0,
                              ...e.attributes
                            }), _({ _: 2 }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "radioGroup" ? (l(), s(C, r({
                              key: 3,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, { style: "width:100%", ...e.attributes }), {
                              default: n(() => [
                                (l(!0), v(x, null, c(e.options, (t) => (l(), s(I, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: n(() => [
                                    F(R(t.label || "-"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]))), 128))
                              ]),
                              _: 2
                            }, 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "select" ? (l(), s(w, r({
                              key: 4,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              ...e.attributes
                            }), _({
                              default: n(() => [
                                (l(!0), v(x, null, c(e.options, (t) => (l(), s(k, {
                                  key: t.value,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "selectV2" ? (l(), s(E, r({
                              key: 5,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              ...e.attributes
                            }), _({
                              default: n(() => [
                                (l(!0), v(x, null, c(e.options, (t) => (l(), s(k, {
                                  key: t.value,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "slider" ? (l(), s(te, r({
                              key: 6,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, { style: "width:100%", ...e.attributes }), null, 16, ["modelValue", "onUpdate:modelValue"])) : e.type === "switch" ? (l(), s(oe, r({
                              key: 7,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, { style: "width:100%", ...e.attributes }), _({ _: 2 }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "timePicker" ? (l(), s(re, r({
                              key: 8,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              valueFormat: "HH:mm:ss",
                              ...e.attributes
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])) : e.type === "timeSelect" ? (l(), s(le, r({
                              key: 9,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              ...e.attributes
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])) : e.type === "treeSelect" ? (l(), s(ue, r({
                              key: 10,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              data: e.options ?? e.attributes?.data ?? [],
                              ...e.attributes
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])) : e.type === "datePicker" ? (l(), s(ae, r({
                              key: 11,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              ...e.attributes
                            }), _({ _: 2 }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "colorPicker" ? (l(), s(se, r({
                              key: 12,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              ...e.attributes
                            }), null, 16, ["modelValue", "onUpdate:modelValue"])) : e.type === "checkboxGroup" ? (l(), s(fe, r({
                              key: 13,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, { style: "width:100%", ...e.attributes }), {
                              default: n(() => [
                                (l(!0), v(x, null, c(e.options, (t) => (l(), s(ne, {
                                  key: t.value,
                                  value: t.value
                                }, {
                                  default: n(() => [
                                    F(R(t.label ?? "-"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]))), 128))
                              ]),
                              _: 2
                            }, 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "cascader" ? (l(), s(pe, r({
                              key: 14,
                              modelValue: o.value[e.formItemAttributes.prop],
                              "onUpdate:modelValue": (t) => o.value[e.formItemAttributes.prop] = t
                            }, { ref_for: !0 }, {
                              style: "width:100%",
                              placeholder: `请选择${e.formItemAttributes.label ?? ""}`,
                              clearable: !0,
                              options: e.options ?? [],
                              ...e.attributes
                            }), _({ _: 2 }, [
                              c(e.elSlotNames, (t) => ({
                                name: t,
                                fn: n((d) => [
                                  m(u.$slots, `${e.formItemAttributes?.prop}-${t}`, r({ key: t }, { ref_for: !0 }, { ...d }), void 0, !0)
                                ])
                              }))
                            ]), 1040, ["modelValue", "onUpdate:modelValue"])) : e.type === "footer" ? m(u.$slots, "footerSlot", r({
                              key: 15,
                              ref_for: !0
                            }, { ...e }), () => [
                              D("div", he, [
                                U(T, {
                                  type: "primary",
                                  onClick: O
                                }, {
                                  default: n(() => [...p[0] || (p[0] = [
                                    F(" 查 询 ", -1)
                                  ])]),
                                  _: 1
                                }),
                                U(T, { onClick: ee }, {
                                  default: n(() => [...p[1] || (p[1] = [
                                    F("重 置", -1)
                                  ])]),
                                  _: 1
                                })
                              ])
                            ], !0) : m(u.$slots, e.type, r({
                              key: 16,
                              ref_for: !0
                            }, { ...e }), void 0, !0),
                            Q.value && W.value.length === z + 1 ? (l(), v("span", $e, [
                              m(u.$slots, "expanded", r({ ref_for: !0 }, { isExpanded: h.value }), () => [
                                U(me, {
                                  class: "d-form-expand-icon",
                                  size: 20,
                                  onClick: Y
                                }, {
                                  default: n(() => [
                                    U(de, {
                                      effect: "dark",
                                      content: h.value ? "收缩" : "展开",
                                      placement: "top"
                                    }, {
                                      default: n(() => [
                                        h.value ? (l(), s(L(Ie), { key: 1 })) : (l(), s(L(Ve), { key: 0 }))
                                      ]),
                                      _: 1
                                    }, 8, ["content"])
                                  ]),
                                  _: 1
                                })
                              ], !0)
                            ])) : N("", !0)
                          ])) : u.$slots?.[`${e.formItemAttributes?.prop}-notEdit`] ? m(u.$slots, `${e.formItemAttributes?.prop}-notEdit`, r({
                            key: 1,
                            ref_for: !0
                          }, { ...e }), void 0, !0) : m(u.$slots, "notEdit", r({
                            key: 2,
                            ref_for: !0
                          }, { ...e }), () => [
                            D("span", null, R(X(
                              e.formItemAttributes,
                              e.options,
                              o.value?.[e.formItemAttributes?.prop]
                            )), 1)
                          ], !0)
                        ], !0)
                      ]),
                      _: 2
                    }, [
                      e.labelSlotName ? {
                        name: "label",
                        fn: n((t) => [
                          m(u.$slots, e.labelSlotName, r({ ref_for: !0 }, { ...t, itemConfig: e }), void 0, !0)
                        ]),
                        key: "0"
                      } : void 0
                    ]), 1040)
                  ]),
                  _: 2
                }, 1032, ["span", "offset", "push", "pull", "xs", "sm", "md", "lg", "xl"])) : N("", !0)
              ], 64))), 256))
            ]),
            _: 3
          }, 8, ["gutter", "justify", "align", "tag", "class", "style"])
        ]),
        _: 3
      }, 16, ["model"]);
    };
  }
}), J = (b, y) => {
  const V = b.__vccOpts || b;
  for (const [j, H] of y)
    V[j] = H;
  return V;
}, we = /* @__PURE__ */ J(ge, [["__scopeId", "data-v-c2616f3f"]]), Ue = { class: "d-hello-world" }, xe = /* @__PURE__ */ q({
  name: "DHelloWorld",
  __name: "HelloWorld",
  props: {
    msg: { default: "Hello from D-UI!" }
  },
  setup(b) {
    return (y, V) => (l(), v("div", Ue, [
      D("h1", null, R(b.msg), 1),
      V[0] || (V[0] = D("p", null, "基于 Vue 3 + Element Plus 的组件库", -1))
    ]));
  }
}), Ce = /* @__PURE__ */ J(xe, [["__scopeId", "data-v-731f2eac"]]), Ee = [we, Ce];
function Fe(b) {
  Ee.forEach((y) => {
    y.name && b.component(y.name, y);
  });
}
const je = {
  install: Fe
};
export {
  we as DForm,
  Ce as DHelloWorld,
  je as default,
  Fe as install
};
//# sourceMappingURL=d-ui.js.map
