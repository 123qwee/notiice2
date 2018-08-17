import Vue from 'vue'
import Router from 'vue-router'

import routes from './routes'

Vue.use(Router)

const router = new Router({
    // 使用HTML5 history模式时，nginx代理路径不被识别
    // mode: 'history',
    routes
})

/** 路由执行后操作 */
router.afterEach(transition => {

})

/** 路由执行前拦截操作 */
router.beforeEach((to, from, next) => {
    // 如果当前无用户登录信息
    if ((lscache.get('userId') == null && to.path !== '/Login') && (to.path == '/Main' || to.path == '/NoticeOperation' || to.path == '/NoticeManage' || to.path == '/InfoEdit' || to.path == '/CopyUrl')) {
        next('/Login');
    } else if (lscache.get("role") == 1) {
        if (to.path == "/InfoEdit"){
            next();
        }else{
            next("/InfoEdit");
        }
    } else {
        next();
    }
})



export default router
