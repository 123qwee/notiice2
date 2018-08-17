import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js'

export default {

  /** 所有通知公告数据 */
  noticeListQuery(successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/notice/catalog/findAll?communtiyCode=' + lscache.get("sysCode"),
      // url: '/notice/catalog/findAll?communtiyCode=620502007001',
      successFunc
    })
  },

  /** 获取子公告目录 */
  childNoticeQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/notice/catalog/findFChildCatalog?catalogId=' + param.catalogId + '&page=' + param.page + '&pageSize=' + param.pageSize + "&orderBy=" + param.orderBy + "&order=" + param.order,
      successFunc
    })
  },

  /** 获取目录详情 */
  menuNoticeInfoQuery(id, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'get',
      url: '/communtiy/buss/notice/catalog/find?catalogId=' + id,
      successFunc
    })
  },

  /** 新增公告目录 */
  addNoticeQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      data: param,
      url: '/communtiy/buss/notice/catalog/save',
      successFunc
    })
  },

  /** 修改公告目录 */
  updateNoticeInfoQuery(param, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      data: param,
      url: '/communtiy/buss/notice/catalog/update',
      successFunc
    })
  },

  /** 删除公告目录 */
  deleteNoticeQuery(id, successFunc) {
    ajaxOper.ajaxHttp({
      type: 'post',
      url: '/communtiy/buss/notice/catalog/delete?catalogId=' + id,
      successFunc
    })
  }
}
