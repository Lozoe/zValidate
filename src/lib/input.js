var validFn = {
    /***
     * 值:
     * true 无错误 
     * false 错误
     */
    IDCard : function( idNumber ) {
        idNumber = idNumber && (idNumber+"").toUpperCase();
        idNumber = idNumber.replace(/\s/g, ""); //统一去除空格

        //身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
        if (!(/(^\d{15}$)|(^\d{17}(\d|X)$)/.test(idNumber))) {
            return false;
        }

        //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        //下面分别分析出生日期和校验位
        var len, reg, arrSplit, dtmBirth, bGoodDay;
        len = idNumber.length;
        if (len == 15) {
            reg = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
            arrSplit = idNumber.match(reg);
            //检查生日日期是否正确
            dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
            bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));

            if (!bGoodDay) {
                return false;
            } else {
                return true;
            }
        }
        if (len == 18) {
            reg = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})(\d|X)$/);
            arrSplit = idNumber.match(reg);
            //检查生日日期是否正确
            dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
            bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) && ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
            if (!bGoodDay) {
                return false;
            } else {
                //检验18位身份证的校验码是否正确。
                //校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
                var valnum;
                var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
                var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
                var nTemp = 0, i;
                for(i = 0; i < 17; i ++) {
                    nTemp += idNumber.substr(i, 1) * arrInt[i];
                }
                valnum = arrCh[nTemp % 11];
                if (valnum != idNumber.substr(17, 1)) {
                    return false;
                }
                return true;
            }
        }
        return false;
    }
};
var patterns = {
    required: {
        key: "required",
        msg: "不能为空",
        validate: function(value, callback) {
            callback( value !== "" );
        }
    },
    username: {
        key: "username",
        msg: "姓名错误",
        validate: function(value, callback) {
            callback( /[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/.test( value ) );
        }
    },
    cvv: {
        key: "cvv",
        msg: "安全码有误",
        validate: function(value, callback) {
            callback( /^\d{3,4}$/.test(value) );
        }
    },
    idcard: {
        key: "idcard",
        msg: "",
        validate: function(value, callback) {
            callback( validFn.IDCard(value) );
        }
    },
    passport: {
        key: "passport",
        msg: "护照错误",
        validate: function(value, callback) {
            callback( /^1[45][0-9]{7}|G[0-9]{8}|P[0-9]{7}|S[0-9]{7,8}|D[0-9]+$/.test(value) );
        }
    },
    mobile: {
        key: "mobile",
        msg: "手机号码错误",
        validate: function(value, callback) {
            callback( value !== "" );
        }
    },
    email: {
        key: "email",
        msg: "邮箱错误",
        validate: function(value, callback) {
            callback( /^\w+\@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/i.test(value) );
        }
    },
    num: {
        key: "num",
        msg: "必须为数字",
        validate: function(value, callback) {
            callback( value !== "" );
        }
    },
    chinese: {
        key: "chinese",
        msg: "必须为汉字",
        validate: function(value, callback) {
            callback( value !== "" );
        }
    },
    numletter: {
        key: "numletter",
        msg: "需要输入数字或者字母",
        validate: function(value, callback) {
            callback( /[^\d|chun]/.test(value) );
        }
    },
    ajaxValid: {
        key: "ajaxValid",
        msg: "ajax验证错误",
        validate: function(value, callback) {
            var url = '';
            $.ajax({
                type: type,
                url: url,
                data: _data,
                dataType: 'json',
                timeout: 300,
                async: false,
                success: function (data) {
                    if(!data || data.status != '0') {
                        isValid = false;
                    }
                    callback( isValid, data );
                },
                error: function (xhr, type) {
                    console.log(arguments);
                }
            });
        }
    }
};
module.exports = patterns;