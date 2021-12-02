"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_auth_Register_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/auth/Register.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/auth/Register.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: "Register",
  data: function data() {
    return {
      showPassword: false,
      showPasswordConfirmation: false,
      form: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: {},
      loading: false
    };
  },
  methods: {
    showPasswordHandle: function showPasswordHandle() {
      this.showPassword = !this.showPassword;
    },
    showPasswordConfirmationHandle: function showPasswordConfirmationHandle() {
      this.showPasswordConfirmation = !this.showPasswordConfirmation;
    },
    register: function register() {
      var _this = this;

      this.loading = true;
      axios.post("/api/register", this.form).then(function (response) {
        _this.loading = false;

        _this.$router.push({
          name: 'Login'
        });

        _this.$toasted.show(response.data, {
          type: 'success',
          duration: '2000'
        });
      })["catch"](function (errors) {
        _this.loading = false;
        _this.errors = errors.response.data.errors;

        _this.$toasted.show("Some Error Occured", {
          type: 'error',
          duration: '2000'
        });
      });
    }
  }
});

/***/ }),

/***/ "./resources/js/views/auth/Register.vue":
/*!**********************************************!*\
  !*** ./resources/js/views/auth/Register.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Register_vue_vue_type_template_id_0a273bdb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Register.vue?vue&type=template&id=0a273bdb& */ "./resources/js/views/auth/Register.vue?vue&type=template&id=0a273bdb&");
/* harmony import */ var _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Register.vue?vue&type=script&lang=js& */ "./resources/js/views/auth/Register.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Register_vue_vue_type_template_id_0a273bdb___WEBPACK_IMPORTED_MODULE_0__.render,
  _Register_vue_vue_type_template_id_0a273bdb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/auth/Register.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/auth/Register.vue?vue&type=script&lang=js&":
/*!***********************************************************************!*\
  !*** ./resources/js/views/auth/Register.vue?vue&type=script&lang=js& ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Register.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/auth/Register.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/auth/Register.vue?vue&type=template&id=0a273bdb&":
/*!*****************************************************************************!*\
  !*** ./resources/js/views/auth/Register.vue?vue&type=template&id=0a273bdb& ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_0a273bdb___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_0a273bdb___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Register_vue_vue_type_template_id_0a273bdb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Register.vue?vue&type=template&id=0a273bdb& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/auth/Register.vue?vue&type=template&id=0a273bdb&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/auth/Register.vue?vue&type=template&id=0a273bdb&":
/*!********************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/auth/Register.vue?vue&type=template&id=0a273bdb& ***!
  \********************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "v-app",
    [
      _c(
        "v-main",
        [
          _c(
            "v-container",
            { staticClass: "fill-height", attrs: { fluid: "" } },
            [
              _c(
                "v-row",
                { attrs: { align: "center", justify: "center", dense: "" } },
                [
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "4", lg: "4", xl: "4" } },
                    [
                      _c(
                        "v-card",
                        { attrs: { elevation: "0" } },
                        [
                          _c(
                            "v-card-title",
                            { staticClass: "justify-center text-center" },
                            [
                              _c(
                                "p",
                                { staticClass: "title font-weight-bold" },
                                [_vm._v("Sign Up")]
                              ),
                            ]
                          ),
                          _vm._v(" "),
                          _c("v-img", {
                            attrs: {
                              src: "/assets/admin/auth/Register.svg",
                              alt: "Register",
                              contain: "",
                              height: "200",
                            },
                          }),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "v-form",
                                {
                                  on: {
                                    submit: function ($event) {
                                      $event.preventDefault()
                                      return _vm.register.apply(null, arguments)
                                    },
                                  },
                                },
                                [
                                  _c(
                                    "v-row",
                                    [
                                      _c(
                                        "v-col",
                                        {
                                          attrs: {
                                            cols: "12",
                                            xl: "6",
                                            lg: "6",
                                            md: "6",
                                            sm: "12",
                                          },
                                        },
                                        [
                                          _c("v-text-field", {
                                            staticClass: "rounded-0 mb-n5",
                                            attrs: {
                                              label: "Your First Name",
                                              color: "orange",
                                              name: "first_name",
                                              "prepend-inner-icon":
                                                "mdi-account",
                                              type: "text",
                                              "error-messages":
                                                _vm.errors.first_name,
                                              outlined: "",
                                            },
                                            model: {
                                              value: _vm.form.first_name,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.form,
                                                  "first_name",
                                                  $$v
                                                )
                                              },
                                              expression: "form.first_name",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-col",
                                        {
                                          attrs: {
                                            cols: "12",
                                            xl: "6",
                                            lg: "6",
                                            md: "6",
                                            sm: "12",
                                          },
                                        },
                                        [
                                          _c("v-text-field", {
                                            staticClass: "rounded-0",
                                            attrs: {
                                              label: "Your Last Name",
                                              color: "orange",
                                              name: "last_name",
                                              "prepend-inner-icon":
                                                "mdi-account",
                                              type: "text",
                                              "error-messages":
                                                _vm.errors.last_name,
                                              outlined: "",
                                            },
                                            model: {
                                              value: _vm.form.last_name,
                                              callback: function ($$v) {
                                                _vm.$set(
                                                  _vm.form,
                                                  "last_name",
                                                  $$v
                                                )
                                              },
                                              expression: "form.last_name",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    staticClass: "rounded-0",
                                    attrs: {
                                      label: "Your Email",
                                      color: "orange",
                                      "prepend-inner-icon": "mdi-email",
                                      type: "email",
                                      "error-messages": _vm.errors.email,
                                      outlined: "",
                                    },
                                    model: {
                                      value: _vm.form.email,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.form, "email", $$v)
                                      },
                                      expression: "form.email",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    staticClass: "rounded-0",
                                    attrs: {
                                      label: "Your Password",
                                      color: "orange",
                                      "prepend-inner-icon": "mdi-lock",
                                      type: _vm.showPassword
                                        ? "text"
                                        : "password",
                                      "append-icon": _vm.showPassword
                                        ? "mdi-eye"
                                        : "mdi-eye-off",
                                      "error-messages": _vm.errors.password,
                                      outlined: "",
                                    },
                                    on: {
                                      "click:append": _vm.showPasswordHandle,
                                    },
                                    model: {
                                      value: _vm.form.password,
                                      callback: function ($$v) {
                                        _vm.$set(_vm.form, "password", $$v)
                                      },
                                      expression: "form.password",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c("v-text-field", {
                                    staticClass: "rounded-0",
                                    attrs: {
                                      label: "Your Password Confirmation",
                                      color: "orange",
                                      "prepend-inner-icon": "mdi-lock",
                                      type: _vm.showPasswordConfirmation
                                        ? "text"
                                        : "password",
                                      "append-icon":
                                        _vm.showPasswordConfirmation
                                          ? "mdi-eye"
                                          : "mdi-eye-off",
                                      "error-messages":
                                        _vm.errors.password_confirmation,
                                      outlined: "",
                                    },
                                    on: {
                                      "click:append":
                                        _vm.showPasswordConfirmationHandle,
                                    },
                                    model: {
                                      value: _vm.form.password_confirmation,
                                      callback: function ($$v) {
                                        _vm.$set(
                                          _vm.form,
                                          "password_confirmation",
                                          $$v
                                        )
                                      },
                                      expression: "form.password_confirmation",
                                    },
                                  }),
                                  _vm._v(" "),
                                  _c(
                                    "v-btn",
                                    {
                                      staticClass:
                                        "white--text text-h6 font-weight-bold",
                                      staticStyle: { "text-transform": "none" },
                                      attrs: {
                                        type: "submit",
                                        disabled: _vm.loading,
                                        tile: "",
                                        color: "orange darken-3",
                                        "x-large": "",
                                        block: "",
                                      },
                                    },
                                    [_vm._v("Register")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card-actions",
                                    { staticClass: "text--secondary" },
                                    [
                                      _c(
                                        "v-row",
                                        {
                                          staticClass: "my-4",
                                          attrs: {
                                            align: "center",
                                            justify: "center",
                                          },
                                        },
                                        [
                                          _c(
                                            "v-col",
                                            {
                                              staticClass: "mb-n3",
                                              attrs: { cols: "12", lg: "6" },
                                            },
                                            [
                                              _c("v-checkbox", {
                                                attrs: {
                                                  color: "black",
                                                  label: "Remember me",
                                                },
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-col",
                                            {
                                              staticClass: "text-center",
                                              attrs: { cols: "12", lg: "6" },
                                            },
                                            [
                                              _c(
                                                "span",
                                                {
                                                  staticStyle: {
                                                    margin: "0",
                                                    padding: "0",
                                                  },
                                                },
                                                [
                                                  _vm._v(
                                                    "Already have an account?"
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "span",
                                                [
                                                  _c(
                                                    "v-btn",
                                                    {
                                                      staticClass:
                                                        "black--text subtitle-1",
                                                      staticStyle: {
                                                        "text-transform":
                                                          "none",
                                                        "text-decoration":
                                                          "none",
                                                      },
                                                      attrs: {
                                                        text: "",
                                                        disabled: _vm.loading,
                                                        to: { name: "Login" },
                                                      },
                                                    },
                                                    [_vm._v("Sign In")]
                                                  ),
                                                ],
                                                1
                                              ),
                                            ]
                                          ),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              ),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-card-actions",
                            {
                              staticClass:
                                "ml-6 mr-6 justify-center text-center",
                            },
                            [
                              _c("p", [
                                _vm._v(
                                  "By continuing, you agree to Fedorae Education's"
                                ),
                                _c("br"),
                                _c("b", [
                                  _c(
                                    "a",
                                    {
                                      staticStyle: { color: "#000000" },
                                      attrs: { href: "#" },
                                    },
                                    [_vm._v("Policy")]
                                  ),
                                ]),
                                _vm._v(" and "),
                                _c("b", [
                                  _c(
                                    "a",
                                    {
                                      staticStyle: { color: "#000000" },
                                      attrs: { href: "#" },
                                    },
                                    [_vm._v("Term of use")]
                                  ),
                                ]),
                              ]),
                            ]
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                ],
                1
              ),
            ],
            1
          ),
        ],
        1
      ),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);