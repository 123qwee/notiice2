import ajaxOper from '../../assets/scripts/ajax/ajaxOper.js'

const service = {
    // 获取上报列表
    getList: (args) => {
        let params = {
            offset: args.offset == undefined ? 0 : args.offset,
            limit: args.limit == undefined ? 10 : args.limit,
            sort: 'ctime',
            order: 'desc'
        };
        // 设置查询条件
        if (args.options != undefined) {
            params = _.defaults(params, args.options);
        }
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/manage/epidemic/list',
            data: params,
            successFunc: (data) => {
                if (data.code == 200) {
                    args.successFunc && args.successFunc({
                        total: data.data.total,
                        data: data.data.rows
                    });
                }
            }
        });
    },
    //上报人
    getReportName: (args) => {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/manage/user/list/-1',
            data: {
                offset: 0,
                limit: constants.LIMIT,
            },
            successFunc: (data) => {
                if (data.rows.length > 0) {
                    let userList = _.map(data.rows, item => {
                        return {
                            label: item.realname,
                            value: item.realname,
                        }
                    })
                    args.successFunc && args.successFunc({
                        data: userList
                    });
                }
            }
        });
    },
    // 详情
    getInfo: (args) => {
        ajaxOper.ajaxHttp({
            type: 'get',
            url: '/manage/epidemic/info/' + args.id,
            successFunc: (data) => {
                if (data.code == 200) {
                    let imgUrls = [],
                        videoUrls = [],
                        info = data.data;
                    if (info.attach) {
                        _.map(info.attach.split(","), attach => {
                            if (attach && (attach.split(".")[1] == 'jpg' || attach.split(".")[1] == 'png')) {
                                imgUrls.push(constants.SERVER_URL + '/cms/ued/fileext/decode/' + attach);
                            } else if (attach && attach.split(".")[1] == ('mp4')) {
                                videoUrls.push(constants.SERVER_URL + '/cms/ued/fileext/decode/' + attach);
                            }
                        });
                    }
                    info.imgUrls = imgUrls;
                    info.videoUrls = videoUrls;
                    args.successFunc && args.successFunc({
                        data: info
                    });
                }
            }
        });
    },
    delQuest: (args) => {
        ajaxOper.ajaxHttp({
            type: 'post',
            url: '/manage/epidemic/delete/' + args.id,
            data: {
                ids: args.id
            },
            successFunc: (data) => {
                if (data.code == 200) {
                    args.successFunc && args.successFunc({
                        data: data
                    });
                } else {
                    popupOper.showNotification({ message: "删除失败" });
                }
            },
            errorFunc: (data) => {
                popupOper.showNotification({ message: "删除失败" });
            }
        });
    }
};
export default _.defaults(service);