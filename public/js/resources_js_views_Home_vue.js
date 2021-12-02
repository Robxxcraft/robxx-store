"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_views_Home_vue"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=script&lang=js&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=script&lang=js& ***!
  \******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _public_include_Navigation_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./public/include/Navigation.vue */ "./resources/js/views/public/include/Navigation.vue");
/* harmony import */ var _public_include_BottomNavigation_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./public/include/BottomNavigation.vue */ "./resources/js/views/public/include/BottomNavigation.vue");
/* harmony import */ var _public_include_Footer_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./public/include/Footer.vue */ "./resources/js/views/public/include/Footer.vue");
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
  components: {
    Navigation: _public_include_Navigation_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    BottomNavigation: _public_include_BottomNavigation_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    Footer: _public_include_Footer_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  name: "Home",
  data: function data() {
    return {
      valid: true,
      model: null,
      searchtext: null,
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
      banners: []
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$store.dispatch("category/getCategoriesHome");
    this.$store.dispatch("product/getRecentProducts");
    this.$store.dispatch("product/getSale");
    this.$store.dispatch("tag/getTags");
    axios.get("/api/banner").then(function (res) {
      _this.banners = res.data;
    });
  },
  created: function created() {
    setInterval(this.updateTimer, 1000);
  },
  computed: {
    getHomeCategories: function getHomeCategories() {
      return this.$store.state.category.homecategories;
    },
    getRecentProducts: function getRecentProducts() {
      return this.$store.getters["product/get_recent_products"];
    },
    getTags: function getTags() {
      return this.$store.state.tag.tags;
    },
    getSales: function getSales() {
      return this.$store.state.product.sale;
    }
  },
  methods: {
    search: function search() {
      var title = this.searchtext;
      var slug = title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+/, "-").replace(/-+$/, "");
      this.$router.replace({
        name: "Search",
        params: {
          slug: slug
        }
      });
    },
    addToCart: function addToCart(product) {
      if (this.$store.getters["auth/authenticated"] == false) {
        this.$router.replace({
          name: "Login"
        });
      } else {
        this.$store.dispatch("cart/addProductToCart", {
          product: product,
          quantity: 1
        });
      }
    },
    tagProducts: function tagProducts(slug) {
      this.$router.push({
        name: "TagProducts",
        params: {
          slug: slug
        }
      });
    },
    updateTimer: function updateTimer() {
      var future = Date.parse("January 1 2022 00:00:00");
      var now = new Date();
      var diff = future - now;
      var secs = Math.floor(diff / 1000);
      var mins = Math.floor(diff / (1000 * 60));
      var hours = Math.floor(diff / (1000 * 60 * 60));
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var d = days;
      var h = hours - days * 24;
      var m = mins - hours * 60;
      var s = secs - mins * 60;
      this.days = d;
      this.hours = h;
      this.minutes = m;
      this.seconds = s;
    }
  }
});

/***/ }),

/***/ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js */ "./node_modules/laravel-mix/node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_laravel_mix_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.o {\n  font-size: 10px;\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=style&index=0&lang=css& */ "./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./resources/js/views/Home.vue":
/*!*************************************!*\
  !*** ./resources/js/views/Home.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Home.vue?vue&type=template&id=63cd6604& */ "./resources/js/views/Home.vue?vue&type=template&id=63cd6604&");
/* harmony import */ var _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Home.vue?vue&type=script&lang=js& */ "./resources/js/views/Home.vue?vue&type=script&lang=js&");
/* harmony import */ var _Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Home.vue?vue&type=style&index=0&lang=css& */ "./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");



;


/* normalize component */

var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__.render,
  _Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/views/Home.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/views/Home.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/views/Home.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&":
/*!**********************************************************************!*\
  !*** ./resources/js/views/Home.vue?vue&type=style&index=0&lang=css& ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_laravel_mix_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_0_rules_0_use_2_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=style&index=0&lang=css& */ "./node_modules/style-loader/dist/cjs.js!./node_modules/laravel-mix/node_modules/css-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[1]!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9[0].rules[0].use[2]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=style&index=0&lang=css&");


/***/ }),

/***/ "./resources/js/views/Home.vue?vue&type=template&id=63cd6604&":
/*!********************************************************************!*\
  !*** ./resources/js/views/Home.vue?vue&type=template&id=63cd6604& ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Home_vue_vue_type_template_id_63cd6604___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./Home.vue?vue&type=template&id=63cd6604& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=template&id=63cd6604&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=template&id=63cd6604&":
/*!***********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/views/Home.vue?vue&type=template&id=63cd6604& ***!
  \***********************************************************************************************************************************************************************************************************/
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
    { staticStyle: { "background-color": "rgb(238, 238, 238)" } },
    [
      _c(
        "v-main",
        [
          _c("Navigation"),
          _vm._v(" "),
          _c(
            "section",
            [
              _c(
                "v-row",
                { staticClass: "mx-1 my-4", attrs: { wrap: "" } },
                [
                  _c(
                    "v-col",
                    {
                      staticClass: "hidden-sm-and-down",
                      attrs: { cols: "12", md: "3" },
                    },
                    [
                      _c(
                        "v-card",
                        {
                          staticClass: "rounded-lg",
                          attrs: { height: "420", flat: "" },
                        },
                        [
                          _c(
                            "v-list",
                            [
                              [
                                _c(
                                  "v-card-title",
                                  {
                                    staticClass:
                                      "text-h6 grey--text text--darken-2",
                                  },
                                  [_vm._v("Recent Products")]
                                ),
                                _vm._v(" "),
                                _c(
                                  "div",
                                  _vm._l(
                                    _vm.getRecentProducts,
                                    function (recent, index) {
                                      return _c(
                                        "v-list-item",
                                        {
                                          key: index,
                                          staticStyle: {
                                            "text-decoration": "none",
                                          },
                                          attrs: {
                                            to: {
                                              name: "ProductDetails",
                                              params: { slug: recent.slug },
                                            },
                                            "three-line": "",
                                          },
                                        },
                                        [
                                          _c(
                                            "v-list-item-avatar",
                                            {
                                              attrs: {
                                                color: "#EFF4F1",
                                                size: "70",
                                                rounded: "",
                                              },
                                            },
                                            [
                                              _c("v-img", {
                                                attrs: {
                                                  src: recent.photo
                                                    ? recent.photo
                                                    : "assets/images/blank.png",
                                                  contain: "",
                                                },
                                              }),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-list-item-content",
                                            [
                                              _c("v-list-item-title", [
                                                _c(
                                                  "h6",
                                                  {
                                                    staticClass:
                                                      "grey--text text--darken-2",
                                                  },
                                                  [
                                                    _vm._v(
                                                      "\n                          " +
                                                        _vm._s(recent.title) +
                                                        "\n                        "
                                                    ),
                                                  ]
                                                ),
                                              ]),
                                              _vm._v(" "),
                                              _c(
                                                "v-list-item-subtitle",
                                                {
                                                  staticClass:
                                                    "grey--text pb-2",
                                                },
                                                [
                                                  _vm._v(
                                                    _vm._s(recent.category.name)
                                                  ),
                                                ]
                                              ),
                                              _vm._v(" "),
                                              _c(
                                                "div",
                                                {
                                                  staticClass:
                                                    "font-weight-bold",
                                                },
                                                [
                                                  _vm._v(
                                                    "$" + _vm._s(recent.price)
                                                  ),
                                                ]
                                              ),
                                            ],
                                            1
                                          ),
                                        ],
                                        1
                                      )
                                    }
                                  ),
                                  1
                                ),
                              ],
                            ],
                            2
                          ),
                        ],
                        1
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "6" } },
                    [
                      _c(
                        "v-carousel",
                        {
                          staticClass: "rounded-lg",
                          attrs: {
                            height: "auto",
                            continuous: "",
                            cycle: "",
                            "show-arrows": false,
                            "hide-delimiter-background": "",
                            "delimiter-icon": "mdi-minus",
                          },
                        },
                        _vm._l(_vm.banners, function (banner, index) {
                          return _c(
                            "v-carousel-item",
                            { key: index },
                            [_c("v-img", { attrs: { src: banner.image } })],
                            1
                          )
                        }),
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-card",
                        {
                          staticClass: "rounded-lg mt-5",
                          attrs: { flat: "", height: "430" },
                        },
                        [
                          _c(
                            "v-app-bar",
                            { attrs: { flat: "", color: "rgba(0,0,0,0)" } },
                            [
                              _c(
                                "v-row",
                                { staticClass: "hidden-sm-and-down" },
                                [
                                  _c(
                                    "span",
                                    { staticClass: "font-weight-bold ma-3" },
                                    [_vm._v("New Year Sale")]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card",
                                    {
                                      staticClass: "pa-2",
                                      attrs: {
                                        color: "blue darken-3 mx-1",
                                        elevation: "3",
                                      },
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-1",
                                        },
                                        [_vm._v(_vm._s(_vm.days))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-2 ml-n1",
                                        },
                                        [_vm._v("d")]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card",
                                    {
                                      staticClass: "pa-2",
                                      attrs: {
                                        color: "blue darken-3 mx-1",
                                        elevation: "3",
                                      },
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-1",
                                        },
                                        [_vm._v(_vm._s(_vm.hours))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-2 ml-n1",
                                        },
                                        [_vm._v("h")]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card",
                                    {
                                      staticClass: "pa-2",
                                      attrs: {
                                        color: "blue darken-3 mx-1",
                                        elevation: "3",
                                      },
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-1",
                                        },
                                        [_vm._v(_vm._s(_vm.minutes))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-2 ml-n1",
                                        },
                                        [_vm._v("m")]
                                      ),
                                    ]
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card",
                                    {
                                      staticClass: "pa-2",
                                      attrs: {
                                        color: "blue darken-3 mx-1",
                                        elevation: "3",
                                      },
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-1",
                                        },
                                        [_vm._v(_vm._s(_vm.seconds))]
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text font-weight-bold subtitle-2 ml-n1",
                                        },
                                        [_vm._v("s")]
                                      ),
                                    ]
                                  ),
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c(
                                "v-row",
                                {
                                  staticClass: "hidden-md-and-up",
                                  attrs: { "no-gutters": "" },
                                },
                                [
                                  _c("v-col", { attrs: { cols: "4" } }, [
                                    _c(
                                      "span",
                                      { staticClass: "ml-n1 font-weight-bold" },
                                      [_vm._v("New Year Sale")]
                                    ),
                                  ]),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    { attrs: { cols: "2" } },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticClass: "pa-2",
                                          attrs: {
                                            color: "blue darken-3 mx-1",
                                            width: "47",
                                            elevation: "3",
                                          },
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-1",
                                            },
                                            [_vm._v(_vm._s(_vm.days))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-2 ml-n1",
                                            },
                                            [_vm._v("d")]
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    { attrs: { cols: "2" } },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticClass: "pa-2",
                                          attrs: {
                                            color: "blue darken-3 mx-1",
                                            width: "47",
                                            elevation: "3",
                                          },
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-1",
                                            },
                                            [_vm._v(_vm._s(_vm.hours))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-2 ml-n1",
                                            },
                                            [_vm._v("h")]
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    { attrs: { cols: "2" } },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticClass: "pa-2",
                                          attrs: {
                                            color: "blue darken-3 mx-1",
                                            width: "47",
                                            elevation: "3",
                                          },
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-1",
                                            },
                                            [_vm._v(_vm._s(_vm.minutes))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-2 ml-n1",
                                            },
                                            [_vm._v("m")]
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-col",
                                    { attrs: { cols: "2" } },
                                    [
                                      _c(
                                        "v-card",
                                        {
                                          staticClass: "pa-2",
                                          attrs: {
                                            color: "blue darken-3 mx-1",
                                            width: "47",
                                            elevation: "3",
                                          },
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-1",
                                            },
                                            [_vm._v(_vm._s(_vm.seconds))]
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text font-weight-bold subtitle-2 ml-n1",
                                            },
                                            [_vm._v("s")]
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
                          _vm._v(" "),
                          _c(
                            "v-carousel",
                            {
                              staticClass: "mt-5",
                              attrs: { height: "auto", "hide-delimiters": "" },
                            },
                            _vm._l(_vm.getSales, function (product, index) {
                              return _c(
                                "v-carousel-item",
                                { key: index },
                                [
                                  _c(
                                    "v-list-item",
                                    { attrs: { "three-line": "" } },
                                    [
                                      _c(
                                        "v-list-item-avatar",
                                        {
                                          attrs: {
                                            rounded: "",
                                            size: "120",
                                            color: "grey lighten-4",
                                          },
                                        },
                                        [
                                          _c("v-img", {
                                            attrs: {
                                              src: product.photo
                                                ? product.photo
                                                : "/assets/images/blank.png",
                                              height: "auto",
                                              contain: "",
                                            },
                                          }),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-list-item-content",
                                        [
                                          _c(
                                            "v-hover",
                                            [
                                              _c(
                                                "v-list-item-title",
                                                { staticClass: "text-h5" },
                                                [
                                                  _c(
                                                    "router-link",
                                                    {
                                                      staticClass:
                                                        "grey--text text--darken-2 font-weight-bold",
                                                      staticStyle: {
                                                        "text-decoration":
                                                          "none",
                                                      },
                                                      attrs: {
                                                        to: {
                                                          name: "ProductDetails",
                                                          params: {
                                                            slug: product.slug,
                                                          },
                                                        },
                                                      },
                                                    },
                                                    [
                                                      _c("span", [
                                                        _vm._v(
                                                          _vm._s(product.title)
                                                        ),
                                                      ]),
                                                    ]
                                                  ),
                                                ],
                                                1
                                              ),
                                            ],
                                            1
                                          ),
                                          _vm._v(" "),
                                          _c(
                                            "v-list-item-subtitle",
                                            {
                                              staticClass:
                                                "mt-1 orange--text text--darken-2",
                                            },
                                            [
                                              _vm._v(
                                                _vm._s(product.category.name)
                                              ),
                                            ]
                                          ),
                                          _vm._v(" "),
                                          _c("div", [
                                            _vm._v(
                                              "\n                       Stock "
                                            ),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "orange--text text--darken-2 font-weight-bold ml-3",
                                              },
                                              [_vm._v(_vm._s(product.stok))]
                                            ),
                                          ]),
                                          _vm._v(" "),
                                          _c("div", [
                                            _vm._v(
                                              "\n                      Price "
                                            ),
                                            _c(
                                              "span",
                                              {
                                                staticClass:
                                                  "orange--text text--darken-2 font-weight-bold ml-3",
                                              },
                                              [
                                                _vm._v(
                                                  "$" + _vm._s(product.price)
                                                ),
                                              ]
                                            ),
                                          ]),
                                        ],
                                        1
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card-text",
                                    [
                                      _c(
                                        "v-card-actions",
                                        [
                                          _c(
                                            "v-row",
                                            [
                                              _c("v-spacer"),
                                              _vm._v(" "),
                                              _c(
                                                "v-col",
                                                { staticClass: "text-right" },
                                                [
                                                  _c(
                                                    "v-btn",
                                                    {
                                                      staticClass:
                                                        "font-weight-bold",
                                                      staticStyle: {
                                                        "text-transform":
                                                          "none",
                                                      },
                                                      attrs: {
                                                        plain: "",
                                                        color:
                                                          "orange darken-3",
                                                        depressed: "",
                                                      },
                                                      on: {
                                                        click: function (
                                                          $event
                                                        ) {
                                                          $event.preventDefault()
                                                          return _vm.addToCart(
                                                            product
                                                          )
                                                        },
                                                      },
                                                    },
                                                    [_vm._v("Add To Cart")]
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
                            }),
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
                    "v-col",
                    {
                      staticClass:
                        "text-center align-center justify-center my-5 hidden-md-and-up",
                      attrs: { cols: "12", md: "3" },
                    },
                    [
                      _c(
                        "v-subheader",
                        { staticClass: "text-h6 font-weight-bold" },
                        [_vm._v("Categories")]
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { wrap: "" } },
                        [
                          _vm._l(
                            _vm.getHomeCategories,
                            function (category, index) {
                              return _c(
                                "v-col",
                                {
                                  key: index,
                                  staticStyle: { padding: "0", margin: "0" },
                                  attrs: { cols: "4" },
                                },
                                [
                                  _c(
                                    "v-card",
                                    {
                                      staticClass: "my-2 mx-2",
                                      staticStyle: {
                                        "text-decoration": "none",
                                      },
                                      attrs: {
                                        color: "orange",
                                        elevation: "3",
                                        to: {
                                          name: "ProductsByCategory",
                                          params: { slug: category.slug },
                                        },
                                        width: "auto",
                                        height: "120",
                                      },
                                    },
                                    [
                                      _c(
                                        "v-card-subtitle",
                                        [
                                          _c(
                                            "v-icon",
                                            { staticClass: "white--text" },
                                            [_vm._v("mdi-format-list-text")]
                                          ),
                                        ],
                                        1
                                      ),
                                      _vm._v(" "),
                                      _c(
                                        "v-card-actions",
                                        {
                                          staticClass:
                                            "align-center justify-center",
                                        },
                                        [
                                          _c(
                                            "span",
                                            {
                                              staticClass:
                                                "white--text o font-weight-bold",
                                            },
                                            [_vm._v(_vm._s(category.name))]
                                          ),
                                        ]
                                      ),
                                    ],
                                    1
                                  ),
                                ],
                                1
                              )
                            }
                          ),
                          _vm._v(" "),
                          _c(
                            "v-col",
                            {
                              staticStyle: { padding: "0", margin: "0" },
                              attrs: { cols: "4" },
                            },
                            [
                              _c(
                                "v-card",
                                {
                                  staticClass: "my-2 mx-2",
                                  staticStyle: { "text-decoration": "none" },
                                  attrs: {
                                    color: "orange",
                                    elevation: "3",
                                    to: { name: "AllCategories" },
                                    width: "auto",
                                    height: "120",
                                  },
                                },
                                [
                                  _c(
                                    "v-card-subtitle",
                                    [
                                      _c(
                                        "v-icon",
                                        { staticClass: "white--text" },
                                        [_vm._v("mdi-dots-horizontal")]
                                      ),
                                    ],
                                    1
                                  ),
                                  _vm._v(" "),
                                  _c(
                                    "v-card-actions",
                                    {
                                      staticClass:
                                        "align-center justify-center",
                                    },
                                    [
                                      _c(
                                        "span",
                                        {
                                          staticClass:
                                            "white--text o font-weight-bold",
                                        },
                                        [_vm._v("More")]
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
                        2
                      ),
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-col",
                    { attrs: { cols: "12", md: "3" } },
                    [
                      _c(
                        "v-card",
                        {
                          staticClass: "rounded-lg",
                          attrs: { height: "590", flat: "" },
                        },
                        [
                          _c(
                            "v-card-title",
                            [
                              _c("v-text-field", {
                                attrs: {
                                  label: "Search",
                                  "append-icon": "mdi-magnify",
                                  filled: "",
                                  rounded: "",
                                  color: "orange",
                                },
                                on: {
                                  "click:append": _vm.search,
                                  keyup: function ($event) {
                                    if (
                                      !$event.type.indexOf("key") &&
                                      _vm._k(
                                        $event.keyCode,
                                        "enter",
                                        13,
                                        $event.key,
                                        "Enter"
                                      )
                                    ) {
                                      return null
                                    }
                                    return _vm.search.apply(null, arguments)
                                  },
                                },
                                model: {
                                  value: _vm.searchtext,
                                  callback: function ($$v) {
                                    _vm.searchtext = $$v
                                  },
                                  expression: "searchtext",
                                },
                              }),
                            ],
                            1
                          ),
                          _vm._v(" "),
                          _c(
                            "v-card-text",
                            [
                              _c(
                                "div",
                                {
                                  staticClass:
                                    "text-h6 grey--text text--darken-2",
                                },
                                [_vm._v("Tags")]
                              ),
                              _vm._v(" "),
                              _c("v-divider"),
                              _vm._v(" "),
                              _c(
                                "div",
                                { staticClass: "caption" },
                                _vm._l(_vm.getTags, function (tag, index) {
                                  return _c("v-chip", {
                                    key: index,
                                    staticClass: "mx-1 my-1",
                                    attrs: {
                                      outlined: "",
                                      color: "orange accent-3",
                                    },
                                    domProps: { textContent: _vm._s(tag.name) },
                                    on: {
                                      click: function ($event) {
                                        return _vm.tagProducts(tag.slug)
                                      },
                                    },
                                  })
                                }),
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
              _vm._v(" "),
              _c("div", { staticClass: "my-16" }, [
                _c(
                  "section",
                  { staticClass: "my-16" },
                  [
                    _c(
                      "v-parallax",
                      { attrs: { src: "/assets/images/bg1.jpg" } },
                      [
                        _c(
                          "v-row",
                          { staticClass: "my-auto", attrs: { align: "end" } },
                          [
                            _c(
                              "v-col",
                              {
                                staticClass: "text-center",
                                attrs: { cols: "12" },
                              },
                              [
                                _c("h1", { staticClass: "text-h4" }, [
                                  _vm._v("RobxxStore"),
                                ]),
                                _vm._v(" "),
                                _c("h4", { staticClass: "subheading" }, [
                                  _vm._v("Welcome To Homepage"),
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
              ]),
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "section",
            { staticClass: "mx-4 my-5" },
            [
              _c(
                "v-card",
                { staticClass: "rounded-lg mb-8", attrs: { flat: "" } },
                [
                  _c(
                    "v-row",
                    { staticClass: "mt-3" },
                    [
                      _c(
                        "v-col",
                        {
                          staticClass: "text-center",
                          attrs: { cols: "12", md: "6", lg: "6", xl: "6" },
                        },
                        [
                          _c("v-img", {
                            staticClass: "mx-5",
                            attrs: {
                              src: "/assets/images/about.svg",
                              contain: "",
                              "max-height": "400px",
                            },
                          }),
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-col",
                        {
                          staticClass: "my-auto",
                          attrs: { cols: "12", md: "6", lg: "6", xl: "6" },
                        },
                        [
                          _c("v-subheader", { staticClass: "text-h4 mt-5" }, [
                            _vm._v("About Us"),
                          ]),
                          _vm._v(" "),
                          _c("v-container", { staticClass: "mb-5" }, [
                            _c("span", { staticClass: "subtitle-1" }, [
                              _vm._v(
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.\n                Voluptatum, similique. Ipsum eos iure consequatur illum quas\n                est, dolores, omnis magni officiis unde necessitatibus. Soluta\n                modi dolor nesciunt nam perferendis voluptatem!"
                              ),
                            ]),
                            _c("br"),
                            _vm._v(" "),
                            _c("span", { staticClass: "subtitle-1" }, [
                              _vm._v(
                                "Lorem ipsum dolor sit amet consectetur adipisicing elit.\n                Voluptatum, similique. Ipsum eos iure consequatur illum quas\n                est, dolores, omnis magni officiis unde necessitatibus. Soluta\n                modi dolor nesciunt nam perferendis voluptatem!"
                              ),
                            ]),
                          ]),
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
          _c("Footer"),
        ],
        1
      ),
      _vm._v(" "),
      _c("BottomNavigation", { staticClass: "hidden-md-and-up" }),
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true



/***/ })

}]);