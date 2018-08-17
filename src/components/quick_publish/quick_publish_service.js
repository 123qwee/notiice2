import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js'

export default {
    /** 所有通知公告目录数据 */
    noticeListTreeQuery(successFunc) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/communtiy/buss/notice/catalog/findAll?communtiyCode=' + lscache.get("sysCode"),
            // url: '/notice/catalog/findAll?communtiyCode=620502007001',
            successFunc
        })
    },

    /** 获取部门列表 */
    orgListDataQuery(successFunc) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/permission/dept/listAll',
            successFunc
        })
    },

    /** 获取部门下的用户 */
    orgChildUserListQuery(id, successFunc) {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/permission/user/listByDeptId?deptId=' + id,
            successFunc
        })
    },

    /** 增加保存公告信息 */
    creatNoticeQuery(param, successFunc) {
        ajaxOper.ajaxHttp({
            type: 'post',
            data: param,
            url: '/notice/save',
            successFunc
        })
    },

    /** 发布公告 */
    noticePublishQuery(param, successFunc) {
        ajaxOper.ajaxHttp({
            type: 'post',
            data: param.userList,
            url: '/notice/publish?noticeId=' + param.noticeId,
            successFunc
        })
    },
}