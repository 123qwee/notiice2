// const moment = require('moment');
// moment.locale('zh-cn');

/**
 * 日期格式化【YYYY-MM-DD HH:ss:mm】
 * @param {*} value 
 */
// const formatDate = (value, type) => {
//   value = value ? moment(value) : moment();
//   type = type ? type : "YYYY-MM-DD HH:mm:ss";
//   return value.format(type);
// }

// /**
//  * 开始日期格式化
//  * @param {*} value 
//  */
// const formatSDate = (value) => {
//   value = value ? moment(value) : moment();
//   return value.startOf('day').format("YYYY-MM-DD HH:mm:ss");
// }

// /**
//  * 结束日期格式化
//  * @param {*} value 
//  */
// const formatEDate = (value) => {
//   value = value ? moment(value) : moment();
//   return value.endOf('day').format("YYYY-MM-DD HH:mm:ss");
// }

// /**
//  * 获取月初日期
//  * @param {*} value 
//  */
// const getMonthSDate = (value) => {
//   value = value ? moment(value) : moment();
//   return value.startOf('month').startOf('day').format("YYYY-MM-DD HH:mm:ss");
// }

// /**
//  * 获取周信息
//  * @param {*} value 
//  */
// const getWeek = (value) => {
//   value = value ? moment(value) : moment();
//   let week = value.format('d');

//   switch (week) {
//     case "0":
//       week = "周日";
//       break;
//     case "1":
//       week = "周一";
//       break;
//     case "2":
//       week = "周二";
//       break;
//     case "3":
//       week = "周三";
//       break;
//     case "4":
//       week = "周四";
//       break;
//     case "5":
//       week = "周五";
//       break;
//     case "6":
//       week = "周六";
//       break;
//   }

//   return week;
// }

/**
 * 根据附件路径判断附件类型是否为图片
 * @param {*} url 
 */
const isImageType = (url) => {
  if (url.indexOf("base64") > 0) {
    return true;
  } else {
    let suffix = _.last(url.split("."));
    return constants.MEDIA_TYPE_IMAGE.indexOf(suffix) >= 0;
  }
}

/**
 * 根据附件路径判断附件类型是否为视频
 * @param {*} url 
 */
const isVideoType = (url) => {
  let suffix = _.last(url.split("."));
  return constants.MEDIA_TYPE_VIDEO.indexOf(suffix) >= 0;
}

/**
 * 根据附件路径判断附件类型是否为音频
 * @param {*} url 文件路径
 */
const isAudioType = (url) => {
  let suffix = _.last(url.split("."));
  return constants.MEDIA_TYPE_AUDIO.indexOf(suffix) >= 0;
}

/**
 * 获取Dom元素的计算后样式
 * @param {*} el Dom元素
 */
const getCurrentStyle = (el) => {
  let style = null;

  // IE不支持getComputedStyle方法
  if (window.getComputedStyle) {
    style = window.getComputedStyle(el, null);
  } else {
    style = el.currentStyle;
  }

  return style;
}

/**
 * 获取Dom元素的计算后值样式，如height,width
 * @param {*} el 
 * @param {*} type 如height,width
 */
const getStyleValue = (el, type) => {
  return Number(getCurrentStyle(el)[type].split("px")[0]);
}

/**
 * 导出表格数据到Excel文件
 * @param parentElm 表格容器Dom
 * @param ignoreColumn 不导出的列索引数组
 * @param filename 导出文件名
 */
// const exportToExcel = (parentElm, ignoreColumn, filename) => {
//   let $head = $(parentElm).find(".el-table__header");
//   let $table = $(parentElm).find(".el-table__body");

//   if (filename == undefined) {
//     filename = "导出文件";
//   }

//   require.ensure([], () => {
//     const {
//       export_json_to_excel
//     } = require("excel/Export2Excel");

//     const tHeader = [],
//       data = [];

//     // 获取表头
//     $head.find(".cell").map((index, el) => {
//       if (ignoreColumn == undefined || ignoreColumn.indexOf(index) < 0) {
//         tHeader.push(el.innerText.trim());
//       }
//     })

//     // 获取表格内容
//     $table.find(".el-table__row").map((index, row) => {
//       let rowData = [];

//       $(row).find(".cell").map((index, el) => {
//         if (ignoreColumn == undefined || ignoreColumn.indexOf(index) < 0) {
//           rowData.push(el.innerText.trim());
//         }
//       })

//       data.push(rowData);
//     })

//     export_json_to_excel(tHeader, data, filename);
//   });
// }

// /**
//  * 导出列表数据到Excel文件
//  * @param {*} tHeader 表头数据
//  * @param {*} tData  列表数据
//  */
// const exportDataToExcel = (tHeader, tData) => {
//   let filename = "导出文件";

//   require.ensure([], () => {
//     const {
//       export_json_to_excel
//     } = require("excel/Export2Excel");

//     export_json_to_excel(tHeader, tData, filename);
//   });
// }

// 处理显示数据的空值
const handleNullValue = (data) => {
  for (let key in data) {
    if (data[key] == undefined || data[key] == null || data[key] == "") {
      data[key] = "--";
    }
  }
  return data;
}

// 处理数组数据的空值
const handleArrayNullValue = (data) => {
  _.map(data, function (item) {
    _.map(item, function (items, key) {
      if (items == undefined || items == null || items === "") {
        item[key] = "--";
      } else if (_.isObject(items)) {
        _.map(items, (subitem, k) => {
          if (subitem == undefined || subitem == null || subitem === "") {
            items[k] = "--";
          }
        })
      }
    });
  });
  return data;
}

// 判断用户是否为管理员
const isAdmin = () => {
  let roles = lscache.get('roles');

  return undefined != _.find(roles, ['name', 'admin']);
}

// 判断用户是否防疫管理员
const isManager = () => {
  let roles = lscache.get('roles');

  return _.filter(roles, item => {
    return item.name == 'epiManager' || item.name == 'admin';
  }).length > 0;
}

// 判断用户是否是防疫站长
const isWorker = () => {
  let roles = lscache.get('roles');

  return undefined != _.find(roles, ['name', 'epiWorker']);
}

// 将84坐标转换为百度坐标
const convertWGSToBaidu = (args) => {
  $.ajax({
    url: "http://api.map.baidu.com/geoconv/v1/",
    async: false,
    data: {
      ak: "rOvp5tcWndbjcsODojjMxNZ3",
      from: 1,
      to: 5,
      coords: args.lon + "," + args.lat
    },
    dataType: "jsonp",
    success: function (data) {
      if (data.status == 0) {
        args.successFunc && args.successFunc(data.result);
      }

    }
  })
}

// 根据行政区域获取坐标中心点
const getLonLatByAddress = args => {
  $.ajax({
    url: "http://api.map.baidu.com/geocoder/v2/",
    async: false,
    data: {
      ak: "rOvp5tcWndbjcsODojjMxNZ3",
      output: "json",
      address: args.address
    },
    dataType: "jsonp",
    success: function (data) {
      if (data.status == 0) {
        args.successFunc && args.successFunc(data.result.location);
      }
    }
  })
}

/** 过滤数据 */
const createFilter = (queryString, toLowerCase, name) => {
  if (name) {
    if (toLowerCase) {
      return (item) => {
        return (item.name.indexOf(queryString.toLowerCase()) >= 0);
      };
    } else {
      return (item) => {
        return (item.name.indexOf(queryString) >= 0);
      };
    }
  } else {
    if (toLowerCase) {
      return (item) => {
        return (item.value.indexOf(queryString.toLowerCase()) >= 0);
      };
    } else {
      return (item) => {
        return (item.value.indexOf(queryString) >= 0);
      };
    }
  }

}

/** 根据传入字段进行中文数值排序 */
const sortByFieldNumber = (items, field) => {
  return _.sortBy(items, function (item) {
    if (item[field]) {
      switch (item[field].length == 3 ? item[field].substring(0, 2) : item[field].substring(0, 1)) {
        case "一":
          return 1;
        case "二":
          return 2;
        case "三":
          return 3;
        case "四":
          return 4;
        case "五":
          return 5;
        case "六":
          return 6;
        case "七":
          return 7;
        case "八":
          return 8;
        case "九":
          return 9;
        case "十":
          return 10;
        case "十一":
          return 11;
        case "十二":
          return 12;
        case "十三":
          return 13;
        case "十四":
          return 14;
        case "十五":
          return 15;
        default:
          return 100;
      }
    }
  })
}

/** 身份证号验证 */
const isIdCardNo = (idCard) => {
  //15位和18位身份证号码的正则表达式
  var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
  //如果通过该验证，说明身份证格式正确，但准确性还需计算
  if (regIdCard.test(idCard)) {
    if (idCard.length == 18) {
      var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
      var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
      var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
      for (var i = 0; i < 17; i++) {
        idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
      }
      var idCardMod = idCardWiSum % 11; //计算出校验码所在数组的位置
      var idCardLast = idCard.substring(17); //得到最后一位身份证号码

      //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
      if (idCardMod == 2) {
        if (idCardLast == "X" || idCardLast == "x") {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          // alert("身份证号码错误！");
          return false;
        }
      } else {
        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
        if (idCardLast == idCardY[idCardMod]) {
          //alert("恭喜通过验证啦！");
          return true;
        } else {
          //alert("身份证号码错误！");
          return false;
        }
      }
    }
  } else {
    //alert("身份证格式不正确!");
    return false;
  }
}

// 化简数据，方便阅读
const formatData = (data) => {
  // 小于1万
  if (data < 10000) {
    return data;
    // 大于等于1万小于1千万
  } else if (data < 10000000) {
    return data / 10000 + "万";
    // 大于等于1千万小于1亿
  } else if (data < 100000000) {
    return data / 10000000 + "千万";
    // 大于等于1亿
  } else {
    return data / 100000000 + "亿";
  }
}

export default {
  // formatDate,
  // formatSDate,
  // formatEDate,
  // getMonthSDate,
  // getWeek,
  isImageType,
  isVideoType,
  isAudioType,
  getCurrentStyle,
  getStyleValue,
  // exportToExcel,
  // exportDataToExcel,
  handleNullValue,
  handleArrayNullValue,
  isAdmin,
  isManager,
  isWorker,
  convertWGSToBaidu,
  getLonLatByAddress,
  createFilter,
  sortByFieldNumber,
  isIdCardNo,
  formatData
}
