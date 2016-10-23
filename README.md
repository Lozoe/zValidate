# z-validate-form.js
## z-validate-form.js是什么?
一个基于zepto.js移动端表单验证插件，可以完成基本表单验证以及异步请求验证功能，并且功能可支持扩展。

## 有哪些功能？

* `基本验证`功能
    *  非空验证、数字验证、数字和字母的组合、中文验证、长度验证
    *  身份证号码合法性校验、安全码格式验证、中国护照格式验证、手机号码验证、邮箱地址验证
* 支持`异步请求验证`功能
* 支持可扩展的`特殊功能验证`功能
* 支持form表单`整体`验证以及input`单个`验证

## HTML模板配置
```html
<form class="my-form" method="post" action="">
    <div class="int">
        <label for="username">姓名:</label>
        <input type="text" id="username" check="required username" class="required" />
    </div>
    <div class="int">
        <label for="phone">cvv:</label>
        <input type="text" id="cvv" check="required cvv" class="noRequired" />
    </div>
    <div class="int">
        <label for="phone">身份证:</label>
        <input type="text" id="idCard" check="required idCard" class="noRequired" />
    </div>
    <div class="int">
        <label for="phone">电话:</label>
        <input type="text" id="phone" check="phone" class="noRequired" />
    </div>
    <div class="int">
        <label for="email">邮箱:</label>
        <input type="text" id="email" check="required email" class="required" />
    </div>
    <div class="sub">
        <input type="button" value="提交" id="send" />
        <input type="button" value="重置" id="res" />
    </div>
</form>
```
## form整体验证

```javascript
//定义验证参数对象
var validateParams = {
    //回调函数，当前表单验证通过以及不通过都会调用，不传则调用默认回调
    callback: function (validKey, isValid, $elem, msg) {
        /*
        validKey: 验证的key
        isValid:当前验证是否通过，true：通过；false：不通过；
        $elem:当前被验证的表单元素，zepto对象；
        msg：验证未通过时的错误提示
        */
        // 校验回调默认操作
        if(isValid) {
            console.log(validKey+"success!");
        } else {
            alert(msg);
            if(validKey == "required") {
                alert(msg);
                return;
            }
        }
};
//对form表单进行验证，调用组件，组件返回的值为验证是否通过的标志
var validFalg = $("form").ValidateForm(validateParams);
/*
validFalg:false,验证未通过，无需处理，return false；拦表单提交即可
validFalg:true,form验证通过，可进行表单提交了
*/
```

## 自定义表单验证规则、自定义回调
### HTML模板配置
```html
<form class="my-form" method="post" action="">
    <div class="int">
        <label for="username">姓名:</label>
        <input type="text" id="username" check="required username" class="required" />
    </div>
    <div class="int">
        <label for="selfDefine">自定义:</label>
        <input type="text" id="selfDefine" check="required selfDefine" class="required" />
    </div>
    <div class="int">
        <label for="selfDefine1">自定义1:</label>
        <input type="text" id="selfDefine1" check="required selfDefine1" class="required" />
    </div>
    <div class="int">
        <label for="selfDefine2">自定义2:</label>
        <input type="text" id="selfDefine2" check="required selfDefine2" class="required" />
    </div>
    <div class="sub">
        <input type="button" value="提交" id="send" />
        <input type="button" value="重置" id="res" />
    </div>
</form>
```
### 调用
```javascript
//定义自定义验证参数对象
var validateParams = {
    reg_username:/^[1-9]*$/,//姓名验证
    tips_username: "姓名都错了",
    reg_selfDefine: /^[a-z]$/,
    tips_selfDefine: "自定义校验不通过",
    reg_selfDefine1: /^[a-z]{2}$/,
    tips_selfDefine1: "自定义1校验不通过",
    reg_selfDefine2: /^[a-z]{3}$/,
    tips_selfDefine2: "自定义2校验不通过",
    //回调函数，当前表单验证通过以及不通过都会调用，不传则调用默认回调
    callback: function (validKey, isValid, $elem, msg) {
        /*
        validKey: 验证的key
        isValid:当前验证是否通过，true：通过；false：不通过；
        $elem:当前被验证的表单元素，zepto对象；
        msg：验证未通过时的错误提示
        */
        // 校验回调默认操作
        if(isValid) {
            console.log(validKey+"success!");
        } else {
            alert(msg);
            if(validKey == "required") {
                alert(msg);
                return;
            }
        }
    }
};
//对form表单进行验证，调用组件，组件返回的值为验证是否通过的标志
var validFalg = $("form").ValidateForm(validateParams);
/*
validFalg:false,验证未通过，无需处理，return false；拦表单提交即可
validFalg:true,form验证通过，可进行表单提交了
*/
```

## form单项验证

```javascript
$ele.ValidateForm(validateParams);

```

## ajax异步请求验证

ajaxValid：必填参数，check属性值加ajaxValid

ajaxurl:必填参数，异步请求的后台验证接口

ajaxtype:可选参数，值为post/get,默认值为post

```html
<div>
    <input id="username" type="text" check="required username ajaxvalid" ajaxUrl="http://www.xxx.com" ajaxType="post"/>
</div>
```

```javascript
$("form").ValidateForm(validateParams);
```