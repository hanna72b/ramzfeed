(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{607:function(t,e,n){"use strict";n.r(e);var r=n(20),l=(n(73),{data:function(){return{tweets:[]}},activated:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.lastNews();case 2:case"end":return e.stop()}}),e)})))()},methods:{lastNews:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/tweets/last");case 2:n=e.sent,t.tweets=n.data.data,console.log(t.tweets);case 5:case"end":return e.stop()}}),e)})))()}}}),c=n(57),o=n(60),v=n.n(o),_=n(618),d=n(196),f=n(195),m=n(415),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-5 tweet-bg-in-front"},[t._m(0),t._v(" "),n("h5",{staticClass:"white--text mb-4 font-weight-light"},[t._v("\n    در این بخش می‌توانید به صوررت لحظه‌ای ،توییت‌های تریدرهای حرفه ای را به\n    زبان فارسی مشاهده کنید\n  ")]),t._v(" "),n("div",{staticClass:"tweets-in-front"},[t._l(t.tweets,(function(e,r){return n("div",{key:r},[n("v-card",{staticClass:"tweet-cards mb-5 pb-5"},[n("div",{staticClass:"profile pt-4 mb-3"},[n("span",{staticClass:"ml-3"},[n("h5",{staticClass:"text_color_grey--text text-left d-inline-block"},[t._v("\n              "+t._s(e.influencer.screen_name)+"@\n            ")]),t._v(" "),n("h3",{staticClass:"text-left d-inline-block"},[t._v("\n              "+t._s(e.influencer.name)+"\n            ")]),t._v(" "),n("h5",{staticClass:"text-left mt-1"},[t._v("\n              "+t._s(t.numberFormat(e.influencer.followers))),n("small",{staticClass:"ml-1 text_color_grey--text text-left"},[t._v("Followers")])])]),t._v(" "),n("v-avatar",{staticClass:"ml-2",attrs:{size:"60"}},[n("v-img",{staticClass:"mx-auto d-block",attrs:{src:t.getPath("influencer")+e.influencer.profile_image,width:"100%"}})],1)],1),t._v(" "),n("div",{staticClass:"tweet",domProps:{innerHTML:t._s(e.text_translated)}}),t._v(" "),e.attachment.length?n("div",{staticClass:"media"},t._l(e.attachment,(function(e,r){return n("div",{key:r},["url"===e.type?n("div",{staticClass:"mt-2 tweet-link"},[n("v-icon",{attrs:{color:"cyan",small:""}},[t._v(" mdi-open-in-new ")]),t._v(" "),n("a",{attrs:{href:e.url,target:"_blank"}},[t._v(t._s(e.url))])],1):t._e(),t._v(" "),"img"===e.type?n("div",{staticClass:"mt-2"},[n("v-img",{attrs:{src:t.getPath("twitter")+e.path}})],1):t._e()])})),0):t._e(),t._v(" "),n("div",{staticClass:"text-left grey--text mt-3 ml-3"},[n("br"),t._v(" "),n("small",[t._v(t._s(t.toJalali(new Date(e.twitter_created_at).getTime()/1e3,!0)))])])])],1)})),t._v(" "),n("div",{staticClass:"text-center"},[t._v("\n      برای مشاهده همه توییت‌ها به\n      "),n("router-link",{attrs:{to:"/tweets"}},[t._v(" صفحه توییت‌ها")]),t._v("\n      مراجعه کنید\n    ")],1)],2)])}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"d-flex justify-space-between"},[n("h3",{staticClass:"mb-2 cyan--text"},[t._v("تحلیل‌ها و خـبرهای توییتر")])])}],!1,null,null,null);e.default=component.exports;v()(component,{VAvatar:_.a,VCard:d.a,VIcon:f.a,VImg:m.a})},608:function(t,e,n){"use strict";n.r(e);var r=n(57),l=n(60),c=n.n(l),o=n(650),component=Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",t._l(20,(function(t,e){return n("div",{key:e,staticClass:"pt-4 font-font-weight-light"},[n("v-skeleton-loader",{attrs:{type:"paragraph",dark:""}})],1)})),0)}),[],!1,null,null,null);e.default=component.exports;c()(component,{VSkeletonLoader:o.a})},624:function(t,e,n){"use strict";n.r(e);var r=n(20),l=(n(73),{components:{lastTweets:n(607).default},data:function(){return{posts:[],news_short:[],loading:!1,titles:"d-flex",brief:"d-none",page:1,last_page:null}},activated:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.lastNews();case 2:return e.next=4,t.lastNewsShort();case 4:case"end":return e.stop()}}),e)})))()},methods:{lastNews:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/news/last?page=".concat(t.page));case 2:n=e.sent,t.posts=n.data.data,t.page=n.data.pagination.current_page,t.last_page=n.data.pagination.last_page,window.scrollTo({top:0,behavior:"smooth"});case 7:case"end":return e.stop()}}),e)})))()},lastNewsShort:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.get("/news-short/last");case 2:n=e.sent,t.news_short=n.data.data;case 4:case"end":return e.stop()}}),e)})))()}}}),c=n(57),o=n(60),v=n.n(o),_=n(618),d=n(585),f=n(415),m=n(630),component=Object(c.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"mx-5"},[n("h3",{staticClass:"mt-3 mb-2 cyan--text"},[t._v("آخرین خبرها")]),t._v(" "),n("h5",{staticClass:"white--text mb-3 font-weight-light"},[t._v("\n    خبرهای بیش از پنجاه سایت خبری را در این قسمت مشاهده کنید\n  ")]),t._v(" "),n("div",{staticClass:"news-title"},[0===t.posts.length?n("div",[n("loading")],1):t._e(),t._v(" "),t._l(t.posts,(function(e,r){return n("div",{key:r,staticClass:"pt-4 font-font-weight-light"},[n("div",{staticClass:"d-flex"},[n("router-link",{staticClass:"text_color_grey--text",attrs:{to:"/news/"+e.slug}},[e.crawling_source?n("v-avatar",{attrs:{size:"30"}},[n("v-img",{attrs:{src:t.getPath("crawling_source")+e.crawling_source.logo}})],1):t._e(),t._v(" "),n("span",{staticClass:"font-weight-regular mr-2"},[t._v("\n            "+t._s(e.title_translated)+"\n          ")])],1)],1),t._v(" "),n("div",{staticClass:"like-dislike d-flex mt-3 justify-end"},[n("keep-alive",[n("likes",{tag:"component",attrs:{content:"news",id:e.id,actions:e.news_like}})],1)],1),t._v(" "),n("v-divider",{staticClass:"mt-3"})],1)}))],2),t._v(" "),n("v-pagination",{staticClass:"mx-auto d-block my-6",attrs:{color:"cyan","total-visible":7,length:t.last_page,light:"",circle:"",dark:""},on:{input:t.lastNews},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)}),[],!1,null,null,null);e.default=component.exports;v()(component,{Loading:n(608).default}),v()(component,{VAvatar:_.a,VDivider:d.a,VImg:f.a,VPagination:m.a})}}]);