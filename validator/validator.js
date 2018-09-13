/**
 * author:xcllin
 * 
 * 适合移动端验证使用
 * 
 * 使用方式:
 * 引入模块 validatoe
 * var result = validator.validateAll(data,validateArr);ps：验证不通过返回不通过问题，通过返回null
 * 参数例子
 * data:{name:'张三',age:10 }
 * validateArr:
 * [
 * 	{name:'姓名',type:validator.string,isNull:false,maxlen:20,minLen:2}
 *  {age:'年龄',type:validator.number,isNull:true}
 * ]
 * }
 */
define(function() {

	var validator = {
		//type
		type: {
			string: 1, //字符串
			number: 2, //数字
			numberFloat: 3, //数字保留两位小数
			tel: 4, //电话号码(座机或手机)
			phone: 5, //手机
			idCard: 6, //身份证
			email: 7, //邮箱
			posCode: 8 //邮编
		},
		/**
		 * 
		 * @param {Object} data 表单提交数据
		 * @param {Object} validateArr 验证数组
		 * 验证数组标准格式：[{字段名(*)：'字段中文名',type(*):1,isNull(*):true/false,maxlen:最大长度,minLen:最小长度}]
		 * type:1字符串；2数字；3数字保留两位小数；4电话号码（手机和座机）；5手机；6身份证；7邮箱；8邮编；
		 * isNull:是否能为空true，false
		 * [
		 * {aa:'张三',type:1,isNull:true,maxlen:20},
		 * {bb:'李四',type:3},
		 * {cc:'王五',type:1},
		 * ]
		 */
		validateAll: function(data, validateArr) {
			if(validateArr) {
				for(var index in validateArr) {
					var validate = validateArr[index];
					switch(validate.type) {
						case validator.type.string:
							var result = validator.validateString(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.number:
							var result = validator.validateNum(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.numberFloat:
							var result = validator.validateFloat(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.tel:
							var result = validator.validateTel(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.phone:
							var result = validator.validatePhone(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.idCard:
							var result = validator.validateIdCard(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.email:
							var result = validator.validateEmail(data, validate);
							if(result) {
								return result;
							}
							break;
						case validator.type.posCode:
							var result = validator.validatePosCode(data, validate);
							if(result) {
								return result;
							}
							break;
						default:
							break;
					}
				}
			}
		},
		/**
		 * 验证字符串
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validateString: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			if(validate.isNull) {
				if(propValue) {
					if(validate.maxLen && propValue.length > validate.maxLen) {
						return propName + '字数不能超过' + validate.maxLen;
					}
					if(validate.minLen && propValue.length < validate.minLen) {
						return propName + '字数不能少于' + validate.minLen;
					}
				}
			} else {
				if(propValue) {
					if(validate.maxLen && propValue.length > validate.maxLen) {
						return propName + '字数不能超过' + validate.maxLen;
					}
					if(validate.minLen && propValue.length < validate.minLen) {
						return propName + '字数不能少于' + validate.minLen;
					}
				} else {
					return propName + '不能为空';
				}
			}
		},
		/**
		 * 验证数字
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validateNum: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			//数字默认长度最小1位，最大13位
			var dmin = 1;
			var dmax = 13;

			if(validate.minLen) {
				dmin = validate.minLen
			};
			if(validate.maxLen) {
				dmax = validate.maxLen;
			};
			var _ret = new RegExp('^[0-9]{' + dmin + ',' + dmax + '}$');
			if(propValue === 0) {
				return;
			} else {
				if(validate.isNull) {
					if(propValue && !_ret.test(propValue)) {
						return propName + '值无效，请输入' + dmin + '-' + dmax + '位数字';
					}
				} else {
					if(propValue) {
						if(!_ret.test(propValue)) {
							return propName + '值无效，请输入' + dmin + '-' + dmax + '位数字';
						}
					} else {
						return propName + '不能为空'
					}

				}
			}

		},
		/**
		 * 验证数字两位小数
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validateFloat: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			//数字最大12位，加上点和两位小数最大15位
			var _ret = new RegExp('^(?=([0-9]{1,12}$|[0-9]{1,12}\.))(0|[1-9][0-9]*)(\.[0-9]{1,2})?$');
			if(propValue === 0) {
				return;
			} else {
				if(validate.isNull) {
					if(propValue && !_ret.test(propValue)) {
						return propName + '值无效，请输入有效数值（最多保留两位小数）';
					}

				} else {
					if(propValue) {
						if(!_ret.test(propValue)) {
							return propName + '值无效，请输入有效数值（最多保留两位小数）';
						}
					} else {
						return propName + '不能为空'
					}

				}
			}
		},
		/**
		 * 验证电话号码
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validateTel: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			//16号段万一开放了呢
			var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			var tel = /^(\d{3,4}-?)?\d{7,9}$/;
			if(validate.isNull) {
				if(propValue) {
					if(mobile.test(propValue) || tel.test(propValue) || propValue.length == 11) {} else {
						return propName + '值无效，请输入正确的电话号码';
					}
				}

			} else {
				if(propValue) {
					if(mobile.test(propValue) || tel.test(propValue) || propValue.length == 11) {} else {
						return propName + '值无效，请输入正确的电话号码';
					}
				} else {
					return propName + '不能为空';
				}
			}
		},
		/**
		 * 验证手机号
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validatePhone: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			//16号段万一开放了呢
			var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
			if(validate.isNull) {
				if(propValue) {
					if(mobile.test(propValue) || propValue.length == 11) {} else {
						return propName + '值无效，请输入正确的电话号码';
					}
				}

			} else {
				if(propValue) {
					if(mobile.test(propValue) || propValue.length == 11) {} else {
						return propName + '值无效，请输入正确的电话号码';
					}
				} else {
					return propName + '不能为空';
				}

			}
		},
		validateIdCard: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			if(validate.isNull) {
				if(propValue && !validator.cardTool(propValue)) {
					return propName + '不是有效身份证号码，请重新输入'
				}

			} else {
				if(propValue) {
					if(!validator.cardTool(propValue)) {
						return propName + '不是有效身份证号码，请重新输入'
					}
				} else {
					return propName + '不能为空'
				}

			}

		},
		cardTool: function(code) {
			var city = {
				11: "北京",
				12: "天津",
				13: "河北",
				14: "山西",
				15: "内蒙古",
				21: "辽宁",
				22: "吉林",
				23: "黑龙江 ",
				31: "上海",
				32: "江苏",
				33: "浙江",
				34: "安徽",
				35: "福建",
				36: "江西",
				37: "山东",
				41: "河南",
				42: "湖北 ",
				43: "湖南",
				44: "广东",
				45: "广西",
				46: "海南",
				50: "重庆",
				51: "四川",
				52: "贵州",
				53: "云南",
				54: "西藏 ",
				61: "陕西",
				62: "甘肃",
				63: "青海",
				64: "宁夏",
				65: "新疆",
				71: "台湾",
				81: "香港",
				82: "澳门",
				91: "国外 "
			};
			var pass = true;
			if(!code ||
				!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
				.test(code)) {
				pass = false;
			} else if(!city[code.substr(0, 2)]) {
				pass = false;
			} else {
				// 18位身份证需要验证最后一位校验位
				if(code.length == 18) {
					code = code.split('');
					// 加权因子
					var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
					// 校验位
					var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
					var sum = 0,
						ai = 0,
						wi = 0;
					for(var i = 0; i < 17; i++) {
						ai = code[i];
						wi = factor[i];
						sum += ai * wi;
					}
					var last = parity[sum % 11];
					if(parity[sum % 11] != code[17]) {
						pass = false;
					}
				}
			}
			return pass;
		},
		/**
		 * 验证邮箱
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validateEmail: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			var _ret = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
			if(validate.isNull) {
				if(propValue && !_ret.test(propValue)) {
					return propName + '值无效，请输入正确的邮箱';
				}

			} else {
				if(propValue) {
					if(!_ret.test(propValue)) {
						return propName + '值无效，请输入正确的邮箱';
					}
				} else {
					return propName + '不能为空';
				}

			}
		},
		/**
		 * 验证邮编
		 * @param {Object} data 要提交的值
		 * @param {Object} validate 验证的参数
		 */
		validatePosCode: function(data, validate) {
			var keys = Object.keys(validate);
			var prop = keys[0];
			var propName = eval('validate.' + prop)
			var propValue = eval('data.' + prop);
			var _ret = /^[1-9][0-9]{5}$/;
			if(validate.isNull) {
				if(propValue && !_ret.test(propValue)) {
					return propName + '值无效，请输入正确的邮政编码';
				}

			} else {
				if(propValue) {
					if(!_ret.test(propValue)) {
						return propName + '值无效，请输入正确的邮政编码';
					}
				} else {
					return propName + '不能为空';
				}

			}
		},
	}
	return validator;

});