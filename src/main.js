// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/** 1.1 引入Vue、Vue-Router框架 */
import Vue from 'vue'
import router from './router'

/** 1.2 引入ElementUI界面库 */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 默认主题

Vue.use(ElementUI)


import YDUI from 'vue-ydui';
import 'vue-ydui/dist/ydui.px.css';
Vue.use(YDUI)

/** 1.3 引入滚动轴控件 */
import Vuebar from 'vuebar'
Vue.use(Vuebar)

/** 1.4 引入babel和promise的polyfill使系统兼容IE浏览器11 **/
import 'babel-polyfill';

require("es6-promise").polyfill();

import lzscroll from '../node_modules/lzscroll/js/lz-scroll-1.4.6.js'
import  '../node_modules/lzscroll/css/lz-scroll.css'

/** 2.1 样式文件使不同的浏览器在渲染网页元素的时候形式更统一 */
import 'normalize.css'

/** 2.2 引入material字体 */
import './assets/icons/material-design-icons/material-icons.css'

/** 2.3 引入UiKit样式 */
import './assets/styles/uikit/css/uikit.almost-flat.min.css'

/** 2.4 引入Lodash，并将其设置为全局变量 */
import _ from 'lodash'
window._ = _

/** 2.5 引入lscache存储离线数据 */
import lscache from 'lscache'
window.lscache = lscache

// 引入echarts
import eCharts from 'echarts/lib/echarts.js';
Vue.prototype.$echarts = eCharts;

// 3.5 引入封装的弹框提示操作文件
import popupOper from './assets/scripts/common/popupOper.js'
window.popupOper = popupOper

// 引入echarts组件
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/dataZoom';

/** 3.1 引入根组件 */
import App from './App'

/** 3.2 引入非父子组件间交互组件EventBus */
import Bus from './components/commom/EventBus'
Vue.prototype.$bus = Bus

/** 3.3 引入封装的Ajax操作文件 */
import ajaxOper from './assets/scripts/ajax/ajaxOper.js'
Vue.prototype.$ajax = ajaxOper

/** 3.4 引入自定义样式文件 */
import './assets/styles/main.css'
import './assets/styles/subpage.css'

/** 3.5 引入系统通用变量 */
import commonOper from './assets/common/commonOper.js';
window.commonOper = commonOper;

Vue.config.productionTip = false

/* eslint-disable no-new */
window.rootVm = new Vue({
    router: router,
    render: h => h(App)
}).$mount("#app")
