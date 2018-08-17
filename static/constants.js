// 生产环境还是开发环境 production development
const ENV = 'production';
// 后台服务地址
const HOST = ENV == 'development' ? 'http://192.168.0.106' : 'http://61.178.131.29';
const PORT = ENV == 'development' ? '8023' : '8023';

const SERVER_URL = HOST + ':' + PORT;

// 设置全局变量
window.constants = {
  ENV,
  // 后台服务地址
  SERVER_URL,
  // 天气缓存时间
  SaveTime: 180,
  chatUrl: "http://tianshui.grid-community.com/index.html#/",
  // 附件上传地址
  UPLOAD_URL: SERVER_URL + "/fastdfs/file/upload/nomark",

}
