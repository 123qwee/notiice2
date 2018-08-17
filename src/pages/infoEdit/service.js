import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js'

export default {

    /** 查询基本信息 */
    noticeListQuery(params) {
        ajaxOper.ajaxHttp({
            type: 'get',
            data: params.data,
            url: '/communtiy/basic/data/info/findByCode',
            // url: '/notice/catalog/findAll?communtiyCode=620502007001',
            params.successFunc
        })
    },
}
