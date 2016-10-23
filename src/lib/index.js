require("./zepto.js");
require("./form.js");

;(function(){
    //对form表单进行验证
    $("#send").on('click', function() {
        var zvalidator = $(".my-form").ValidateForm();
        zvalidator.validateAll(function(isValid, result) {
            if( isValid ) {
                alert('验证通过.');
                $(".my-form").submit();
            } else {
                var errMsgs = ["表单整体验证"];
                for(var i = 0; i < result.length; i++){
                    errMsgs = errMsgs.concat( result[i].getErrMsg());
                }
                errMsgs = errMsgs.join('\n');
                alert(errMsgs);
                return;
            }
        });
        zvalidator.validateItem(document.querySelector("#cvv"), function(isValid, result) {
            if( isValid ) {
                alert('验证通过.');
            } else {
                var errMsgs = ["表单单项验证"];
                errMsgs = errMsgs.concat(result.getErrMsg());
                errMsgs = errMsgs.join('\n');
                alert(errMsgs);
            }
        });

    });

})();