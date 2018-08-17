/**
 * @desc 当前文件存储登录及权限相关方法
 * @author Originaljoy
 */

import menus from '../scripts/config/menu_config.js'
import ajaxOper from '../scripts/ajax/ajaxOper.js'
import commonOper from "./commonOper.js";

/**
 * 获取用户信息，并存储在本地
 */
const getUserInfo = (params) => { 
    ajaxOper.ajaxHttp({
        type: 'get',
        // url: baseURL + '/permission/user/currentAll',
        url:'/communtiy/basic/current',
        successFunc: (data) => {
            const userInfo = data.data;
            if (!userInfo) {
                commonOper.showModalAlert({
                    message: "用户登录已过期，请重新登录!",
                    sureFunc: () => {
                        // 设置用户重新登录            
                        userLogout();
                    }
                })
                return;
            }
            console.log(lscache.get('userId'));
            if (!lscache.get('userId')) {

                lscache.set('userId', userInfo.id, 60); // 用户编号
                lscache.set('userAccount', userInfo.account, 60); // 用户账号
                lscache.set('userName', userInfo.username, 60); // 用户姓名
                // lscache.set('roles', userInfo.roleList, 30); // 用户角色信息
                // lscache.set('photo', userInfo.photo, 30); // 用户头像
                lscache.set("sysCode",userInfo.communtiyCode,60); // 系统编号
                lscache.set("sysName",userInfo.communtiyName,60); // 系统名称
                // 判断用户是否为系统管理员或部门管理员
                // if (
                //     _.find(userInfo.roleList, (item) => {
                //         return item.type == 1    // 系统管理员角色是1
                //     })
                // ) {
                //     lscache.set('isSysRole', true);
                // } else if (
                //     _.find(userInfo.roleList, (item) => {
                //         return item.type == 3    // 部门管理员角色是3
                //     })
                // ) {
                //     lscache.set('isDeptRole', true);
                // } else if (
                //     _.find(userInfo.roleList, (item) => {
                //         return item.type == 0    // 普通角色是0
                //     })
                // ) {
                //     // 普通角色不允许登录系统
                //     commonOper.showModalAlert({
                //         message: "账号没有此系统的使用权限，请切换账号登录!",
                //         sureFunc: () => {
                //             // 设置用户重新登录
                //             userLogout();
                //         }
                //     })
                // };
            }

            params.successFunc && params.successFunc(userInfo);
        },
        errorFunc: (data) => {
            // 获取用户信息失败，返回到登录页面
            commonOper.showModalAlert({
                message: "用户登录已过期，请重新登录!",
                sureFunc: () => {
                    // 设置用户重新登录          
                    userLogout();
                }
            })
        }
    })
}

/**
 * 获取指定用户权限信息
 * @param userId 用户编号 
 * @param successFunc 成功回调函数
 */
// const getPermission = (params) => {
//     ajaxOper.ajaxHttp({
//         type: 'get',
//         url: baseURL + '/permission/permission/listByUserId?type=1&userId=' + params.userId,
//         successFunc: (data) => {
//             let rootMenu = _.find(data.data, ['parentPerId', 0]);

//             let pmsSystem = _.filter(data.data, item => {
//                 return item.parentPerId == rootMenu.id;
//             })

//             // 获取一级菜单
//             let pmsOne = _.filter(data.data, (item) => {
//                 return _.find(pmsSystem, ['id', item.parentPerId]);
//             })
//             // 获取二级菜单
//             let pmsTwo = _.filter(data.data, (item) => {
//                 return _.map(pmsOne, 'id').indexOf(item.parentPerId) >= 0;
//             })

//             const pmsInfo = _.union(pmsOne, pmsTwo);

//             // 存储用户权限
//             lscache.set('pmsOne', pmsOne);
//             lscache.set('pmsTwo', pmsTwo);
//             lscache.set('permissions', pmsInfo);

//             params.successFunc && params.successFunc(pmsInfo);
//         },
//         errorFunc: (data) => {
//             // 获取用户信息失败，返回到登录页面
//             userLogout();
//         }
//     })
// }

/**
 * 用户注销
 */
const userLogout = () => {
    // 清楚本地缓存设置
    lscache.flush();
    // 用户注销
    ajaxOper.ajaxHttp({
        type: "get",
        url: casUrl +
            "?service=" +
            window.location.origin +
            "/logout",
        successFunc: data => {
            window.location.href = window.location.origin;
        }
    });
}

const getDefaultMenu = () => {
    return menus;
}

/**
 * 判断用户本地用户Session是否过期
 * @param {*} params 
 */
const isLoginByNative = (params) => {
    let userid = lscache.get('userid');


}

/**
 * 判断当前用户是否登录
 * @param {*} params 
 */
const isLoginByRemote = (params) => {

}

export default {
    defaultMenus: menus,
    getDefaultMenu,
    isLoginByNative,
    getUserInfo,
    // getPermission,
    userLogout,
}