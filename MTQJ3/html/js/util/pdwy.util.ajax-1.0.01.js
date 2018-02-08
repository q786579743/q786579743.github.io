/*
   *  脚本文件描述：ajax扩展
   *  创建时间：2016-5-4
   *  作者： 李玲
   *  暂时包括
     getWebServiceData	实现跨域请求的ajax请求方法
     normalAjax         一般情况下使用的ajax请求方法
     formAjaxSubmit     from提交使用的ajax请求方法
   */


//判断空间是不是存在，不存在创建
if ($.pd == undefined) {
    $.extend({
        pd: {}
    });
}


$.extend($.pd, {
    ajaxDatatype: 'json',
    ajaxType: 'post',
    ajaxURL: '',
    ajaxData: {},
    ajaxJsonp: "callbackparam",
    /*
    * 实现跨域请求的ajax请求方法
    * @param url 请求路径 
    * @param data 参数设置
    * @param fn   当请求成功后的处理方法
    * @param type 提交方式
    */
    getWebServiceData: function (callBack, exchangeCallBack, errorCallBack) {

        var that = this;
        $.ajax({
            type: that.ajaxType,
            dataType: that.ajaxDatatype,
            contentType: "application/json",
            url: that.ajaxURL,
            data: that.ajaxData,
            jsonp: that.ajaxJsonp, //服务端用于接收callback调用的function名的参数
            success: function (result) {

                if (result != "" && result != null) {
                    try {
                        var result = result.replace(new RegExp("\n", "gm"), "<br />");
                        result = result.replace(new RegExp("\r", "gm"), "&nbsp;");
                        var parseJSONData = jQuery.parseJSON(result);
                        if (parseJSONData != null) {
                            var exchangeData = exchangeCallBack(parseJSONData);
                            callBack(exchangeData);
                        }
                    } catch (ex) {
                      console.log("error:存在异常！/r/n异常信息："+ex);
                    }
                }
            },
            error: function (x, e) {
                errorCallBack(x, e);
            }

        });
    },
    /*
     * 一般情况下使用的ajax请求方法
     * @param url 请求路径 
     * @param data 参数设置
     * @param fn   当请求成功后的处理方法
     * @param type 提交方式
     */
    normalAjax: function (url, data, fn, type) {
        var that = this;
        $.ajax({
            type: that.ajaxType,
            url: url,
            data: data,
            dataType: that.ajaxDatatype,
            success: function (result) {
                fn(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 403) {
                    //$.messager.alert("错误", "没有权限访问！", "error");
                    console.log("error:没有权限访问！");
                } else {
                    //$.messager.alert("错误", XMLHttpRequest.status, "error");
                    console.log("error:"+XMLHttpRequest.status+"！");
                }
            }
        });
    },

    /*
     * from提交使用的ajax请求方法
     * @param url 请求路径 
     * @param formId from的ID名称
     * @param fn   当请求成功后的处理方法
     * @param datatype 返回值类型
     */
    formAjaxSubmit: function (url, formId, fn, datatype) {
        var that = this;
        $.ajax({
            type: that.ajaxType,
            url: url,
            dataType: that.ajaxDatatype,
            data: that.serializeForm($('#' + formId)),
            beforeSend: function (XMLHttpRequest) {
                return $('#' + formId).form('validate');
            },
            success: function (result) {
                fn(result);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 403) {
                    //$.messager.alert("错误", "没有权限访问！", "error");
                    console.log("error:没有权限访问！");
                } else {
                    //$.messager.alert("错误", XMLHttpRequest.status, "error");
                    console.log("error:" + XMLHttpRequest.status + "！");
                }
            }
        });
    }
});