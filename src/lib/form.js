var patterns = require("./input.js");
(function ($) {
    // 将必要信息绑定到某个字段
    function FieldChecker( element ) {
        this.element = element;
        this.$element = $(element);
        this.$form = this.$element.closest('form');
        this.rules = _getFieldRules(element);
        this.getMsg = function() {
            var msgs = [];
            this.rules.forEach(function(item, index) {
                msgs.push(item.msg);
            });
            return msgs;
        };
        this.getErrMsg = function() {
            var errMsgs = [];
            this.iErrors && this.iErrors.forEach(function(item, index) {
                errMsgs.push(item.msg);
            });
            return errMsgs;
        };
    }
    
    //初始化验证规则
    var rules = patterns;
    //验证整个表单入口
    $.fn.ValidateForm = function () {
        return new validateForm(this);
    };

    var validateForm = function (elem) {
        this.elem = elem;
    };

    validateForm.prototype = {
        formCallBack: function(isValid, result) {
            if( isValid ) {
                alert('验证通过.');
            } else {
                var errMsgs = [];
                for(var i = 0; i < result.length; i++){
                    errMsgs = errMsgs.concat( result[i].getErrMsg());
                }
                errMsgs = errMsgs.join('\n');
                alert(errMsgs);
            }
        },
        itemCallback: function(isValid, result) {
            if( isValid ) {
                alert('验证通过.');
            } else {
                var errMsgs = result.getErrMsg();
                errMsgs = errMsgs.join('\n');
                alert(errMsgs);
            }
        },
        validateAll: function(callback) {
            var cb = callback || this.formCallBack;
            var $element = this.getElement(this.elem);
            var isValid = true;
            var _this = this;
            var len = fields.length;
            var fields = this._getAllFieldValidator();
            // 当没有任何可以验证的字段时直接返回，验证结果为通过
            if( !len ) {
                return callback( true , [] );
            }
            var fErrors = [];
            
            fields.forEach(function(item, index) {
                _this.checkInput(item,callback);
            });
            function callback(iErrs) {
                fieldChecker.iErrors = iErrs;
                var result = iErrs.length == 0 ;
                if(index == len-1) {
                    cb && cb(result, fields);
                }
            }
        },
        validateItem: function(ele, callback) {
            var cb = callback || this.itemCallBack;
            var $ele = $(ele);
            var fieldChecker = _getFieldValidator(ele);
            iErrs = this.checkInput(fieldChecker);
            var isValid = iErrs.length === 0 ;
            cb && cb(isValid, fieldChecker);
        },
        //通过表单元素获取表单域
        getElement: function (el) {
            var tagName = $(el).prop("tagName");
            if ($.inArray(tagName, ["INPUT", "TEXTAREA"]) > -1) {
                return el;
            }
            return $(el).find("input,textarea");
        },
        _getAllFieldValidator: function() {
            var self = this;
            var $element = self.getElement(this.elem);
            var fields = [];
            $element.each(function (index, item) {
                var $this = $(this);
                if(!$this.attr("check")) return;
                var field = _getFieldValidator(item);
                fields.push(field);
            });
            //FieldChecker
            return fields;
        },
        //对单个input校验，获取有错误的input的规则集合
        checkInput: function(fieldChecker,callback) {
            var iErrors = [];
            var rules = fieldChecker.rules || {};
            var _val = fieldChecker.$element.val();
            var len = rules.length;
            for(var key in rules) {
                var rule = rules[key];
                rule.validate(_val, function(isValid) {
                    if(!isValid) {
                        iErrors.push(rule);
                    }
                    len--;
                });
                if(len == 0) {
                    callback(iErrors);
                }
            }
            // fieldChecker.iErrors = iErrors;
            return iErrors;
        }
    };

    //获取单个元素的验证规则，传入需要验证的表单验证元素项
    function _getFieldRules(ele) {
        var _validate = $(ele).attr("check") && $(ele).attr("check");
        // var result = {};
        var result = [];
        if (_validate) {
            var arr = _validate.split(' ');
            for (var i = 0; i < arr.length; i++) {
                var key = arr[i];
                // result[key] = rules[key];
                result.push(rules[key] || {});
                //TODO 考虑验证项不存在的情况
            }
        }
        return result;
    }
    //单个元素的validator,可能包含多个验证规则
    function _getFieldValidator(ele) {
        var fieldValidator = new FieldChecker(ele);
        return fieldValidator;
    }
    //增加规则,opts参数项为 key,msg,validate,通过formvalidator对外暴露接口
    function addRule(opts) {
        if(!opts) throw "error add rule - no opts";
        if(!opts.key) throw "error add rule - no key";
        if(!opts.message) throw "error add rule - no message";
        if(!opts.validate) throw "error add rule - no validate";
        rules[opts.key] = $.extend(opts);
    }

    //单项input入口
    $.extend({
        ValidateForm: {
            addRule: addRule,
            rules: rules,
            getFieldValidator: function(ele, callback) {
                var checker = _getFieldValidator(ele);
                callback(checker);
                return checker;
            }
        }
    },{});

})(Zepto);