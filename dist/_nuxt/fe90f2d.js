(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{652:function(e,t,r){"use strict";r.r(t);var n=r(17),o=(r(68),r(21),r(6),r(12),r(13),r(69),r(581)),c={layout:"empty",components:{},data:function(){return{valid:!0,countDown:90,code:null,errors:[],snackbar:!1,errorMessages:"",formHasErrors:!1,rules:{codeRules:[function(e){return!!e||"کد تائید اجباری است"},function(e){return e&&e.length>3||"کد تائید  باید ۴ عدد باشد"},function(e){return/[0-9]/.test(e)||"فقط عدد وارد کنید"}]}}},computed:{form:function(){return{code:this.code}}},watch:{code:function(e){this.code=Object(o.digitsFaToEn)(e)}},transition:{name:"home",mode:"out-in"},mounted:function(){this.countDownTimer()},methods:{validation:function(){var e=this;Object.keys(this.form).forEach((function(t){e.form[t]||(e.formHasErrors=!0),e.$refs[t].validate(!0)}))},countDownTimer:function(){var e=this;this.countDown>0&&setTimeout((function(){e.countDown-=1,e.countDownTimer()}),1e3)},sendCodeAgain:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.checkVerifyCode();case 3:return t.sent,e.countDown=90,e.countDownTimer(),t.next=8,e.$axios.post("user/code/resend",value);case 8:t.next=13;break;case 10:return t.prev=10,t.t0=t.catch(0),t.abrupt("return",!1);case 13:case"end":return t.stop()}}),t,null,[[0,10]])})))()},checkVerifyCode:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.$storage.getLocalStorage("mobile");case 2:if(r=t.sent,console.log(r),r){t.next=7;break}return e.errors=["لطفا مجددا لاگین کنید"],t.abrupt("return",e.$router.push({path:"/auth/login"}));case 7:return t.abrupt("return",r);case 8:case"end":return t.stop()}}),t)})))()},submit:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){var r,n,o,c,l,d;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,e.formHasErrors=!1,e.validation(),e.errors=[],r=e.$route.query.q,t.next=7,e.$auth.$storage.getLocalStorage("mobile");case 7:if(n=t.sent,"forgot"!==r){t.next=18;break}if(code){t.next=11;break}return t.abrupt("return",e.$router.push("/auth/forgot"));case 11:return o={code:parseInt(e.code),type:"forgot"},t.next=14,e.$axios.post("/user/code",o);case 14:return c=t.sent,t.abrupt("return",e.$router.push("/auth/new-password?q=".concat(c.data.data.uuid)));case 18:if(console.log("uuuuuuuuuuuuuuuuuuuuuu"),l={code:parseInt(e.code),mobile:n,type:"register"},e.formHasErrors){t.next=29;break}return console.log(3333333333333333e8),t.next=24,e.$axios.post("/user/code",l);case 24:return d=t.sent,console.log(d),t.next=28,e.$auth.loginWith("local",{data:{mobile:e.mobile}});case 28:return t.abrupt("return",e.$router.push("/"));case 29:t.next=35;break;case 31:t.prev=31,t.t0=t.catch(0),e.snackbar=!0,console.log(t.t0);case 35:case"end":return t.stop()}}),t,null,[[0,31]])})))()}}},l=r(75),d=r(90),m=r.n(d),v=r(414),f=r(568),h=r(187),x=r(569),k=r(648),w=r(645),component=Object(l.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{ref:"form"},[r("h3",{staticClass:"text-right pt-10 pb-12 grey--text"},[r("v-icon",{staticClass:"ml-1"},[e._v("mdi-account-plus")]),e._v("\n    تائید هویت\n  ")],1),e._v(" "),r("h5",{staticClass:"text-center mb-4 text--grey"},[e._v("\n    کد تایید چهار رقمی که برای شما SMS شده است را وارد کنید\n  ")]),e._v(" "),r("v-snackbar",{attrs:{"multi-line":!0},model:{value:e.snackbar,callback:function(t){e.snackbar=t},expression:"snackbar"}},e._l(e.errors,(function(t,n){return r("ul",{key:n,staticClass:"my-1 mr-6"},[r("li",{staticClass:"mb-2"},[e._v(e._s(t))])])})),0),e._v(" "),r("v-row",{attrs:{justify:"center"}},[r("v-col",{attrs:{cols:"12",md:"12"}},[r("v-text-field",{ref:"code",attrs:{"error-messages":e.errorMessages,rules:e.rules.codeRules,maxlength:"4",outlined:"",color:"cyan"},model:{value:e.code,callback:function(t){e.code=t},expression:"code"}}),e._v(" "),e.countDown>0?r("div",{staticClass:"text-center mt-5 grey--text"},[r("v-icon",[e._v("mdi-clock")]),e._v(" "),r("span",[e._v(" "+e._s(e.countDown)+" ثانیه تا ارسال پیامک")])],1):e._e(),e._v(" "),0==e.countDown?r("div",{staticClass:"text-center mt-5 grey--text"},[r("v-icon",[e._v("mdi-emoticon-angry")]),e._v(" "),r("span",[e._v(" هنوز پیامک دریافت نکرده‌اید ؟ ")]),e._v(" "),r("br"),e._v(" "),r("a",{on:{click:e.sendCodeAgain}},[e._v("ارسال مجدد پیامک")])],1):e._e()],1)],1),e._v(" "),r("v-btn",{staticClass:"mx-auto d-block mt-12",attrs:{color:"success",dark:"","x-large":"",width:"200px",rounded:""},on:{click:e.submit}},[e._v("\n    ارســال\n  ")])],1)}),[],!1,null,null,null);t.default=component.exports;m()(component,{VBtn:v.a,VCol:f.a,VIcon:h.a,VRow:x.a,VSnackbar:k.a,VTextField:w.a})}}]);