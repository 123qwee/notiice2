import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js'

export default {

  /** 所有通知公告目录数据 */
  noticeListTreeQuery(successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/notice/catalog/findAll?communtiyCode=' + lscache.get("sysCode"),
      successFunc
    })
  },

  /** 目录下的所有通知公告列表 */
  noticeListConentQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/notice/findByCatalogId?page=' + param.page + '&pageSize=' + param.pageSize + '&catalogId=' + param.catalogId + "&orderBy=" + param.orderBy + "&order=" + param.order,
      successFunc
    })
  },

  /** 增加保存公告信息 */
  creatNoticeQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      data: param,
      url: '/communtiy/buss/notice/save',
      successFunc
    })
  },

  /** 修改通知公告信息 */
  updateNoticeQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      data: param,
      url: '/communtiy/buss/notice/update',
      successFunc
    })
  },

  /** 获取部门列表 */
  orgListDataQuery(successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/permission/dept/listAll',
      successFunc
    })
  },

  /** 获取部门下的用户 */
  orgChildUserListQuery(id, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/permission/user/listByDeptId?deptId=' + id,
      successFunc
    })
  },

  /** 根据公告id获取公告内容 */
  noticeContentQuery(id, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/notice/findById?noticeId=' + id,
      successFunc
    })
  },

  /** 删除公告信息 */
  deleteNoticeQuery(id, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      url: '/communtiy/buss/notice/delete?noticeId=' + id,
      successFunc
    })
  },

  /** 发布公告 */
  noticePublishQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      data: param.userList,
      url: '/communtiy/buss/notice/publish?noticeId=' + param.noticeId,
      successFunc
    })
  },

  /** 删除图片 */
  deletePhotoQuery(ids, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      url: '/communtiy/buss/fastdfs/file/delete?ids=' + ids,
      successFunc
    })
  }

}
