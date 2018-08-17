/**
 * @desc 当前文件存储表单验证相关方法
 * @author Originaljoy
 */

/**
 * 必填验证规则
 * @param {string} message
 * @param {string} type
 * @param {string} trigger
 */
const valiRequired = (message, trigger, type) => {
  return {
    required: true,
    message: message,
    trigger: trigger ? trigger : 'blur',
    type: type ? type : 'string'
  }
}

/**
 * 字符串最大长度验证规则
 * @param {double} max 最大长度
 */
const valiMaxLength = (max, trigger) => {
  return {
    max: max,
    validator: vLength,
    trigger: trigger ? trigger : 'blur'
  }
}

/**
 * 字符串长度验证 Validator
 * 说明：由于Js原生字符串长度判断将中文也当一个字符处理，
 *      而数据库中一个中文字符占两个字节；
 *      因此这里需要重新长度验证器。
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 */
const vLength = (rule, value, callback) => {
  if (value == undefined) {
    callback();
    return;
  }

  if (rule.max && !rule.min) {
    if (uLength(value) > rule.max) {
      callback(new Error('长度不能大于' + rule.max + ' 位字符!'));
    } else {
      callback();
    }
  } else if (!rule.max && rule.min) {
    if (uLength(value) < rule.min) {
      callback(new Error('长度不能小于' + rule.min + ' 位字符!'));
    } else {
      callback();
    }
  } else if (rule.max && rule.min) {
    if (uLength(value) < rule.min && uLength(value) > rule.max) {
      callback(new Error('长度应为' + rule.min + '到' + rule.max + ' 位字符!'));
    } else {
      callback();
    }
  }
}

/**
 * 整数验证规则
 * @param {double} max 最大长度
 */
const valiInteger = (trigger) => {
  return {
    validator: vInteger,
    trigger: trigger ? trigger : 'blur'
  }
}

/**
 * 整数验证 Validator
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
const vInteger = (rule, value, callback) => {
  if (!value) {
    return new Error('必填信息')
  } else {
    if (!Number.isInteger(value)) {
      callback(new Error('请输入整数值！'))
    } else {
      callback()
    }
  }
}

/**
 * 移动电话号码验证规则
 * @param {*} max 
 * @param {*} trigger 
 */
const valiTellPhone = (max, trigger) => {
  return {
    validator: vTellPhone,
    trigger: trigger ? trigger : 'blur'
  }
}

/**
 * 移动电话号码验证 Validator
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
const vTellPhone = (rule, value, callback) => {
  if (!value) {
    callback(new Error('电话号码输入不正确！'));
    return;
  };
  const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!reg.test(value)) {
    return callback(new Error('电话号码输入不正确！'));
  } else {
    callback();
  }
};

/**
 * 中文字符串长度计算
 * @param {any} text
 */
const uLength = (text) => {
  var len = 0;
  for (var i = 0; i < text.length; i++) {
    var code = text.charCodeAt(i);
    //单字节加1
    if ((code >= 0x0001 && code <= 0x007e) || (0xff60 <= code && code <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  return len;
}

// 日期选择控件快捷按钮设置
const shortcutDateOptions = {
  shortcuts: [{
    text: '今天',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      // start.setTime(start.getTime() - 3600 * 1000 * 24);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一周',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近一个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      picker.$emit('pick', [start, end]);
    }
  }, {
    text: '最近三个月',
    onClick(picker) {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      picker.$emit('pick', [start, end]);
    }
  }]
};

export default {
  valiRequired,
  valiMaxLength,
  valiInteger,
  valiTellPhone,
  shortcutDateOptions
}
