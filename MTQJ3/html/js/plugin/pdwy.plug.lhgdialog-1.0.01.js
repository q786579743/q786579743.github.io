
/*
   *  脚本文件描述：基于lhgdialog弹出层扩展的一些方法
   *  创建时间：2016-5-4
   *  作者： 李玲
   */



//lhgdialog弹出层加载响应脚本，并设置弹出层使用的样式


//判断空间是不是存在，不存在创建
if ($.pd == undefined) {
    $.extend({
        pd: {}
    });
}

$.extend($.pd, {

    /*
    *  提示信息
    *  @param target
    *  @param tip 信息描述
    *  @param result 结果（0：成功，1：错误或失败，2：弹出）
    *  @param fn 函数 弹出层结束后执行的函数
    * return target.$.dialog.tips(tip, 4, icon, fn).zindex();
    */
    sendTargetTips: function (target, tip, result, fn) {
        var icon = "success.gif";
        switch (result) {
            case 0:
                icon = "success.gif";
                break;
            case 1:
                icon = "error.gif";
                break;
            case 2:
                icon = "alert.gif";
                break;
            default:
                icon = "success.gif";
                break;
        }
        return target.$.dialog.tips(tip, 4, icon, fn).zindex();
    },
    /*
   *  提示信息
   *  @param tip 信息描述
   *  @param result 结果（0：成功，1：错误或失败，2：弹出）
   *  @param fn 函数 弹出层结束后执行的函数
   *  @param time 等待多少秒关闭提示
   * return $.dialog.tips(tip, time, icon, fn).zindex();
   */
    sendTips: function (tip, result, fn, time) {
        var icon = "success.gif";
        switch (result) {
            case 0:
                icon = "success.gif";
                break;
            case 1:
                icon = "error.gif";
                break;
            case 2:
                icon = "alert.gif";
                break;
            default:
                icon = "success.gif";
                break;
        }
        tip = tip || "信息提示";
        result = result || "结果信息";
        fn = fn || function () { };
        time = time || 4;
        $.dialog.tips(tip, time, icon, fn).zindex();
    },
    /*
      *  弹出信息
      *  @param msg 信息描述
      *  @param state 结果（true：成功，false：错误或失败）
      *  @param fn 函数 弹出层结束后执行的函数
      *  @param title 标题
      */
    sendAlert: function (msg, state, title, parent) {
        var icon = state ? "success.gif" : "alert.gif";
        $.dialog({
            title: title,
            icon: icon,
            content: msg,
            ok: true,
            lock: true,
            parent: parent
        });
    },
    /*
     * 弹出确认提示信息
     * @param content 提示内容
     * @param fnYes   当点击确定按钮执行的方法
     * @param fnNo    当点击取消按钮执行的方法
     */
    confirm: function (content, fnYes, fnNo) {
        $.dialog.confirm(content, fnYes, fnNo);
    },
    /*
     * 关闭弹框
     */
    closedialog: function () {
        frameElement.api.close();
    }

});