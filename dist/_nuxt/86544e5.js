(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{598:function(t,e,n){"use strict";n.r(e);var r=n(17),o=(n(68),{data:function(){return{posts:[],news_short:[],loading:!1,titles:"d-flex",brief:"d-none"}},activated:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.lastNewsShort();case 2:case"end":return e.stop()}}),e)})))()},methods:{lastNewsShort:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/news-short/last");case 2:n=e.sent,t.news_short=n.data.data;case 4:case"end":return e.stop()}}),e)})))()}}}),c=n(75),l=n(90),d=n.n(l),v=n(558),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-5"},[n("h3",{staticClass:"mt-3 mb-1 text_color_grey--text"},[t._v("خبرهای فوری و کوتاه")]),t._v(" "),n("h6",{staticClass:"orange_color_1--text mb-3 font-weight-light"},[t._v("\n    خبرهای این بخش به صورت لحظه‌ای از بیش از صد سایت خبری خارج و ترجمه میشود\n  ")]),t._v(" "),n("div",{staticClass:"news-title-short"},[n("div",{staticClass:"inner"},t._l(t.news_short,(function(e,r){return n("div",{key:r,staticClass:"pt-4 font-font-weight-light"},[n("nuxt-link",{staticClass:"text_color_grey--text",attrs:{to:"/news/"+e.uuid}},[n("h5",{staticClass:"font-weight-regular"},[t._v("\n            "+t._s(e.title_translated)+"\n          ")])]),t._v(" "),n("v-divider",{staticClass:"mt-3"})],1)})),0)]),t._v(" "),n("div",{staticClass:"divider-1"})])}),[],!1,null,null,null);e.default=component.exports;d()(component,{VDivider:v.a})}}]);