webpackJsonp([50],{"8D9j":function(t,e,i){"use strict";function n(t){i("pNdn")}Object.defineProperty(e,"__esModule",{value:!0});var s=i("wr5Z"),a=i("8bDp"),o=i("VU/8"),A=n,r=o(s.a,a.a,!1,A,"data-v-93ee4fe0",null);e.default=r.exports},"8bDp":function(t,e,i){"use strict";var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row dashboard-info-widgets"},[i("div",{staticClass:"col-md-6 col-xl-3"},[i("vuestic-widget",{staticClass:"info-widget"},[i("div",{staticClass:"info-widget-inner"},[i("div",{staticClass:"stats"},[i("div",{staticClass:"stats-number"},[i("i",{staticClass:"ion ion-md-arrow-up text-primary stats-icon"}),t._v("\n            59\n          ")]),t._v(" "),i("div",{staticClass:"stats-title"},[t._v(t._s(t._f("translate")("dashboard.elements")))])])])])],1),t._v(" "),i("div",{staticClass:"col-md-6 col-xl-3"},[i("vuestic-widget",{staticClass:"info-widget"},[i("div",{staticClass:"info-widget-inner"},[i("div",{staticClass:"stats"},[i("div",{staticClass:"stats-number"},[i("i",{staticClass:"ion ion-md-arrow-down text-danger stats-icon"}),t._v("\n            12\n          ")]),t._v(" "),i("div",{staticClass:"stats-title"},[t._v(t._s(t._f("translate")("dashboard.versions")))])])])])],1),t._v(" "),i("div",{staticClass:"col-md-6 col-xl-3"},[i("vuestic-widget",{staticClass:"info-widget brand-danger"},[i("div",{staticClass:"info-widget-inner"},[i("div",{staticClass:"info-widget-inner has-chart"},[i("div",{staticClass:"stats"},[i("div",{staticClass:"stats-number"},[t._v("\n              425\n            ")]),t._v(" "),i("div",{staticClass:"stats-title"},[t._v("Commits")])]),t._v(" "),i("div",{staticClass:"chart-container"},[i("vuestic-progress-bar",{attrs:{type:"circle",value:70,theme:"White",backgroundTheme:"Danger"}})],1)])])])],1),t._v(" "),i("div",{staticClass:"col-md-6 col-xl-3"},[i("vuestic-widget",{staticClass:"info-widget brand-info"},[i("div",{staticClass:"info-widget-inner"},[i("div",{staticClass:"stats"},[i("div",{staticClass:"stats-number"},[i("i",{staticClass:"ion ion-md-people stats-icon icon-wide"}),t._v("\n            5\n          ")]),t._v(" "),i("div",{staticClass:"stats-title"},[t._v(t._s(t._f("translate")("dashboard.teamMembers")))])])])])],1)])},s=[],a={render:n,staticRenderFns:s};e.a=a},myu6:function(t,e,i){e=t.exports=i("FZ+f")(!0),e.push([t.i,".stats-number[data-v-93ee4fe0],.stats-title[data-v-93ee4fe0]{line-height:1}.info-widget-inner[data-v-93ee4fe0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;position:relative;width:100%}.info-widget-inner.has-chart[data-v-93ee4fe0]{-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.info-widget-inner .stats[data-v-93ee4fe0]{-webkit-box-orient:vertical;-ms-flex-direction:column;flex-direction:column;height:100%}.info-widget-inner .stats[data-v-93ee4fe0],.stats-number[data-v-93ee4fe0]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-direction:normal;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.stats-number[data-v-93ee4fe0]{position:relative;-webkit-box-orient:horizontal;-ms-flex-direction:row;flex-direction:row;font-size:2.625rem;margin-bottom:.5rem}.stats-number .stats-icon[data-v-93ee4fe0]{font-size:1.5625rem;position:absolute;top:.625rem;left:-1.25rem}.stats-number .stats-icon.icon-wide[data-v-93ee4fe0]{left:-1.875rem}","",{version:3,sources:["/home/mikael/Documents/comnet/vue-ui/src/components/dashboard/DashboardInfoWidgets.vue"],names:[],mappings:"AACA,6DACE,aAAe,CAChB,AACD,oCACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,8BAA+B,AAC/B,6BAA8B,AAC1B,uBAAwB,AACpB,mBAAoB,AAC5B,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,kBAAmB,AACnB,UAAY,CACb,AACD,8CACI,yBAA0B,AACtB,sBAAuB,AACnB,6BAA+B,CAC1C,AACD,2CAII,4BAA6B,AAEzB,0BAA2B,AACvB,sBAAuB,AAO/B,WAAa,CAChB,AACD,0EAfI,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AAEd,6BAA8B,AAG9B,wBAAyB,AACrB,qBAAsB,AAClB,uBAAwB,AAChC,yBAA0B,AACtB,sBAAuB,AACnB,kBAAoB,CAoB/B,AAjBD,+BACE,kBAAmB,AAInB,8BAA+B,AAE3B,uBAAwB,AACpB,mBAAoB,AAO5B,mBAAoB,AACpB,mBAAsB,CACvB,AACD,2CACI,oBAAqB,AACrB,kBAAmB,AACnB,YAAc,AACd,aAAe,CAClB,AACD,qDACM,cAAgB,CACrB",file:"DashboardInfoWidgets.vue",sourcesContent:["\n.stats-number[data-v-93ee4fe0], .stats-title[data-v-93ee4fe0] {\n  line-height: 1;\n}\n.info-widget-inner[data-v-93ee4fe0] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  width: 100%;\n}\n.info-widget-inner.has-chart[data-v-93ee4fe0] {\n    -webkit-box-pack: justify;\n        -ms-flex-pack: justify;\n            justify-content: space-between;\n}\n.info-widget-inner .stats[data-v-93ee4fe0] {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    -webkit-box-align: center;\n        -ms-flex-align: center;\n            align-items: center;\n    height: 100%;\n}\n.stats-number[data-v-93ee4fe0] {\n  position: relative;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  font-size: 2.625rem;\n  margin-bottom: 0.5rem;\n}\n.stats-number .stats-icon[data-v-93ee4fe0] {\n    font-size: 1.5625rem;\n    position: absolute;\n    top: 0.625rem;\n    left: -1.25rem;\n}\n.stats-number .stats-icon.icon-wide[data-v-93ee4fe0] {\n      left: -1.875rem;\n}\n"],sourceRoot:""}])},pNdn:function(t,e,i){var n=i("myu6");"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);i("rjj0")("0692cea9",n,!0)},wr5Z:function(t,e,i){"use strict";e.a={name:"dashboard-info-widgets"}}});
//# sourceMappingURL=50.4f688fe830fc702f1453.js.map