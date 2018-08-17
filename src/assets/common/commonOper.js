/**
 * 系统通用组件
 */
export default {
    /** 显示加载等待页面 */
    showLoading: (text) => {
        text = text == undefined ? "加载中，请稍候..." : text;
        window.mainLoading = window.rootVm.$loading({
            fullscreen: true,
            text: text
        });
    },
    /** 关闭加载等待页面 */
    closeLoading: () => {
        setTimeout(function () {
            window.mainLoading && window.mainLoading.close();
        }, 200);
    },

    /**
     * 显示模态提示对话框
     * @param title 标题
     * @param message 通知信息
     * @param type 通知类型
     * @param sureFunc 确认回调函数
     */
    showModalAlert: (params) => {
        window.rootVm.$alert(params.message, params.title || '提示', {
            type: params.type || 'info',
            closeOnClickModal: true,
            showConfirmButton: true
        }).then(function () {
            params.sureFunc && params.sureFunc.call();
        });
    }
}
